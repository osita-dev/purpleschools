import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { LevelOverviewPanel } from "./LevelOverviewPanel";
import { useLevelProgressContext } from "@/contexts/LevelProgressContext";

interface LevelProgressRingProps {
  size?: number;
  className?: string;
  showLabel?: boolean;
}

export function LevelProgressRing({
  size = 100,
  className,
  showLabel = true,
}: LevelProgressRingProps) {
  const [showOverview, setShowOverview] = useState(false);
  const { currentLevel } = useLevelProgressContext();

  return (
    <>
      <motion.div
        className={cn(
          "relative inline-flex items-center justify-center cursor-pointer",
          "hover:scale-105 transition-transform",
          className
        )}
        style={{ width: size, height: size }}
        onClick={() => setShowOverview(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Center Content */}
        <div
          className="relative z-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20
                     border-2 border-primary/30 flex flex-col items-center justify-center"
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
              animate={{ opacity: 1 }}
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
