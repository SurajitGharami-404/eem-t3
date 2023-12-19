import { z } from "zod";


export const SchoolTableSearchSchema = z.object({
  name: z.string().min(3, "school name is required").default(""),
  status: z.enum(["active", "in-active"]).default("active"),
});

export type SchoolTableSearchRequest = z.infer<typeof SchoolTableSearchSchema>;

export const AddSchoolSchema = z
  .object({
    name: z.string().min(3, "School name required").trim(),
    email: z.string().email().min(1, "Email required").trim(),
    contactNumber: z.string().min(10, "Contact Number required").trim(),
    address: z.string().min(6, "Address required").max(255).trim(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    pinCode: z.string().min(1, "Pin code is required"),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );
export type AddSchoolRequest = z.infer<typeof AddSchoolSchema>;

export const AddSchoolInput = z
  .object({
    name: z.string().min(3, "School name required").trim(),
    email: z.string().email().min(1, "Email required").trim(),
    contactNumber: z.string().min(10, "Contact Number required").trim(),
    address: z.string().min(6, "Address required").max(255).trim(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    pinCode: z.string().min(1, "Pin code is required"),
    image: z.string().nullable(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );
export type AddSchoolInput = z.infer<typeof AddSchoolInput>;

export const SchoolDetailsSchema = z
  .object({
    name: z.string().min(3, "Name required").trim().default(""),
    email: z.string().email().min(1, "Email required").trim().default(""),
    contactNumber: z
      .string()
      .min(10, "Mobile Number required")
      .trim()
      .default(""),
    address: z.string().min(6, "Address required").max(255).trim().default(""),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable().optional(),
    pinCode: z.string().min(1, "Pin code is required"),
  })

export type SchoolDetailsRequest = z.infer<typeof SchoolDetailsSchema>;

export const FindSchoolByIdSchema = z.object({
  id:z.string()
})

export type FindSchoolByIdInput = z.infer<typeof FindSchoolByIdSchema>

export const GetAllSchoolInput = z.object({
  page: z.number(),
  active: z.boolean(),
  name: z.string().optional(),
});

export type GetAllSchoolInput = z.infer<typeof GetAllSchoolInput>;
