import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { SkillSource } from "./config/schema.js";

export interface LoadedSkill {
  name: string;
  description: string;
  content: string;
  path: string;
}

const SKILL_FILE = "SKILL.md";

async function loadSkillFromDir(dir: string): Promise<LoadedSkill | null> {
  const skillPath = join(dir, SKILL_FILE);

  try {
    const content = await readFile(skillPath, "utf-8");

    // Parse YAML frontmatter
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return null;

    const frontmatter = match[1];
    const body = match[2];

    // Extract name and description from frontmatter
    const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
    const descMatch = frontmatter.match(/^description:\s*\|?\s*(.+?)(?=\n\w|\n*$)/ms);

    if (!nameMatch) return null;

    return {
      name: nameMatch[1].trim(),
      description: descMatch?.[1]?.trim() || "",
      content: body.trim(),
      path: dir,
    };
  } catch {
    return null;
  }
}

async function loadSkillsFromDirectory(
  dir: string,
  recursive: boolean = true,
  maxDepth: number = 5
): Promise<LoadedSkill[]> {
  const skills: LoadedSkill[] = [];

  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const subDir = join(dir, entry.name);

      // Try to load skill from this directory
      const skill = await loadSkillFromDir(subDir);
      if (skill) {
        skills.push(skill);
      }

      // Recurse if enabled
      if (recursive && maxDepth > 0) {
        const subSkills = await loadSkillsFromDirectory(subDir, recursive, maxDepth - 1);
        skills.push(...subSkills);
      }
    }
  } catch {
    // Directory doesn't exist or not readable
  }

  return skills;
}

export async function loadSkillsFromSources(sources: SkillSource[]): Promise<LoadedSkill[]> {
  const allSkills: LoadedSkill[] = [];

  for (const source of sources) {
    const skills = await loadSkillsFromDirectory(source.path, source.recursive ?? true);

    // Apply glob filter if specified
    const filtered = source.glob ? skills.filter((s) => matchesGlob(s.path, source.glob!)) : skills;

    allSkills.push(...filtered);
  }

  // Deduplicate by name
  const seen = new Set<string>();
  return allSkills.filter((skill) => {
    if (seen.has(skill.name)) return false;
    seen.add(skill.name);
    return true;
  });
}

function matchesGlob(path: string, pattern: string): boolean {
  // Simple glob matching - use picomatch for complex patterns
  const regex = new RegExp(pattern.replace(/\*/g, ".*").replace(/\?/g, "."));
  return regex.test(path);
}
