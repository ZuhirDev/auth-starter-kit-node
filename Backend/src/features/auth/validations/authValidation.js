import z from "zod";

export const loginSchema = z.object({
    email: z.email({ message: "Invalid email format" }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters'}),
});

export const registerSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.email({ message: "Invalid email format" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export const forgotPasswordSchema = z.object({
    email: z.email({ message: "Invalid email format" }),
});

export const resetPasswordSchema = z.object({
    email: z.email({ message: "Invalid email format" }),
    token: z.string().length(64, { message: 'Invalid token length' }).regex(/^[0-9a-fA-F]{64}$/, { message: "Invalid token format" }),
    password: z.string().min(8, { message: "New password must be at least 8 characters" }),
    password_confirmation: z.string().min(8, { message: "Password confirmation is required" }),
}).refine(data => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
});