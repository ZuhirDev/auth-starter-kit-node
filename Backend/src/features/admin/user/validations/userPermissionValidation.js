import mongoose from "mongoose";
import z from "zod";
import { t } from "#utils/i18n/index.js";

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: t("validation:invalidId") }
);

export const assignPermissionToUserSchema = z.object({
  userId: objectIdSchema,
  permissionIds: z.array(objectIdSchema).min(1, { message: t("validation:permissionIdsRequired") }),
});

export const removePermissionFromUserSchema = z.object({
  userId: objectIdSchema,
  permissionIds: z.array(objectIdSchema).min(1, { message: t("validation:permissionIdsRequired") }),
});

export const getUserPermissionSchema = z.object({
  id: objectIdSchema,
});

