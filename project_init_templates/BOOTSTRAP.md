# BOOTSTRAP.md — Structured Mode Installer

This file defines the temporary rules for initializing a new Structured Mode project.

Follow this procedure exactly.

---

# 1) Read Manifest

Read:
- project_init_templates/manifest.md

Review:
- project_init_templates/docs/*.base.md
- project_init_templates/gitignore/*.gitignore

Do not generate anything yet.

---

# 2) Ask Initialization Questions

Ask the initialization questions in manifest.md in the exact order listed.

Do not skip questions.
Do not assume defaults.
Collect all answers before generation.

---

# 3) Determine Required Files

From manifest rules:

Always generate:
- README.md
- docs/PROJECT_CONTEXT.md
- docs/ROADMAP.md
- docs/ARCHITECTURE.md
- docs/FILE_MAP.md
- docs/GOVERNANCE_INDEX.md
- docs/VERSIONING_AND_RELEASE_POLICY.md
- docs/SECURITY_POLICY.md
- docs/RUNTIME_VERIFICATION_REPORT.md
- docs/adr/ADR-0001-record-architecture-decisions.md
- docs/adr/ADR-TEMPLATE.md
- CHANGELOG.md
- .gitignore (stack-aligned)

Conditionally generate:
- docs/MIGRATION_POLICY.md (if persistence exists)

---

# 4) Generate Files

For each required file:

- Copy from corresponding `.base.md` template.
- Replace all `<...>` placeholders.
- If a placeholder cannot be inferred, ask a targeted follow-up question.
- Do not leave unresolved placeholders.

Ensure:
- README includes stack-aligned build/run/test commands.
- ROADMAP contains "Milestone 0 — Foundation / Spine".
- GOVERNANCE_INDEX lists all governance docs that exist.
- .gitignore is selected from stack templates and adjusted if necessary.

---

# 5) Milestone 0 Requirements

ROADMAP.md must include Milestone 0 tasks for:

- Repo + docs scaffold confirmation
- Minimal vertical slice ("hello feature")
- Test harness + one real test
- Build / Run / Test commands documented
- Initial migration baseline (if persistence exists)

---

# 6) ADR Initialization

Generate:

- ADR-0001-record-architecture-decisions.md
- ADR-TEMPLATE.md

Ensure ADR numbering starts at 0001.

---

# 7) Final Validation Before Cleanup

Confirm:

- All required files exist.
- No `<...>` placeholders remain.
- Governance index is complete.
- ROADMAP Milestone 0 exists.
- CHANGELOG includes initialization entry under [Unreleased].

---

# 8) Cleanup

Delete the entire `project_init_templates/` folder.

After deletion:

- Do NOT reference templates again.
- Do NOT regenerate governance files.
- Switch to permanent governance rules in AGENTS.md.

---

# Completion Statement

After cleanup, confirm:

"The project has been successfully initialized under Structured Mode governance."
