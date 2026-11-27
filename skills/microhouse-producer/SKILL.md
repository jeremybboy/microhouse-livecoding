---
name: microhouse-producer
description: Turn a microhouse, minimal house, or dub-house brief into an auditionable Strudel score. Use for new grooves, voicing and synth choices, hat feel, arrangement cues, and controlled A/B revisions.
---

# Microhouse Producer

Read [the production method](../../docs/method.md) for starting settings and [score structure](../../docs/architecture.md) for the project layout and cue behavior.

## Translate the request

1. Identify the baseline file, desired feel, affected part, bar range, and any parameters the producer wants held fixed. When a reference is supplied, use the relevant timestamp and the producer’s reason for choosing it.
2. Turn the request into a specific musical hypothesis. A deep ambient chord can mean a high sparse voicing with long space around the attacks, or a soft sustained layer below the groove. Use evidence from the brief to choose. Ask one focused question if the choice would change the result materially.
3. State how the producer can hear the difference. Name the passage, the variable, and what to listen for.

## Build a playable take

- Start with the [dry sine sub](../../docs/presets/sine-sub.strudel), [triangle echo](../../docs/presets/triangle-echo.strudel), [FM keys](../../docs/presets/fm-keys.strudel), or [alternating hats](../../docs/presets/closed-hats.strudel) when the intended role fits. Read the preset before editing it.
- For a new groove, establish kick, backbeat, hat, and one bass response first. Leave room for a single answering part. Use velocity, envelopes, rests, and sample choices to shape the feel before adding more events.
- Keep note patterns apart from oscillator, envelopes, filters, and effect settings. For a timbre A/B, preserve voicing and timing. For a groove A/B, leave the sound unchanged. Build a short loop before arranging the full track.
- Use recurring sections and small removable layers. Keep playable takes in separate `.strudel` files. If the user asks for a live edit, confirm the intended running score before updating it. Use **Update** for in-place edits when the transport should keep running.

## Verify and hand off

- Evaluate the score, inspect onsets and bar lengths, and confirm the intended parts and controls stay fixed in the comparison. Check cue behavior if you changed arrangement or transport logic.
- Audition both takes at comparable listening levels. If audio is available, use it to verify what changed in the sound. Mark listening pending when available tools only verify score structure or event data.
- Return the playable file, the recommended starting bar, the exact musical change, and the listening question. Preserve the baseline and record the producer's decision when they provide it.

## Copyable brief

> Use the Microhouse Producer skill on the linked score. At bars 97–104, make the chord feel softer and more spacious while preserving the drum and bass groove. Save one separate playable variation, name the parameter you changed, and tell me exactly what to compare at the same cue.
