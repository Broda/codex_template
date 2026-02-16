# AGENTS.md — Structured Mode (Final)

This repository follows Structured Mode discipline.

Goals:
- Maintain clear architectural boundaries
- Preserve public contract stability
- Enforce security, migration, and versioning policies
- Execute work via milestone-driven roadmap
- Require tests + build/run verification before checking off tasks

---

# 0) Bootstrap Mode (One-Time)

If the folder `project_init_templates/` exists, the project is considered UNINITIALIZED.

In this case:

1. Read:
   - project_init_templates/manifest.md

2. Ask the initialization questions defined in the manifest.
   - Do not generate files until answers are collected.

3. Generate the required files by selecting templates and filling placeholders.
   - Do not leave unresolved `<...>` placeholders.
   - If a value cannot be inferred, ask a targeted follow-up question.

4. Generate a stack-aligned `.gitignore`.

5. Initialize docs/ROADMAP.md with “Milestone 0 — Foundation / Spine”.

6. After successful generation:
   - Delete the entire `project_init_templates/` folder.
   - From this point forward, templates must never be used again.
   - `docs/` becomes the single source of truth.

If `project_init_templates/` does NOT exist, assume the project is initialized and proceed with Structured Mode governance.

---

# 1) Mandatory Pre-Work Read Phase (Always)

Before making ANY change, read the governance index and applicable policies:

- docs/GOVERNANCE_INDEX.md
- docs/PROJECT_CONTEXT.md
- docs/ROADMAP.md
- docs/ARCHITECTURE.md
- docs/FILE_MAP.md
- docs/VERSIONING_AND_RELEASE_POLICY.md
- docs/SECURITY_POLICY.md
- docs/RUNTIME_VERIFICATION_REPORT.md
- CHANGELOG.md (if present)
- docs/adr/ (most recent ADRs)

If persistence exists, also read:
- docs/MIGRATION_POLICY.md

Assume constraints exist unless confirmed otherwise.

---

# 2) Active Milestone Alignment

Before implementing changes:

- Identify the active milestone in docs/ROADMAP.md
- Confirm the change is in scope for that milestone
- Classify the change:
  - Feature
  - Bug fix
  - Refactor
  - Migration
  - Security fix
  - Docs-only

Do not cross milestone boundaries without updating the roadmap.

---

# 3) Definition of Done (Mandatory)

A task may only be checked off in docs/ROADMAP.md when ALL are true:

- Project builds successfully.
- Application runs successfully (manual smoke test).
- Relevant tests exist and pass.
- No architectural boundary violations were introduced.
- Documentation updated if required (ARCHITECTURE / ADR / ROADMAP / PROJECT_CONTEXT).
- Evidence commands are recorded under the completed task.

Evidence format example:

- Evidence: `<test command>` (pass), `<build command>` (success), `<run command>` (smoke verified)

---

# 4) Public Contract Discipline

Public contracts include:
- API endpoints
- IPC channels
- DTO structures
- CLI commands
- Library exports
- Config file formats
- File formats

Rules:
- Do not change public contracts without an ADR and versioning alignment.
- Refactors must preserve public contracts.

---

# 5) Versioning & Release Discipline

Follow docs/VERSIONING_AND_RELEASE_POLICY.md:

- Do not bump MAJOR without explicit instruction or documented breaking changes.
- Update CHANGELOG.md for user-visible changes or releases.
- Suggest appropriate version bumps when scope warrants.

---

# 6) Migration Discipline (If Persistence Exists)

Follow docs/MIGRATION_POLICY.md:

- Never modify old migration files.
- Schema changes require new migration files.
- Breaking schema changes require ADR + MAJOR bump + backup/migration plan.
- Migrations must be tested:
  - fresh bootstrap
  - upgrade path (from at least the previous version)

---

# 7) Security Discipline

Follow docs/SECURITY_POLICY.md:

- Validate inputs at boundaries.
- Do not expose secrets.
- Do not weaken authentication/authorization.
- Do not remove validation for convenience.
- Fail safely and avoid leaking sensitive details.

Security posture must never erode silently.

---

# 8) No Premature Abstraction

Do NOT:
- Add heavy dependencies without justification.
- Introduce patterns for hypothetical future use.
- Create unnecessary interface/factory layers.
- Over-engineer early milestones.

Build for the current milestone.
Refactor intentionally.

---

# 9) Documentation Update Rules

When making meaningful changes:

- Update docs/ROADMAP.md if scope or progress changes.
- Update docs/ARCHITECTURE.md if structure, boundaries, or flows change.
- Create/update ADRs for architectural decisions.
- Update docs/PROJECT_CONTEXT.md if philosophy changes.
- Update docs/GOVERNANCE_INDEX.md if governance docs change.

---

# 10) Structured Mode Principle

Correctness over convenience.  
Structure over speed.  
Intentional evolution over drift.  
Security over assumption.  
Version discipline over chaos.
