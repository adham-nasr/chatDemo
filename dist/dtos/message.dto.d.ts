import { z } from "zod";
export declare const sendMessageSchema: z.ZodObject<{
    sender: z.ZodString;
    group: z.ZodString;
    content: z.ZodOptional<z.ZodString>;
    fileUrl: z.ZodOptional<z.ZodString>;
    fileType: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SendMessageDto = z.infer<typeof sendMessageSchema>;
//# sourceMappingURL=message.dto.d.ts.map