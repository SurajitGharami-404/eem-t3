import { z } from "zod";


export const AddStudentSchema = z.object({
    firstName: z.string().min(3,"First name is required").trim(),
    lastName: z.string().min(3,"Last name is required").trim(),
    email: z.string().email().trim(),
    contactNumber: z.string().min(10,"Contact Number is required").trim(),
    guardianName: z.string().min(3,"Guardian name is required").trim(),
    gender: z.enum(["male","female","others"]).default("male"),
    dateOfBirth: z.date(),
    admissionDate: z.date(),
    grade: z.string().min(1,"Grade is required").trim(),
    rollNumber : z.number().positive(),
    address: z.string().min(6,"Address is required").trim(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    pinCode: z.string().min(1, "Pin code is required"),
})

export type AddStudentRequest = z.infer<typeof AddStudentSchema>

export const AddStudentInput = z.object({
    firstName: z.string().min(3,"First name is required").trim(),
    lastName: z.string().min(3,"Last name is required").trim(),
    email: z.string().email().trim(),
    contactNumber: z.string().min(10,"Contact Number is required").trim(),
    guardianName: z.string().min(3,"Guardian name is required").trim(),
    gender: z.enum(["male","female","others"]).default("male"),
    dateOfBirth: z.date(),
    admissionDate: z.date(),
    grade: z.string().min(1,"Grade is required").trim(),
    rollNumber : z.number().positive(),
    address: z.string().min(6,"Address is required").trim(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    pinCode: z.string().min(1, "Pin code is required"),
    image:z.string().nullable().optional()
})

export type AddStudentInput = z.infer<typeof AddStudentInput>