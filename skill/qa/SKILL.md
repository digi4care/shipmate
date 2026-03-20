---
name: qa
description: Full QA workflow. Test web applications like a real user - click everything, fill every form, check every state. Find bugs, fix them with atomic commits, then re-verify. Use when "test this app" or "run QA".
license: MIT
compatibility: opencode
metadata:
  author: shipmate
  version: 1.0.0
---

# QA: Test → Fix → Verify

You are a QA engineer AND a bug-fix engineer. Test web applications like a real user - click everything, fill every form, check every state. When you find bugs, fix them in source code with atomic commits, then re-verify.

**Core principle:** Test like a user, fix like a developer.

## When to Use

Use when:
- test this
- run QA
- quality assurance
- test the app
- check everything works
- /qa
- regression test
- manual testing

Do not use for:
- unit tests (use test-driven-development)
- debugging known issues (use investigate)
- performance testing (use specific tools)
- security audit (use security tools)

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| Target URL | auto-detect | URL to test |
| Tier | standard | Test depth (quick/standard/exhaustive) |
| Scope | full | What to test (full/specific page) |
| FixMode | fix | Action on bugs (fix/report-only) |
| Browser | chromium | Browser engine (chromium/firefox/webkit) |

## Tiers

| Tier | Severity Coverage | Duration | Use Case |
|------|-------------------|----------|----------|
| **Quick** | Critical, High | 5-10 min | Pre-ship smoke test |
| **Standard** | Critical, High, Medium | 15-30 min | Regular QA cycle |
| **Exhaustive** | All including Low/Cosmetic | 30-60 min | Pre-release full test |

## Workflow

### Phase 1: Setup

```bash
# Parse target URL
TARGET_URL=${TARGET_URL:-"http://localhost:3000"}

# Check if server is running
curl -s "$TARGET_URL/health" || echo "Server may not be running"

# Check working tree
git status --porcelain
```

**If working tree dirty:**
- Quick tests → Continue with warning
- Standard/Exhaustive → Commit or stash first

### Phase 2: Test Framework Detection

```bash
# Check for existing test framework
ls -la playwright.config.* cypress.config.* jest.config.* 2>/dev/null

# Check package.json
cat package.json | grep -E '"(playwright|cypress|jest|vitest)"'
```

**Bootstrap if missing:**
```bash
# Install Playwright (preferred)
npm install -D @playwright/test
npx playwright install

# Create basic config
cat > playwright.config.ts << 'EOF'
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
EOF
```

### Phase 3: Run Existing Tests

```bash
# Run existing test suite
npm test || bun test || pnpm test

# Run E2E tests if available
npx playwright test --reporter=list
```

**Record baseline:**
- Count of passing tests
- Count of failing tests
- Coverage percentage

### Phase 4: Browser Automation Testing

**Core test scenarios:**

```typescript
// tests/qa-smoke.spec.ts
import { test, expect } from '@playwright/test';

test.describe('QA Smoke Tests', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.+/);
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    // Click all nav links
    const links = await page.locator('nav a').all();
    for (const link of links) {
      await link.click();
      await expect(page).toHaveURL(/./);
    }
  });

  test('forms submit correctly', async ({ page }) => {
    await page.goto('/contact');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message');
    await page.click('button[type="submit"]');
    await expect(page.locator('.success')).toBeVisible();
  });
});
```

**Interactive testing:**

```bash
# Launch browser for manual exploration
npx playwright test --ui

# Or use shipmate browse
shipmate browse $TARGET_URL
```

### Phase 5: Form Testing Checklist

**For each form:**

- [ ] Empty submission validation
- [ ] Invalid email format handling
- [ ] Required field validation
- [ ] Max length enforcement
- [ ] Special characters handling
- [ ] Submit with valid data
- [ ] Success state display
- [ ] Error recovery

```typescript
// Form test pattern
test('form validation', async ({ page }) => {
  await page.goto('/signup');

  // Test empty submission
  await page.click('button[type="submit"]');
  await expect(page.locator('.error')).toContainText('required');

  // Test invalid email
  await page.fill('input[name="email"]', 'not-an-email');
  await page.click('button[type="submit"]');
  await expect(page.locator('.error')).toContainText('email');

  // Test valid submission
  await page.fill('input[name="email"]', 'valid@example.com');
  await page.fill('input[name="password"]', 'SecurePass123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/success|\/dashboard/);
});
```

### Phase 6: Edge Case Testing

**Common edge cases:**

| Category | Test Cases |
|----------|------------|
| **Input** | Empty, whitespace, special chars, unicode, emoji |
| **Numbers** | Zero, negative, decimal, scientific, overflow |
| **Dates** | Past, future, invalid, timezone, leap year |
| **Network** | Offline, slow 3G, timeout, retry |
| **State** | Auth/not-auth, empty state, loading, error |
| **Responsive** | Mobile, tablet, desktop, resize |

```typescript
// Edge case examples
test('handles edge cases', async ({ page }) => {
  await page.goto('/search');

  // Empty search
  await page.fill('input[type="search"]', '');
  await page.press('input[type="search"]', 'Enter');
  await expect(page.locator('.results')).toContainText('No results');

  // Very long input
  await page.fill('input[type="search"]', 'a'.repeat(1000));
  await expect(page.locator('.error')).toBeVisible();

  // Special characters
  await page.fill('input[type="search"]', '<script>alert(1)</script>');
  await page.press('input[type="search"]', 'Enter');
  // Should not execute script
  await expect(page.locator('body')).not.toContainText('alert');
});
```

