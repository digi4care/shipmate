# Beads Workflow voor Shipmate

## Overzicht

Shipmate gebruikt **Beads** als issue tracker voor de OpenCode SDK migratie. Dit document beschrijft de workflow.

## Huidige Status

```
📊 Issue Database Status

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

## Workflow Commands

### Start aan een fase

```bash
# Claim en start issue
bd update shipmate-yqk --claim
```

### Toon ready issues

```bash
# Issues zonder open blockers
bd ready
```

### Toon alle issues

```bash
# Alle issues met status
bd list
```

### Sluit een fase af

```bash
# Na afronden van een fase
bd close shipmate-yqk --reason "Completed: tsconfig.json en package.json geüpdatet"
```

### Voeg notities toe

```bash
# Tussentijds werk documenteren
bd note shipmate-yqk "TypeScript configuratie voltooid, nu skills testen"
```

### Check dependencies

```bash
# Toon wat een issue blokkeert
bd show shipmate-3kf
```

## Startprompt voor Nieuwe Chat

```
Continue work on shipmate-yqk: Fase 1 TypeScript Setup.

Doel: Setup TypeScript configuratie voor shipmate OpenCode SDK migratie.

Context: Dit is fase 1 van de migratie. Na afronding worden Fase 2 (Skill Loader) en Fase 3 (Hooks Migratie) unblocked.

Beads commands:
- bd ready # toon ready issues
- bd show shipmate-yqk # toon issue details
- bd update shipmate-yqk --claim # claim issue
- bd close shipmate-yqk --reason "..." # sluit issue

Plan: .sisyphus/plans/opencode-sdk-migration.md
```

## Belangrijke Regels

1. **Claim voor start**: Altijd `bd update <id> --claim` voordat je begint
2. **Sluit bij afronding**: `bd close <id> --reason "..."` als fase klaar is
3. **Note tussenresultaten**: `bd note <id> "..."` voor belangrijke beslissingen
4. **Check ready**: `bd ready` om te zien wat unblocked is na sluiten

## Fase Details

| Fase | ID | Description |
|------|-----|-------------|
| 1 | shipmate-yqk | tsconfig.json, package.json, dependencies |
| 2 | shipmate-3kf | src/config/schema.ts, src/config/reader.ts, src/skill-loader.ts |
| 3 | shipmate-cuk | src/hooks/careful.ts, freeze.ts, guard.ts, unfreeze.ts |
| 4 | shipmate-mtw | src/index.ts met Plugin export |
| 5 | shipmate-3jw | postinstall.mjs update met sources format |
| 6 | shipmate-pc8 | schema.json update |
| 7 | shipmate-bu8 | Verwijder plugin/ folder, oude src/index.js |
