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
workflow:
  - Setup: Use playwright_browser tools
  - Navigation: playwright_browser_navigate
  - Interaction: playwright_browser_click, playwright_browser_type
  - Inspection: playwright_browser_snapshot, playwright_browser_take_screenshot
  - Verification: playwright_browser_evaluate
---

# Browse: QA Testing & Browser Automation

Browser automation using OpenCode's Playwright tools. Navigate pages, interact with elements, capture evidence, and verify UI behavior.

## Available Tools

| Tool | Purpose |
|------|---------|
| `playwright_browser_navigate` | Navigate to URL |
| `playwright_browser_snapshot` | Get accessibility tree with element refs |
| `playwright_browser_click` | Click element by ref |
| `playwright_browser_type` | Type text into element |
| `playwright_browser_fill_form` | Fill multiple form fields |
| `playwright_browser_take_screenshot` | Capture screenshot |
| `playwright_browser_evaluate` | Run JavaScript |
| `playwright_browser_press_key` | Press keyboard key |
| `playwright_browser_hover` | Hover over element |
| `playwright_browser_wait_for` | Wait for text/element |
| `playwright_browser_console_messages` | Get console logs |
| `playwright_browser_network_requests` | Get network requests |

## Core QA Patterns

### 1. Verify page loads correctly
```
playwright_browser_navigate(url="https://yourapp.com")
playwright_browser_snapshot()                    # see page structure
playwright_browser_console_messages(level="error")  # JS errors?
playwright_browser_network_requests()            # failed requests?
```

### 2. Test user flow
```
playwright_browser_navigate(url="https://app.com/login")
playwright_browser_snapshot()                    # find element refs
playwright_browser_fill_form(fields=[
  {ref: "email_field", value: "user@test.com"},
  {ref: "password_field", value: "password123"}
])
playwright_browser_click(ref="submit_button")
playwright_browser_snapshot()                    # verify result
```

### 3. Capture visual evidence
```
playwright_browser_take_screenshot(type="png", filename="bug-evidence.png")
```

### 4. Wait for content
```
playwright_browser_wait_for(text="Welcome back")
playwright_browser_wait_for(textGone="Loading...")
```

## Element References

The `playwright_browser_snapshot` returns an accessibility tree with `ref` values for each element. Use these refs for interactions:

```
button "Submit" [ref=button1]
textbox "Email" [ref=email_input]
link "Forgot password?" [ref=link3]
```

Then interact:
```
playwright_browser_click(ref="button1")
playwright_browser_type(ref="email_input", text="test@example.com")
```

---

## When to Use

Use when:
- /browse
- browser test
- open browser
- test page
- check this page
- verify in browser
- navigate to
- test login flow
- fill form

## Do Not Use For

- Unit testing (use test frameworks)
- Performance profiling (use devtools)
- API testing (use curl/http clients)
- Accessibility audits (use design-audit skill)

---

## Error Handling

| Issue | Action |
|-------|--------|
| Element not found | Use snapshot to see current page state, verify ref |
| Page times out | Check URL, increase wait timeout |
| Navigation fails | Verify URL is accessible |
| Form submission fails | Check form validation, use snapshot to debug |

---

## Quick Tests

Should trigger:
- Open browser and test the page
- Check this URL in browser
- /browse
- Navigate to the login page
- Fill out the form

Should not trigger:
- Write a unit test
- Test the API
- Check code coverage
- Review this PR

---

## References

- [Playwright Docs](https://playwright.dev/python/docs/intro) — Browser automation
- [OpenCode Plugin SDK](https://opencode.ai/docs/plugins/) — Custom tools
