import mongoose from "mongoose";
import z from "zod";
import { t } from "#utils/i18n/index.js";

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: t("validation:invalidId") }
);

export const createRoleSchema = z.object({
  name: z.string().min(1, { message: t("validation:nameIsRequired") }).transform(str => str.toLowerCase().trim()),
  description: z.string().optional().default(''),
  // permissions: z.array(objectIdSchema).optional().default([]),
});

export const updateRoleSchema = z.object({
  id: objectIdSchema,
  name: z.string().min(1, { message: t("validation:nameIsRequired") }).transform(str => str.toLowerCase().trim()).optional(),
  description: z.string().optional().default(''),
  // permissions: z.array(objectIdSchema).optional().default([]),
});

export const getRoleByIdSchema = z.object({
  id: objectIdSchema,
});

export const addPermissionToRoleSchema = z.object({
  id: objectIdSchema,
  permissionIds: z.array(objectIdSchema).min(1, { message: t("validation:permissionIdsRequired") }),
});

export const removePermissionFromRoleSchema = z.object({
  id: objectIdSchema,
  permissionIds: z.array(objectIdSchema).min(1, { message: t("validation:permissionIdsRequired") }),
});

