---
name: retro
description: |
  Weekly engineering retrospective. Analyzes commit history, work patterns, and code quality metrics. Team-aware with per-person praise and growth opportunities. Use when user asks for "retro", "weekly review", or reflects on recent work.
triggers:
  - /retro
  - retro
  - weekly retro
  - retrospective
  - how did this week go
  - how did last week go
  - weekly review
  - how did this year compare
workflow:
  - Gather raw data: git log, commits, metrics
  - Compute metrics table
  - Commit time distribution histogram
  - Work session detection
  - Per-author leaderboard
  - Hotspot analysis
  - PR summary
  - Insights and recommendations
---

# Engineering Retrospective

Generates a comprehensive engineering retrospective analyzing commit history, work patterns, and code quality metrics. Team-aware: identifies the user running the command, then analyzes every contributor with per-person praise and growth opportunities.

## Arguments

| Command | Description |
|---------|-------------|
| `/retro` | Default: last 7 days |
| `/retro 24h` | Last 24 hours |
| `/retro 14d` | Last 14 days |
| `/retro 30d` | Last 30 days |
| `/retro compare` | Compare current window vs prior same-length window |
| `/retro compare 14d` | Compare with explicit window |

## Workflow

### Step 1: Gather Raw Data

```bash
# Fetch latest and get user identity
git fetch origin <default> --quiet
git config user.name
git config user.email

# Commit details with stats
git log origin/<default> --since="<window>" --format="%H|%aN|%ae|%ai|%s" --shortstat

# File changes per commit
git log origin/<default> --since="<window>" --format="COMMIT:%H|%aN" --numstat

# Timestamps for session detection
git log origin/<default> --since="<window>" --format="%at|%aN|%ai|%s" | sort -n

# Hotspot analysis (most changed files)
git log origin/<default> --since="<window>" --format="" --name-only | sort | uniq -c | sort -rn

# Author-to-file mapping
git log origin/<default> --since="<window>" --format="AUTHOR:%aN" --name-only

# PR references
git log origin/<default> --since="<window>" --format="%s" | grep -oE '#[0-9]+' | sort -n | uniq

# Quick summary
git shortlog origin/<default> --since="<window>" -sn --no-merges

# Check for TODOS (optional)
cat TODOS.md 2>/dev/null || true
```

### Step 2: Compute Metrics

Present metrics summary table:

```
| Metric            | Value |
|-------------------|-------|
| Commits to main   | N     |
| Contributors      | N     |
| PRs merged        | N     |
| Total insertions  | N     |
| Total deletions   | N     |
| Net LOC added     | N     |
| Test LOC ratio    | N%    |
| Active days       | N     |
| Detected sessions | N     |
```

### Step 3: Commit Time Distribution

Show hourly histogram with bar chart using ASCII.

### Step 4: Work Session Detection

Detect sessions using 45-minute gap threshold between consecutive commits. Group commits into focused work sessions.

### Step 5: Per-Author Leaderboard

```
Contributor         Commits   +/-          Top area
────────────────────────────────────────────────────
You (name)              N      +N/-M       dir/
teammate1               N      +N/-M       dir/
```

For each contributor, provide:
- **Praise**: What went well (e.g., high-quality commits, good test coverage)
- **Growth opportunities**: Constructive suggestions for improvement

### Step 6: Hotspot Analysis

Show most frequently changed files. Flag files that may need attention:
- Very high change count → potential instability
- Large files → consider splitting

### Step 7: PR Summary

List PRs merged in the window with brief descriptions.

### Step 8: Insights & Recommendations

Provide actionable insights:
- Work pattern observations (e.g., late-night commits, weekend work)
- Team dynamics (e.g., collaboration hotspots, silos)
- Process improvements
- Celebrate wins

## Compare Mode

When `/retro compare` is used:

1. Run the same analysis for current window and prior window
2. Show side-by-side comparison:

```
| Metric            | Current | Prior | Delta |
|-------------------|---------|-------|-------|
| Commits           | 45      | 38    | +18%  |
| Contributors      | 4       | 3     | +1    |
| PRs merged        | 12      | 10    | +2    |
```

3. Highlight trends (improving, declining, stable)
4. Identify what changed between periods

## Storage

Retrospective data and reports are stored in:

```
~/.shipmate/retros/
├── <date>-retro.md      # Individual reports
└── compare/             # Comparison reports
```

## Important Rules

- **Always identify the user**: Use `git config user.name` to know who "you" is
- **Team-aware**: Analyze ALL contributors, not just the user
- **Balanced feedback**: Praise + growth for everyone
- **Privacy**: Don't expose sensitive information in reports
- **Actionable**: Every insight should suggest a concrete action
