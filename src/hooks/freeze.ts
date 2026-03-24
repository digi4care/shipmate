import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import type { ToolInput, ToolOutput } from "./careful.js";

const STATE_DIR = join(homedir(), ".shipmate");
const FREEZE_FILE = join(STATE_DIR, "freeze-dir.txt");

export async function setFreezeDir(directory: string): Promise<void> {
  if (!existsSync(STATE_DIR)) {
    await mkdir(STATE_DIR, { recursive: true });
  }

  // Ensure trailing slash
  const normalized = `${directory.replace(/\/$/, "")}/`;
  await writeFile(FREEZE_FILE, normalized);
}

export async function getFreezeDir(): Promise<string | null> {
  try {
    return await readFile(FREEZE_FILE, "utf-8");
  } catch {
    return null;
  }
}

export const freezeHook = async (input: ToolInput, output: ToolOutput): Promise<void> => {
  if (input.tool !== "edit" && input.tool !== "write") return;

  const freezeDir = await getFreezeDir();
  if (!freezeDir) return;

  const filePath = String(output.args.file_path || output.args.filePath || "");

  if (!filePath.startsWith(freezeDir)) {
    throw new Error(
      `Edit blocked: ${filePath}\n` +
        `Edits are restricted to: ${freezeDir}\n` +
        `Run /unfreeze to remove this restriction.`
    );
  }
};
