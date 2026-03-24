---
name: retro
description: |
  Weekly engineering retrospective. Analyzes commit history, work patterns, and code quality metrics. Team-aware with per-person praise and growth opportunities. Use when user asks for "retro", "weekly review", or reflects on recent work.
license: MIT
compatibility: opencode
metadata:
  author: shipmate
  version: 2.0.0
---

# Engineering Retrospective

Generates a comprehensive engineering retrospective analyzing commit history, work patterns, and code quality metrics. Team-aware: identifies the user running the command, then analyzes every contributor with per-person praise and growth opportunities.

## When to Use Me

Use when:

- /retro
- retro
- weekly retro
- retrospective
- how did this week go
- how did last week go
- weekly review
- engineering retrospective
- how did this year compare

Do not use for:

- Daily standups (out of scope)
- Individual performance reviews (use HR tools)
- Sprint planning (use planning tools)
- Bug analysis (use investigate skill)
- PR code review (use review skill)

## Arguments

- `/retro` — Default: last 7 days
- `/retro 24h|14d|30d` — Custom window
- `/retro compare [window]` — Compare current vs prior window

## Workflow

1. **Gather raw data** — Fetch commits, stats, timestamps, hotspots, PRs
2. **Compute metrics** — See `references/metrics-guide.mdx` for calculations
3. **Time distribution** — Hourly histogram, flag late-night/weekend patterns
4. **Session detection** — Group commits by 45-minute gap threshold
5. **Per-author leaderboard** — Praise + growth opportunities for each contributor
6. **Hotspot analysis** — Flag high-change files, large files, single-author silos
7. **PR summary** — List merged PRs with descriptions
8. **Insights** — Actionable recommendations with concrete next steps

### Step 1: Data Collection

```bash
# User identity
git config user.name && git config user.email

# Commit details with stats
git log origin/<default> --since="<window>" --format="%H|%aN|%ae|%ai|%s" --shortstat

# Hotspot analysis
git log origin/<default> --since="<window>" --format="" --name-only | sort | uniq -c | sort -rn

# PR references
git log origin/<default> --since="<window>" --format="%s" | grep -oE '#[0-9]+' | sort -n | uniq
```

## Compare Mode

1. Run same analysis for current and prior windows
2. Show side-by-side with deltas
3. Classify: improving (>+10%), stable, declining (<-10%)

## Error Handling

| Issue | Action |
|-------|--------|
| No commits | Report "No activity in selected period" |
| Git fetch fails | Continue with local data |
| Single contributor | Note team context missing |
| Invalid window | Default to 7 days |

## Quick Tests

**Should trigger:** "run a retro", "how did this week go", "/retro", "weekly engineering review"

**Should not trigger:** "plan sprint", "review PR", "debug issue", "daily standup"

## Storage

`~/.shipmate/retros/<date>-retro.md` — Reports saved locally

## Important Rules

- **Identify user**: Use `git config user.name` for "you" context
- **Team-aware**: Analyze ALL contributors
- **Balanced feedback**: Praise + growth for everyone
- **Actionable**: Every insight should suggest concrete action

## References

- `references/metrics-guide.mdx` - Detailed metric calculations
- `references/retro-template.mdx` - Report template structure
- [Agile Retrospectives Wiki](https://retrospectivewiki.org/) — Retro patterns
