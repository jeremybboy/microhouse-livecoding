# Microhouse production method

## Translate the brief into a test

| Producer asks for | First musical choice | Listening question |
| --- | --- | --- |
| Clean, rolling low end | Keep the kick on the grid. Give a dry, short sine bass regular rests and a two-bar response. | Can you follow both the downbeat and the bass pickup? |
| More human hats | Rotate compatible closed-hat samples, vary gate and level, then compare small offsets on the hats only. | Do the accents feel natural across several bars? |
| Air around an ambient chord | Use an upper-register voicing, fewer attacks, and a short dry stab into timed repeats. | Do the gaps carry the chord's character and leave the bass readable? |
| A more electric-piano-like chord | Hold voicing, rhythm, and effects steady. Compare a triangle with a sine carrier and a short FM envelope. | Which attack survives the drums at a similar listening level? |
| Minimal variation over several minutes | Keep a repeating two-bar cell and change one layer or phrase ending at section boundaries. | Can you tell when a section turns while the pulse remains familiar? |

Use a 16-bar starter when the brief leaves the length open. Start with kick on all four beats, snare or clap on 2 and 4, and closed hats on the offbeats. Listen against one syncopated bass cell before adding a rim reply or a chord. The groove grid is a project starting point. [Ableton on backbeats](https://learningmusic.ableton.com/make-beats/backbeats.html)

The echo treatment draws from dub production, where mixer sends and decaying repeats shape the arrangement. In these scores, the bass stays dry and the chord gets a dotted-eighth echo. At 122 BPM that is about 369 ms, so the repeat moves against the quarter-note pulse. [El Choop’s dub-chord workflow](https://www.ableton.com/en/blog/designing-dub-chords-in-ableton-live-with-el-chooppizza-hotline/) · [Strudel delaysync reference](https://strudel.cc/reference/#delaysync)

## Preset starting settings

| Voice | Source and envelope | Tone and space |
| --- | --- | --- |
| [Dry sine sub](presets/sine-sub.strudel) | Sine, 6 ms attack, 130 ms decay, .12 sustain, 35 ms release, .75 gate factor | .34 gain, dry |
| [Triangle echo](presets/triangle-echo.strudel) | Triangle, 8 ms attack, 160 ms decay, zero sustain, 60 ms release | 135 Hz high-pass, 1.05–1.9 kHz filter sweep, dotted-eighth echo, .70 feedback, .18 room, orbit 2, .32 gain |
| [FM keys](presets/fm-keys.strudel) | Sine carrier, FM index 1.7, ratio 2, 2 ms FM attack, 87 ms FM decay, zero FM sustain | Same amplitude envelope, filtering, and effects as Triangle echo |
| [Alternating hats](presets/closed-hats.strudel) | Samples `hh:0`, `hh:1`, `hh:0`, `hh:2`, patterned gates from .46 to .65 | 620 Hz high-pass, 9.3 kHz low-pass, pan .54, gain .30 |

`late()` measures time in **cycles**. In these scores, a cycle is a four-beat bar and `.006` of a cycle is roughly 12 ms. `delaysync(3/16)` expresses the dotted eighth as a fraction of a cycle at this four-beat mapping. The presets contain the exact runnable settings. [Strudel time modifiers](https://strudel.cc/learn/time-modifiers/) · [Strudel synthesis controls](https://strudel.cc/learn/synths/)

## Run an audition

1. Pick the same cue in both files. Start with bar 33 for the chord entrance or 97 with the full groove.
2. Hold the listening excerpt, voicing, drums, and audition setup steady. Switch between two takes and match their perceived level as closely as you can.
3. Record the bar range, what you heard, the take you prefer, and the next edit. One win on a sparse section may change when the drums return.
4. Save a new `.strudel` file in Git for each durable take. The REPL’s Patterns panel is useful for local working copies, and a share link is convenient for auditioning. Keep the source for versioned recovery. [Strudel Patterns](https://strudel.cc/technical-manual/patterns/) · [Strudel sharing and long URLs](https://strudel.cc/technical-manual/project-start/)

A useful note reads “Bars 97–104, level-matched by ear, preferred take B because the strike stood apart from the hats. Keep the voicing and try it without the rim at bar 113.” Record “listening pending” when you have only checked the code or timing.

## Further examples

Browse [Mikko Numminen’s Strudel Patterns](https://github.com/MikkoNumminen/strudel-patterns) for small reusable patterns and effects recipes. Use the [official synth guide](https://strudel.cc/learn/synths/) for oscillator and FM controls, and the [sample guide](https://strudel.cc/learn/samples/) if you want to try a different drum bank.
