---
name: design-audit
description: |
  Live site visual QA. Reviews implemented designs against DESIGN.md and design principles.
  Checks hierarchy, spacing, interaction states, responsive behavior, and accessibility.
  Use when "shipmate design review", "visual QA", or checking design quality after implementation.
triggers:
  - /design-audit
  - shipmate design review
  - visual QA
  - design quality check
  - review live site
  - check design implementation
workflow:
  - Setup: Load DESIGN.md, start browser
  - Pass 1: Visual hierarchy scan
  - Pass 2: Interaction state coverage
  - Pass 3: Responsive behavior
  - Pass 4: Accessibility audit
  - Pass 5: AI slop detection
  - Pass 6: Design system compliance
  - Report: Findings with screenshots
---

# Design Audit: Live Site Visual QA

Reviews implemented designs against DESIGN.md and design principles. Uses browser automation to capture visual evidence of issues.

## Parameters

| Parameter | Default | Example |
|-----------|---------|---------|
| Target URL | (auto-detect) | `https://myapp.com` |
| Scope | Full site | `Focus on checkout flow` |
| Tier | Standard | `--quick`, `--exhaustive` |

## Tiers

- **Quick:** Hierarchy + critical a11y only
- **Standard:** All 6 passes (default)
- **Exhaustive:** + edge cases, error states, loading states

---

## Workflow

### Setup

1. Check for DESIGN.md — calibrate all decisions against it
2. If no DESIGN.md, note: "Reviewing against universal design principles"
3. Start browser via `/browse`
4. Navigate to target URL

### The 6 Passes

Each pass generates screenshots and findings. See [audit-passes.mdx](references/audit-passes.mdx) for detailed execution guide.

| Pass | Focus | Key Checks |
|------|-------|------------|
| 1. Hierarchy | Visual priority | What's first, second, third? |
| 2. States | Interaction coverage | Hover, focus, disabled, loading, error |
| 3. Responsive | Viewport behavior | Mobile, tablet, desktop breakpoints |
| 4. A11y | Accessibility | Keyboard, contrast, touch targets |
| 5. AI Slop | Generic patterns | Cookie-cutter sections |
| 6. Design System | DESIGN.md compliance | Typography, colors, spacing |

### Report

Generate completion report with issue counts and screenshot directory. See [report-template.mdx](references/report-template.mdx) for format.

---

## When to Use

- `/design-audit`
- shipmate design review
- visual QA
- design quality check
- audit accessibility
- check design implementation

## Do Not Use For

- Creating design systems (use `/design-help`)
- Code review (use `/review`)
- Functional testing (use `/qa`)

---

## Error Handling

| Issue | Action |
|-------|--------|
| Site requires auth | Use `/browser-auth` first |
| DESIGN.md missing | Note in report, audit against universal principles |
| Browser fails to load | Check URL, try alternative browser |
| Timeout on page load | Increase timeout, check network |

---

## Integration

- **browser-auth**: Automatically loaded if site requires authentication
- **browse**: Uses persistent browser for all navigation
- **design-help**: Recommend if DESIGN.md is missing

---

## Output

1. **Audit report** in terminal
2. **Screenshots** saved to `~/.shipmate/design-audit/[timestamp]/`
3. **Findings file** (optional) for handoff to developers

---

## Quick Tests

Should trigger:
- Design review of the live site
- Visual QA check
- /design-audit
- Audit the UI for accessibility

Should not trigger:
- Create a design system
- Write unit tests
- Review this PR
- Debug this error

---

## References

- [design-principles.mdx](references/design-principles.mdx) — Core design principles
- [audit-passes.mdx](references/audit-passes.mdx) — Detailed pass execution guide
- [report-template.mdx](references/report-template.mdx) — Report format and screenshot organization

### External References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) — Accessibility standards
- [Refactoring UI](https://www.refactoringui.com/) — Design principles for developers
