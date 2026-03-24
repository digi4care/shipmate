---
name: ship
description: Complete deployment workflow. Merge branch, run tests, bump version, create PR, and deploy. Use when ready to ship code or "deploy this" or "ship it".
license: MIT
compatibility: opencode
metadata:
  author: shipmate
  version: 1.1.0
---

# Ship: Deploy Your Code

Complete deployment workflow from branch to production.

**Core principle:** Ship safely, ship often.

## When to Use

Use when:

- ship this
- deploy
- release
- merge and deploy
- push to production
- ship it
- create release
- version bump
- ready to ship

Do not use for:

- initial development (use appropriate dev skill)
- debugging issues (use investigate skill)
- code review (use review skill)
- QA testing (use qa skill)

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| Target | auto-detect | Branch to ship (default: current) |
| Base | main | Target branch to merge into |
| Version | auto | Version bump strategy (patch/minor/major) |
| SkipTests | false | Skip test suite (dangerous) |

## Workflow

1. **Pre-Flight Checks** — Verify clean tree and passing tests
2. **Branch Integration** — Fetch latest, rebase on base branch
3. **Quality Gates** — Run lint, typecheck, test, build
4. **Version Management** — Bump version appropriately
5. **Create PR** — Push branch, create with summary
6. **Merge & Deploy** — Merge, tag release, push tags
7. **Post-Deploy** — Verify deployment, update changelog

**Quick reference:**

```
1. Pre-flight: clean tree, passing tests
2. Integrate: rebase on main
3. Quality: lint, typecheck, test, build
4. Version: bump appropriately
5. PR: push, create with summary
6. Deploy: merge, tag, push
7. Verify: check deployment health
```

For detailed phase commands, see `references/ship-phases.mdx`.

## Error Handling

| Error | Action |
|-------|--------|
| Working tree dirty | Commit or stash changes first |
| Tests failing | Fix tests, do not skip |
| Merge conflicts | Resolve manually, never force push |
| CI failing | Fix CI issues before merge |
| Deploy fails | Rollback, investigate, fix |
| Version already tagged | Bump version again |

## Safety Rules

**Never:**

- Ship with failing tests
- Force push to main/master
- Skip version tagging
- Delete branch before merge confirmed
- Ship on Friday afternoon (unless emergency)

**Always:**

- Verify tests pass locally
- Create PR for code review
- Tag releases with version
- Keep changelog updated
- Verify deployment after ship

## Quick Tests

Should trigger:

- Ship this feature
- Deploy to production
- Create a release
- Merge and deploy this branch
- Ready to ship

Should not trigger:

- Write tests for this
- Review this code
- Debug this error
- Investigate this issue

## Red Flags

**STOP shipping if:**

- "Tests are flaky, ship anyway"
- "I'll fix it in a follow-up"
- "This is a quick hotfix" (without proper process)
- "Just skip the tests this time"
- "The CI is broken but it works locally"

## Integration with Other Skills

- **review** → Run before shipping for code review
- **qa** → Run before shipping for quality assurance
- **retro** → Run after shipping for retrospective
- **release-notes** → Run after shipping to update docs

## Verification Checklist

Before marking ship complete:

- [ ] Working tree was clean
- [ ] Tests passed locally
- [ ] Branch rebased on main
- [ ] Quality gates passed
- [ ] Version bumped appropriately
- [ ] PR created with summary
- [ ] CI passed
- [ ] Merged to main
- [ ] Release tagged
- [ ] Deployment verified
- [ ] Changelog updated

## References

- `references/ship-phases.mdx` — Detailed phase-by-phase execution guide
- `references/pr-template.mdx` — PR body template and conventions

## External Links

- [Semantic Versioning](https://semver.org/) — Version bump strategy
- [Trunk Based Development](https://trunkbaseddevelopment.com/) — CI/CD best practices
