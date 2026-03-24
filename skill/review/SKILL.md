---
name: review
description: Pre-landing PR review. Analyzes diff for structural issues tests don't catch. Two passes: CRITICAL (SQL, race conditions, trust boundaries) and INFORMATIONAL (side effects, magic numbers, dead code). Auto-fixes what it can. Use when "review this PR" or "code review".
license: MIT
compatibility: opencode
metadata:
  author: shipmate
  version: 1.0.0
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
# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

# Get base branch
BASE_BRANCH=${BASE:-main}

# Get diff stats
git diff --stat origin/$BASE_BRANCH...HEAD

# Count files changed
git diff --name-only origin/$BASE_BRANCH...HEAD | wc -l
```

**Scope assessment:**
- 1-3 files → Quick review
- 4-10 files → Standard review
- 11+ files → Comprehensive review (consider splitting)

### Phase 1.5: Scope Drift Detection

Before code quality review, verify scope alignment:

```markdown
## Scope Drift Check

- [ ] Changes align with stated intent
- [ ] No unrelated files modified
- [ ] Requirements addressed
- [ ] No scope creep detected
```

**Red flags:**
- Files changed unrelated to PR description
- Requirements not addressed
- Extra features added beyond scope
- Configuration changes without justification

### Phase 2: Full Diff Analysis

```bash
# Get complete diff
git diff origin/$BASE_BRANCH...HEAD

# Get diff with context
git diff -U10 origin/$BASE_BRANCH...HEAD

# List changed files by type
git diff --name-only origin/$BASE_BRANCH...HEAD | grep -E '\.(ts|tsx|js|jsx)$'
```

### Phase 3: Two-Pass Review

#### Pass 1: CRITICAL (Must Fix)

**SQL & Data Safety**
- SQL injection vulnerabilities
- Unparameterized queries
- Missing transaction boundaries
- Data validation gaps

```typescript
// DANGEROUS
const query = `SELECT * FROM users WHERE id = ${userId}`;

// SAFE
const query = 'SELECT * FROM users WHERE id = $1';
db.query(query, [userId]);
```

**Race Conditions & Concurrency**
- TOCTOU vulnerabilities
- Missing locks/mutexes
- Async/await issues
- Shared mutable state

```typescript
// DANGEROUS - Race condition
if (!cache.has(key)) {
  cache.set(key, await fetchData()); // Another request might set it
}

// SAFE
await mutex.runExclusive(async () => {
  if (!cache.has(key)) {
    cache.set(key, await fetchData());
  }
});
```

**LLM Output Trust Boundary**
- Unvalidated AI output
- Prompt injection risks
- Output used in sensitive contexts
- Missing content sanitization

```typescript
// DANGEROUS
const response = await llm.generate(userInput);
eval(response); // Never trust LLM output

// SAFE
const response = await llm.generate(sanitize(userInput));
const validated = validateSchema(response);
```

**Enum & Value Completeness**
- Missing switch cases
- Incomplete enum handling
- Default cases that hide bugs

```typescript
// DANGEROUS
switch (status) {
  case 'active': return 1;
  case 'inactive': return 0;
  // Missing 'pending', 'archived'
}

