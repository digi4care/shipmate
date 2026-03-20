---
name: unfreeze
description: |
  Clear the edit restriction boundary set by /freeze. Removes the freeze-dir.txt
  file that restricts edits to a specific directory. Use when done with scoped
  work or when the restriction is no longer needed.
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

Clear the edit restriction boundary.

## Usage

Run `/unfreeze` to remove the edit restriction set by `/freeze`.

## Implementation

```bash
STATE_DIR="${SHIPMATE_DATA:-$HOME/.shipmate}"
if [ -f "$STATE_DIR/freeze-dir.txt" ]; then
  DIR=$(cat "$STATE_DIR/freeze-dir.txt")
  rm -f "$STATE_DIR/freeze-dir.txt"
  echo "Edit restriction removed. Previously locked to: $DIR"
else
  echo "No freeze in effect. Edits are unrestricted."
fi
```

## What it does

- Removes the `~/.shipmate/freeze-dir.txt` file
- All directories are now editable
- No confirmation needed — just run it

## Related

- `/freeze` — Set an edit restriction
- `/guard` — Set restriction + enable destructive command warnings
