import { z } from "zod";
import { fileSchema } from "./constant";

export const AddNoteSchema = z.object({
    name:z.string().min(3,"Topic name is required"),
    subject: z.string().min(1,"Subject is required"),
    grade:z.string().min(1,"Grade is required"),
    date:z.date(),
    note:z.string().min(1,"Note is required"),
    attachment:fileSchema.optional(),
})

export type AddNoteRequest = z.infer<typeof AddNoteSchema>