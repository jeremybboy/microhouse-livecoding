# Score structure

The two project files are standalone Strudel scores. Pages serves each as a static download. The browser uses the exact file bytes to build the Strudel editor link, and Strudel handles the transport, synthesis, effects, and sample playback.

## Reading a project

| Piece | Role |
| --- | --- |
| `cueBar` and `setcpm(122/4)` | User-facing cue and clock. One cycle represents one four-beat bar. |
| `kick`, `snare`, `hats`, `rim` | Drum grid and optional reply. Strudel resolves the named samples at playback. |
| `sub` and `keys` | Reusable sound functions. The note strings stay in `bass`, `chord`, and their phrase variants. |
| `reply` and `haze` | A sparse high melodic answer and a soft breakdown layer. |
| `sections` and `arrange` | Pairs of bar counts and stacked parts, later bounded to 183 bars. |
| `betweenTheStepsCue` | Stores the current cue on the live pattern. A requested change preserves the outgoing pattern until the scheduled bar line. |

The sub is dry. Chords use orbit 2, the reply uses orbit 3, and the pad uses orbit 4. Set shared effect parameters consistently on each orbit. [Strudel audio effects](https://strudel.cc/learn/effects/)

## Section map

| Bars | What to hear |
| --- | --- |
| 1–16 | Kick and hats, then backbeat and rim |
| 17–32 | Bass enters |
| 33–64 | First chord pass, then percussion answers |
| 65–88 | Phrase variation and strip-back |
| 89–96 | Breakdown with chord and pad, then percussion returns |
| 97–144 | Full groove, second peak, and settling motif |
| 145–183 | Last theme, then bass and drum outro with one final downbeat |

The scores contain 183 bars at 122 BPM, which is exactly six minutes from the first downbeat to the end of bar 183. The last kick happens on the first beat of bar 183. Sound tails and browser scheduling are separate from score length.

## Cue while playing

Change the whole number in `const cueBar = 1;` and click **Update**. The score uses the next bar line with at least a small scheduling lead, so an edit very close to a boundary can switch one bar later. An Update with the same cue keeps its current offset. On a stopped transport, Play starts from the entered cue. Set `cueBar = 1` for the complete arrangement. [How Strudel schedules live updates](https://strudel.cc/technical-manual/repl/)

## Verify

Run `npm ci` and `npm test` with Node 24. The tests evaluate both scores, check the section boundaries and cue under a simulated transport, compare event controls across the A/B versions, and evaluate the four presets. They also check the Pages entry point and local links. Playback, mix decisions, and sonic intent still need an audition in Strudel.
