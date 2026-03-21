// postinstall.mjs
// Detects installation directory and generates shipmate config

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DEFAULT_AGENT_OVERRIDES = {
  strategy: { model: "inherit", temperature: 0.3 },
  architect: { model: "inherit", temperature: 0.2 },
  designer: { model: "inherit", temperature: 0.2 },
  "second-opinion": { model: "inherit" }
};

function getInstallDir() {
  return __dirname;
}

function getConfigPath() {
  return join(homedir(), ".config", "opencode", "shipmate.json");
}

function ensureDir(filePath) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function mergeWithExisting(configPath, newConfig) {
  if (!existsSync(configPath)) {
    return newConfig;
  }
  
  try {
    const existing = JSON.parse(readFileSync(configPath, "utf-8"));
    return {
      ...newConfig,
      agentOverrides: {
        ...newConfig.agentOverrides,
        ...(existing.agentOverrides || {})
      }
    };
  } catch {
    return newConfig;
  }
}

function generateConfig(installDir) {
  return {
    $schema: "./node_modules/@digi4care/shipmate/schema.json",
    skills: [join(installDir, "skill")],
    agents: [join(installDir, "agent")],
    agentOverrides: DEFAULT_AGENT_OVERRIDES
  };
}

function main() {
  try {
    const installDir = getInstallDir();
    const config = generateConfig(installDir);
    const configPath = getConfigPath();
    
    ensureDir(configPath);
    
    const mergedConfig = mergeWithExisting(configPath, config);
    writeFileSync(configPath, JSON.stringify(mergedConfig, null, 2));
    
    console.log(`✓ shipmate config written to: ${configPath}`);
    console.log(`  skills: ${config.skills[0]}`);
    console.log(`  agents: ${config.agents[0]}`);
  } catch (error) {
    console.warn(`⚠ shipmate postinstall: ${error.message}`);
  }
}

main();
