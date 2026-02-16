# MIGRATION_POLICY.md — Structured Mode v2

This document defines how database schema and data migrations are handled.

Persistence is a long-term commitment.
Migrations must be intentional, deterministic, and reversible when possible.

---

# 1. When a Migration Is Required

A migration is required when:

- A new table is added.
- A column is added, removed, or modified.
- Indexes are added or removed.
- Constraints are modified.
- Data transformation is required.
- Seed data changes affect application behavior.

No schema changes may be made without:

- Updating this policy if needed.
- Updating ROADMAP.md.
- Updating ARCHITECTURE.md (if structure changes).
- Creating an ADR if architectural impact exists.

---

# 2. Migration Types

## 2.1 Additive Migration (Safe)

Examples:
- Add nullable column
- Add new table
- Add index
- Add non-breaking constraint

Version bump: MINOR or PATCH

Must:
- Preserve backward compatibility.
- Not break existing data.
- Be idempotent if re-run (where possible).

---

## 2.2 Transformative Migration

Examples:
- Rename column
- Convert data format
- Merge/split tables
- Normalize structure

Version bump: MINOR (if compatible) or MAJOR (if breaking)

Must:
- Include data migration script.
- Include validation checks.
- Include rollback plan if possible.
- Include migration notes in CHANGELOG.

---

## 2.3 Breaking Migration

Examples:
- Remove column used by prior versions.
- Change column type incompatibly.
- Drop table.
- Change primary keys.

Version bump: MAJOR

Requires:
- ADR
- Explicit migration plan
- Backup strategy
- Upgrade path documentation

Breaking changes must be rare.

---

# 3. Migration File Rules

- Store migrations in a dedicated directory (e.g., persistence/migrations).
- Name migrations in ordered format:

  0001_initial_schema.sql
  0002_add_user_table.sql
  0003_add_index_to_transactions.sql

- Migrations must be immutable once committed.
- Do not edit old migration files.
- New changes require new migration files.

Migration history must reflect actual evolution.

---

# 4. Migration Execution Rules

- Migrations must run automatically on startup (if applicable).
- Migration execution must be deterministic.
- Partial migration failure must halt startup.
- Application must not continue in partially migrated state.

If migration fails:

- Surface clear error.
- Do not corrupt existing data.

---

# 5. Data Integrity Requirements

Migrations must:

- Preserve existing data unless explicitly removed in MAJOR release.
- Avoid silent truncation.
- Avoid silent type coercion.
- Avoid lossy transformations.

For transformative migrations:

- Validate row counts before and after.
- Validate constraints.
- Log transformation summary if appropriate.

---

# 6. Rollback Policy

Rollback capability depends on migration type:

Additive migrations:
- Generally safe to leave as-is.
- Rarely require rollback.

Transformative migrations:
- Prefer reversible operations when feasible.
- Consider backup before transformation.

Breaking migrations:
- Must require backup before applying.
- Must document restoration procedure.

Rollback strategy must be documented for MAJOR changes.

---

# 7. Version Alignment

Schema version must align with application version.

PATCH:
- No schema change allowed.

MINOR:
- Additive migrations only.

MAJOR:
- Breaking migrations allowed with plan.

Application must verify schema version at startup.

If mismatch:
- Run migrations or fail safely.

---

# 8. Seed Data Policy

If seed data is used:

- Treat seed changes as migrations.
- Do not silently modify seed values.
- Document seed changes in CHANGELOG.

---

# 9. Data Backups

If project is local-first or user-data backed:

Before applying:

Transformative or Breaking migrations:

- Create backup copy.
- Validate backup success.
- Apply migration.
- Confirm integrity.

Backup strategy must be documented in README if applicable.

---

# 10. Refactor Constraints

Refactor milestones must:

- Not change schema.
- Not alter persistence behavior.
- Not require migration.

If schema change is required, it is not a pure refactor milestone.

Update roadmap and version accordingly.

---

# 11. Testing Requirements

Migrations must be tested:

- Fresh database bootstrap
- Upgrade from previous version
- Upgrade from multiple prior versions (if possible)

Migration tests must validate:

- Schema shape
- Required constraints
- Data preservation
- Application startup success

No migration may ship untested.

---

# 12. AI Guardrails — Migration Discipline

AI must:

- Not modify existing migration files.
- Not rewrite historical schema.
- Not remove columns silently.
- Not change types without migration.
- Not introduce schema drift.

If uncertain, ask before generating migration.

---

# 13. Guiding Principle

Data is harder to change than code.

Code can be rewritten.
Schema evolution must be permanent, deliberate, and versioned.

Migrations are historical artifacts.
Treat them as such.
