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

## Design Principles (Reference)

1. **Empty states are features** — Every empty state needs warmth, action, context
2. **Every screen has hierarchy** — What does user see first, second, third?
3. **Specificity over vibes** — "Clean, modern UI" is not a design decision
4. **Edge cases are user experiences** — 47-char names, zero results, error states
5. **AI slop is the enemy** — Generic patterns feel AI-generated, not intentional
6. **Responsive is not "stacked on mobile"** — Each viewport gets intentional design
7. **Accessibility is not optional** — Keyboard nav, screen readers, contrast, touch targets
8. **Subtraction default** — If UI element doesn't earn pixels, cut it

---

## Workflow

### Setup

1. Check for DESIGN.md — calibrate all decisions against it
2. If no DESIGN.md, note: "Reviewing against universal design principles"
3. Start browser via `/browse`
4. Navigate to target URL

---

### Pass 1: Visual Hierarchy Scan

Navigate to each key screen. For each:

1. **Screenshot + snapshot** for evidence
2. **Identify hierarchy:** What does user see first, second, third?
3. **Check:** Is everything competing for attention?
4. **Flag:** Elements that don't earn their pixels

**Evidence:** Annotated screenshots with hierarchy markers

---

### Pass 2: Interaction State Coverage

Test each interactive element for:

| State | Check |
|-------|-------|
| Default | Visible, properly styled |
| Hover | Visual feedback |
| Focus | Visible focus ring (a11y) |
| Active/Pressed | Visual feedback |
| Disabled | Visually distinct, not confusing |
| Loading | Spinner/skeleton, not nothing |
| Empty | Warmth + action + context |
| Error | Clear message + recovery path |
| Success | Confirmation feedback |

**Evidence:** Screenshots of each state, especially failures

---

### Pass 3: Responsive Behavior

Test at breakpoints:

```
Mobile:  375px × 667px
Tablet:  768px × 1024px
Desktop: 1440px × 900px
```

For each:
1. **Screenshot** at each breakpoint
2. **Check:** Is mobile just "stacked desktop" or intentional?
3. **Flag:** Broken layouts, overflow, tiny tap targets
4. **Verify:** Touch targets ≥ 44px on mobile

**Evidence:** Side-by-side breakpoint comparisons

---

### Pass 4: Accessibility Audit

Automated + manual checks:

1. **Console check:** Any a11y errors?
2. **Keyboard nav:** Tab through entire flow
3. **Color contrast:** WCAG AA minimum (4.5:1 text, 3:1 UI)
4. **Touch targets:** 44px minimum on touch devices
5. **Screen reader:** Landmarks, labels, alt text
6. **Focus visibility:** Can you see where focus is?

**Evidence:** Screenshots of a11y issues with measurements

---

### Pass 5: AI Slop Detection

Flag generic patterns that feel generated:

- Hero sections with gradient backgrounds
- 3-column feature grids
- Card layouts with stock icons
- "Clean, modern" without specificity
- Generic testimonials sections
- Cookie-cutter pricing tables

**Question:** What makes this feel like THIS product?

**Evidence:** Screenshots with notes on what's generic

---

### Pass 6: Design System Compliance

If DESIGN.md exists:

1. **Typography:** Correct fonts, sizes, weights?
2. **Colors:** Using palette tokens? Contrast compliant?
3. **Spacing:** Following scale (4px/8px base)?
4. **Components:** Using defined patterns?
5. **New elements:** Fit the vocabulary?

**Evidence:** Side-by-side DESIGN.md vs implementation

---

## Report Format

```
+====================================================================+
|              DESIGN AUDIT — COMPLETION REPORT                       |
+====================================================================+
| Target               | [URL]                                       |
| DESIGN.md            | [found/not found]                           |
| Scope                | [pages/screens reviewed]                    |
+--------------------------------------------------------------------+
| Pass 1 (Hierarchy)   | ___ issues found                            |
| Pass 2 (States)      | ___ missing states                          |
| Pass 3 (Responsive)  | ___ breakpoint issues                       |
| Pass 4 (A11y)        | ___ violations                              |
| Pass 5 (AI Slop)     | ___ generic patterns                        |
| Pass 6 (Design Sys)  | ___ deviations from DESIGN.md               |
+--------------------------------------------------------------------+
| Screenshots saved    | ~/.shipmate/design-audit/[timestamp]/       |
| Critical issues      | [list]                                      |
| Recommended fixes    | [prioritized list]                          |
+====================================================================+
```

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
