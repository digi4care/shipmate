---
name: browser-auth
description: |
  Import browser cookies for authenticated QA testing. Opens user's browser,
  extracts cookies, and saves them for headless browser use. Supports Chrome,
  Firefox, Safari, and Edge. Use when testing authenticated flows or when
  asked to "sign in" or "import cookies".
triggers:
  - /browser-auth
  - /setup-browser-cookies
  - import cookies
  - sign in to test
  - authenticated testing
workflow:
  - Detect available browsers
  - Extract cookies from logged-in session
  - Save to shipmate cookies file
  - Verify cookies work
---

# Browser Authentication Setup

Import browser cookies for authenticated QA testing.

## Setup

Extract cookies from your logged-in browser session and save them for headless browser use.

```bash
# Find the browser-auth binary
_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
B=""
[ -n "$_ROOT" ] && [ -x "$_ROOT/.shipmate/browse/dist/browse" ] && B="$_ROOT/.shipmate/browse/dist/browse"
[ -z "$B" ] && B=~/.shipmate/browse/dist/browse
```

## Supported Browsers

- **Chrome** (default) — Most reliable
- **Firefox** — Good alternative
- **Safari** (macOS only) — Limited support
- **Edge** — Same as Chrome

## Usage

```bash
# Import from Chrome (default)
$B cookies-import chrome

# Import from Firefox
$B cookies-import firefox

# Import from Safari (macOS)
$B cookies-import safari

# Specify target domain
$B cookies-import chrome --domain myapp.com
```

## How it works

1. Opens your logged-in browser's cookie database
2. Extracts cookies for the specified domain (or all domains)
3. Saves to `~/.shipmate/cookies.json`
4. Automatically loaded by `/browse`, `/qa`, `/design-audit`

## Troubleshooting

**"No cookies found"**
- Make sure you're logged in to the target site in that browser
- Try a different browser

**"Permission denied"**
- Close the browser completely before importing
- Chrome locks its cookie database while running

**"Cookies not working"**
- Cookies may have expired
- Re-import fresh cookies
- Check if the site uses additional auth (CSRF tokens, etc.)

## Security Notes

- Cookies are stored in `~/.shipmate/cookies.json`
- This file should be in `.gitignore`
- Never commit cookies to version control
- Cookies include session tokens — treat them like passwords

## Related

- `/browse` — Use imported cookies for testing
- `/qa` — Full QA workflow with authentication
- `/design-audit` — Design review with authentication
