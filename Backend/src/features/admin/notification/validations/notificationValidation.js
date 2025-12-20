import z from 'zod';
import { t } from "#utils/i18n/index.js";

export const notificationSchema = z.object({
  type: z.enum(["info", "success", "warning", "error"]),
  title: z.string().min(1, { message: t('validation:titleIsRequired') }),
  message: z.string().min(1, { message: t('validation:messageIsRequired') }),
});