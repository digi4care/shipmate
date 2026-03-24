---
name: ship
description: Complete deployment workflow. Merge branch, run tests, bump version, create PR, and deploy. Use when ready to ship code or "deploy this" or "ship it".
license: MIT
compatibility: opencode
metadata:
  author: shipmate
  version: 1.0.0
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

### Phase 1: Pre-Flight Checks

```bash
# Check working tree is clean
git status --porcelain
# Expected: empty output

# Check current branch
git branch --show-current

# Verify tests pass
npm test || bun test || pnpm test
```

**Stop if:**
- Working tree dirty → commit or stash first
- Tests failing → fix before shipping
- On main/master → create feature branch first

### Phase 2: Branch Integration

```bash
# Fetch latest
git fetch origin

# Rebase on base branch
git rebase origin/main

# Resolve conflicts if any
# Then continue: git rebase --continue
```

**Stop if:**
- Merge conflicts → resolve manually, never force
- Rebase fails → merge instead if appropriate

### Phase 3: Quality Gates

```bash
# Run linting
npm run lint || bun run lint

# Run type check (TypeScript)
npm run typecheck || bun run typecheck

# Run full test suite
npm test -- --coverage || bun test --coverage

# Build production
npm run build || bun run build
```

**Stop if:**
- Lint errors → fix before shipping
- Type errors → fix before shipping
- Test failures → fix before shipping
- Build fails → fix before shipping

### Phase 4: Version Management

```bash
# Check current version
cat package.json | grep '"version"'

# Bump version based on changes
npm version patch  # Bug fixes
npm version minor  # New features
npm version major  # Breaking changes

# Or manual bump
# Edit package.json version field
```

**Version bump rules:**
- `patch` (0.0.x): Bug fixes, no new features
- `minor` (0.x.0): New features, backward compatible
- `major` (x.0.0): Breaking changes

### Phase 5: Create Pull Request

```bash
# Push branch
git push -u origin HEAD

# Create PR using gh CLI
gh pr create --title "feat: description" --body "$(cat <<'EOF'
## Summary
- Change 1
- Change 2

## Test plan
- [ ] Test case 1
- [ ] Test case 2
EOF
)"
```

**PR requirements:**
- Clear summary of changes
- Test plan with checkboxes
- Reference to related issues

### Phase 6: Merge and Deploy

```bash
# Wait for CI to pass (optional check)
gh pr checks

# Squash and merge (preferred)
gh pr merge --squash --delete-branch

# Or merge commit
gh pr merge --merge --delete-branch

# Pull latest
git checkout main && git pull

# Tag release
git tag -a v$(node -p "require('./package.json').version") -m "Release"

# Push tags
git push origin --tags
```

### Phase 7: Post-Deploy

```bash
# Verify deployment
curl -s https://your-app.com/health || echo "Check deployment status"

# Update changelog
# Edit CHANGELOG.md with release notes

# Notify team (optional)
# Slack, Discord, email, etc.
```

## Error Handling

| Error | Action |
|-------|--------|
| Working tree dirty | Commit or stash changes first |
| Tests failing | Fix tests, do not skip |
| Merge conflicts | Resolve manually, never force push |
| CI failing | Fix CI issues before merge |
| Deploy fails | Rollback, investigate, fix |
| Version already tagged | Bump version again |

## Quick Reference

```
1. Pre-flight: clean tree, passing tests
2. Integrate: rebase on main
3. Quality: lint, typecheck, test, build
4. Version: bump appropriately
5. PR: push, create with summary
6. Deploy: merge, tag, push
7. Verify: check deployment health
```

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

## Configuration

Override defaults in `~/.shipmate/config.json`:

```json
{
  "ship": {
    "baseBranch": "main",
    "autoTag": true,
    "deleteBranch": true,
    "requireTests": true,
    "requireReview": true
  }
}
```

## Integration with Other Skills

- **review** → Run before shipping for code review
- **qa** → Run before shipping for quality assurance
- **retro** → Run after shipping for retrospective
- **document-release** → Run after shipping to update docs

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

---

## References

- [Semantic Versioning](https://semver.org/) — Version bump strategy
- [Trunk Based Development](https://trunkbaseddevelopment.com/) — CI/CD best practices
