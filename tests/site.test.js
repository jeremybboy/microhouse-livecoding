import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../docs/", import.meta.url);
const html = await readFile(new URL("index.html", root), "utf8");

test("Pages entry point links to existing source files and sections", async () => {
  const local = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)]
    .map(match => match[1]).filter(url => !url.startsWith("https://"));
  for (const target of local) {
    if (target === "./") continue;
    if (target.startsWith("#")) {
      assert(html.includes(`id="${target.slice(1)}"`), target);
    } else {
      await readFile(new URL(target, root));
    }
  }
  assert.equal(local.filter(target => target.startsWith("projects/")).length, 2);
  assert.equal(local.filter(target => target.startsWith("presets/")).length, 4);
});

test("Strudel links contain the exact bytes of all six source downloads", async () => {
  const filePaths = [...html.matchAll(/href="([^"]+\.strudel)" download/g)].map(match => match[1]);
  const cards = filePaths.map(file => ({
    link: { href: new URL(file, root).href, before(anchor) { this.openLink = anchor; } },
    querySelector(selector) {
      return selector === "a[download]" ? this.link : { textContent: file };
    },
  }));
  const script = await readFile(new URL("assets/strudel-links.js", root), "utf8");
  const document = {
    querySelectorAll() { return cards; },
    createElement() { return { setAttribute() {} }; },
  };
  // Run the browser module with file-backed fetch so CI needs no live Strudel service.
  await vm.runInNewContext(`(async () => { ${script} })()`, {
    document, btoa, console,
    fetch: async url => new Response(await readFile(new URL(url))),
  });
  for (const { link } of cards) {
    const editor = new URL(link.openLink.href);
    assert.equal(editor.origin, "https://strudel.cc");
    assert.deepEqual(Buffer.from(decodeURIComponent(editor.hash.slice(1)), "base64"), await readFile(new URL(link.href)));
  }
});