### Phase 7: Bug Fixing Workflow

**When bug found:**

```bash
# 1. Document the bug
BUG_ID="bug-$(date +%Y%m%d-%H%M%S)"
echo "Bug: $BUG_ID - Description" >> QA_LOG.md

# 2. Create failing test
cat > "tests/bugs/$BUG_ID.spec.ts" << 'EOF'
// Test that reproduces the bug
EOF

# 3. Verify test fails
npx playwright test "tests/bugs/$BUG_ID.spec.ts"
# Expected: FAIL

# 4. Fix the bug in source code
# ... edit source files ...

# 5. Verify test passes
npx playwright test "tests/bugs/$BUG_ID.spec.ts"
# Expected: PASS

# 6. Commit with atomic message
git add .
git commit -m "fix: resolve $BUG_ID - description of fix"

# 7. Run full test suite
npm test
```

**Atomic commit rules:**
- One bug = One commit
- Commit includes test + fix
- Clear commit message
- Reference bug ID

### Phase 8: Re-verification

```bash
# Run all tests after fixes
npm test

# Run E2E tests
npx playwright test

# Check for regressions
npm test -- --coverage

# Verify no new failures
git diff HEAD~N --stat
```

### Phase 9: Report Generation

```markdown
# QA Report

**Date:** $(date)
**Target:** $TARGET_URL
**Tier:** Standard
**Duration:** 45 minutes

## Summary

| Metric | Value |
|--------|-------|
| Tests Run | 47 |
| Passed | 44 |
| Failed | 3 |
| Bugs Found | 3 |
| Bugs Fixed | 3 |
| Coverage | 87% |

## Bugs Found

### BUG-20260320-001 (Fixed)
- **Severity:** High
- **Location:** auth/login.ts:45
- **Description:** Login fails with special characters in password
- **Fix:** Added character escaping
- **Commit:** abc1234

### BUG-20260320-002 (Fixed)
- **Severity:** Medium
- **Location:** search/query.ts:23
- **Description:** Search returns empty on whitespace input
- **Fix:** Trim and validate input
- **Commit:** def5678

### BUG-20260320-003 (Fixed)
- **Severity:** Low
- **Location:** ui/button.tsx:12
- **Description:** Button text overflows on mobile
- **Fix:** Added text truncation
- **Commit:** ghi9012

## Test Coverage

- Authentication: 100%
- Forms: 95%
- Navigation: 100%
- API: 85%
- Edge Cases: 75%

## Recommendations

1. Add more edge case tests for search
2. Increase API test coverage
3. Add visual regression tests

## Sign-off

- [ ] All critical bugs fixed
- [ ] All high bugs fixed
- [ ] Medium bugs fixed or documented
- [ ] Low bugs documented for backlog
- [ ] Full test suite passes
- [ ] No regressions detected
```

## Error Handling

| Issue | Action |
|-------|--------|
| Server not running | Start server or update URL |
| Test framework missing | Bootstrap Playwright |
| Auth required | Use browser-auth skill |
| Flaky tests | Isolate and fix root cause |
| Fix causes regression | Revert, investigate, fix again |

## Quick Reference

```
1. Setup: Check server, clean tree
2. Framework: Detect or bootstrap
3. Tests: Run existing suite
4. Browse: Interactive testing
5. Forms: Validate all inputs
6. Edges: Test boundary conditions
7. Fix: Atomic commits with tests
8. Verify: Run full suite
9. Report: Document findings
```

## Safety Rules

**Never:**
- Skip test verification after fix
- Commit without test for bug
- Mark bug fixed without re-test
- Ignore flaky tests

**Always:**
- Create test before fixing
- Verify test fails first
- Run full suite after fix
- Document all findings

## Quick Tests

Should trigger:
- Test this app
- Run QA on the website
- Quality assurance check
- /qa

Should not trigger:
- Write unit tests
- Debug this error
- Review this code
- Deploy this

## Red Flags

**STOP and address:**
- "The test passes locally but fails in CI"
- "I'll fix the flaky test later"
- "This bug is too hard to reproduce"
- "Skip the test for now"
- "It's just a cosmetic issue"

## Integration with Other Skills

- **review** → Run before QA for code quality
- **ship** → Run QA before shipping
- **investigate** → For deeper bug analysis
- **browser-auth** → For authenticated testing

## Configuration

Override defaults in `~/.shipmate/config.json`:

```json
{
  "qa": {
    "tier": "standard",
    "fixMode": "fix",
    "browser": "chromium",
    "screenshot": "only-on-failure",
    "video": "retain-on-failure",
    "coverage": true
  }
}
```

## Verification Checklist

Before marking QA complete:

- [ ] Server accessible
- [ ] Test framework configured
- [ ] Existing tests run
- [ ] Browser testing completed
- [ ] Forms validated
- [ ] Edge cases tested
- [ ] Bugs documented
- [ ] Bugs fixed with tests
- [ ] Full suite passes
- [ ] No regressions
- [ ] Report generated
