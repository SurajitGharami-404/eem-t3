import { z } from "zod";
export const AddTeacherSchema = z.object({
    firstName: z.string().min(3,"First name is required").trim(),
    lastName: z.string().min(3,"Last name is required").trim(),
    email: z.string().email().trim(),
    contactNumber: z.string().min(10,"Contact Number is required").trim(),
    gender: z.enum(["male","female","others"]).default("male"),
    dateOfBirth: z.date(),
    joiningDate: z.date(),
    grades: z.string().min(1,"Grades is required").trim(),
    subjects: z.string().min(1,"Subjects is required"),
    address: z.string().min(6,"Address is required").trim(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    pinCode: z.string().min(1, "Pin code is required"),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
  }).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );

export type AddTeacherRequest = z.infer<typeof AddTeacherSchema>

export const AddTeacherInput = z.object({
    firstName: z.string().min(3,"First name is required").trim(),
    lastName: z.string().min(3,"Last name is required").trim(),
    email: z.string().email().trim(),
    contactNumber: z.string().min(10,"Contact Number is required").trim(),
    gender: z.enum(["male","female","others"]).default("male"),
    dateOfBirth: z.date(),
    joiningDate: z.date(),
    grades: z.string().min(1,"Grades is required").trim(),
    subjects: z.string().min(1,"Subjects is required"),
    address: z.string().min(6,"Address is required").trim(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    pinCode: z.string().min(1, "Pin code is required"),
    image: z.string().optional(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
  }).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );
export type AddTeacherInput = z.infer<typeof AddTeacherInput>