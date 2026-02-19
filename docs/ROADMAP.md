# ROADMAP.md — Structured Mode v2

This roadmap defines execution.

Rules:

- Organized by milestone.
- Each milestone has a clear goal.
- Tasks grouped by architectural layer.
- Completion criteria required.
- Evidence required before marking tasks complete.
- No flat TODO lists.

---

# Milestone Template

Each milestone must include:

- Goal
- Architecture Impact
- Domain/Core Tasks
- Application Tasks
- Persistence Tasks
- Interface Tasks
- Infrastructure Tasks (if needed)
- Testing & Verification
- Completion Criteria

---

# Milestone 0 — Foundation / Spine

## Goal

Establish stable architecture baseline and vertical slice.

## Architecture Impact

- Define layer boundaries.
- Establish documentation discipline.

---

## Domain/Core

- [x] Define core entities
- [x] Add validation rules
- [x] Add unit tests
- Evidence: `pnpm test:e2e` (pass)

---

## Application

- [x] Create orchestration layer
- Evidence: `pnpm test:e2e` (pass)

---

## Persistence

- [x] Define repository interfaces
- [x] Implement initial storage adapter
- Evidence: `pnpm test:e2e` (pass), `pnpm dev list` (runs with file-backed adapter)

---

## Interface

- [x] Basic interaction surface
- [x] Validation feedback
- Evidence: `pnpm dev add "Seed task" "Initial description"` (created), `pnpm dev add "   "` (validation error)

---

## Testing & Verification

- [x] Build succeeds
- [x] Tests pass
- [x] Manual smoke test complete
- Evidence: `pnpm build` (success), `pnpm test:e2e` (pass), `pnpm run smoke` (smoke verified)

---

## Completion Criteria

- Vertical slice works end-to-end
- Tests validate core logic
- No cross-layer violations

---

# Refactor Milestone Template

Refactor milestones must include:

## Goal

Reduce risk or improve structure without changing behavior.

## Constraints

- No public contract changes.
- No DTO shape changes.
- No API surface drift.
- No domain behavior changes.

## Tasks

- [ ] Extract modules
- [ ] Add missing tests
- [ ] Remove cross-layer leaks
- [ ] Preserve behavior parity

## Verification

- [ ] All tests pass
- [ ] Manual workflow parity verified
- [ ] Public interfaces unchanged

---

# Evidence Format

Every completed task must include:

- Evidence: pnpm build (success), pnpm test:e2e (pass), pnpm tauri dev (smoke verified)
