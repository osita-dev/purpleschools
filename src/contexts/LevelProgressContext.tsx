import { createContext, useContext} from "react";
import type { ReactNode } from "react";
import type { Achievement } from "@/hooks/useAchievements";
import type { Level } from "@/hooks/useAchievements";
import { useAchievements } from "@/hooks/useAchievements";

// Unified context for all gamification (levels, XP, achievements)
interface LevelProgressContextType {
  // Level state
  currentXP: number;
  currentLevel: Level;
  nextLevel: Level | null;
  progressToNextLevel: number;
  xpInCurrentLevel: number;
  xpNeededForNextLevel: number;
  highestLevelEver: Level;
  totalSessions: number;
  subjectsEngaged: string[];
  isLoaded: boolean;
  
  // Stats
  stats: {
    questionsAsked: number;
    studyTimeMinutes: number;
    streak: number;
    totalDaysActive: number;
    lastStudyDate: string | null;
    sessionStartTime: number | null;
  };
  
  // Achievements
  achievements: Achievement[];
  newAchievement: Achievement | null;
  unreadCount: number;
  
  // Notifications
  levelUpMessage: { level: Level; isUp: boolean } | null;
  clearLevelUpMessage: () => void;
  
  // Actions
  addXP: (amount: number, source?: string) => void;
  recordQuestion: () => void;
  startStudySession: () => void;
  updateStudyTime: () => void;
  recordSessionComplete: () => void;
  updateStreak: () => void;
  recordDailyLogin: () => void;
  recordLearnWelcome: () => void;
  recordSubjectEngagement: (subject: string) => void;
  
  // Achievement actions
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNewAchievement: () => void;
  addAchievement: (type: Achievement["type"], message: string, emoji: string, xpAwarded?: number) => Achievement;
  
  // Helpers
  getEncouragingMessage: () => string;
  getStreakMessage: () => { message: string; isAtRisk: boolean };
  
  allLevels: Level[];
}

const LevelProgressContext = createContext<LevelProgressContextType | null>(null);

export function LevelProgressProvider({ children }: { children: ReactNode }) {
  const achievements = useAchievements();

  return (
    <LevelProgressContext.Provider value={achievements}>
      {children}
    </LevelProgressContext.Provider>
  );
}

export function useLevelProgressContext() {
  const context = useContext(LevelProgressContext);
  if (!context) {
    throw new Error("useLevelProgressContext must be used within a LevelProgressProvider");
  }
  return context;
}

// Re-export for backward compatibility
export { useLevelProgressContext as useAchievementsContext };
