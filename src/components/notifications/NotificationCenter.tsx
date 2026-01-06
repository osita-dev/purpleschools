import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Achievement } from "@/hooks/useAchievements";

interface NotificationCenterProps {
  achievements: Achievement[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationCenter({
  achievements,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getTypeLabel = (type: Achievement["type"]) => {
    switch (type) {
      case "questions":
        return "Questions";
      case "study_time":
        return "Study Time";
      case "streak":
        return "Streak";
      default:
        return "Achievement";
    }
  };

  const getTypeColor = (type: Achievement["type"]) => {
    switch (type) {
      case "questions":
        return "bg-primary/10 text-primary";
      case "study_time":
        return "bg-accent/10 text-accent";
      case "streak":
        return "bg-warning/10 text-warning";
      default:
        return "bg-success/10 text-success";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl hover:bg-muted transition-colors"
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center px-1">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-12 w-80 sm:w-96 bg-card rounded-2xl shadow-lg border border-border z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-foreground">Achievements</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onMarkAllAsRead}
                      className="text-xs h-7"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Mark all read
                    </Button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <ScrollArea className="max-h-[400px]">
                {achievements.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="text-4xl mb-3">🎯</div>
                    <p className="text-muted-foreground text-sm">
                      Start learning to earn achievements!
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {achievements.slice(0, 20).map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                          !achievement.read ? "bg-primary/5" : ""
                        }`}
                        onClick={() => onMarkAsRead(achievement.id)}
                      >
                        <div className="flex gap-3">
                          <div className="text-2xl flex-shrink-0">
                            {achievement.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(
                                  achievement.type
                                )}`}
                              >
                                {getTypeLabel(achievement.type)}
                              </span>
                              {!achievement.read && (
                                <span className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-foreground">
                              {achievement.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatTime(achievement.timestamp)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {achievements.length > 0 && (
                <div className="px-4 py-3 border-t border-border bg-muted/30">
                  <p className="text-xs text-muted-foreground text-center">
                    {achievements.length} total achievement{achievements.length !== 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
