import { z } from "zod";
export declare const createGroupSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateGroupDto = z.infer<typeof createGroupSchema>;
//# sourceMappingURL=group.dto.d.ts.map