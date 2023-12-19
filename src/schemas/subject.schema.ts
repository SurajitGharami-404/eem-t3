import { z } from "zod";

export const AddSubjectSchema = z.object({
    name:z.string().min(1,"Subject name is required"),
    type:z.string().min(1,"Subject type is required"),
})

export type AddSubjectRequest = z.infer<typeof AddSubjectSchema> 