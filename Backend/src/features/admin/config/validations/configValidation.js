import mongoose from "mongoose";
import z from "zod";

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ID" }
);

export const updateConfigSchema = z.object({
  id: objectIdSchema,
  value: z.union([
    z.string().min(1, { message: 'Value is required' }), 
    z.boolean()
  ]).optional(),
  description: z.string().optional(),
  isPublic: z.boolean().optional(),  
});

