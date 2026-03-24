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

## Automation Philosophy

- **Automated:** Make obvious factual updates directly
- **Minimal stops:** Only stop for risky/subjective decisions
- **Polish only:** Minor wording improvements, no content rewriting

## Stop Conditions

**Only stop for:**
- Risky/questionable doc changes (narrative, philosophy, security)
- VERSION bump decisions
- New TODOS items to add
- Cross-doc contradictions that are narrative

**Never stop for:**
- Factual corrections from the diff
- Adding items to tables/lists
- Updating paths, counts, version numbers
- Fixing stale cross-references
- CHANGELOG voice polish

## Workflow

1. **Pre-flight:** Check you're on a feature branch
2. **Diff analysis:** Understand what changed
3. **Discover docs:** Find all `.md` files in repo
4. **Update docs:** Edit documentation to reflect changes
5. **Verify:** Ensure no broken links or stale references

---

## When to Use

Use when:
- /release-notes
- /document-release
- update docs
- update documentation
- changelog
- ship completed
- post-ship documentation

## Do Not Use For

- Writing new documentation (write directly)
- Creating release (use ship skill)
- Code review (use review skill)
- QA testing (use qa skill)

---

## Error Handling

| Issue | Action |
|-------|--------|
| No diff found | Report: "No changes to document" |
| Main branch | Warn: "Should run on feature branch after /ship" |
| Conflicting docs | Stop, ask user to resolve |
| Broken links detected | Report, suggest fixes |

---

## Quick Tests

Should trigger:
- Update the changelog
- Document this release
- /release-notes
- Update docs after shipping

Should not trigger:
- Write new docs from scratch
- Create a release
- Review this PR
- Test the app

---

## References

- [Keep a Changelog](https://keepachangelog.com/) — Changelog best practices
- [Conventional Commits](https://www.conventionalcommits.org/) — Commit message format
