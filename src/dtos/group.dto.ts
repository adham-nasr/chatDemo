import { z } from "zod";

export const createGroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
});

export type CreateGroupDto = z.infer<typeof createGroupSchema>;
