import { z } from "zod";

export const sendMessageSchema = z.object({
  group: z.string().min(1, "Group ID is required"),
  content: z.string().optional(),
  fileUrl: z.string().optional(),
  fileType: z.string().optional(),
});

export type SendMessageDto = z.infer<typeof sendMessageSchema>;
