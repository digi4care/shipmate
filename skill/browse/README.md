---
name: browse
description: |
  Persistent headless Chromium for QA testing. First call auto-starts (~3s), then ~100ms per command. State persists between calls (cookies, tabs, login sessions). Use for browser automation and testing.
triggers:
  - /browse
  - browser test
  - open browser
  - test page
workflow:
  - Setup: Auto-start browser on first command
  - Navigation: goto, back, forward, reload
  - Interaction: click, fill, type, hover
  - Inspection: snapshot, screenshot, console, network
  - Verification: is visible, is enabled, text contains
---

# Browse: QA Testing & Dogfooding

Persistent headless Chromium. First call auto-starts (~3s), then ~100ms per command. State persists between calls (cookies, tabs, login sessions).

## Core QA Patterns

### 1. Verify page loads correctly
```bash
$B goto https://yourapp.com
$B text                          # content loads?
$B console                       # JS errors?
$B network                       # failed requests?
$B is visible ".main-content"    # key elements present?
```

### 2. Test user flow
```bash
$B goto https://app.com/login
$B snapshot -i                   # see all interactive elements
$B fill @e3 "user@test.com"
$B fill @e4 "password"
$B click @e5                     # submit
$B snapshot -D                   # diff: what changed after submit?
```

### 3. Verify action worked
```bash
$B snapshot                      # baseline
$B click @e3                     # do something
$B snapshot -D                   # unified diff shows what changed
```

### 4. Visual evidence
```bash
$B snapshot -i -a -o /tmp/annotated.png   # labeled screenshot
$B screenshot /tmp/bug.png
```

## Snapshot Flags

```
-i        --interactive           Interactive elements only with @e refs
-c        --compact               Compact (no empty structural nodes)
-d <N>    --depth                 Limit tree depth
-s <sel>  --selector              Scope to CSS selector
-D        --diff                  Unified diff against previous snapshot
-a        --annotate              Annotated screenshot with ref labels
-o <path> --output                Output path for annotated screenshot
-C        --cursor-interactive    Cursor-interactive elements (@c refs)
```

## User Handoff

When you hit something you can't handle in headless mode (CAPTCHA, complex auth):

```bash
$B handoff "Stuck on CAPTCHA at login page"
# User takes over in visible Chrome
# When done:
$B resume
```

## Full Command List

### Navigation
- `goto <url>` - Navigate to URL
- `back` / `forward` - History navigation
- `reload` - Reload page

### Interaction
- `click <sel>` - Click element
- `fill <sel> <val>` - Fill input
- `hover <sel>` - Hover element
- `press <key>` - Press key

### Inspection
- `snapshot [flags]` - Accessibility tree with @refs
- `screenshot [path]` - Save screenshot
- `text` - Clean page text
- `console` - Console messages
- `network` - Network requests

### Verification
- `is visible <sel>` - Check visibility
- `is enabled <sel>` - Check if interactive
- `js <expr>` - Run JavaScript

### Visual
- `responsive <prefix>` - Mobile/tablet/desktop screenshots
- `diff <url1> <url2>` - Compare two pages
