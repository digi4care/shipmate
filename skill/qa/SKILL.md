---
name: qa
description: Full QA workflow. Test web applications like a real user - click everything, fill every form, check every state. Find bugs, fix them with atomic commits, then re-verify. Use when "test this app" or "run QA".
license: MIT
compatibility: opencode
metadata:
  author: shipmate
  version: 2.0.0
---

# QA: Test → Fix → Verify

Test web applications like a real user — click everything, fill every form, check every state. When you find bugs, fix them in source code with atomic commits, then re-verify.

**Core principle:** Test like a user, fix like a developer.

## When to Use

**Use when:** test this, run QA, quality assurance, test the app, check everything works, /qa, regression test, manual testing

**Do not use for:** unit tests (use test-driven-development), debugging known issues (use investigate), performance testing, security audit

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| Target URL | auto-detect | URL to test |
| Tier | standard | quick/standard/exhaustive |
| Scope | full | full or specific page |
| FixMode | fix | fix or report-only |
| Browser | chromium | chromium/firefox/webkit |

## Tiers

| Tier | Coverage | Duration | Use Case |
|------|----------|----------|----------|
| Quick | Critical, High | 5-10 min | Pre-ship smoke test |
| Standard | Critical, High, Medium | 15-30 min | Regular QA cycle |
| Exhaustive | All severities | 30-60 min | Pre-release full test |

## Workflow

### 1. Setup

```bash
TARGET_URL=${TARGET_URL:-"http://localhost:3000"}
curl -s "$TARGET_URL/health" || echo "Server may not be running"
git status --porcelain
```

If dirty tree: Quick → continue with warning; Standard/Exhaustive → commit or stash first.

### 2. Framework Detection

```bash
ls playwright.config.* cypress.config.* jest.config.* 2>/dev/null
cat package.json | grep -E '"(playwright|cypress|jest|vitest)"'
```

Bootstrap Playwright if missing: `npm install -D @playwright/test && npx playwright install`

### 3. Run Existing Tests

```bash
npm test || bun test
npx playwright test --reporter=list  # if E2E available
```

Record baseline: passing, failing, coverage.

### 4. Browser Testing

```typescript
import { test, expect } from '@playwright/test';
test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.+/);
});
```

Interactive: `npx playwright test --ui`

### 5. Form & Edge Cases

See [references/qa-checklist.mdx](references/qa-checklist.mdx) for complete checklist.

### 6. Bug Fixing

```bash
BUG_ID="bug-$(date +%Y%m%d-%H%M%S)"
# Create failing test → Verify fails → Fix → Verify passes → Commit
git commit -m "fix: resolve $BUG_ID - description"
npm test  # Run full suite
```

Atomic commit: one bug = one commit, includes test + fix.

### 7. Re-verification

```bash
npm test && npx playwright test && npm test -- --coverage
```

### 8. Report

See [references/health-score.mdx](references/health-score.mdx) for template and scoring.

## Error Handling

| Issue | Action |
|-------|--------|
| Server not running | Start server or update URL |
| Framework missing | Bootstrap Playwright |
| Auth required | Use browser-auth skill |
| Flaky tests | Isolate and fix root cause |
| Regression | Revert, investigate, fix |

## Safety Rules

**Never:** Skip verification, commit without test, mark fixed without re-test, ignore flaky tests

**Always:** Create test first, verify fails, run full suite after fix, document findings

**Red flags:** "passes locally but fails in CI", "fix flaky later", "too hard to reproduce", "skip for now"

## Quick Reference

```
Setup → Framework → Tests → Browse → Forms → Edges → Fix → Verify → Report
```

## Integration

- **review** → Before QA for code quality
- **ship** → Run QA before shipping
- **investigate** → Deeper bug analysis
- **browser-auth** → Authenticated testing

## References

- [references/qa-checklist.mdx](references/qa-checklist.mdx) — Form testing checklist, edge case matrix
- [references/health-score.mdx](references/health-score.mdx) — Severity classification, health score, templates

## External Resources

- [Testing JavaScript](https://testingjavascript.com/) — Kent C. Dodds
- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
