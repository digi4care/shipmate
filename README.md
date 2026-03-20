# Shipmate

AI development workflow plugin for OpenCode — plan review, QA, shipping, retrospectives.

## Installation

```bash
npm install @oh-my-opencode/shipmate
```

## Agents (4)

| Agent | Trigger | Description |
|-------|---------|-------------|
| `/strategy` | Plan review | CEO/founder-mode review with 4 scope modes |
| `/architect` | Engineering review | Lock in execution plan, architecture, tests |
| `/designer` | Design review | 7-pass visual QA, 0-10 scoring |
| `/second-opinion` | Code review | Independent second opinion on code changes |

## Skills (14)

| Skill | Trigger | Description |
|-------|---------|-------------|
| `/ship` | Ship PR | Fully automated ship workflow |
| `/review` | Pre-landing review | Code quality review before merge |
| `/qa` | QA testing | Full QA with browser automation |
| `/qa-quick` | Quick test | Fast verification on changed files |
| `/retro` | Weekly retro | Engineering retrospective analytics |
| `/browse` | Browser testing | Headless Chromium automation |
| `/browser-auth` | Cookie import | Import browser cookies for auth |
| `/investigate` | Debug | Systematic debugging workflow |
| `/design-audit` | Visual QA | Live site design review |
| `/design-help` | Design system | Create or update DESIGN.md |
| `/brainstorm` | Office hours | YC-style product consultation |
| `/release-notes` | Doc updates | Post-ship documentation |
| `/shipmate-upgrade` | Update plugin | Check for and apply updates |
| `/unfreeze` | Clear boundary | Remove edit restriction |

## Hooks (4)

| Hook | Trigger | Description |
|------|---------|-------------|
| `/careful` | Destructive commands | Warn on rm -rf, DROP TABLE, etc. |
| `/freeze` | Scope lock | Restrict edits to directory |
| `/guard` | Combined | careful + freeze together |
| `/unfreeze` | Clear | Remove freeze boundary |

## Philosophy

Shipmate is inspired by [gstack](https://github.com/garrytan/gstack) (Garry Tan) but built as a standalone OpenCode plugin with its own architecture and feature set.

**Key principles:**
- No primary agent / intent routing — user learns the tools
- Model-agnostic agents — inherit from primary model
- LLM Council pattern for plan reviews
- Safety-first hooks for destructive operations

## License

MIT © OhMyOpenCode
