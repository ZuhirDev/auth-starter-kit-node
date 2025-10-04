import mongoose from "mongoose";
import z from "zod";

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ID" }
);

export const assignRoleToUserSchema = z.object({
  userId: objectIdSchema,
  roleIds: z.array(objectIdSchema).min(1, { message: "At least one role ID is required" }),
});

export const removeRoleFromUserSchema = z.object({
  userId: objectIdSchema,
  roleIds: z.array(objectIdSchema).min(1, { message: "At least one role ID is required" }),
});

export const getUserRolesSchema = z.object({
  id: objectIdSchema,
});