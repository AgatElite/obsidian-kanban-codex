# Kanban Codex

Customized build of the Obsidian Kanban plugin for personal use with BRAT.

Based on `mgmeyers/obsidian-kanban` version 2.0.51.

## Custom behavior

- Card checkboxes are controlled per list.
- Lists can separately toggle whether checked cards archive immediately.
- The old "mark cards in this list as complete" setting is removed.
- Cards enter edit mode with a single click.
- Clicking outside an edited card cancels editing.
- Lists without card checkboxes show a direct archive button on each card.
- Checked cards are dimmed, struck through, and moved to the bottom of their list.

## BRAT

This repository is laid out as a normal Obsidian plugin repository:

- `manifest.json`
- `main.js`
- `styles.css`

Install it in BRAT by adding this GitHub repository URL.
