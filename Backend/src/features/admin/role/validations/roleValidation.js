import mongoose from "mongoose";
import z from "zod";

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ID" }
);

export const createRoleSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).transform(str => str.toLowerCase().trim()),
  description: z.string().optional().default(''),
  // permissions: z.array(objectIdSchema).optional().default([]),
});

export const updateRoleSchema = z.object({
  id: objectIdSchema,
  name: z.string().min(1, { message: "Name is required" }).transform(str => str.toLowerCase().trim()).optional(),
  description: z.string().optional().default(''),
  // permissions: z.array(objectIdSchema).optional().default([]),
});

export const getRoleByIdSchema = z.object({
  id: objectIdSchema,
});

export const addPermissionToRoleSchema = z.object({
  id: objectIdSchema,
  permissionIds: z.array(objectIdSchema).min(1, { message: "At least one permission ID is required" }),
});

export const removePermissionFromRoleSchema = z.object({
  id: objectIdSchema,
  permissionIds: z.array(objectIdSchema).min(1, { message: "At least one permission ID is required" }),
});

