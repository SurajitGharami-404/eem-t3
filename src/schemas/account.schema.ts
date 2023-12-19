import { z } from "zod";
import { fileSchema } from "./constant";

export const SchoolAccountDetailsSchema = z.object({
    name:z.string().min(3,"School name is required").trim(),
    email:z.string().email().trim(),
    contactNumber:z.string().min(10,"Contact Number is required").trim(),
    billingDate:z.date(),
    expiryDate:z.date(),
    paymentAmount:z.string().min(1,"Payment Amount is required").trim(),
    invoice:fileSchema
})

export type SchoolAccountDetailsRequest = z.infer<typeof SchoolAccountDetailsSchema>