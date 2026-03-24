import type { ToolInput, ToolOutput } from "./careful.js";
import { carefulHook } from "./careful.js";
import { freezeHook } from "./freeze.js";

// Guard = careful + freeze combined
export const guardHook = async (input: ToolInput, output: ToolOutput): Promise<void> => {
  await carefulHook(input, output);
  await freezeHook(input, output);
};
