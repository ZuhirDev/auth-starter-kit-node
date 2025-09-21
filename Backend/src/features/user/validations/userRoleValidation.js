import mongoose from "mongoose";
import z from "zod";

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ID" }
);

export const assignRoleToUserSchema = z.object({
  userId: objectIdSchema,
  roleId: objectIdSchema,
});

export const removeRoleFromUserSchema = z.object({
  userId: objectIdSchema,
  roleId: objectIdSchema,
});

export const getUserRolesSchema = z.object({
  id: objectIdSchema,
});