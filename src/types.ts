export interface LoadedSkill {
  name: string;
  description: string;
  content: string;
  path: string;
}

export interface LoadedAgent {
  name: string;
  description: string;
  mode: "primary" | "subagent" | "all";
  content: string;
  path: string;
}