// SAFE
switch (status) {
  case 'active': return 1;
  case 'inactive': return 0;
  case 'pending': return 2;
  case 'archived': return 3;
  default: throw new Error(`Unknown status: ${status}`);
}
```

#### Pass 2: INFORMATIONAL (Should Consider)

**Conditional Side Effects**
- Hidden state mutations
- Unexpected async behavior
- Global state changes

```typescript
// SUSPICIOUS
function calculateTotal(items) {
  itemCount = items.length; // Side effect!
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**Magic Numbers & String Coupling**
- Hardcoded values
- String duplication
- Missing constants

```typescript
// BEFORE
if (status === 'active') { ... }
if (status === 'active') { ... } // Duplicated

// AFTER
const STATUS_ACTIVE = 'active';
if (status === STATUS_ACTIVE) { ... }
```

**Dead Code & Consistency**
- Unused imports
- Commented code
- Inconsistent patterns

```bash
# Find unused exports
npx ts-prune

# Find dead code
npx knip
```

**LLM Prompt Issues**
- Unclear instructions
- Missing examples
- Inconsistent formatting

**Test Gaps**
- Missing edge case tests
- Untested error paths
- Missing integration tests

**View/Frontend Issues**
- Accessibility problems
- Responsive design gaps
- Performance concerns

### Phase 4: Design Review (Conditional)

If diff touches frontend files:

```bash
# Check for design documentation
test -f DESIGN.md && cat DESIGN.md

# Identify frontend changes
git diff --name-only origin/$BASE_BRANCH...HEAD | grep -E '\.(tsx|jsx|vue|svelte|css|scss)$'
```

**Design checklist:**
- [ ] Follows design system
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Responsive across breakpoints
- [ ] Consistent with existing patterns
- [ ] Performance optimized

### Phase 5: Fix-First Approach

Every finding gets action:

```markdown
## Findings

### CRITICAL (Must Fix)

1. **SQL Injection** in `user.service.ts:45`
   - AUTO-FIX: Use parameterized query
   - Commit: `fix(security): use parameterized query`

### INFORMATIONAL (Should Fix)

2. **Magic Number** in `calc.ts:12`
   - AUTO-FIX: Extract to constant
   - Commit: `refactor: extract MAGIC_NUMBER constant`

3. **Missing Error Handling** in `api.ts:89`
   - ASK: How should this error be handled?
```

**Classification:**
- `AUTO-FIX` → Apply directly, commit with message
- `ASK` → Batch into single AskUserQuestion with options

## Output Format

```markdown
# Code Review Report

## Summary
- Branch: feature/new-auth
- Base: main
- Files: 5 changed
- Status: NEEDS FIXES

## CRITICAL Issues (2)
1. SQL injection in user.service.ts
2. Race condition in cache.ts

## INFORMATIONAL Issues (3)
1. Magic number in calc.ts
2. Missing error handling in api.ts
3. Dead code in utils.ts

## Auto-Fixes Applied (2)
- Parameterized SQL query
- Extracted magic constant

## Questions (1)
- How should api.ts:89 error be handled?
  [ ] Log and continue
  [ ] Throw to caller
  [ ] Return default value

## Recommendation
Fix CRITICAL issues before merge. INFORMATIONAL can be addressed in follow-up.
```

## Error Handling

| Issue | Action |
|-------|--------|
| Diff too large | Request split into smaller PRs |
| Generated code | Skip review, flag as generated |
| Binary files | Note in report, no review |
| Merge conflicts | Block review, request rebase |

## Quick Reference

```
1. Setup: Get diff, assess scope
2. Drift: Check scope alignment
3. Pass 1: CRITICAL issues (SQL, race, trust, enums)
4. Pass 2: INFORMATIONAL issues (side effects, magic numbers)
5. Design: Frontend review if applicable
6. Fix: AUTO-FIX what's safe, ASK for rest
```

## Safety Rules

**Never:**
- Approve PR with CRITICAL issues unfixed
- Skip review for "simple" changes
- Ignore test gaps
- Auto-fix without understanding impact

**Always:**
- Review CRITICAL pass first
- Check for scope drift
- Verify test coverage
- Provide actionable feedback

## Quick Tests

Should trigger:
- Review this PR
- Code review my changes
- Check this code before merge
- /review

Should not trigger:
- Write tests for this
- Debug this error
- Deploy this code
- Fix this bug

## Red Flags

**STOP and address:**
- "This is just a small change, skip review"
- "I'll fix it after merge"
- "The tests pass, it's fine"
- "This is urgent, approve now"

## Integration with Other Skills

- **ship** → Run review before shipping
- **qa** → Run review before QA testing
- **investigate** → If review reveals deeper issues

## Configuration

Override defaults in `~/.shipmate/config.json`:

```json
{
  "review": {
    "baseBranch": "main",
    "autoFix": true,
    "requireTests": true,
    "maxFileSize": 500,
    "scopeCheck": true
  }
}
```

## Verification Checklist

Before marking review complete:

- [ ] Scope drift checked
- [ ] CRITICAL pass completed
- [ ] INFORMATIONAL pass completed
- [ ] Design review (if frontend)
- [ ] Auto-fixes applied
- [ ] Questions batched
- [ ] Report generated
- [ ] Recommendation provided

---

## References

- [Code Review Best Practices](https://google.github.io/eng-practices/review/) — Google Engineering Practices
- [Clean Code](https://www.oreilly.com/library/view/clean-code-a/0789756/) — Robert C. Martin
