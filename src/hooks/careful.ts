const DESTRUCTIVE_PATTERNS = [
  /\brm\s+(-[rf]+\s+|--recursive\s+|--force\s+)/i,
  /\bDROP\s+(TABLE|DATABASE|SCHEMA)/i,
  /\bTRUNCATE\s+/i,
  /\bgit\s+push\s+(-f|--force)/i,
  /\bgit\s+reset\s+--hard/i,
  /\bgit\s+(checkout|restore)\s+\./i,
  /\bkubectl\s+delete/i,
  /\bdocker\s+(rm\s+-f|system\s+prune)/i,
];

const SAFE_EXCEPTIONS = [
  /node_modules/i,
  /\.next/i,
  /dist/i,
  /__pycache__/i,
  /\.cache/i,
  /build/i,
  /\.turbo/i,
  /coverage/i,
];

export interface ToolInput {
  tool: string;
  sessionID: string;
  callID: string;
}

export interface ToolOutput {
  args: Record<string, unknown>;
}

export const carefulHook = async (input: ToolInput, output: ToolOutput): Promise<void> => {
  if (input.tool !== "bash") return;

  const command = String(output.args.command || "");

  if (SAFE_EXCEPTIONS.some((pattern) => pattern.test(command))) {
    return;
  }

  for (const pattern of DESTRUCTIVE_PATTERNS) {
    if (pattern.test(command)) {
      throw new Error(
        `Blocked potentially destructive command: ${command}\n` +
          `Use /careful to disable this protection for this session.`
      );
    }
  }
};
