import z from 'zod';

export const notificationSchema = z.object({
  type: z.enum(["info", "success", "warning", "error"]),
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
});