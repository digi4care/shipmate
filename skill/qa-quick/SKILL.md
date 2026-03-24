---
name: qa-quick
description: |
  Quick QA check without full verification. Runs tests and lint checks
  on changed files only. Fast verification before shipping.
triggers:
  - /qa-quick
  - /qa-only
  - quick test
  - just check it works
  - fast verify
  - sanity check
  - smoke test
workflow:
  - Detect test framework
  - Run tests on changed files only
  - Report pass/fail with summary
---

# Quick QA Check

Runs tests and lint checks on changed files only. Fast verification before shipping.

## When to Use

Use when:
- `/qa-quick` or `/qa-only`
- "quick test", "sanity check", "smoke test"
- "just check it works", "fast verify"
- Pre-commit verification needed

Do NOT use for:
- Full QA workflow → use `qa` skill
- Browser testing → use `browse` skill
- Code review → use `review` skill
- Debugging → use `investigate` skill

## Workflow

### 1. Detect Environment

```bash
# Detect runtime and test framework
[ -f Gemfile ] && echo "RUNTIME:ruby"
[ -f package.json ] && echo "RUNTIME:node"
[ -f pyproject.toml ] && echo "RUNTIME:python"

# Check test infrastructure
ls jest.config.* vitest.config.* .rspec pytest.ini 2>/dev/null
ls -d test/ tests/ spec/ __tests__/ 2>/dev/null
```

### 2. Find Changed Files

```bash
git diff origin/main --name-only
```

### 3. Run Tests

| Runtime | Command |
|---------|---------|
| Node/Jest | `npm test -- path/to/test.test.ts` |
| Node/Vitest | `npx vitest run path/to/test.ts` |
| Ruby/RSpect | `bundle exec rspec spec/path/to/test_spec.rb` |
| Python/pytest | `pytest tests/test_file.py` |

### 4. Run Lint (if available)

```bash
[ -f .eslintrc.* ] && npm run lint
[ -f .rubocop.yml ] && bundle exec rubocop
```

### 5. Report Results

```
+====================================================================+
|                    QA QUICK CHECK — RESULTS                         |
+====================================================================+
| Tests     | N passed, M failed, K skipped                          |
| Lint      | CLEAN / N issues / SKIPPED                              |
+====================================================================+
| VERDICT: PASS / FAIL (see details below)                           |
+====================================================================+
```

## Error Handling

| Issue | Action |
|-------|--------|
| No test framework found | Report: "No test framework detected" |
| Tests fail | Report failures, suggest full QA |
| Lint errors | Report issues, do not auto-fix |
| No changed files | Report: "No changes to test" |

See `references/error-handling.mdx` for detailed troubleshooting.

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | All tests passed, lint clean |
| 1 | Test failures or lint errors |

## Quick Tests

Should trigger:
- Quick test this change
- Just check it works
- /qa-quick
- Sanity check before commit

Should not trigger:
- Full QA suite → use `qa` skill
- Browser testing → use `browse` skill
- Debug this error → use `investigate` skill

See `references/test-patterns.mdx` for complete trigger validation.

---

## References

| File | Description |
|------|-------------|
| [workflow-playbook.mdx](references/workflow-playbook.mdx) | Detailed commands for each runtime/framework |
| [error-handling.mdx](references/error-handling.mdx) | Troubleshooting and graceful degradation |
| [test-patterns.mdx](references/test-patterns.mdx) | Trigger validation and functional tests |

### External Resources

- [Testing Best Practices](https://testingjavascript.com/) — Kent C. Dodds
- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) — Martin Fowler
