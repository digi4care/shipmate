---
name: browse
description: |
  Browser automation for QA testing using Playwright tools. Navigate pages,
  interact with elements, take screenshots, and verify UI behavior.
  Use for browser automation and testing.
triggers:
  - /browse
  - browser test
  - open browser
  - test page
  - check this page
  - verify in browser
  - navigate to
  - test login flow
  - fill form
negativeTriggers:
  - unit test
  - API test
  - code coverage
  - review PR
workflow:
  - Navigate: playwright_browser_navigate(url)
  - Inspect: playwright_browser_snapshot() to get element refs
  - Interact: playwright_browser_click/type/fill_form with refs
  - Verify: playwright_browser_evaluate or check snapshot
  - Document: playwright_browser_take_screenshot for evidence
---

# Browse: Browser Automation & QA Testing

Browser automation using Playwright tools for QA testing, UI verification, and user flow testing.

## When to Use

- `/browse` command
- Testing user flows in browser
- Filling and submitting forms
- Verifying page behavior
- Capturing visual evidence
- Checking console errors or network requests

## Do Not Use For

- Unit testing → use test frameworks (vitest, jest)
- API testing → use curl/http clients
- Performance profiling → use devtools
- Accessibility audits → use design-audit skill

---

## Workflow

### 1. Navigate to Page

```
playwright_browser_navigate(url="https://yourapp.com")
```

### 2. Get Page Snapshot

Always snapshot to see current page state and element references:

```
playwright_browser_snapshot()
```

Returns accessibility tree with `ref` values for each element.

### 3. Interact with Elements

Use refs from snapshot for interactions:

```
# Single input
playwright_browser_type(ref="email_input", text="user@test.com")

# Multiple form fields
playwright_browser_fill_form(fields=[
  {name: "Email", type: "textbox", ref: "email_input", value: "user@test.com"},
  {name: "Password", type: "textbox", ref: "password_input", value: "secret"}
])

# Click button
playwright_browser_click(ref="submit_button")
```

### 4. Wait for Results

```
playwright_browser_wait_for(text="Welcome back")
playwright_browser_wait_for(textGone="Loading...")
```

### 5. Verify & Document

```
# Check for errors
playwright_browser_console_messages(level="error")
playwright_browser_network_requests()

# Capture evidence
playwright_browser_take_screenshot(type="png", filename="evidence.png")

# Verify with JS
playwright_browser_evaluate(function="() => document.title")
```

---

## Quick Tests

**Should trigger:**
- Open browser and test the page
- Check this URL in browser
- `/browse`
- Navigate to the login page
- Fill out the form
- Test the checkout flow

**Should not trigger:**
- Write a unit test
- Test the API
- Check code coverage
- Review this PR

---

## Error Handling

| Issue | Action |
|-------|--------|
| Element not found | Take new snapshot, verify current page state |
| Page times out | Check URL accessibility, increase wait timeout |
| Navigation fails | Verify URL is correct and accessible |
| Form submission fails | Check validation errors via snapshot |
| Browser not installed | Run `playwright_browser_install()` |
| Ref invalid | Page changed; take new snapshot to get fresh refs |

---

## References

- [Browser Commands](references/browser-commands.mdx) — Complete Playwright tool reference
- [Snapshot Format](references/snapshot-format.mdx) — Understanding accessibility tree output
- [Playwright Docs](https://playwright.dev/python/docs/intro) — Official Playwright documentation
