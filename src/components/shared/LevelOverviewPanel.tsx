import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLevelProgressContext } from "@/contexts/LevelProgressContext";
import type { Level } from "@/hooks/useAchievements";

interface LevelOverviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LevelOverviewPanel({ isOpen, onClose }: LevelOverviewPanelProps) {
  const { 
    currentLevel, 
    highestLevelEver, 
    currentXP, 
    progressToNextLevel,
    allLevels,
    getEncouragingMessage 
  } = useLevelProgressContext();

  const getPhaseLabel = (phase: number) => {
    switch (phase) {
      case 1: return "Foundation";
      case 2: return "Growth";
      case 3: return "Mastery";
      default: return "";
    }
  };

  const getPhaseDescription = (phase: number) => {
    switch (phase) {
      case 1: return "Build your learning habit";
      case 2: return "Develop competence";
      case 3: return "Achieve consistency";
      default: return "";
    }
  };

  const getLevelStatus = (level: Level): "completed" | "current" | "locked" | "highest" => {
    if (level.id < currentLevel.id) return "completed";
    if (level.id === currentLevel.id) return "current";
    if (level.id === highestLevelEver.id && level.id > currentLevel.id) return "highest";
    return "locked";
  };

  // Group levels by phase
  const phases = [
    { phase: 3, levels: allLevels.filter(l => l.phase === 3).reverse() },
    { phase: 2, levels: allLevels.filter(l => l.phase === 2).reverse() },
    { phase: 1, levels: allLevels.filter(l => l.phase === 1).reverse() },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] bg-card rounded-t-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Your Learning Journey</h2>
                <p className="text-sm text-muted-foreground">{getEncouragingMessage()}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Current Status */}
            <div className="px-6 py-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl">
                  {currentLevel.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">{currentLevel.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                      Level {currentLevel.id}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentXP.toLocaleString()} XP • {progressToNextLevel}% to next level
                  </p>
                </div>
              </div>
            </div>

            {/* Levels Journey */}
            <div className="overflow-y-auto max-h-[55vh] px-6 py-4">
              {phases.map(({ phase, levels }) => (
                <div key={phase} className="mb-6 last:mb-0">
                  {/* Phase Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                      phase === 3 && "bg-warning/20 text-warning",
                      phase === 2 && "bg-accent/20 text-accent",
                      phase === 1 && "bg-primary/20 text-primary"
                    )}>
                      {phase}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{getPhaseLabel(phase)}</p>
                      <p className="text-xs text-muted-foreground">{getPhaseDescription(phase)}</p>
                    </div>
                  </div>

                  {/* Levels */}
                  <div className="space-y-2 ml-4 border-l-2 border-muted pl-4">
                    {levels.map((level) => {
                      const status = getLevelStatus(level);
                      
                      return (
                        <motion.div
                          key={level.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: level.id * 0.03 }}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl transition-all",
                            status === "current" && "bg-primary/10 border border-primary/30",
                            status === "completed" && "bg-muted/50",
                            status === "highest" && "bg-warning/10 border border-warning/30",
                            status === "locked" && "opacity-50"
                          )}
                        >
                          {/* Level Icon */}
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center text-lg",
                            status === "current" && "bg-primary/20",
                            status === "completed" && "bg-success/20",
                            status === "highest" && "bg-warning/20",
                            status === "locked" && "bg-muted"
                          )}>
                            {status === "locked" ? (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              level.icon
                            )}
                          </div>

                          {/* Level Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "font-medium",
                                status === "locked" ? "text-muted-foreground" : "text-foreground"
                              )}>
                                {level.name}
                              </span>
                              {status === "current" && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground font-medium">
                                  YOU
                                </span>
                              )}
                              {status === "highest" && level.id !== currentLevel.id && (
                                <Star className="w-3 h-3 text-warning fill-warning" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {level.xpRequired.toLocaleString()} XP required
                            </p>
                          </div>

                          {/* Status Indicator */}
                          {status === "completed" && (
                            <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                              <Check className="w-3 h-3 text-success" />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div className="px-6 py-4 bg-muted/30 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                💡 Your highest achievement badge ({highestLevelEver.icon} {highestLevelEver.name}) is preserved forever
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
