import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { registerHooks } from "node:module";
import test from "node:test";

// This transitive dependency publishes both bundles but points Node at its UMD build.
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    const result = nextResolve(specifier, context);
    if (specifier === "@kabelsalat/web" && result.url.endsWith("/dist/index.js")) {
      return { ...result, url: new URL("index.mjs", result.url).href };
    }
    return result;
  },
});
const core = await import("@strudel/core");
const mini = await import("@strudel/mini");
const { transpiler } = await import("@strudel/transpiler");
hooks.deregister();

mini.miniAllStrings();
await core.evalScope(core, mini);
const repl = core.repl({ transpiler, getTime: () => 0, defaultOutput() {} });
const load = (path) => readFile(new URL(`../docs/${path}`, import.meta.url), "utf8");
const triangleSource = await load("projects/test-1.strudel");
const fmSource = await load("projects/test-2-fm-keys.strudel");

async function evaluate(source) {
  const pattern = await repl.evaluate(source, false);
  assert.equal(typeof pattern?.queryArc, "function", "Score must return a playable pattern");
  return pattern;
}

function events(pattern, start, end) {
  return pattern.queryArc(start, end).filter(hap => hap.hasOnset()).map(hap => ({
    start: Number(hap.whole.begin),
    end: Number(hap.whole.end),
    value: hap.value,
  }));
}

const atCue = (source, bar) => source.replace("const cueBar = 1;", `const cueBar = ${bar};`);

test("both arrangements start on bar 1 and end after a single kick in bar 183", async () => {
  for (const source of [triangleSource, fmSource]) {
    assert.match(source, /setcpm\(122\/4\)/);
    const pattern = await evaluate(source);
    assert.equal(events(pattern, -1, 0).length, 0);
    assert.equal(events(pattern, 0, 8).filter(event => event.value.s === "bd").length, 32);
    assert.equal(events(pattern, 0, 8).filter(event => event.value.s === "sd").length, 0);
    assert(events(pattern, 8, 16).some(event => event.value.s === "sd"));
    assert(events(pattern, 16, 32).some(event => event.value.note === "c2"));
    assert.equal(events(pattern, 0, 32).filter(event => event.value.orbit === 2).length, 0);
    assert(events(pattern, 32, 48).some(event => event.value.orbit === 2));
    assert.equal(events(pattern, 88, 96).filter(event => event.value.s === "bd").length, 0);
    assert(events(pattern, 88, 96).some(event => event.value.orbit === 4));
    assert(events(pattern, 96, 97).some(event => event.value.s === "bd" && event.start === 96));
    assert.deepEqual(events(pattern, 182, 183).map(({ start, value }) => [start, value.s]), [[182, "bd"]]);
    assert.equal(events(pattern, 183, 184).length, 0);
  }
});

test("A/B changes only the chord voice and its FM controls", async () => {
  const triangle = events(await evaluate(triangleSource), 0, 183);
  const fm = events(await evaluate(fmSource), 0, 183);
  assert.equal(triangle.length, fm.length);
  const fmControls = { fmi: 1.7, fmh: 2, fmattack: .002, fmdecay: .087, fmsustain: 0 };
  let chordCount = 0;
  for (const [index, original] of triangle.entries()) {
    const candidate = fm[index];
    if (original.value.orbit !== 2) {
      assert.deepEqual(candidate, original);
      continue;
    }
    assert.equal(original.value.s, "triangle");
    assert.deepEqual(candidate, { ...original, value: { ...original.value, s: "sine", ...fmControls } });
    chordCount += 1;
  }
  assert(chordCount > 0, "Comparison must contain chord events");
});

test("live cue switches on a bar line and a repeated update holds the offset", async () => {
  for (const source of [triangleSource, fmSource]) {
    const baseline = await evaluate(source);
    let clock = 40.25;
    core.setIsStarted(true);
    repl.scheduler.now = () => clock;
    try {
      const jumped = await evaluate(atCue(source, 97));
      assert.deepEqual(jumped.betweenTheStepsCue, { bar: 97, from: 41, before: 0, after: 55 });
      assert.deepEqual(events(jumped, 40.25, 41), events(baseline, 40.25, 41));
      assert(events(jumped, 41, 42).some(event => event.value.s === "bd" && event.start === 41));

      clock = 44.2;
      const repeated = await evaluate(atCue(source, 97));
      assert.deepEqual(repeated.betweenTheStepsCue, jumped.betweenTheStepsCue);
      const breakdown = await evaluate(atCue(source, 89));
      assert.equal(breakdown.betweenTheStepsCue.from, 45);
      assert(events(breakdown, 44.2, 45).some(event => event.value.s === "bd"));
      assert(!events(breakdown, 45, 46).some(event => event.value.s === "bd"));

      clock = 45.97;
      const guarded = await evaluate(atCue(source, 161));
      assert.equal(guarded.betweenTheStepsCue.from, 47);
    } finally {
      core.setIsStarted(false);
    }
    const stoppedCue = await evaluate(atCue(source, 97));
    assert(events(stoppedCue, 0, 1).some(event => event.value.s === "bd" && event.start === 0));
  }
});

test("each preset evaluates with the intended sound and produces onsets", async () => {
  const presets = [
    ["sine-sub.strudel", "sine"],
    ["triangle-echo.strudel", "triangle"],
    ["fm-keys.strudel", "sine"],
    ["closed-hats.strudel", "hh"],
  ];
  for (const [file, sound] of presets) {
    const pattern = await evaluate(await load(`presets/${file}`));
    const notes = events(pattern, 0, 2);
    assert(notes.length > 0, `${file} must produce onsets`);
    assert(notes.every(note => note.value.s === sound), file);
  }
});
