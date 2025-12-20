import z from "zod";
import { t } from "#utils/i18n/index.js";

export const loginSchema = z.object({
    email: z.email({ message: t('validation:invalidEmailFormat') }),
    password: z.string().min(8, { message: t('validation:passwordMinLength') }),
});

export const registerSchema = z.object({
    name: z.string().min(2, { message: t('validation:nameMinLength') }),
    email: z.email({ message: t('validation:invalidEmailFormat') }),
    password: z.string().min(8, { message: t('validation:passwordMinLength') }),
});

export const forgotPasswordSchema = z.object({
    email: z.email({ message: t('validation:invalidEmailFormat') }),
});

export const resetPasswordSchema = z.object({
    email: z.email({ message: t('validation:invalidEmailFormat') }),
    token: z.string().length(64, { message: t('validation:invalidTokenLength') }).regex(/^[0-9a-fA-F]{64}$/, { message: t('validation:invalidTokenFormat') }),
    password: z.string().min(8, { message: t('validation:newPasswordMinLength') }),
    password_confirmation: z.string().min(8, { message: t('validation:passwordConfirmationRequired') }),
}).refine(data => data.password === data.password_confirmation, {
    message: t('validation:passwordsDoNotMatch'),
    path: ["password_confirmation"],
});