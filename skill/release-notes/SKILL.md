---
name: release-notes
description: |
  Post-ship documentation update. Runs after /ship to update all documentation
  files (README, CHANGELOG, AGENTS.md, API docs) based on the diff. Automated, minimal stops for risky or subjective changes. Use when "ship completed" or "update docs".
triggers:
  - /release-notes
  - /document-release
  - update docs
  - update documentation
  - changelog
workflow:
  - Analyze diff for changed files and features
  - Update README.md with new features/changes
  - Update CHANGELOG.md with release notes
  - Update AGENTS.md if architecture changed
  - Update API documentation if endpoints changed
---

# Release Notes

Post-ship documentation update. Runs **after `/ship`** to update all documentation files based on the diff.

## When to Use

Use when:
- `/release-notes` or `/document-release`
- "update docs" or "update documentation"
- "changelog" or "ship completed"
- Post-ship documentation needed

## Do Not Use For

- Writing new documentation (write directly)
- Creating release (use ship skill)
- Code review (use review skill)
- QA testing (use qa skill)

## Workflow

1. **Pre-flight:** Check you're on a feature branch
2. **Diff analysis:** Understand what changed
3. **Discover docs:** Find all `.md` files in repo
4. **Update docs:** Edit documentation to reflect changes
5. **Verify:** Ensure no broken links or stale references

## Error Handling

| Issue | Action |
|-------|--------|
| No diff found | Report: "No changes to document" |
| Main branch | Warn: "Should run on feature branch after /ship" |
| Conflicting docs | Stop, ask user to resolve |
| Broken links detected | Report, suggest fixes |

## Quick Tests

**Should trigger:**
- Update the changelog
- Document this release
- /release-notes
- Update docs after shipping

**Should not trigger:**
- Write new docs from scratch
- Create a release
- Review this PR
- Test the app

## References

- [stop-conditions.mdx](references/stop-conditions.mdx) — When to stop and ask for confirmation
- [doc-voice.mdx](references/doc-voice.mdx) — Documentation voice and formatting guidelines
- [Keep a Changelog](https://keepachangelog.com/) — Changelog best practices
- [Conventional Commits](https://www.conventionalcommits.org/) — Commit message format
