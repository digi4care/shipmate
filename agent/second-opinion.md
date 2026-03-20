---
name: second-opinion
description: |
  Multi-AI second opinion using OpenAI Codex CLI. Three modes: review (code
  review with pass/fail gate), challenge (adversarial — try to break code),
  consult (ask anything). Provides independent perspective from different
  AI system. Use when asked to "get a second opinion", "run codex", or
  "cross-check with another AI".
mode: subagent
type: primary
category: plan-review
---

# Second Opinion (Codex)

## Philosophy

This wraps the OpenAI Codex CLI to get an independent, brutally honest second opinion from a different AI system.

Codex is the "200 IQ autistic developer" — direct, terse, technically precise, challenges assumptions, catches things you might miss.

**Critical:** Present Codex output faithfully, not summarized.

---

## Step 0: Check Codex Binary

```bash
CODEX_BIN=$(which codex 2>/dev/null || echo "")
[ -z "$CODEX_BIN" ] && echo "NOT_FOUND" || echo "FOUND: $CODEX_BIN"
```

If `NOT_FOUND`: Stop and tell user:
"Codex CLI not found. Install it: `npm install -g @openai/codex` or see https://github.com/openai/codex"

---

## Step 1: Detect Mode

Parse user input to determine mode:

1. **`/second-opinion review`** or **`/second-opinion review <instructions>`** → Review mode (Step 2A)
2. **`/second-opinion challenge`** or **`/second-opinion challenge <focus>`** → Challenge mode (Step 2B)
3. **`/second-opinion`** with no arguments → Auto-detect:
   - Check for diff: `git diff origin/<base> --stat 2>/dev/null | tail -1 || git diff <base> --stat 2>/dev/null | tail -1`
   - If diff exists, ask user:
     ```
     Codex detected changes. What should it do?
     A) Review the diff (code review with pass/fail gate)
     B) Challenge the diff (adversarial — try to break it)
     C) Something else — I'll provide a prompt
     ```
   - If no diff, check for plan files
   - If plan file exists, offer to review it
   - Otherwise ask: "What would you like to ask Codex?"
4. **`/second-opinion <anything else>`** → Consult mode (Step 2C)

---

## Step 2A: Review Mode

Run Codex code review against current branch diff.

1. Create temp file:
```bash
TMPERR=$(mktemp /tmp/codex-err-XXXXXX.txt)
```

2. Run review (5-minute timeout):
```bash
codex review --base <base> -c 'model_reasoning_effort="high"' --enable web_search_cached 2>"$TMPERR"
```

With custom instructions:
```bash
codex review "focus on security" --base <base> -c 'model_reasoning_effort="high"' --enable web_search_cached 2>"$TMPERR"
```

3. Parse cost from stderr:
```bash
grep "tokens used" "$TMPERR" 2>/dev/null || echo "tokens: unknown"
```

4. Determine gate verdict:
   - If output contains `[P1]` → **FAIL**
   - If no `[P1]` markers (only `[P2]` or none) → **PASS**

5. Present output:
```
CODEX SAYS (code review):
════════════════════════════════════════════════════════════
<full codex output, verbatim — do not truncate or summarize>
════════════════════════════════════════════════════════════
GATE: PASS                    Tokens: 14,331 | Est. cost: ~$0.12
```

or

```
GATE: FAIL (N critical findings)
```

6. **Cross-model comparison:** If `/review` was already run, compare:
```
CROSS-MODEL ANALYSIS:
  Both found: [findings that overlap]
  Only Codex found: [findings unique to Codex]
  Only Claude found: [findings unique to Claude]
  Agreement rate: X% (N/M total unique findings overlap)
```

7. Clean up:
```bash
rm -f "$TMPERR"
```

---

## Step 2B: Challenge (Adversarial) Mode

Codex tries to break code — finding edge cases, race conditions, security holes, failure modes.

1. Construct adversarial prompt:

**Default (no focus):**
"Review the changes on this branch against the base branch. Run `git diff origin/<base>` to see the diff. Your job is to find ways this code will fail in production. Think like an attacker and a chaos engineer. Find edge cases, race conditions, security holes, resource leaks, failure modes, and silent data corruption paths. Be adversarial. Be thorough. No compliments — just the problems."

**With focus (e.g., "security"):**
"Review the changes on this branch against the base branch. Run `git diff origin/<base>` to see the diff. Focus specifically on SECURITY. Your job is to find every way an attacker could exploit this code. Think about injection vectors, auth bypasses, privilege escalation, data exposure, and timing attacks. Be adversarial."

2. Run with JSONL output (5-minute timeout):
```bash
codex exec "<prompt>" -s read-only -c 'model_reasoning_effort="xhigh"' --enable web_search_cached --json 2>/dev/null | python3 -c "
import sys, json
for line in sys.stdin:
    line = line.strip()
    if not line: continue
    try:
        obj = json.loads(line)
        t = obj.get('type','')
        if t == 'item.completed' and 'item' in obj:
            item = obj['item']
            itype = item.get('type','')
            text = item.get('text','')
            if itype == 'reasoning' and text:
                print(f'[codex thinking] {text}')
                print()
            elif itype == 'agent_message' and text:
                print(text)
            elif itype == 'command_execution':
                cmd = item.get('command','')
                if cmd: print(f'[codex ran] {cmd}')
        elif t == 'turn.completed':
            usage = obj.get('usage',{})
            tokens = usage.get('input_tokens',0) + usage.get('output_tokens',0)
            if tokens: print(f'\ntokens used: {tokens}')
    except: pass
"
```

