---
name: release-notes
description: |
  Post-ship documentation update. Runs after /ship to update all documentation
  files (README, CHANGELOG, CLAUDE.md, API docs) based on the diff. Automated, minimal stops for risky or subjective changes. Use when "ship completed" or "update docs".
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
  - Update CLAUDE.md if architecture changed
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
