import React, { useState, useEffect } from "react";
import { CheckCircle2, Info, AlertTriangle, XCircle, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import socketService from "@/lib/socketService";
import notificationSound from "@/assets/sounds/notification.mp3";
import { useAuth } from "@/modules/auth/context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { es, enGB } from "date-fns/locale";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

const playNotificationSound = () => {
  try {
    const audio = new Audio(notificationSound);
    audio.volume = 0.5;
    audio.play().catch((err) => {
      console.warn("User gesture required to play sound:", err);
    });
  } catch (error) {
    console.error("Error reproduciendo sonido:", error);
  }
};

const iconMap = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
};

const colorMap = {
  success: "text-green-500",
  info: "text-blue-500",
  warning: "text-yellow-500",
  error: "text-red-500",
};

const bgMap = {
  success: "bg-green-500/10",
  info: "bg-blue-500/10",
  warning: "bg-yellow-500/10",
  error: "bg-red-500/10",
};

const Notification = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const stored = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(stored);

    socketService.init();
    socketService.joinRoom(`notifications:${user.id}`);

    const handler = (data) => {
      const newNotification = {
        id: Date.now().toString(),
        ...data,
        read: false,
        timestamp: new Date().toISOString(),
      };

      setNotifications((prev) => {
        const updated = [newNotification, ...prev];
        localStorage.setItem("notifications", JSON.stringify(updated));
        return updated;
      });

      playNotificationSound();
    };

    socketService.on("notification", handler);

    return () => {
      if (socketService.socket) socketService.socket.off("notification", handler);
      socketService.leaveRoom(`notifications:${user.id}`);
    };
  }, [user]);

  const handleMarkAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative h-12 w-12 rounded-full bg-background border border-border hover:bg-muted transition"
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-semibold text-white shadow-md">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>   
          </PopoverTrigger> 
        </TooltipTrigger>

        <TooltipContent>
          {t('common:notifications')}
        </TooltipContent>
      </Tooltip>

      <PopoverContent
        className="w-[380px] p-0 rounded-xl shadow-xl border border-border bg-background"
        align="end"
        style={{
          maxHeight: "600px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30 rounded-t-xl">
          <h2 className="text-base font-semibold text-foreground">{t('common:notifications')}</h2>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-medium text-muted-foreground hover:text-foreground"
              onClick={handleClearAll}
            >
              {t('common:clearAll')}
            </Button>
          )}
        </div>

        <ScrollArea
          className="transition-all"
          style={{ flexGrow: 1, overflowY: "auto", maxHeight: "500px" }}
        >
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">{t('common:noNotifications')}</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border">
              {notifications.map((n) => {
                const Icon = iconMap[n.type] || Info;
                return (
                  <div
                    key={n.id}
                    className={`group flex items-start gap-4 px-4 py-3 transition-colors ${
                      !n.read
                        ? "bg-muted/30 border-l-4 border-primary"
                        : "hover:bg-muted/10 opacity-70"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md ${bgMap[n.type]}`}
                    >
                      <Icon className={`h-5 w-5 ${colorMap[n.type]}`} />
                    </div>

                    <div className="flex-1 space-y-0.5 overflow-hidden">
                      <p className="text-sm font-medium text-foreground break-words whitespace-pre-wrap">
                        {n.title}
                      </p>
                      <p className="text-sm text-muted-foreground break-words whitespace-pre-wrap">
                        {n.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 italic break-words whitespace-pre-wrap">
                        {formatDistanceToNow(new Date(n.timestamp), {
                          addSuffix: true,
                          locale: enGB,
                        })}
                      </p>
                    </div>

                    <div className="flex gap-1 pt-1">
                      {!n.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-foreground"
                          onClick={() => handleMarkAsRead(n.id)}
                        >
                          ✓
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                        onClick={() => handleDelete(n.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
