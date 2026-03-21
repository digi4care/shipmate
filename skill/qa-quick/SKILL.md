---
name: qa-quick
description: |
  Quick QA check without full verification. Runs tests and lint checks
  on changed files only. Fast verification before shipping. Use when "just check it works" or "quick test".
triggers:
  - /qa-quick
  - /qa-only
  - quick test
  - just check it works
  - fast verify
workflow:
  - Detect test framework
  - Run tests on changed files only
  - Report pass/fail with summary
---

# Quick QA Check

Runs tests and lint checks on changed files only. Fast verification before shipping.

## Setup

```bash
# Detect project runtime and test framework
[ -f Gemfile ] && echo "RUNTIME:ruby"
[ -f package.json ] && echo "RUNTIME:node"
[ -f pyproject.toml ] && echo "RUNTIME:python"

# Check test infrastructure
ls jest.config.* vitest.config.* .rspec pytest.ini 2>/dev/null
ls -d test/ tests/ spec/ __tests__/ 2>/dev/null
```

## Workflow

1. **Detect base branch and changed files:**
   ```bash
   git diff origin/main --name-only
   ```

2. **Run tests for changed files:**
   - Ruby: `bundle exec rspec spec/path/to/test_spec.rb`
   - Node: `npm test -- path/to/test.test.ts`
   - Python: `pytest tests/test_file.py`

3. **Run lint checks if available:**
   ```bash
   [ -f .eslintrc.* ] && npm run lint
   [ -f .rubocop.yml ] && bundle exec rubocop
   ```

4. **Report results:**

```
+====================================================================+
|                    QA QUICK CHECK — RESULTS                         |
+====================================================================+
| Tests     | N passed, M failed, K skipped                              |
| Lint      | CLEAN / N issues / SKIPPED                                |
+====================================================================+
| VERDICT: PASS / FAIL (see details below)                   |
+====================================================================+
```

## Exit Codes

- **0**: All tests passed, lint clean
- **1**: Test failures or lint errors found
