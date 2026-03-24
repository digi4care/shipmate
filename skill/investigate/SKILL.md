---
name: investigate
description: |
  Systematic debugging workflow. Investigate first, fix second. Never fix without
  understanding root cause. 5 phases: Root Cause Investigation, Pattern Analysis,
  Hypothesis Testing, Implementation, Verification. Use when debugging errors,
  investigating failures, or asked to "fix X" or "why is this broken?"
triggers:
  - /investigate
  - /debug
  - fix this
  - why is this broken
  - something is wrong
  - debugging
  - error in
workflow:
  - Phase 1: Collect symptoms, read code, check recent changes, reproduce
  - Phase 2: Pattern analysis (race conditions, nil propagation, state corruption)
  - Phase 3: Hypothesis testing (verify before fixing)
  - Phase 4: Minimal fix with regression test
  - Phase 5: Fresh verification and debug report
---

# Systematic Debugging

## Iron Law

**NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.**

Fixing symptoms creates whack-a-mole debugging. Every fix that doesn't address root cause makes the next bug harder to find. Find the root cause, then fix it.

---

## Phase 1: Root Cause Investigation

Gather context before forming any hypothesis.

1. **Collect symptoms:** Read error messages, stack traces, reproduction steps. Ask ONE question at a time if context is missing.

2. **Read the code:** Trace from symptom back to potential causes. Use Grep to find references, Read to understand logic.

3. **Check recent changes:**
   ```bash
   git log --oneline -20 -- <affected-files>
   ```
   Was this working before? What changed? A regression means the root cause is in the diff.

4. **Reproduce:** Can you trigger the bug deterministically? If not, gather more evidence.

**Output:** "Root cause hypothesis: ..." — a specific, testable claim.

---

## Scope Lock

After forming your hypothesis, lock edits to the affected module.

```bash
STATE_DIR="$HOME/.shipmate"
mkdir -p "$STATE_DIR"
echo "<detected-directory>/" > "$STATE_DIR/freeze-dir.txt"
echo "Debug scope locked to: <detected-directory>/"
```

Tell the user: "Edits restricted to `<dir>/` for this session. Run `/unfreeze` to remove."

Skip lock if bug spans entire repo or scope is genuinely unclear.

---

## Phase 2: Pattern Analysis

Check if bug matches known patterns. See `references/root-cause-patterns.mdx` for full analysis.

| Pattern | Signature | Where to look |
|---------|-----------|---------------|
| Race condition | Intermittent, timing-dependent | Concurrent access to shared state |
| Nil/null propagation | NoMethodError, TypeError | Missing guards on optional values |
| State corruption | Inconsistent data | Transactions, callbacks, hooks |
| Integration failure | Timeout, unexpected response | External API calls, service boundaries |
| Configuration drift | Works locally, fails elsewhere | Env vars, feature flags, DB state |
| Stale cache | Shows old data, fixes on clear | Redis, CDN, browser cache |

Also check:
- `TODO.md` for related known issues
- `git log` for prior fixes — **recurring bugs are architectural smells**

---

## Phase 3: Hypothesis Testing

Before writing ANY fix, verify your hypothesis.

1. **Confirm hypothesis:** Add temporary logging at suspected root cause. Run reproduction. Does evidence match?

2. **If wrong:** Return to Phase 1. Gather more evidence. Do not guess.

3. **3-strike rule:** If 3 hypotheses fail, STOP:
   ```
   3 hypotheses tested, none match. This may be architectural.
   
   A) Continue — I have a new hypothesis: [describe]
   B) Escalate — needs someone who knows the system
   C) Add logging and wait — instrument and catch next time
   ```

**Red flags:**
- "Quick fix for now" — fix it right or escalate
- Proposing fix before tracing data flow — you're guessing
- Each fix reveals new problem elsewhere — wrong layer

---

## Phase 4: Implementation

Once root cause is confirmed:

1. **Fix the root cause, not the symptom.** Smallest change that eliminates the problem.

2. **Minimal diff:** Fewest files touched, fewest lines changed. No refactoring adjacent code.

3. **Write regression test** that fails without fix, passes with it.

4. **Run full test suite.** Paste output. No regressions allowed.

5. **If fix touches >5 files:**
   ```
   This fix touches N files. Large blast radius for a bug fix.
   A) Proceed — root cause genuinely spans these files
   B) Split — fix critical path now, defer rest
   C) Rethink — maybe there's a more targeted approach
   ```

---

## Phase 5: Verification & Report

**Fresh verification:** Reproduce original bug scenario and confirm fixed. Not optional.

Run test suite and paste output.

Output structured debug report (see `references/debug-template.mdx`):

```
DEBUG REPORT
════════════════════════════════════════
Symptom:         [what user observed]
Root cause:      [what was actually wrong]
Fix:             [what was changed, with file:line]
Evidence:        [test output, reproduction showing fix works]
Regression test: [file:line of new test]
Related:         [TODO items, prior bugs, architectural notes]
Status:          DONE | DONE_WITH_CONCERNS | BLOCKED
════════════════════════════════════════
```

---

## Important Rules

- **3+ failed fix attempts → STOP and question architecture**
- **Never apply a fix you cannot verify**
- **Never say "this should fix it"** — verify and prove it
- **Fix touches >5 files → Ask about blast radius**

**Completion status:**
- `DONE` — root cause found, fix applied, test written, all tests pass
- `DONE_WITH_CONCERNS` — fixed but cannot fully verify
- `BLOCKED` — root cause unclear, escalated

---

## Error Handling

| Issue | Action |
|-------|--------|
| Cannot reproduce | Add logging, gather more evidence |
| 3 hypotheses failed | STOP, question architecture |
| Fix causes regression | Revert, investigate, try again |
| Root cause in external dep | Check changelog, consider upgrade |

---

## When to Use

Use when: `/investigate`, `/debug`, "fix this", "why is this broken", "something is wrong", "debugging", "error in"

Do NOT use for: Feature development, code review, testing, performance optimization

---

## Quick Tests

Should trigger: "Fix this bug", "Why is this not working", `/investigate`, "Debug this error"

Should NOT trigger: "Write a new feature", "Review this PR", "Run tests", "Optimize performance"

---

## References

- `references/root-cause-patterns.mdx` — Common root cause patterns with investigation steps
- `references/debug-template.mdx` — Debug report template with examples
- [Debug It!](https://pragprog.com/titles/pbdp/debug-it/) — Pragmatic debugging strategies
- [The Art of Debugging](https://nostarch.com/debugging.htm) — No Starch Press guide
