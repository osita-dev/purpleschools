import { useState, useEffect, useCallback } from "react";

export interface Achievement {
  id: string;
  type: "questions" | "study_time" | "streak" | "general";
  message: string;
  emoji: string;
  timestamp: Date;
  read: boolean;
}

interface AchievementStats {
  questionsAsked: number;
  studyTimeMinutes: number;
  streak: number;
  lastStudyDate: string | null;
  sessionStartTime: number | null;
}

const ACHIEVEMENT_THRESHOLDS = {
  questions: [
    { count: 1, message: "You asked your first question! Great start!", emoji: "🌱" },
    { count: 3, message: "You asked 3 questions! Curiosity is your superpower.", emoji: "🌟" },
    { count: 5, message: "5 questions in! You're really engaging with the material.", emoji: "🎯" },
    { count: 10, message: "10 questions! You're on a learning roll!", emoji: "🚀" },
    { count: 25, message: "25 questions! You're a curious learner!", emoji: "🧠" },
    { count: 50, message: "50 questions! Knowledge seeker extraordinaire!", emoji: "👑" },
  ],
  studyTime: [
    { minutes: 1, message: "You studied for 1 minute! Every second counts.", emoji: "⏱️" },
    { minutes: 5, message: "5 minutes of focused learning! Keep it up.", emoji: "📚" },
    { minutes: 10, message: "10 minutes! Your brain is thanking you.", emoji: "🧠" },
    { minutes: 15, message: "15 minutes of learning! Impressive focus!", emoji: "✨" },
    { minutes: 30, message: "30 minutes! You're in the zone!", emoji: "🔥" },
    { minutes: 60, message: "1 hour of learning! You're amazing!", emoji: "🏆" },
  ],
  streak: [
    { days: 2, message: "2-day streak! You're building a habit.", emoji: "🔥" },
    { days: 3, message: "3 days in a row! Consistency is key.", emoji: "💪" },
    { days: 5, message: "5-day streak! You're unstoppable!", emoji: "⚡" },
    { days: 7, message: "A whole week! You're a learning machine!", emoji: "🎉" },
    { days: 14, message: "Two weeks strong! Incredible dedication!", emoji: "🌟" },
    { days: 30, message: "30-day streak! You're a legend!", emoji: "👑" },
  ],
};

const STORAGE_KEY = "purpleschool_achievements";
const STATS_KEY = "purpleschool_stats";

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<AchievementStats>({
    questionsAsked: 0,
    studyTimeMinutes: 0,
    streak: 0,
    lastStudyDate: null,
    sessionStartTime: null,
  });
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedAchievements = localStorage.getItem(STORAGE_KEY);
    const savedStats = localStorage.getItem(STATS_KEY);

    if (savedAchievements) {
      const parsed = JSON.parse(savedAchievements);
      setAchievements(parsed.map((a: Achievement) => ({
        ...a,
        timestamp: new Date(a.timestamp),
      })));
    }

    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Save to localStorage when achievements or stats change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  const addAchievement = useCallback((
    type: Achievement["type"],
    message: string,
    emoji: string
  ) => {
    const achievement: Achievement = {
      id: Date.now().toString(),
      type,
      message,
      emoji,
      timestamp: new Date(),
      read: false,
    };

    setAchievements((prev) => [achievement, ...prev]);
    setNewAchievement(achievement);

    return achievement;
  }, []);

  const checkQuestionAchievements = useCallback((newCount: number) => {
    const threshold = ACHIEVEMENT_THRESHOLDS.questions.find(
      (t) => t.count === newCount
    );
    if (threshold) {
      addAchievement("questions", threshold.message, threshold.emoji);
    }
  }, [addAchievement]);

  const checkStudyTimeAchievements = useCallback((newMinutes: number) => {
    const threshold = ACHIEVEMENT_THRESHOLDS.studyTime.find(
      (t) => t.minutes === newMinutes
    );
    if (threshold) {
      addAchievement("study_time", threshold.message, threshold.emoji);
    }
  }, [addAchievement]);

  const checkStreakAchievements = useCallback((newStreak: number) => {
    const threshold = ACHIEVEMENT_THRESHOLDS.streak.find(
      (t) => t.days === newStreak
    );
    if (threshold) {
      addAchievement("streak", threshold.message, threshold.emoji);
    }
  }, [addAchievement]);

  const incrementQuestions = useCallback(() => {
    setStats((prev) => {
      const newCount = prev.questionsAsked + 1;
      checkQuestionAchievements(newCount);
      return { ...prev, questionsAsked: newCount };
    });
  }, [checkQuestionAchievements]);

  const startStudySession = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      sessionStartTime: Date.now(),
    }));
  }, []);

  const updateStudyTime = useCallback(() => {
    setStats((prev) => {
      if (!prev.sessionStartTime) return prev;

      const elapsedMs = Date.now() - prev.sessionStartTime;
      const elapsedMinutes = Math.floor(elapsedMs / 60000);
      const previousMinutes = prev.studyTimeMinutes;
      const newTotal = previousMinutes + elapsedMinutes;

      // Check for new milestones
      for (let m = previousMinutes + 1; m <= newTotal; m++) {
        if (ACHIEVEMENT_THRESHOLDS.studyTime.some((t) => t.minutes === m)) {
          checkStudyTimeAchievements(m);
        }
      }

      return {
        ...prev,
        studyTimeMinutes: newTotal,
        sessionStartTime: Date.now(), // Reset to avoid double counting
      };
    });
  }, [checkStudyTimeAchievements]);

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    setStats((prev) => {
      if (prev.lastStudyDate === today) return prev;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      let newStreak = 1;
      if (prev.lastStudyDate === yesterdayStr) {
        newStreak = prev.streak + 1;
      }

      checkStreakAchievements(newStreak);

      // Also update the user object in localStorage for Dashboard
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        user.streak = newStreak;
        localStorage.setItem("user", JSON.stringify(user));
      }

      return {
        ...prev,
        streak: newStreak,
        lastStudyDate: today,
      };
    });
  }, [checkStreakAchievements]);

  const getStreakMessage = useCallback(() => {
    const daysToTarget = 7 - stats.streak;
    if (daysToTarget === 1) {
      return {
        message: "You're 1 day away from a 7-day streak. Keep it going!",
        isAtRisk: true,
      };
    }
    if (daysToTarget === 2) {
      return {
        message: "Just 2 more days to hit a 7-day streak!",
        isAtRisk: true,
      };
    }
    return {
      message: `${stats.streak} day streak! Keep the momentum going.`,
      isAtRisk: false,
    };
  }, [stats.streak]);

  const markAsRead = useCallback((id: string) => {
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: true } : a))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setAchievements((prev) => prev.map((a) => ({ ...a, read: true })));
  }, []);

  const clearNewAchievement = useCallback(() => {
    setNewAchievement(null);
  }, []);

  const unreadCount = achievements.filter((a) => !a.read).length;

  return {
    achievements,
    stats,
    newAchievement,
    unreadCount,
    incrementQuestions,
    startStudySession,
    updateStudyTime,
    updateStreak,
    getStreakMessage,
    markAsRead,
    markAllAsRead,
    clearNewAchievement,
    addAchievement,
  };
}
