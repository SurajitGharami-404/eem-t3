import { z } from "zod";

export const AddGradeSchema = z.object({
    class:z.string().min(1,"Class is required"),
    section:z.string().min(1,"Section is required")
})

export type AddGradeRequest = z.infer<typeof AddGradeSchema> 