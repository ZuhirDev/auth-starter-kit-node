import mongoose from "mongoose";
import z from "zod";
import { t } from "#utils/i18n/index.js";

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: t("user:invalidId") }
);

export const assignRoleToUserSchema = z.object({
  userId: objectIdSchema,
  roleIds: z.array(objectIdSchema).min(1, { message: t("validation:roleRequired") }),
});

export const removeRoleFromUserSchema = z.object({
  userId: objectIdSchema,
  roleIds: z.array(objectIdSchema).min(1, { message: t("validation:roleRequired") }),
});

export const getUserRolesSchema = z.object({
  id: objectIdSchema,
});