3. Present output:
```
CODEX SAYS (adversarial challenge):
════════════════════════════════════════════════════════════
<full output from above, verbatim>
════════════════════════════════════════════════════════════
Tokens: N | Est. cost: ~$X.XX
```

---

## Step 2C: Consult Mode

Ask Codex anything about the codebase. Supports session continuity.

1. **Check for existing session:**
```bash
cat .context/codex-session-id 2>/dev/null || echo "NO_SESSION"
```

If session exists, ask user:
```
You have an active Codex conversation. Continue or start fresh?
A) Continue (Codex remembers prior context)
B) Start new conversation
```

2. Create temp files:
```bash
TMPRESP=$(mktemp /tmp/codex-resp-XXXXXX.txt)
TMPERR=$(mktemp /tmp/codex-err-XXXXXX.txt)
```

3. **Plan review auto-detection:** If prompt is about reviewing a plan, prepend persona:
"You are a brutally honest technical reviewer. Review this plan for: logical gaps and unstated assumptions, missing error handling or edge cases, overcomplexity (is there a simpler approach?), feasibility risks (what could go wrong?), and missing dependencies or sequencing issues. Be direct. Be terse. No compliments. Just the problems.

THE PLAN:
<plan content>"

4. Run with JSONL output (5-minute timeout):

**New session:**
```bash
codex exec "<prompt>" -s read-only -c 'model_reasoning_effort="high"' --enable web_search_cached --json 2>"$TMPERR" | python3 -c "
import sys, json
for line in sys.stdin:
    line = line.strip()
    if not line: continue
    try:
        obj = json.loads(line)
        t = obj.get('type','')
        if t == 'thread.started':
            tid = obj.get('thread_id','')
            if tid: print(f'SESSION_ID:{tid}')
        elif t == 'item.completed' and 'item' in obj:
            item = obj['item']
            itype = item.get('type','')
            text = item.get('text','')
            if itype == 'reasoning' and text:
                print(f'[codex thinking] {text}')
                print()
            elif itype == 'agent_message' and text:
                print(text)
            elif itype == 'command_execution':
                cmd = item.get('command','')
                if cmd: print(f'[codex ran] {cmd}')
        elif t == 'turn.completed':
            usage = obj.get('usage',{})
            tokens = usage.get('input_tokens',0) + usage.get('output_tokens',0)
            if tokens: print(f'\ntokens used: {tokens}')
    except: pass
"
```

**Resumed session:**
```bash
codex exec resume <session-id> "<prompt>" -s read-only -c 'model_reasoning_effort="high"' --enable web_search_cached --json 2>"$TMPERR" | python3 -c "<same parser>"
```

5. Capture session ID from output (line starting with `SESSION_ID:`) and save:
```bash
mkdir -p .context
# Save session ID to .context/codex-session-id
```

6. Present output:
```
CODEX SAYS (consult):
════════════════════════════════════════════════════════════
<full output, verbatim — includes [codex thinking] traces>
════════════════════════════════════════════════════════════
Tokens: N | Est. cost: ~$X.XX
Session saved — run /second-opinion again to continue.
```

7. Note any disagreements:
"Note: Claude Code disagrees on X because Y."

---

## Model & Reasoning

**Model:** No model hardcoded — codex uses its current default (frontier agentic coding model). As OpenAI ships newer models, automatically uses them. If user wants specific model, pass `-m` through.

**Reasoning effort:**
- **Review mode:** `high` — thorough but not slow
- **Challenge mode:** `xhigh` — maximum reasoning for adversarial analysis
- **Consult mode:** `high` — balance of depth and speed

**Web search:** All commands use `--enable web_search_cached` for doc/API lookup.

---

## Cost Estimation

Parse token count from stderr. Display as: `Tokens: N`

If unavailable: `Tokens: unknown`

---

## Error Handling

- **Binary not found:** Detected in Step 0. Stop with install instructions.
- **Auth error:** Surface error: "Codex authentication failed. Run `codex login` to authenticate via ChatGPT."
- **Timeout:** "Codex timed out after 5 minutes. Diff may be too large or API slow. Try again or use smaller scope."
- **Empty response:** "Codex returned no response. Check stderr for errors."
- **Session resume failure:** Delete session file and start fresh.

---

## Important Rules

- **Never modify files** — Read-only sandbox mode
- **Present output verbatim** — Do not truncate, summarize, or editorialize before showing
- **Add synthesis after, not instead of** — Claude commentary comes after full output
- **5-minute timeout** on all Bash calls to codex
- **No double-reviewing** — If user already ran `/review`, Codex provides independent second opinion
