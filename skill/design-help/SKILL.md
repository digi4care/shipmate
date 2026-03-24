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
---

# Design Help / Consultation

Design system consultation. Ask clarifying questions before proposing solutions.

**Output:** A DESIGN.md file with typography, color, spacing, and component decisions.

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
2. **Browse** top 3-5 sites for visual evidence
3. **Synthesize:** What patterns converge? Where's the opportunity to stand out?

---

## Phase 3: Propose Design System

Propose decisions for:

| Category | Decisions |
|----------|-----------|
| Typography | Font stack, scale, weights |
| Color | Primary, semantic, neutrals, contrast |
| Spacing | Base unit, scale, component padding |
| Hierarchy | Heading styles, focal points |

→ See `references/design-guidelines.mdx` for detailed specifications.

---

## Phase 4: Document

Write DESIGN.md with:
- Typography decisions with specific values
- Color palette with hex codes and semantic names
- Spacing scale with tokens
- Component patterns
- Accessibility requirements (4.5:1 contrast minimum)

---

## Key Principles

1. **Empty states are features** — warmth + action + context
2. **Every screen has hierarchy** — first read, second read, actions
3. **Specificity over vibes** — "16px Inter" not "clean typography"
4. **Edge cases are UX** — 47-char names, zero results, errors
5. **AI slop is the enemy** — generic = unintentional

→ See `references/design-principles.mdx` for elaboration.

---

## When to Use

- `/design-help`
- Shipmate design consultation
- Design system setup
- Typography setup
- Color palette definition
- Visual hierarchy help
- Create DESIGN.md
- Set up design tokens

---

## Do Not Use For

- Auditing live designs → use `design-audit` skill
- Writing CSS code → use appropriate dev skill
- Component implementation → use frontend skills
- Brand strategy → out of scope

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

**Should trigger:**
- "Set up a design system"
- "Help with typography and colors"
- "/design-help"
- "Create DESIGN.md for this project"

**Should not trigger:**
- "Audit the live site"
- "Write CSS components"
- "Fix this layout bug"
- "Implement the design"

---

## References

| Document | Description |
|----------|-------------|
| `references/design-guidelines.mdx` | Typography, color, spacing, visual hierarchy specs |
| `references/design-principles.mdx` | Core principles: empty states, hierarchy, specificity |
| `references/external-resources.mdx` | External tools, design systems, accessibility resources |
| `references/registry.json` | Reference document index |
