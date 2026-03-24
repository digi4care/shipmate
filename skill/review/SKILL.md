---
name: review
description: Pre-landing PR review. Analyzes diff for structural issues tests don't catch. Two passes: CRITICAL (SQL, race conditions, trust boundaries) and INFORMATIONAL (side effects, magic numbers, dead code). Auto-fixes what it can. Use when "review this PR" or "code review".
license: MIT
compatibility: opencode
metadata:
  author: shipmate
  version: 2.0.0
---

# Pre-Landing Review

Analyzes the current branch's diff against the base branch for structural issues that tests don't catch.

**Core principle:** Review before merge, catch issues early.

## When to Use

Use when:

- review this
- code review
- review PR
- pre-landing review
- check this code
- review my changes
- /review

Do not use for:

- debugging (use investigate skill)
- testing (use qa skill)
- writing new code (use appropriate dev skill)
- refactoring without review purpose

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| Base | main | Base branch to compare against |
| AutoFix | true | Automatically fix safe issues |
| Scope | full | Review scope (full/quick/security) |
| Format | markdown | Output format (markdown/json) |

## Workflow

### Phase 1: Setup and Scope

```bash
CURRENT_BRANCH=$(git branch --show-current)
BASE_BRANCH=${BASE:-main}
git diff --stat origin/$BASE_BRANCH...HEAD
git diff --name-only origin/$BASE_BRANCH...HEAD | wc -l
```

**Scope assessment:**

- 1-3 files → Quick review
- 4-10 files → Standard review
- 11+ files → Comprehensive review (consider splitting)

### Phase 2: Scope Drift Detection

Check alignment before code quality review. See `references/review-checklist.mdx` for full checklist.

**Red flags:**

- Files changed unrelated to PR description
- Requirements not addressed
- Extra features added beyond scope

### Phase 3: Two-Pass Review

#### Pass 1: CRITICAL (Must Fix)

Review for blocking issues:

- **SQL & Data Safety** — Injection, unparameterized queries, missing transactions
- **Race Conditions** — TOCTOU, missing locks, async issues, shared mutable state
- **LLM Trust Boundary** — Unvalidated AI output, prompt injection, missing sanitization
- **Enum Completeness** — Missing switch cases, incomplete handling, silent defaults

See `references/review-checklist.mdx` for code examples.

#### Pass 2: INFORMATIONAL (Should Consider)

Review for quality improvements:

- **Conditional Side Effects** — Hidden mutations, unexpected async
- **Magic Numbers** — Hardcoded values, string duplication
- **Dead Code** — Unused imports, commented code
- **Test Gaps** — Missing edge cases, untested error paths
- **Frontend Issues** — Accessibility, responsive design

### Phase 4: Design Review (Conditional)

If diff touches frontend files (`.tsx`, `.jsx`, `.vue`, `.svelte`, `.css`):

```bash
test -f DESIGN.md && cat DESIGN.md
git diff --name-only origin/$BASE_BRANCH...HEAD | grep -E '\.(tsx|jsx|vue|svelte|css|scss)$'
```

Check against DESIGN.md and accessibility standards.

### Phase 5: Fix-First Approach

Every finding gets action:

| Classification | Action |
|----------------|--------|
| AUTO-FIX | Apply directly, commit with message |
| ASK | Batch into single question with options |
| MANUAL | Flag for human implementation |

Use `references/review-template.mdx` for report format.

## Error Handling

| Issue | Action |
|-------|--------|
| Diff too large | Request split into smaller PRs |
| Generated code | Skip review, flag as generated |
| Binary files | Note in report, no review |
| Merge conflicts | Block review, request rebase |

## Quick Tests

Should trigger: "review this PR", "code review my changes", "check this code before merge", "/review"

Should not trigger: "write tests", "debug this error", "deploy this code", "fix this bug"

Functional: Review a feature branch for merge readiness, identify security issues in database queries

## Red Flags

STOP and address: "skip review", "fix after merge", "tests pass it's fine", "urgent approve now"

## References

- `references/review-checklist.mdx` — Complete CRITICAL and INFORMATIONAL checklists
- `references/review-template.mdx` — Review report template with examples
- [Code Review Best Practices](https://google.github.io/eng-practices/review/) — Google Engineering Practices
- [Clean Code](https://www.oreilly.com/library/view/clean-code-a/0789756/) — Robert C. Martin
