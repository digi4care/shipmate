# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-03-24

### Added

- **TypeScript support** — Plugin source migrated from JavaScript to TypeScript with full type definitions
- **References structure** — All 13 skills now use progressive disclosure with `references/` folders containing detailed `.mdx` documentation
- **GitHub Actions CI** — Automated build and test pipeline
- **AGENTS.md** — AI agent instructions migrated from gstack's CLAUDE.md format
- **TODO tracking system** — Dual tracking with `TODOS.md` (roadmap) and `TODOS-beads.md` (BEADS issue tracker)
- **Hooks as TypeScript** — `/careful`, `/freeze`, `/guard`, `/unfreeze` hooks now native TypeScript

### Changed

- **Skill documentation** — All SKILL.md files are now concise (~150 lines) with detailed content in `references/*.mdx` files
- **File references** — Skills now reference `AGENTS.md` and `TODO.md` instead of `CLAUDE.md` and `TODOS.md`

### Skills with new references structure

| Skill | Reference files |
|-------|----------------|
| `/brainstorm` | yc-questions.mdx, design-template.mdx |
| `/browse` | browser-commands.mdx, snapshot-format.mdx |
| `/browser-auth` | browser-setup.mdx |
| `/design-audit` | design-principles.mdx, audit-passes.mdx, report-template.mdx |
| `/design-help` | design-guidelines.mdx, design-principles.mdx, external-resources.mdx |
| `/investigate` | root-cause-patterns.mdx, debug-template.mdx |
| `/qa` | qa-checklist.mdx, health-score.mdx |
| `/qa-quick` | workflow-playbook.mdx, error-handling.mdx, test-patterns.mdx |
| `/release-notes` | stop-conditions.mdx, doc-voice.mdx |
| `/retro` | metrics-guide.mdx, retro-template.mdx |
| `/review` | review-checklist.mdx, review-template.mdx |
| `/ship` | ship-phases.mdx, pr-template.mdx |

### For contributors

- TypeScript build pipeline with `npm run build`
- Linting with Biome (`npm run lint`)
- Markdown linting with `.markdownlint.json`
- Removed old `plugin/` folder (shell scripts replaced by TypeScript hooks)

---

## [0.3.0] - 2026-03-21

### Added

- Plugin infrastructure with package.json, src/index.js, config/, docs
- Config-based skill discovery system

---

## [0.2.0] - 2026-03-20

### Added

- Initial skill structure with brainstorm, browse, qa, review, ship, retro
- Agent definitions (strategy, architect, designer, second-opinion)
- Symlinks from .opencode/ to skill/ and agent/

---

## [0.1.0] - 2026-03-18

### Added

- Initial commit: shipmate OpenCode plugin skeleton
- MIT license
- Basic project structure
