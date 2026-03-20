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

1. Read `CLAUDE.md`, `TODOS.md`
2. Run `git log --oneline -30` for recent context
3. Ask: **"What's your goal with this?"**

**Options:**
- Building a startup (or thinking about it)
- Intrapreneurship — internal project at a company
- Hackathon / demo — time-boxed, need to impress
- Open source / research — building for community or exploring
 idea
- Learning — teaching yourself to code, leveling up
- Having fun — side project, creative outlet

**Mode mapping:**
- Startup, intrapreneurship → **Startup mode** (Phase 2A)
- Hackathon, open source, research, learning, having fun → **Builder mode** (Phase 2B)

---

## Phase 2A: Startup Mode — YC Product Diagnostic

### Operating Principles

**Specificity is the only currency.** Vague answers get pushed. until specific.

**Interest is not demand.** Waitlists, signups, "that's interesting" — none of it counts. Only behavior and money count.

**The user's words beat the founder's pitch.** The gap between marketing copy and what users say is the value is — that's the truth.

### The Six Forcing Questions

Ask **ONE AT A TIME**. Push until the answer is specific and uncomfortable.

**Q1: Demand Reality**
> "What's the strongest evidence that someone actually wants this — not 'is interested,' but would be genuinely upset if it disappeared tomorrow?"

**Q2: Status Quo**
> "What are your users doing right now to solve this problem? What does that workaround cost them?"

**Q3: Desperate Specificity**
> "Name the actual human who needs this most. What's their title? What gets them fired?"

**Q4: Narrowest Wedge**
> "What's the smallest possible version someone would pay real money for — this week?"

**Q5: Observation & Surprise**
> "Have you watched someone use this without helping them? What surprised you?"

**Q6: Future-Fit**
> "If the world looks different in 3 years, does your product become more essential or less?"

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

Present 2-4 options with clear tradeoffs:

```
OPTION A: [Name]
  What: [Description]
  Pros: [Benefits]
  Cons: [Drawbacks]
  Effort: [S/M/L]
  
OPTION B: [Name]
  ...
```

---

## Phase 5: Design Document

Write a design document summarizing:
- Problem statement
- Chosen approach
- Key decisions and rationale
- Open questions
- Next steps
