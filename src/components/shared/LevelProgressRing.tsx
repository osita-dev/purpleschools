import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LevelOverviewPanel } from "./LevelOverviewPanel";
import { useLevelProgressContext } from "@/contexts/LevelProgressContext";

interface LevelProgressRingProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
}

export function LevelProgressRing({
  size = 100,
  strokeWidth = 8,
  className,
  showLabel = true,
}: LevelProgressRingProps) {
  const [showOverview, setShowOverview] = useState(false);
  const { currentLevel, progressToNextLevel, nextLevel } = useLevelProgressContext();

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progressToNextLevel / 100) * circumference;

  // Phase-based gradient colors
  const getGradientColors = () => {
    switch (currentLevel.phase) {
      case 1: // Foundation - Soft purple
        return { start: "hsl(270, 70%, 60%)", end: "hsl(290, 70%, 65%)" };
      case 2: // Growth - Vibrant purple-pink
        return { start: "hsl(280, 80%, 55%)", end: "hsl(320, 75%, 60%)" };
      case 3: // Mastery - Golden purple
        return { start: "hsl(45, 90%, 55%)", end: "hsl(280, 70%, 60%)" };
      default:
        return { start: "hsl(270, 70%, 60%)", end: "hsl(290, 70%, 65%)" };
    }
  };

  const colors = getGradientColors();
  const gradientId = `levelGradient-${currentLevel.id}`;

  return (
    <>
      <motion.div
        className={cn(
          "inline-flex items-center justify-center cursor-pointer",
          "hover:scale-105 transition-transform",
          className
        )}
        style={{ width: size, height: size }}
        onClick={() => setShowOverview(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Static circular container */}
        <div 
          className="rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex flex-col items-center justify-center"
          style={{ width: size, height: size }}
        >
          <motion.span 
            className="text-2xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            {currentLevel.icon}
          </motion.span>
          {showLabel && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <p className="text-[10px] font-semibold text-foreground leading-tight">
                {currentLevel.name}
              </p>
              <p className="text-[8px] text-muted-foreground">
                Lvl {currentLevel.id}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Level Overview Panel */}
      <LevelOverviewPanel 
        isOpen={showOverview} 
        onClose={() => setShowOverview(false)} 
      />
    </>
  );
}
