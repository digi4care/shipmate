import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const STATE_DIR = join(homedir(), ".shipmate");
const FREEZE_FILE = join(STATE_DIR, "freeze-dir.txt");

export async function clearFreezeDir(): Promise<boolean> {
  try {
    if (existsSync(FREEZE_FILE)) {
      await unlink(FREEZE_FILE);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
