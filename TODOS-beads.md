# TODOS-beads

> **BEADS Issue Tracker** — Active migration work tracked via `bd` CLI

For long-term roadmap and feature planning, see [TODOS.md](TODOS.md)

## Issue Database Status

```
📊 Current Status

Total Issues:           8
Open:                   7
In Progress:            1
Blocked:                5
Closed:                 0
Ready to Work:          2
```

## Issue Hierarchy

```
shipmate-pjf (Epic: OpenCode SDK Migration)
├── shipmate-yqk (Fase 1: TypeScript Setup) ◀ READY
├── shipmate-3kf (Fase 2: Skill Loader) ⏸ blocked by Fase 1
├── shipmate-cuk (Fase 3: Hooks Migratie) ⏸ blocked by Fase 1
├── shipmate-mtw (Fase 4: Plugin Entry Point) ⏸ blocked by Fase 2, 3
├── shipmate-3jw (Fase 5: postinstall.mjs) ⏸ blocked by Fase 4
├── shipmate-pc8 (Fase 6: schema.json) ◀ READY
└── shipmate-bu8 (Fase 7: Cleanup) ⏸ blocked by Fase 4
```

## Dependency Graph

```
Fase 1: TypeScript Setup (shipmate-yqk)
    ↓ blocks
┌───┴───┐
│       │
▼       ▼
Fase 2:    Fase 3:
Skill     Hooks
Loader    Migratie
│       │
└───┬───┘
    ↓
Fase 4: Plugin Entry Point
    ↓ blocks
┌───┴───┬───────┐
│       │       │
▼       ▼       ▼
Fase 5:   Fase 6:   Fase 7:
postin-  schema   Cleanup
stall    .json
```

## Phase Details

| Phase | ID | Description | Files |
|-------|-----|-------------|-------|
| 1 | shipmate-yqk | TypeScript Setup | `tsconfig.json`, `package.json`, dependencies |
| 2 | shipmate-3kf | Skill Loader | `src/config/schema.ts`, `src/config/reader.ts`, `src/skill-loader.ts` |
| 3 | shipmate-cuk | Hooks Migratie | `src/hooks/careful.ts`, `freeze.ts`, `guard.ts`, `unfreeze.ts` |
| 4 | shipmate-mtw | Plugin Entry Point | `src/index.ts` met Plugin export |
| 5 | shipmate-3jw | postinstall.mjs | Update met sources format |
| 6 | shipmate-pc8 | schema.json | Update configuration |
| 7 | shipmate-bu8 | Cleanup | Verwijder plugin/ folder, oude src/index.js |

## Workflow Commands

### Start working on a phase

```bash
# Claim and start issue
bd update shipmate-yqk --claim
```

### Show ready issues

```bash
# Issues without open blockers
bd ready
```

### Show all issues

```bash
# All issues with status
bd list
```

### Close a phase

```bash
# After completing a phase
bd close shipmate-yqk --reason "Completed: tsconfig.json en package.json geüpdatet"
```

### Add notes

```bash
# Document intermediate work
bd note shipmate-yqk "TypeScript configuratie voltooid, nu skills testen"
```

### Check dependencies

```bash
# Show what an issue blocks
bd show shipmate-3kf
```

## Session Start Prompt

```
Continue work on shipmate-yqk: Fase 1 TypeScript Setup.

Goal: Setup TypeScript configuration for shipmate OpenCode SDK migration.

Context: This is phase 1 of the migration. After completion, Phase 2 (Skill Loader) and Phase 3 (Hooks Migratie) become unblocked.

Beads commands:
- bd ready              # show ready issues
- bd show shipmate-yqk  # show issue details
- bd update shipmate-yqk --claim  # claim issue
- bd close shipmate-yqk --reason "..."  # close issue

Plan: .sisyphus/plans/opencode-sdk-migration.md
```

## Rules

1. **Claim before start**: Always `bd update <id> --claim` before starting
2. **Close on completion**: `bd close <id> --reason "..."` when phase is done
3. **Note intermediate results**: `bd note <id> "..."` for important decisions
4. **Check ready**: `bd ready` to see what's unblocked after closing
