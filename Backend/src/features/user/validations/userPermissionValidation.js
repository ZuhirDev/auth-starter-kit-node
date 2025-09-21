import mongoose from "mongoose";
import z from "zod";

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ID" }
);

export const assignPermissionToUserSchema = z.object({
  userId: objectIdSchema,
  permissionId: objectIdSchema,
});

export const removePermissionFromUserSchema = z.object({
  userId: objectIdSchema,
  permissionId: objectIdSchema,
});

export const getUserPermissionSchema = z.object({
  id: objectIdSchema,
});

