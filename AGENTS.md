# AGENTS.md — Structured Mode v3 (Permanent)

This repository follows Structured Mode discipline.

Goals:
- Maintain clear architectural boundaries
- Preserve public contract stability
- Enforce security, migration, and versioning policies
- Execute work via milestone-driven roadmap
- Require tests + build/run verification before checking off tasks

---

# 0) Bootstrap Trigger (Temporary Rules Live In Templates Folder)

If the folder `project_init_templates/` exists, the project is considered UNINITIALIZED.

In that case:

1. Read:
   - project_init_templates/BOOTSTRAP.md
   - project_init_templates/manifest.md

2. Follow BOOTSTRAP.md exactly.

3. After successful initialization:
   - Delete the entire `project_init_templates/` folder.
   - Do NOT modify or regenerate AGENTS.md.
   - Switch to normal Structured Mode governance.

If `project_init_templates/` does NOT exist, assume the project is initialized and follow governance rules below.

---

# 1) Mandatory Pre-Work Read Phase (Always)

Before making ANY change:

1. Read docs/GOVERNANCE_INDEX.md first.
2. Then read ALL governance documents listed in that index.
3. Also read:
   - docs/adr/ (most recent ADRs)
   - CHANGELOG.md (if present)

If persistence exists, ensure docs/MIGRATION_POLICY.md is included in the governance index and read it.

Assume constraints exist unless confirmed otherwise.

---

# 2) Active Milestone Alignment

Before implementing changes:

- Identify the active milestone in docs/ROADMAP.md.
- Confirm the change is in scope for that milestone.
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
- Documentation updated if required.
- Evidence commands are recorded under the completed task.

Evidence format example:

- Evidence: `<test command>` (pass), `<build command>` (success), `<run command>` (smoke verified)

If a milestone, migration, refactor milestone, or release is involved,
complete docs/RUNTIME_VERIFICATION_REPORT.md per governance rules.

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
- Do not change public contracts without an ADR and version alignment.
- Refactors must preserve public contracts.

---

# 5) Versioning & Release Discipline

Follow docs/VERSIONING_AND_RELEASE_POLICY.md:

- Do not bump MAJOR without documented breaking changes.
- Update CHANGELOG.md for user-visible changes.
- Suggest version bumps when scope warrants.

---

# 6) Migration Discipline (If Persistence Exists)

Follow docs/MIGRATION_POLICY.md:

- Never modify old migration files.
- Schema changes require new migration files.
- Breaking schema changes require ADR + MAJOR bump + migration plan.
- Test migrations for:
  - Fresh bootstrap
  - Upgrade path

---

# 7) Security Discipline

Follow docs/SECURITY_POLICY.md:

- Validate inputs at boundaries.
- Do not expose secrets.
- Do not weaken authentication.
- Do not remove validation for convenience.
- Fail safely.

Security posture must never erode silently.

---

# 8) ADR Authoring Rule

When creating a new ADR:

- Copy docs/adr/ADR-TEMPLATE.md.
- Rename to ADR-####-short-title.md (next sequential number).
- Resolve all template fields before finalizing.
- Cross-link superseded ADRs when applicable.

---

# 9) .gitignore Hygiene

The `.gitignore` file is governance-controlled:

- Keep it aligned with tooling.
- Never commit secrets.
- Update it when new build artifacts or tools are introduced.

---

# 10) No Premature Abstraction

Do NOT:
- Add heavy dependencies without justification.
- Introduce patterns for hypothetical future use.
- Over-engineer early milestones.

Build for the current milestone.
Refactor intentionally.

---

# 11) Documentation Update Rules

When making meaningful changes:

- Update docs/ROADMAP.md if scope changes.
- Update docs/ARCHITECTURE.md if structure changes.
- Create/update ADRs for architectural decisions.
- Update docs/GOVERNANCE_INDEX.md if governance files change.

---

# Structured Mode Principle

Correctness over convenience.  
Structure over speed.  
Intentional evolution over drift.  
Security over assumption.  
Version discipline over chaos.
