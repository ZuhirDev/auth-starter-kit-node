import mongoose from "mongoose";
import z from "zod";
import { t } from "#utils/i18n/index.js";

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: t("validation:invalidId") }
);

export const deleteUserByIdSchema = z.object({
  id: objectIdSchema,
});
