import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import type { AgentSource } from "./config/schema.js";

export interface LoadedAgent {
  name: string;
  description: string;
  mode: "primary" | "subagent" | "all";
  content: string;
  path: string;
}

async function loadAgentFromFile(filePath: string): Promise<LoadedAgent | null> {
  try {
    const content = await readFile(filePath, "utf-8");

    // Parse YAML frontmatter
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return null;

    const frontmatter = match[1];
    const body = match[2];

    // Extract fields from frontmatter
    const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
    const descMatch = frontmatter.match(/^description:\s*\|?\s*(.+?)(?=\n\w|\n*$)/ms);
    const modeMatch = frontmatter.match(/^mode:\s*(.+)$/m);

    // Name from frontmatter or filename (without .md extension)
    const name = nameMatch?.[1]?.trim() || basename(filePath, ".md");

    return {
      name,
      description: descMatch?.[1]?.trim() || "",
      mode: (modeMatch?.[1]?.trim() as LoadedAgent["mode"]) || "subagent",
      content: body.trim(),
      path: filePath,
    };
  } catch {
    return null;
  }
}

export async function loadAgentsFromSources(sources: AgentSource[]): Promise<LoadedAgent[]> {
  const allAgents: LoadedAgent[] = [];

  for (const source of sources) {
    try {
      const entries = await readdir(source.path, { withFileTypes: true });

      for (const entry of entries) {
        if (!entry.isFile() || !entry.name.endsWith(".md")) continue;

        const filePath = join(source.path, entry.name);
        const agent = await loadAgentFromFile(filePath);

        if (agent) {
          allAgents.push(agent);
        }
      }
    } catch {
      // Directory doesn't exist
    }
  }

  return allAgents;
}
