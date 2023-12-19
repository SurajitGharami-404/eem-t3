import { z } from "zod";


export const SchoolPaymentDetailsSchema = z.object({
    name:z.string().min(3,"School name is required").trim(),
    email:z.string().email().trim(),
    contactNumber:z.string().min(10,"Contact Number is required").trim(),
    billingDate:z.date(),
    expiryDate:z.date(),
    paymentAmount:z.string().min(1,"Payment Amount is required").trim(),
    paymentDate: z.date(),
    paymentMode: z.string(),
    transactioId:z.string(),
})

export type SchoolPaymentDetailsRequest = z.infer<typeof SchoolPaymentDetailsSchema>