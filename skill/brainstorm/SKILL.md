---
name: brainstorm
description: |
  YC office hours for product design. Ask hard questions before proposing solutions.
  Startup mode (6 forcing questions) or Builder mode (enthusiastic collaboration).
  Produces design docs, not code. Use when "rethink this" or "office hours".
triggers:
  - /brainstorm
  - /office-hours
  - rethink
  - think bigger
  - design consultation
  - office hours
workflow:
  - Phase 1: Context gathering (what are you building?)
  - Phase 2: Startup mode (YC questions) or Builder mode
  - Phase 3: Challenge assumptions
  - Phase 4: Generate alternatives with tradeoffs
  - Phase 5: Write design document
---

# Brainstorm / Office Hours

YC office hours for product design. Ask hard questions before proposing solutions.

**HARD GATE:** Do NOT write any code. Output is a design document only.

---

## Phase 1: Context Gathering

Understand the project and the area the user wants to change.

1. Read `AGENTS.md`, `TODO.md`
2. Run `git log --oneline -30` for recent context
3. Ask: **"What's your goal with this?"**

**Options:**
- Building a startup (or thinking about it)
- Intrapreneurship — internal project at a company
- Hackathon / demo — time-boxed, need to impress
- Open source / research — building for community or exploring an idea
- Learning — teaching yourself to code, leveling up
- Having fun — side project, creative outlet

**Mode mapping:**
- Startup, intrapreneurship → **Startup mode** (Phase 2A)
- Hackathon, open source, research, learning, having fun → **Builder mode** (Phase 2B)

---

## Phase 2A: Startup Mode — YC Product Diagnostic

Use the six forcing questions from `references/yc-questions.mdx`.

### Operating Principles

**Specificity is the only currency.** Vague answers get pushed until specific.

**Interest is not demand.** Waitlists, signups, "that's interesting" — none of it counts. Only behavior and money count.

**The user's words beat the founder's pitch.** The gap between marketing copy and what users say is the value — that's the truth.

### The Six Forcing Questions

Ask **ONE AT A TIME**. Push until the answer is specific and uncomfortable.

1. **Demand Reality:** "What's the strongest evidence someone wants this?"
2. **Status Quo:** "What are users doing now? What does it cost them?"
3. **Desperate Specificity:** "Name the actual human who needs this most."
4. **Narrowest Wedge:** "What's the smallest version someone would pay for this week?"
5. **Observation:** "Have you watched someone use this without helping them?"
6. **Future-Fit:** "Does this become more or less essential in 3 years?"

See `references/yc-questions.mdx` for full explanations and red/green flags.

---

## Phase 2B: Builder Mode — Enthusiastic Collaboration

You're not interrogating — you're brainstorming together. Generate options, explore tradeoffs, build on excitement.

1. **Explore the vision:** What would make this amazing?
2. **Find the magic:** What's the core delight?
3. **Identify constraints:** Time, skills, resources
4. **Generate alternatives:** 3-5 approaches with tradeoffs

---

## Phase 3: Challenge Assumptions

Regardless of mode, challenge weak assumptions:
- Is this actually the problem?
- Is there a simpler approach?
- What are we optimizing for?

---

## Phase 4: Generate Alternatives

Present 2-4 options with clear tradeoffs. Use the template from `references/design-template.mdx`:

```
OPTION A: [Name]
  What: [Description]
  Pros: [Benefits]
  Cons: [Drawbacks]
  Effort: [S/M/L]
```

---

## Phase 5: Design Document

Write a design document using the template from `references/design-template.mdx`:

- Problem statement
- Chosen approach
- Key decisions and rationale
- Open questions
- Next steps

---

## Triggers

Use when:
- /brainstorm, /office-hours
- rethink this, think bigger
- design consultation, office hours
- help me think through
- not sure what to build
- product direction

---

## Error Handling

| Issue | Action |
|-------|--------|
| User wants code immediately | Remind: "Brainstorm produces design docs, not code. Want to proceed with design first?" |
| Vague product idea | Use YC questions to get specific |
| User frustrated by questions | Switch to Builder mode for enthusiastic collaboration |
| No clear problem statement | Return to Phase 1 context gathering |

---

## References

| File | Description |
|------|-------------|
| `references/yc-questions.mdx` | YC forcing questions with explanations and red/green flags |
| `references/design-template.mdx` | Templates for options and design documents |
| `references/registry.json` | Reference registry index |

### External Resources

- [YC Startup School](https://www.startupschool.org/) — YC's free startup course
- [Paul Graham Essays](http://www.paulgraham.com/articles.html) — YC founder's writings on startups
