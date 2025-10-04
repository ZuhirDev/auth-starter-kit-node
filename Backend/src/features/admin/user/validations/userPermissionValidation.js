import mongoose from "mongoose";
import z from "zod";

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ID" }
);

export const assignPermissionToUserSchema = z.object({
  userId: objectIdSchema,
  permissionIds: z.array(objectIdSchema).min(1, { message: "At least one role ID is required" }),
});

export const removePermissionFromUserSchema = z.object({
  userId: objectIdSchema,
  permissionIds: z.array(objectIdSchema).min(1, { message: "At least one role ID is required" }),
});

export const getUserPermissionSchema = z.object({
  id: objectIdSchema,
});

