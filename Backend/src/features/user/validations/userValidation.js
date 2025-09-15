import z from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export const updatePasswordSchema = z.object({
  current_password: z.string().min(1, { message: "Current password is required" }),
  password: z.string().min(8, { message: "New password must be at least 8 characters" }),
  password_confirmation: z.string().min(8, { message: "Password confirmation is required" }),
}).refine(data => data.current_password !== data.password, {
  message: "New password must be different from current password",
  path: ["password"],
}).refine(data => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});


export const verifyEmailSchema = z.object({
  id: z.string().min(1, { message: 'Id is required' }),
  token: z.string().length(64, { message: 'Invalid token length' }).regex(/^[0-9a-fA-F]{64}$/, { message: "Invalid token format" }),
  expires: z.string().refine(val => { return /^\d+$/.test(val); }, { message: "Invalid expiration date format" }),
});