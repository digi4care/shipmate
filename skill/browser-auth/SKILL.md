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

Set up authenticated browser sessions for QA testing.

## Option 1: Chrome DevTools Protocol

Use `chrome-devtools` tools with an existing Chrome profile that's already logged in:

```
1. User logs in manually via Chrome
2. Connect to that Chrome instance via DevTools
3. Use chrome-devtools tools for testing
```

The authenticated state persists in the Chrome profile.

## Option 2: Playwright with Storage State

Use `playwright_browser` tools with saved storage state:

1. **First time:** Log in manually and save state
2. **Subsequent runs:** Load saved state

Storage state includes:
- Cookies
- LocalStorage
- SessionStorage

## How to Use

### For Chrome DevTools testing

If you have a logged-in Chrome session, the `chrome-devtools_*` tools can connect to it and use the existing authentication.

### For Playwright testing

The browser session state persists during the conversation. Log in once, then continue testing.

## Troubleshooting

**"Authentication not working"**
- Ensure you're logged in to the target site
- Check if cookies/localStorage are being used
- Some sites use additional auth (CSRF tokens, etc.)

**"Session expired"**
- Re-authenticate manually
- Consider using refresh tokens if available

## Security Notes

- Never commit authentication state to version control
- Auth tokens are sensitive — treat them like passwords
- Use test accounts, never production credentials

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

- [Playwright Authentication](https://playwright.dev/docs/auth) — Storage state
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) — Browser control
