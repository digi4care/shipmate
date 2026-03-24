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
workflow:
  - Check for freeze state
  - Remove freeze-dir.txt
  - Confirm removal
---

# Unfreeze

Clear the edit restriction boundary set by the freeze hook.

## Usage

Run `/unfreeze` to remove the edit restriction.

## Implementation

The freeze is implemented by the `guardHook` in the Shipmate plugin (`src/hooks/guard.ts`). The freeze state is stored in:

```
~/.shipmate/freeze-dir.txt
```

To clear:
```bash
rm -f ~/.shipmate/freeze-dir.txt
echo "Edit restriction removed. All directories are now editable."
```

## What it does

- Removes the freeze state file
- All directories are now editable
- No confirmation needed — just run it

---

## When to Use

Use when:
- /unfreeze
- unfreeze
- clear freeze
- remove restriction
- done with scoped work
- unlock edits

## Do Not Use For

- Setting a freeze (not yet exposed as skill)
- General debugging (use investigate skill)

---

## Error Handling

| Issue | Action |
|-------|--------|
| No freeze in effect | Report: "No freeze in effect. Edits are unrestricted." |
| Cannot remove file | Check permissions, report error |

---

## Quick Tests

Should trigger:
- /unfreeze
- Clear the freeze
- Remove edit restriction

Should not trigger:
- Set a freeze
- Debug this issue

---

## References

- [OpenCode Plugin SDK](https://opencode.ai/docs/plugins/) — Plugin hooks
- Shipmate source: `src/hooks/freeze.ts`, `src/hooks/guard.ts`
