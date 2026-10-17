import type { Request } from "express";
import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const createGroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
});

export const sendMessageSchema = z.object({
  group: z.string().min(1, "Group ID is required"),
  content: z.string().optional(),
  fileUrl: z.string().optional(),
  fileType: z.string().optional(),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type CreateGroupDto = z.infer<typeof createGroupSchema>;
export type SendMessageDto = z.infer<typeof sendMessageSchema>;

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    username: string;
  };
}
