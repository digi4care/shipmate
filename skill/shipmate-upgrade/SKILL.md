---
name: shipmate-upgrade
description: |
  Check for and apply shipmate plugin updates. Compares local version against
  GitHub releases and updates if newer version available. Also syncs local
  vendored copies. Use when "update shipmate" or "check for updates".
triggers:
  - /shipmate-upgrade
  - /gstack-upgrade
  - update shipmate
  - check for updates
  - upgrade shipmate
workflow:
  - Check current version against GitHub releases
  - Download and apply update if available
  - Sync local vendored copies
  - Verify update succeeded
---

# Shipmate Upgrade

Check for and apply shipmate plugin updates.

## Version Check

```bash
# Check current version
cat ~/.shipmate/VERSION 2>/dev/null || echo "unknown"

# Check for updates from GitHub
gh release list --repo oh-my-opencode/shipmate --limit 1 2>/dev/null
```

## Upgrade Process

1. **Check for updates:**
   ```bash
   LATEST=$(gh release list --repo oh-my-opencode/shipmate --limit 1 --json tagName --jq '.[0].tagName' 2>/dev/null)
   CURRENT=$(cat ~/.shipmate/VERSION 2>/dev/null || echo "v0.0.0")
   echo "Current: $CURRENT | Latest: $LATEST"
   ```

2. **If update available:**
   ```bash
   # Download latest release
   gh release download $LATEST --repo oh-my-opencode/shipmate --dir /tmp/shipmate-update
   
   # Backup current version
   mv ~/.shipmate ~/.shipmate.bak
   
   # Apply update
   unzip /tmp/shipmate-update/shipmate.zip -d ~/.shipmate
   
   # Verify
   cat ~/.shipmate/VERSION
   ```

3. **Sync local vendored copy** (if project has `.shipmate/` directory):
   ```bash
   # Check for local vendored copy
   if [ -d ".shipmate" ]; then
     GLOBAL_VER=$(cat ~/.shipmate/VERSION 2>/dev/null || echo "unknown")
     LOCAL_VER=$(cat .shipmate/VERSION 2>/dev/null || echo "unknown")
     
     if [ "$GLOBAL_VER" != "$LOCAL_VER" ]; then
       echo "Syncing local copy from $LOCAL_VER → $GLOBAL_VER"
       rm -rf .shipmate
       cp -r ~/.shipmate .shipmate
       echo "Local vendored copy updated. Commit .shipmate/ when ready."
     else
       echo "Local vendored copy already up to date ($LOCAL_VER)"
     fi
   fi
   ```

## Verification

After update, verify:
```bash
cat ~/.shipmate/VERSION
ls ~/.shipmate/agent/
ls ~/.shipmate/skill/
ls ~/.shipmate/hook/
```

## Rollback

If update causes issues:
```bash
rm -rf ~/.shipmate
mv ~/.shipmate.bak ~/.shipmate
echo "Rolled back to previous version"
```
