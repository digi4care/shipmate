import { z } from "zod";

export const SkillSourceSchema = z.object({
  path: z.string(),
  recursive: z.boolean().optional().default(true),
  glob: z.string().optional(),
});

export const AgentSourceSchema = z.object({
  path: z.string(),
});

export const ShipmateConfigSchema = z.object({
  $schema: z.string().optional(),
  skills: z
    .object({
      sources: z.array(SkillSourceSchema).optional(),
      enable: z.array(z.string()).optional(),
      disable: z.array(z.string()).optional(),
    })
    .optional(),
  agents: z
    .object({
      sources: z.array(AgentSourceSchema).optional(),
    })
    .optional(),
});

export type ShipmateConfig = z.infer<typeof ShipmateConfigSchema>;
export type SkillSource = z.infer<typeof SkillSourceSchema>;
export type AgentSource = z.infer<typeof AgentSourceSchema>;
