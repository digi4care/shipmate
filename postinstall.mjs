// postinstall.mjs
// Detects installation directory and generates shipmate config

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONFIG_DIR = join(homedir(), ".config", "opencode");
const CONFIG_PATH = join(CONFIG_DIR, "shipmate.json");

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
      // Preserve any user customizations
      ...(existing.skills?.enable ? { skills: { ...newConfig.skills, enable: existing.skills.enable } } : {}),
      ...(existing.skills?.disable ? { skills: { ...newConfig.skills, disable: existing.skills.disable } } : {}),
    };
  } catch {
    return newConfig;
  }
}

function generateConfig(installDir) {
  return {
    $schema: "./node_modules/@digi4care/shipmate/schema.json",
    skills: {
      sources: [
        { path: join(installDir, "skill"), recursive: true }
      ]
    },
    agents: {
      sources: [
        { path: join(installDir, "agent") }
      ]
    }
  };
}

function main() {
  try {
    const installDir = __dirname;
    const config = generateConfig(installDir);
    
    ensureDir(CONFIG_PATH);
    
    const mergedConfig = mergeWithExisting(CONFIG_PATH, config);
    writeFileSync(CONFIG_PATH, JSON.stringify(mergedConfig, null, 2));
    
    console.log(`✓ shipmate config written to: ${CONFIG_PATH}`);
    console.log(`  skills: ${config.skills.sources[0].path}`);
    console.log(`  agents: ${config.agents.sources[0].path}`);
  } catch (error) {
    console.warn(`⚠ shipmate postinstall: ${error.message}`);
  }
}

main();
