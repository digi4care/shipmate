# TODOS

> **Note**: For active BEADS issue tracking, see [TODOS-beads.md](TODOS-beads.md)

## Roadmap Categories

### Browse / Browser Automation

#### Sessions (isolated browser instances)

**What:** Isolated browser instances with separate cookies/storage/history, addressable by name.

**Why:** Enables parallel testing of different user roles, A/B test verification, and clean auth state management.

**Context:** Requires Playwright browser context isolation. Each session gets its own context with independent cookies/localStorage. Prerequisite for video recording (clean context lifecycle) and auth vault.

**Effort:** L
**Priority:** P3

#### Video recording

**What:** Record browser interactions as video (start/stop controls).

**Why:** Video evidence in QA reports and PR bodies.

**Context:** Needs sessions for clean context lifecycle. Playwright supports video recording per context. Also needs WebM → GIF conversion for PR embedding.

**Effort:** M
**Priority:** P3
**Depends on:** Sessions

#### State persistence

**What:** Save/load cookies + localStorage to JSON files for reproducible test sessions.

**Why:** Enables "resume where I left off" for QA sessions and repeatable auth states.

**Effort:** S
**Priority:** P3
**Depends on:** Sessions

---

### Ship

#### Ship log — persistent record of /ship runs

**What:** Append structured JSON entry to `.shipmate/ship-log.json` at end of every /ship run (version, date, branch, PR URL, review findings, todos completed, test results).

**Why:** /retro has no structured data about shipping velocity. Ship log enables: PRs-per-week trending, review finding rates, signal over time, test suite growth.

**Effort:** S
**Priority:** P2
**Depends on:** None

#### Visual verification with screenshots in PR body

**What:** /ship Step: screenshot key pages after push, embed in PR body.

**Why:** Visual evidence in PRs. Reviewers see what changed without deploying locally.

**Effort:** M
**Priority:** P2

---

### Review

#### Inline PR annotations

**What:** /ship and /review post inline review comments at specific file:line locations using `gh api` to create pull request review comments.

**Why:** Line-level annotations are more actionable than top-level comments.

**Effort:** S
**Priority:** P2
**Depends on:** None

#### Visual review with annotated screenshots

**What:** /review Step: browse PR's preview deploy, annotated screenshots of changed pages, compare against production, check responsive layouts, verify accessibility tree.

**Why:** Visual diff catches layout regressions that code review misses.

**Effort:** M
**Priority:** P2

---

### QA

#### QA trend tracking

**What:** Compare baseline.json over time, detect regressions across QA runs.

**Why:** Spot quality trends — is the app getting better or worse?

**Effort:** S
**Priority:** P2

#### CI/CD QA integration

**What:** `/qa` as GitHub Action step, fail PR if health score drops.

**Why:** Automated quality gate in CI. Catch regressions before merge.

**Effort:** M
**Priority:** P2

#### Smart default QA tier

**What:** After a few runs, check index.md for user's usual tier pick, skip the AskUserQuestion.

**Why:** Reduces friction for repeat users.

**Effort:** S
**Priority:** P2

---

### Retro

#### Deployment health tracking (retro + browse)

**What:** Screenshot production state, check perf metrics (page load times), count console errors across key pages, track trends over retro window.

**Why:** Retro should include production health alongside code metrics.

**Effort:** L
**Priority:** P3
**Depends on:** Browse sessions

---

### Infrastructure

#### Ship log persistence

**What:** JSON append pattern for /ship runs, stored in `.shipmate/ship-log.json`.

**Why:** Enables /retro to access structured shipping velocity data.

**Effort:** S
**Priority:** P2
**Depends on:** None

#### Eval framework

**What:** LLM-judge quality evals and E2E tests via OpenCode CLI.

**Why:** Quality assurance for skill outputs before shipping.

**Effort:** M
**Priority:** P2

---

## Completed

### Phase 1: Foundations
- Rename to shipmate
- Restructure to OpenCode plugin layout
- Setup script for skill symlinks
- Snapshot command with ref-based element selection
**Completed:** Initial commit

### OpenCode SDK Migration (2026-03-24)
- TypeScript configuration (tsconfig.json)
- Plugin entry point (src/index.ts)
- Hook implementations (careful, freeze, guard, unfreeze)
- Schema configuration (schema.json)
- postinstall.mjs with sources format
**Tracked in:** TODOS-beads.md
