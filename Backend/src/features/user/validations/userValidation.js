import z from "zod";
import { t } from "#utils/i18n/index.js";

export const updateUserSchema = z.object({
  name: z.string().min(1, { message: t('validation:nameIsRequired') }),
});

export const updatePasswordSchema = z.object({
  current_password: z.string().min(1, { message: t('validation:currentPasswordIsRequired') }),
  password: z.string().min(8, { message: t('validation:newPasswordMinLength') }),
  password_confirmation: z.string().min(8, { message: t('validation:passwordConfirmationRequired') }),
}).refine(data => data.current_password !== data.password, {
  message: t('validation:newPasswordMustBeDifferent'),
  path: ["password"],
}).refine(data => data.password === data.password_confirmation, {
  message: t('validation:passwordsDoNotMatch'),
  path: ["password_confirmation"],
});

export const verifyEmailSchema = z.object({
  id: z.string().min(1, { message: t('validation:idIsRequired') }),
  token: z.string().length(64, { message: t('validation:invalidTokenLength') }).regex(/^[0-9a-fA-F]{64}$/, { message: t('validation:invalidTokenFormat') }),
  expires: z.string().refine(val => /^\d+$/.test(val), { message: t('validation:invalidExpirationDateFormat') }),
});