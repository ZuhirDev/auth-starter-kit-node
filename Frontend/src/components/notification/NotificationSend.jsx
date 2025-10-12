import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react";
import { post } from "@/utils/xhr";
import { toast } from "sonner";

const notificationTypes = [
  { value: "info", label: "Info", icon: Info, color: "text-blue-500", bg: "bg-blue-500/10" },
  { value: "success", label: "Success", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
  { value: "warning", label: "Warning", icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { value: "error", label: "Error", icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
];

const notificationSchema = z.object({
  type: z.enum(["info", "success", "warning", "error"]),
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
});

const NotificationSend = () => {
  const { handleSubmit, control, register, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(notificationSchema),
    defaultValues: { type: "info", title: "", message: "" },
  });

  const onSubmit = async (data) => {
    try {

      const response = await post({
        url: '/notification',
        data,
      });

      toast.success('Notification sent!', {
        description: 'All users have received your message',
      });

      reset();
    } catch (err) {
      console.error("Error sending notification:", err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-5 lg:p-6 rounded-md border border-border bg-card">
      <h2 className="text-lg font-semibold text-foreground mb-4">Create Notification</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">Notification Type</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-2">
                {notificationTypes.map((nt) => {
                  const Icon = nt.icon
                  return (
                    <button
                      key={nt.value}
                      type="button"
                      onClick={() => field.onChange(nt.value)}
                      className={cn(
                        "flex items-center gap-2 rounded-md border p-2 text-sm transition-all",
                        field.value === nt.value
                          ? "border-foreground bg-muted"
                          : "border-border hover:border-muted-foreground"
                      )}
                    >
                      <div className={cn("h-7 w-7 flex items-center justify-center rounded-full", nt.bg)}>
                        <Icon className={cn("h-4 w-4", nt.color)} />
                      </div>
                      <span>{nt.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="title" className="text-sm font-medium text-foreground">Title</Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Notification title"
            disabled={isSubmitting}
            className="w-full h-9 text-sm"
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message" className="text-sm font-medium text-foreground">Message</Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Notification message"
            rows={3}
            disabled={isSubmitting}
            className="text-sm"
          />
          {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto h-9 px-4 text-sm bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Send Notification
        </Button>
      </form>
    </div>
  )
};

export default NotificationSend;
