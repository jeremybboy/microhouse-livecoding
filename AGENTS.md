# Repository instructions

This is a public Strudel production notebook. GitHub Pages serves `docs/`.
Inspect the relevant score before editing. Keep audition variants in distinct
files and preserve a baseline for comparisons. Record technical checks and
listening review separately. Publish only material cleared for this repository.

## Changes

Use a dedicated branch, stage explicit paths, and open a pull request. Agents
never push changes directly to the default branch after bootstrap, force-push,
enable auto-merge, or merge pull requests. The human owner performs all merges.

## Working on a score

- `docs/projects/` holds the two standalone project scores. `docs/presets/` holds short, playable patches. Read the [Microhouse Producer skill](skills/microhouse-producer/SKILL.md) before taking on a musical brief.
- Use `docs/method.md` for audition decisions and `docs/architecture.md` for the bar map and timing. Keep the project site and documentation aligned with score changes.
- Use Node 24, then `npm ci` and `npm test`. The public site deploys from `main:docs/` after human merge.
