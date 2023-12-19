import { z } from "zod";
import { fileSchema } from "./constant";

export const AddRequestSchema = z.object({
    subject: z.string().min(1,"Subject is required"),
    startingDate:z.date(),
    endingDate:z.date(),
    message:z.string().min(1,"Note is required"),
    attachment:fileSchema.optional(),
})

export type AddRequestRequest = z.infer<typeof AddRequestSchema>