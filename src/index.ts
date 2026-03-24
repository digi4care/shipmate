import type { Plugin } from "@opencode-ai/plugin";
import { loadAgentsFromSources } from "./agent-loader.js";
import { readShipmateConfig } from "./config/reader.js";
import { guardHook } from "./hooks/guard.js";
import { loadSkillsFromSources } from "./skill-loader.js";

export const ShipmatePlugin: Plugin = async (ctx) => {
  const { client } = ctx;

  const config = await readShipmateConfig();

  const skills = config?.skills?.sources ? await loadSkillsFromSources(config.skills.sources) : [];

  const agents = config?.agents?.sources ? await loadAgentsFromSources(config.agents.sources) : [];

  await client.app.log({
    body: {
      service: "shipmate",
      level: "info",
      message: `Loaded ${skills.length} skills, ${agents.length} agents`,
    },
  });

  return {
    "tool.execute.before": async (input, output) => {
      await guardHook(
        { tool: input.tool, sessionID: input.sessionID, callID: input.callID },
        { args: output.args }
      );
    },

    "tool.execute.after": async (_input, _output) => {},
  };
};

export default ShipmatePlugin;

export type { LoadedAgent, LoadedSkill } from "./types.js";
export { loadAgentsFromSources, loadSkillsFromSources, readShipmateConfig };
