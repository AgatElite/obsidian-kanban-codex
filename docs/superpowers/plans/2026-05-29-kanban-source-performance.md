# Kanban Source Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Kanban Codex as a source-backed fork, preserve its custom behavior, and ship measurable performance improvements only after verification.

**Architecture:** Start from upstream `mgmeyers/obsidian-kanban` tag `2.0.51`, then carry the local fork metadata and custom behavior in readable TypeScript/LESS. Performance work should target source-level hot paths, especially metadata refreshes, board reparsing, and list/card rendering.

**Tech Stack:** Obsidian plugin API, TypeScript, Preact, esbuild, LESS, Yarn.

---

### Task 1: Restore Source Tree

**Files:**

- Create/modify: upstream source files from tag `2.0.51`
- Preserve: `manifest.json`, `README.md`, release assets

- [ ] Copy upstream source, package metadata, build config, and lockfile into the worktree.
- [ ] Preserve the fork id/name/version/description in `manifest.json`.
- [ ] Install dependencies with `yarn install --frozen-lockfile`.
- [ ] Run `yarn typecheck` and `yarn build` to verify the imported source builds.

### Task 2: Reapply Kanban Codex Behavior

**Files:**

- Modify: `src/Settings.ts`
- Modify: `src/components/Lane/LaneSettings.tsx`
- Modify: `src/components/Item/Item.tsx`
- Modify: `src/components/Item/ItemCheckbox.tsx`
- Modify: `src/components/Item/ItemContent.tsx`
- Modify: `src/components/Item/ItemMenu.ts`
- Modify: `src/styles.less`

- [ ] Add source-level settings for per-list checkboxes and automatic archive-on-check.
- [ ] Remove the old visible per-list "mark complete" control.
- [ ] Preserve single-click edit and click-outside cancel behavior.
- [ ] Preserve direct archive buttons for lists without card checkboxes.
- [ ] Preserve checked-card dimming, strike-through, and bottom placement.
- [ ] Build and smoke-check artifact sizes.

### Task 3: Performance Pass

**Files:**

- Modify: `src/main.ts`
- Modify: `src/StateManager.ts`
- Modify: `src/components/Item/Item.tsx`
- Modify: `src/components/Lane/Lane.tsx`
- Modify: `src/components/MarkdownRenderer/MarkdownRenderer.tsx`

- [ ] Reduce unnecessary full board reparses from unrelated metadata changes.
- [ ] Avoid redundant header-button and preview-cache work when state/settings did not change.
- [ ] Memoize derived checked-card ordering per lane rather than sorting/repartitioning on every item render.
- [ ] Keep all timer and DOM usage compatible with Obsidian popout windows.
- [ ] Run typecheck/build and compare behavior against the existing release assets.

### Task 4: Release Preparation

**Files:**

- Modify: `manifest.json`
- Modify: `versions.json`
- Modify: `README.md` or `release-notes.md`

- [ ] Bump version only after the user approves working changes.
- [ ] Create a GitHub release only after explicit user approval.
- [ ] Attach `main.js`, `manifest.json`, and `styles.css`.
