import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/shared/Avatar";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { MicroWinModal } from "@/components/modals/MicroWinModal";
import { StreakModal } from "@/components/modals/StreakModal";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { useAchievementsContext } from "@/contexts/AchievementsContext";
import { 
  MessageCircle, 
  Flame, 
  Calendar, 
  Trophy, 
  Sparkles, 
  ChevronRight,
  BookOpen 
} from "lucide-react";

interface User {
  name: string;
  email: string;
  school: string;
  className: string;
  streak: number;
  daysActive: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showMicroWin, setShowMicroWin] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  const { stats, achievements, getStreakMessage } = useAchievementsContext();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      // Sync streak from achievements context
      if (stats.streak > 0) {
        parsed.streak = stats.streak;
      }
      setUser(parsed);
      // Show streak modal on first load if close to target
      if (parsed.streak >= 5 && parsed.streak < 7) {
        setTimeout(() => setShowStreak(true), 1000);
      }
    } else {
      navigate("/");
    }
  }, [navigate, stats.streak]);

  if (!user) return null;

  const _streakInfo = getStreakMessage();
  const microWinsCount = achievements.length;
  const studyMinutes = stats.studyTimeMinutes;
  const progressPercent = Math.min(100, Math.round((studyMinutes / 30) * 100));

  const motivationalMessages = [
    "Every small step counts. You're doing great! 💪",
    "Learning is a journey, not a race. Take your time.",
    "You showed up today. That's what matters.",
    "Your brain is growing with every question you ask.",
  ];

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  return (
    <div className="min-h-screen gradient-calm pb-24 md:pb-8 md:pt-24">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Avatar name={user.name} size="lg" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Hi, {user.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-muted-foreground">
                {user.className} • {user.school}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground italic bg-secondary/50 rounded-xl p-4">
            "{randomMessage}"
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          <Card 
            className="text-center cursor-pointer hover:shadow-soft transition-shadow"
            onClick={() => setShowStreak(true)}
          >
            <CardContent className="p-4">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-warning/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-warning" />
              </div>
              <p className="text-2xl font-bold text-foreground">{user.streak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{user.daysActive}</p>
              <p className="text-xs text-muted-foreground">Days Active</p>
            </CardContent>
          </Card>

          <Card 
            className="text-center cursor-pointer hover:shadow-soft transition-shadow"
            onClick={() => setShowMicroWin(true)}
          >
            <CardContent className="p-4">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-success/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-success" />
              </div>
              <p className="text-2xl font-bold text-foreground">{microWinsCount}</p>
              <p className="text-xs text-muted-foreground">Achievements</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Start Learning CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute top-4 right-4 opacity-20">
                <Sparkles className="w-16 h-16" />
              </div>
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Ready to Learn?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Your AI tutor is here to help you understand anything, at your own pace.
                </p>
                <Button onClick={() => navigate("/learn")} size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Today's Progress</h3>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <ProgressRing progress={progressPercent} size={80}>
                  <span className="text-lg font-bold text-primary">{progressPercent}%</span>
                </ProgressRing>
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-1">
                    {studyMinutes > 0 ? "You're doing great today!" : "Ready to start learning?"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {studyMinutes > 0 
                      ? `You've studied for ${studyMinutes} minute${studyMinutes !== 1 ? 's' : ''}. Keep going or take a break – it's up to you.`
                      : "Head to the Learn section to start your session!"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                      <BookOpen className="w-3 h-3" />
                      Mathematics
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                      <BookOpen className="w-3 h-3" />
                      Science
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Continue Learning</h3>
          <div className="space-y-3">
            {[
              { subject: "Mathematics", topic: "Quadratic Equations", progress: 75 },
              { subject: "Science", topic: "Photosynthesis", progress: 40 },
              { subject: "English", topic: "Essay Writing", progress: 20 },
            ].map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-soft transition-all"
                onClick={() => navigate("/learn")}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.topic}</p>
                      <p className="text-sm text-muted-foreground">{item.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </main>

      <BottomNav />

      <MicroWinModal
        isOpen={showMicroWin}
        onClose={() => setShowMicroWin(false)}
        message="You asked 3 questions today. Curiosity is your superpower!"
        emoji="⭐"
      />

      <StreakModal
        isOpen={showStreak}
        onClose={() => setShowStreak(false)}
        currentStreak={user.streak}
        targetStreak={7}
        isAtRisk={user.streak >= 5}
      />
      <p>{_streakInfo.message}</p>

    </div>
  );
}
