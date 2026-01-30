import mongoose from "mongoose";
import z from "zod";
import { t } from "#utils/i18n/index.js";

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: t('validation:invalidId') }
);

export const updateConfigSchema = z.object({
  id: objectIdSchema,
  value: z.union([
    z.string().min(1, { message: t('validation:valueIsRequired') }), 
    z.boolean()
  ]).optional(),
  description: z.string().optional(),
  isPublic: z.boolean().optional(),  
});
