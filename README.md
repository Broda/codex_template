# Raspberry Pi Kanban Task Tracker

Milestone 0 foundation for a layered task tracker.

---

# Status

- Phase: MVP
- Active Milestone: Milestone 0 - Foundation / Spine
- Interface baseline: CLI (React + Tauri planned for future milestone)

---

# Setup

Language: TypeScript  
Runtime: Node.js 20 LTS  
Package manager: pnpm

---

# Development Workflow

1. Install dependencies: `pnpm install`
2. Build project: `pnpm build`
3. Run tests: `pnpm test:e2e`
4. Run manual smoke workflow: `pnpm dev`

---

# CLI Commands

- `pnpm dev` -> shows command help
- `pnpm dev add "title" "description"`
- `pnpm dev list`
- `pnpm dev update "id" "title|description|status" "value"`
- `pnpm dev delete "id"`

---

# Verification Commands

Build:

    pnpm build

Run:

    pnpm dev list

Test:

    pnpm test:e2e

---

# Architecture

See:

- docs/PROJECT_CONTEXT.md
- docs/ARCHITECTURE.md
- docs/ROADMAP.md
- docs/FILE_MAP.md
- docs/adr/

---

# Philosophy

Correctness over convenience.  
Structure over speed.  
Intentional evolution over drift.
