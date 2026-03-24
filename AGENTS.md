# Shipmate — AI Engineering Workflow for OpenCode

Shipmate is a collection of SKILL.md files that give AI agents structured roles for
software development. Each skill is a specialist: CEO reviewer, eng manager,
designer, QA lead, release engineer, debugger, and more.

## Available skills

Skills live in `skill/` (symlinked to `.opencode/skills/`). Invoke them by name.

| Skill | What it does |
|-------|-------------|
| `/brainstorm` | YC office hours for product design. Ask hard questions before proposing solutions. |
| `/ship` | Complete deployment workflow. Merge branch, run tests, bump version, create PR, deploy. |
| `/review` | Pre-landing PR review. Analyzes diff for structural issues tests don't catch. |
| `/qa` | Full QA workflow. Test web applications like a real user, find bugs, fix them. |
| `/qa-quick` | Quick QA check without full verification. Runs tests and lint on changed files. |
| `/retro` | Weekly engineering retrospective. Analyzes commit history and code quality metrics. |
| `/browse` | Browser automation for QA testing using Playwright tools. |
| `/browser-auth` | Set up browser authentication for QA testing. |
| `/investigate` | Systematic debugging workflow. Investigate first, fix second. |
| `/design-audit` | Live site visual QA. Reviews implemented designs against DESIGN.md. |
| `/design-help` | Shipmate design consultation. Creates or updates DESIGN.md. |
| `/release-notes` | Post-ship documentation update. Updates README, CHANGELOG, AGENTS.md, API docs. |
| `/unfreeze` | Clear the edit restriction boundary set by the freeze hook. |

## Available agents

Agents live in `agent/` (symlinked to `.opencode/agent/`).

| Agent | What it does |
|-------|-------------|
| `/strategy` | CEO/founder-mode plan review. Rethink the problem, find the 10-star product. |
| `/architect` | Engineering manager-mode plan review. Lock in execution plan, architecture, tests. |
| `/designer` | Designer's eye plan review. Rate each design dimension 0-10, explain what makes it a 10. |
| `/second-opinion` | Multi-AI second opinion using OpenAI Codex CLI. |

## Build commands

```bash
npm install              # install dependencies
npm run build            # build plugin
npm test                 # run tests
npm run lint             # lint check
```

## Project structure

```
shipmate/
├── skill/           # Skills (SKILL.md files)
│   ├── ship/
│   ├── review/
│   ├── qa/
│   ├── retro/
│   └── ...
├── agent/           # Agents (XML configuration)
│   ├── strategy.md
│   ├── architect.md
│   ├── designer.md
│   └── second-opinion.md
├── src/             # Plugin source code
│   ├── index.ts     # Plugin entry point
│   ├── config/      # Configuration
│   └── hooks/       # Hook implementations
├── config/          # Plugin configuration
├── docs/            # Documentation
├── .opencode/       # OpenCode config (symlinks to skill/ and agent/)
└── workspace/       # Workspace for generated files
```

## Key conventions

- **Platform-agnostic design**: Skills must NEVER hardcode framework-specific commands. Read AGENTS.md for project-specific config. If missing, ask the user.

- **No primary agent / intent routing**: User learns the tools. Each skill is a specialist.

- **Model-agnostic agents**: Agents inherit from primary model.

- **LLM Council pattern**: Plan reviews use multiple perspectives (strategy, architect, designer).

- **Safety-first hooks**: `/careful`, `/freeze`, `/guard` for destructive operations.

## Issue tracking

Shipmate uses two tracking systems:

1. **TODOS.md** — Long-term roadmap and feature planning
2. **TODOS-beads.md** — Active BEADS issue tracker for migration work

Use `TODO.md` as the router to choose the right system.

## Writing SKILL.md files

SKILL.md files are **prompt templates read by AI agents**. Each bash code block runs in a separate shell — variables do not persist between blocks.

Rules:
- **Use natural language for logic and state.** Don't use shell variables to pass state between code blocks.
- **Keep bash blocks self-contained.** Each code block should work independently.
- **Express conditionals as English.** Instead of nested `if/elif/else` in bash, write numbered decision steps.

## Commit style

**Always bisect commits.** Every commit should be a single logical change. When you've made multiple changes (e.g., a rename + a rewrite + new tests), split them into separate commits before pushing.

## Philosophy

Shipmate is inspired by [gstack](https://github.com/garrytan/gstack) (Garry Tan) but built as a standalone OpenCode plugin with its own architecture and feature set.

**Key principles:**
- No primary agent / intent routing — user learns the tools
- Model-agnostic agents — inherit from primary model
- LLM Council pattern for plan reviews
- Safety-first hooks for destructive operations
