import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/shared/Avatar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAchievementsContext } from "@/contexts/AchievementsContext";
import { 
  ArrowLeft, 
  User, 
  School, 
  BookOpen, 
  Bell, 
  Shield, 
  LogOut,
  ChevronRight,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
  school: string;
  className: string;
  streak: number;
  daysActive: number;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { achievements, unreadCount, markAsRead, markAllAsRead } = useAchievementsContext();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    className: "",
  });

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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "questions": return "Questions";
      case "study_time": return "Study Time";
      case "streak": return "Streak";
      default: return "Achievement";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "questions": return "bg-primary/10 text-primary";
      case "study_time": return "bg-accent/10 text-accent";
      case "streak": return "bg-warning/10 text-warning";
      default: return "bg-success/10 text-success";
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setFormData({
        name: parsed.name,
        school: parsed.school,
        className: parsed.className,
      });
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      toast({
        title: "Profile updated!",
        description: "Your changes have been saved.",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen gradient-calm pb-24 md:pb-8 md:pt-24">
      <Header />

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground">Profile & Settings</h1>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="mb-6">
            <CardContent className="p-6">
              {/* Mobile: stacked layout, Desktop: row layout */}
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-4 mb-6">
                <Avatar name={user.name} size="xl" />
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-foreground truncate">{user.name}</h2>
                  <p className="text-muted-foreground text-sm truncate">{user.email}</p>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                >
                  {isEditing ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Save
                    </>
                  ) : (
                    "Edit Profile"
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                    <School className="w-4 h-4" />
                    School
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.school}
                      onChange={(e) =>
                        setFormData({ ...formData, school: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground">{user.school}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4" />
                    Class
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.className}
                      onChange={(e) =>
                        setFormData({ ...formData, className: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground">{user.className}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Settings</h3>
          <div className="space-y-3">
            {/* Notifications with Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <Card className="cursor-pointer hover:shadow-soft transition-all">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-primary" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center px-1">
                            {unreadCount > 9 ? "9+" : unreadCount}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Notifications</p>
                        <p className="text-sm text-muted-foreground">Manage your reminders</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="start" side="bottom">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <h3 className="font-semibold text-foreground text-sm">Achievements</h3>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs h-7"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Mark all read
                    </Button>
                  )}
                </div>
                <ScrollArea className="max-h-72">
                  {achievements.length === 0 ? (
                    <div className="p-6 text-center">
                      <div className="text-3xl mb-2">🎯</div>
                      <p className="text-muted-foreground text-sm">
                        No achievements yet. Start learning!
                      </p>
                    </div>
                  ) : (
                    <div className="p-2">
                      {achievements.map((achievement) => (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-3 rounded-xl mb-2 cursor-pointer transition-colors ${
                            achievement.read ? "bg-muted/30" : "bg-primary/5"
                          }`}
                          onClick={() => markAsRead(achievement.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-xl">{achievement.emoji}</div>
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
                                  <span className="w-2 h-2 rounded-full bg-accent" />
                                )}
                              </div>
                              <p className="text-sm text-foreground font-medium">
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
              </PopoverContent>
            </Popover>

            {/* Privacy */}
            <Card className="cursor-pointer hover:shadow-soft transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Privacy</p>
                    <p className="text-sm text-muted-foreground">Control your data</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Learning Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Journey</h3>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gradient">{user.daysActive}</p>
                  <p className="text-sm text-muted-foreground">Days Learning</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gradient">{user.streak}</p>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gradient">47</p>
                  <p className="text-sm text-muted-foreground">Questions Asked</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gradient">12</p>
                  <p className="text-sm text-muted-foreground">Topics Explored</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Button
            variant="outline"
            className="w-full border-destructive/20 text-destructive hover:bg-destructive/5"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            You can always come back. We'll be here when you're ready.
          </p>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
