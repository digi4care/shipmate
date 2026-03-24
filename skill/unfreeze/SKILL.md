---
name: unfreeze
description: |
  Clear the edit restriction boundary set by the freeze hook. Removes the 
  freeze-dir.txt file that restricts edits to a specific directory.
  Use when done with scoped work or when the restriction is no longer needed.
triggers:
  - /unfreeze
  - unfreeze
  - clear freeze
  - remove restriction
  - unlock edits
workflow:
  - Check for freeze state
  - Remove freeze-dir.txt
  - Confirm removal
---

# Unfreeze

Clear the edit restriction boundary set by the freeze hook.

## When to Use Me

- `/unfreeze` — explicit command
- Done with scoped/directory-restricted work
- Need to edit files outside the frozen directory
- Edit restriction is no longer needed

## Do Not Use For

- Setting a freeze (use `/freeze` hook)
- General debugging (use investigate skill)
- Permission issues unrelated to freeze

---

## Workflow

1. **Check freeze state** — verify `~/.shipmate/freeze-dir.txt` exists
2. **Remove the freeze file** — delete the restriction marker
3. **Confirm removal** — report success to user

```bash
if [ -f ~/.shipmate/freeze-dir.txt ]; then
  rm -f ~/.shipmate/freeze-dir.txt
  echo "✓ Edit restriction removed. All directories are now editable."
else
  echo "No freeze in effect. Edits are already unrestricted."
fi
```

---

## Error Handling

| Issue | Action |
|-------|--------|
| No freeze in effect | Report: "No freeze in effect. Edits are unrestricted." |
| Cannot remove file | Check permissions on `~/.shipmate/`, report error details |

---

## Quick Tests

**Should trigger:**
- `/unfreeze`
- "Clear the freeze"
- "Remove edit restriction"
- "I'm done with scoped work"

**Should not trigger:**
- "Set a freeze"
- "Debug this issue"
- "Why can't I edit this file?"

---

## Implementation Notes

The freeze is implemented by `guardHook` in `src/hooks/guard.ts`. When active, the hook reads `~/.shipmate/freeze-dir.txt` and blocks edits outside that directory.

This skill simply removes that file to restore full edit access.

---

## References

- Shipmate source: `src/hooks/freeze.ts`, `src/hooks/guard.ts`
- [OpenCode Plugin SDK](https://opencode.ai/docs/plugins/) — Plugin hooks
