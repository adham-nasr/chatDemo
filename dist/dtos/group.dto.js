import { z } from "zod";
export const createGroupSchema = z.object({
    name: z.string().min(1, "Group name is required"),
    description: z.string().optional(),
});
//# sourceMappingURL=group.dto.js.map