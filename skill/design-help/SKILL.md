---
name: design-help
description: |
  Shipmate design consultation. Ask clarifying questions about typography, color,
  spacing, and visual hierarchy before proposing solutions. Creates DESIGN.md
  from scratch or updates existing system. Use when "shipmate design consultation" or "set up design system".
triggers:
  - /design-help
  - shipmate design consultation
  - design system setup
  - typography setup
  - color palette
  - visual hierarchy help
workflow:
  - Phase 0: Check for existing DESIGN.md
  - Phase 1: Product context (what are you building?)
  - Phase 2: Research competitive landscape (optional)
  - Phase 3: Propose design system
  - Phase 4: Document DESIGN.md
---

# Design Help / Consultation

Design system consultation. Ask clarifying questions before proposing solutions.

**Output:** A design document or DESIGN.md file.

---

## Phase 0: Pre-checks

Check for existing DESIGN.md or design-system.md. If found, read it and calibrate all decisions against it. If not found, offer to create one.

---

## Phase 1: Product Context

Ask a single question covering:
1. What the product is, who it's for, what space/industry
2. Project type: web app, dashboard, marketing site, editorial, internal tool
3. "Want competitive research, or work from design knowledge?"

---

## Phase 2: Research (optional)

If user wants research:

1. **WebSearch** for products in their space
2. **Browse** top 3-5 sites for visual evidence (if available)
3. **Synthesize:** What patterns converge? Where's the opportunity to stand out?

---

## Phase 3: Propose Design System

Propose decisions for:

### Typography
- Font stack (system fonts vs custom)
- Scale (heading sizes, body sizes, line heights)
- Weight usage

### Color
- Primary palette (brand colors)
- Semantic colors (success, warning, error, info)
- Neutral scale (grays)
- Accessibility (contrast ratios)

### Spacing
- Base unit (4px, 8px, etc.)
- Scale (tight, normal, loose)
- Component padding

### Visual Hierarchy
- Heading styles
- Body text treatment
- Interactive element prominence

---

## Phase 4: Document

Write DESIGN.md with:
- Typography decisions
- Color palette
- Spacing scale
- Component patterns
- Accessibility requirements
- Usage examples

---

## Key Principles

1. **Empty states are features** — Every empty state needs warmth, action, context
2. **Every screen has hierarchy** — What does user see first, second, third?
3. **Specificity over vibes** — "Clean, modern UI" is not a design decision
4. **Edge cases are user experiences** — 47-char names, zero results, error states
5. **AI slop is the enemy** — Generic patterns feel AI-generated, not intentional

---

## When to Use

Use when:
- /design-help
- shipmate design consultation
- design system setup
- typography setup
- color palette
- visual hierarchy help
- create DESIGN.md
- set up design tokens

## Do Not Use For

- Auditing live designs (use design-audit skill)
- Writing CSS code (use appropriate dev skill)
- Component implementation (use frontend skills)
- Brand strategy (out of scope)

---

## Error Handling

| Issue | Action |
|-------|--------|
| User wants immediate code | Clarify: design-help produces design docs, not code |
| No clear product context | Return to Phase 1 questions |
| Competing design opinions | Document options with tradeoffs, let user decide |
| DESIGN.md already exists | Read it first, calibrate updates against it |

---

## Quick Tests

Should trigger:
- Set up a design system
- Help with typography and colors
- /design-help
- Create DESIGN.md for this project

Should not trigger:
- Audit the live site
- Write CSS components
- Fix this layout bug
- Implement the design

---

## References

- [Design Systems Handbook](https://www.designsystems.com/) — Design system best practices
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first design tokens
