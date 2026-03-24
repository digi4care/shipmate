# Beads Workflow voor Shipmate

## Overzicht

Shipmate gebruikt **Beads** als issue tracker. Beads is een AI-native issue tracker met Dolt als backend.

**GitHub Sync**: https://github.com/digi4care/shipmate-beads

## Config

```yaml
# .beads/config.yaml
dolt.auto-start: true
no-db: false
no-git-ops: false
sync-branch: beads-sync
```

## Huidige Status

```
📊 Issue Database Status

Total Issues:           8
Open:                   0
Closed:                 8
Ready to Work:          0

✅ OpenCode SDK Migration voltooid!
```

## Voltooide Issues

```
✓ shipmate-pjf (Epic: OpenCode SDK Migration)
✓ shipmate-yqk (Fase 1: TypeScript Setup)
✓ shipmate-3kf (Fase 2: Skill Loader)
✓ shipmate-cuk (Fase 3: Hooks Migratie)
✓ shipmate-mtw (Fase 4: Plugin Entry Point)
✓ shipmate-3jw (Fase 5: postinstall.mjs)
✓ shipmate-pc8 (Fase 6: schema.json)
✓ shipmate-bu8 (Fase 7: Cleanup)
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

### Sync met GitHub

```bash
# Push lokale changes naar GitHub
bd dolt push

# Pull changes van GitHub
bd dolt pull
```

### Nieuwe issue maken

```bash
# Maak nieuwe issue
bd create "Issue titel" --description "Details..."
```

### Start aan een issue

```bash
# Claim en start issue
bd update <id> --claim
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

### Sluit een issue

```bash
# Na afronden
bd close <id> --reason "Completed: ..."
```

### Voeg notities toe

```bash
# Tussentijds werk documenteren
bd note <id> "Notitie..."
```

### Check dependencies

```bash
# Toon wat een issue blokkeert
bd show <id>
```

## Startprompt voor Nieuwe Chat

```
Continue BEADS issue tracking.

Beads commands:
- bd list        # alle issues
- bd ready       # unblocked issues
- bd create      # nieuwe issue
- bd update <id> --claim  # claim issue
- bd close <id> --reason "..."  # sluit issue
- bd dolt push   # sync naar GitHub

GitHub: https://github.com/digi4care/shipmate-beads
```

## Belangrijke Regels

1. **Claim voor start**: Altijd `bd update <id> --claim` voordat je begint
2. **Sluit bij afronding**: `bd close <id> --reason "..."` als issue klaar is
3. **Note tussenresultaten**: `bd note <id> "..."` voor belangrijke beslissingen
4. **Sync regelmatig**: `bd dolt push` om naar GitHub te syncen
