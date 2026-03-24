---
name: browser-auth
description: |
  Set up browser authentication for QA testing. Use chrome-devtools tools
  to configure authenticated browser sessions. Use when testing authenticated
  flows or when asked to "sign in" for testing.
triggers:
  - /browser-auth
  - /setup-browser-cookies
  - import cookies
  - sign in to test
  - authenticated testing
workflow:
  - Detect available browsers
  - Configure authenticated session
  - Verify authentication works
---

# Browser Authentication Setup

Set up authenticated browser sessions for QA testing using Chrome DevTools Protocol or Playwright.

## Quick Start

### Option 1: Chrome DevTools (Recommended)

Use `chrome-devtools` tools with an existing Chrome profile that's already logged in:

1. User logs in manually via Chrome
2. Connect to that Chrome instance via DevTools
3. Use `chrome-devtools_*` tools for testing

The authenticated state persists in the Chrome profile.

### Option 2: Playwright with Storage State

Use `playwright_browser` tools with saved storage state:

1. **First time:** Log in manually and save state
2. **Subsequent runs:** Load saved state

Storage state includes cookies, localStorage, and sessionStorage.

---

## When to Use

Use when:
- /browser-auth
- /setup-browser-cookies
- import cookies
- sign in to test
- authenticated testing
- login for testing
- need auth for QA

## Do Not Use For

- Manual browser login (user does this themselves)
- OAuth flows (use browser handoff instead)
- API authentication (use proper API tokens)
- Production credentials (never use prod credentials for testing)

---

## Error Handling

| Issue | Action |
|-------|--------|
| Not authenticated | User must log in manually first |
| Session expired | Re-authenticate manually |
| Auth not persisting | Check if cookies/localStorage blocked |
| Chrome not detected | Ensure Chrome is running with remote debugging |

---

## Quick Tests

Should trigger:
- Import cookies for testing
- Sign in to test the app
- /browser-auth
- Need authenticated access for QA

Should not trigger:
- Log in to the API
- Set up OAuth
- Test login functionality
- Debug authentication issues

---

## References

- [browser-setup](./references/browser-setup.mdx) — Detailed setup instructions for Chrome DevTools and Playwright
- [Playwright Authentication](https://playwright.dev/docs/auth) — Storage state documentation
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) — Browser control protocol
