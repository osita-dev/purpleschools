import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useAchievements } from "@/hooks/useAchievements";
import type { Achievement } from "@/hooks/useAchievements";

interface AchievementsContextType {
  achievements: Achievement[];
  stats: {
    questionsAsked: number;
    studyTimeMinutes: number;
    streak: number;
    lastStudyDate: string | null;
    sessionStartTime: number | null;
  };
  newAchievement: Achievement | null;
  unreadCount: number;
  incrementQuestions: () => void;
  startStudySession: () => void;
  updateStudyTime: () => void;
  updateStreak: () => void;
  getStreakMessage: () => { message: string; isAtRisk: boolean };
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNewAchievement: () => void;
  addAchievement: (type: Achievement["type"], message: string, emoji: string) => Achievement;
}

const AchievementsContext = createContext<AchievementsContextType | null>(null);

export function AchievementsProvider({ children }: { children: ReactNode }) {
  const achievementsData = useAchievements();

  return (
    <AchievementsContext.Provider value={achievementsData}>
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievementsContext() {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error("useAchievementsContext must be used within an AchievementsProvider");
  }
  return context;
}
