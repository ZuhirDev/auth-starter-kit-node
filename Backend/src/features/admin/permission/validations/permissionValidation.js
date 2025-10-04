import mongoose from "mongoose";
import z from "zod";

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ID" }
);

export const createPermissionSchema = z.object({
  name: z.enum(['create', 'read', 'update', 'delete']),
  resource: z.string().min(1, { message: "Resource is required" }).transform(str => str.toLowerCase().trim()),
  description: z.string().optional().default(''),
});

export const getPermissionByIdSchema = z.object({
  id: objectIdSchema, 
});

export const updatePermissionSchema = z.object({
  id: objectIdSchema,
  name: z.enum(['create', 'read', 'update', 'delete']).optional(),
  resource: z.string().min(1, { message: "Resource is required "}).transform(str => str.toLowerCase().trim()).optional(),
  description: z.string().optional().default('').optional(),
});

export const deletePermissionSchema = z.object({
  id: objectIdSchema,
});