<!--
This file provides targeted, repository-specific instructions for AI coding agents
working on the `christmas` web app. Keep it concise and practical: focus on
what an agent needs to know to be productive here (architecture, conventions,
run/test commands, important files and integration points).
-->

# Repo: christmas (christmasforever)

Quick summary

- React + TypeScript single-page app (create-react-app style). Yearly themed
  sub-apps are under `src/2020`, `src/2021`, ..., `src/2025`.
- UI components live in `src/components` and per-year feature sets in
  `src/<year>/` (e.g. `src/2025/journey`, `src/2025/travel`).
- Audio subsystem: `src/audio/*` with a simple `useAudio` hook and `audioRefs`.
- Riddles / interactive puzzles are implemented as React components (e.g.
  `KrampusEyesRiddle`) and wired into journey flows via riddle utils.

What to read first (order matters)

- `src/index.tsx` and `src/App.tsx` — app bootstrap and routing.
- `src/components/home.component.tsx` — always-on Home UI pattern (floating
  button with high z-index) and how navigation + audio stop is performed.
- `src/audio/audio.hooks.tsx` and `src/audio/audio.utils.tsx` — audio setup,
  `playSong` (note it attaches `.catch()` to `play()`), and `audioRefs` shape.
- `src/2025/App2025.tsx` and `src/2025/journey/journey-2025.component.tsx` —
  story flow, `Spotlight` usage, and where riddles are triggered.
- `src/2025/journey/krampus-eyes-riddle.tsx` — a complex interactive example to
  learn the project's styling & layering conventions (z-index, reveal overlays,
  pointer-events fixes applied here).

Architecture & major patterns

- Year-based feature folders: each year is a self-contained mini-app. Reuse
  common components from `src/components` and audio utilities from `src/audio`.
- Story flow: journeys are arrays of React nodes (`Title`, `Story`, fragments)
  that the Journey component iterates through; special nodes can trigger
  riddles by calling helper utilities (`handle2025Riddle`). Look at
  `src/2025/journey/utils/2025-riddle-utils.tsx` to see how riddles are mapped.
- Riddle components: usually render complex DOM with layered elements and
  overlays. They accept `onComplete` callbacks and should avoid blocking
  page-level controls (respect `pointer-events`, `z-index`).
- Audio: `useAudio` returns `audioRefs` (named refs) and `playSong(song, prev)`.
  Agents should always call `playSong` with the previous song when switching
  tracks to ensure the previous audio is stopped.

Project-specific conventions

- Inline styles are used frequently for tightly-controlled visuals (riddle
  eyeballs, reveal overlays). Respect existing style approach when making
  visual tweaks; add small class rules in `src/2025/App2025.css` for
  cross-component UI states (e.g. `.story-fullscreen-red`).
- `Spotlight` component encapsulates cursor masking behavior. When moving
  interactive content outside the spotlight, ensure cursor behavior, pointer
  events, and audio handling are updated accordingly.
- Use `audioRefs.<name>.current` when calling `playSong` or stopping audio.
  Avoid directly calling `audio.play()` without handling promise rejection.
- Keep changes minimal and focused. Many files are sensitive to z-index and
  pointer-events; small, localized edits are preferred over wide refactors.

Typical development commands

- Start dev server: `npm start` (standard CRA dev server).
- Build: `npm run build` (if present) — but in the repo work is mostly done in
  dev mode for visual verification.
- Lint/type-check: rely on your editor TypeScript checks; no central
  linter runner is enforced in repo root.

Integration points & gotchas

- `Home` button uses `position: fixed` with high `z-index` (set to remain
  above overlays). If you add fullscreen overlays, ensure `Home` z-index is
  larger than them (current value ~3000).
- Reveal overlays must be rendered outside containers that will be hidden
  (e.g., do not render the overlay inside a container whose `visibility`
  is toggled to `hidden`) — this repo already fixed a bug by moving overlays
  to be siblings of the small-grid container.
- Audio `play()` race: `playSong` wraps `audio.play()` and attaches a `.catch`
  to avoid uncaught promise rejections. Use `playSong` instead of calling
  `audio.play()` directly.
- Performance: some riddles render many DOM nodes (e.g., 250 pairs = 500
  eye DOM elements plus layered wrappers). If performance is impacted, prefer
  simplified DOM or switch to Canvas for dense scenes.

Files to reference when changing interactions or audio

- `src/components/spotlight.component.tsx` — cursor masking, pointer rules.
- `src/audio/audio.hooks.tsx` — audio helpers and `playSong` semantics.
- `src/2025/journey/krampus-eyes-riddle.tsx` — complex puzzle example (z-index,
  reveal overlay, answer placement, layered rendering). Use as a template for
  similar puzzles.
- `src/2025/App2025.css` — global visual utilities for journeys (spotlight,
  reveal, fullscreen story class `.story-fullscreen-red`).

How to add a new riddle safely (step-by-step)

1. Create new component in `src/2025/journey/` (e.g. `my-riddle.tsx`) that
   accepts `onComplete: (won:boolean) => void`.
2. Keep rendering outside of any element that may become `visibility: hidden`.
3. Use `pointer-events: none` for decorative layers; enable `pointer-events`
   on the interactive wrapper only.
4. Use `audioRefs` + `playSong` to play theme sounds. To switch from `fire` to
   `krampus`, call `playSong(audioRefs.krampus.current, audioRefs.fire.current)`.
5. Add any new global CSS to `src/2025/App2025.css` (keep names short and
   prefixed where appropriate).
6. Wire the riddle into `src/2025/journey/utils/2025-riddle-utils.tsx` so it can
   be triggered by `handle2025Riddle(...)` from the story flow.

What an AI agent must _not_ do

- Do not change the global router or routing basename unless requested.
- Avoid bulk reformatting of large files. Keep changes surgical.
- Avoid introducing audio.play() calls without `.catch()` handling — use
  `playSong` whenever possible.

If something is unclear or you want a prototype

- Ask for a scaffolded riddle component or a sample `SceneCard`.
- Tell the agent which year folder to work in (default: `src/2025/`) and which
  riddle id to map in `2025-riddle-utils.tsx` (e.g., case 4 → Krampus riddle).

Examples (copy-ready snippets)

- Play krampus while stopping fire:
  ```ts
  playSong(audioRefs.krampus.current, audioRefs.fire.current);
  ```
- Make a reveal overlay that sits above everything but below the Home button:
  ```tsx

  ```

**Repository Rules for AI Agents**

- **Never add comments to code:** Do not insert or modify inline comments or
  block comments in existing source files. Explanations belong in the
  `.github/copilot-instructions.md` or pull request descriptions, not in code.
- **Always componentize when possible:** Break UI and logic into reusable
  React components in `src/components/`. Prefer small, focused components
  rather than large monolithic files.
- **Prefer CSS files over inline styles:** Create or update CSS files in
  `src/styles/` or component-level CSS files instead of adding inline
  `style={{ ... }}` objects. Use the existing pattern of importing CSS into
  components (e.g., `import "../styles/TheJourney.css"`).
- **Do not modify code in past-year folders:** Make no changes to files or
  functionality in any folder with a name earlier than the current year
  (e.g., `2024`, `2023`, `2022`). If such folders exist, treat them as frozen;
  only read them for context.

End of instructions — please run `npm start` locally and visually verify
interactive changes (many of the puzzles rely on visual inspection). Ask me to
iterate on any unclear area or to generate a scaffolded example.

---
