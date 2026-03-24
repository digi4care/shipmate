import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { type ShipmateConfig, ShipmateConfigSchema } from "./schema.js";

const CONFIG_PATH = join(homedir(), ".config", "opencode", "shipmate.json");

export async function readShipmateConfig(): Promise<ShipmateConfig | null> {
  try {
    const content = await readFile(CONFIG_PATH, "utf-8");
    const parsed = JSON.parse(content);
    const result = ShipmateConfigSchema.safeParse(parsed);

    if (!result.success) {
      console.warn("Invalid shipmate config:", result.error.message);
      return null;
    }

    return result.data;
  } catch {
    return null;
  }
}
