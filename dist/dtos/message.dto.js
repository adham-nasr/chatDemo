import { z } from "zod";
export const sendMessageSchema = z.object({
    sender: z.string().min(1, "Sender ID is required"),
    group: z.string().min(1, "Group ID is required"),
    content: z.string().optional(),
    fileUrl: z.string().optional(),
    fileType: z.string().optional(),
});
//# sourceMappingURL=message.dto.js.map