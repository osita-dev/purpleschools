import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Level } from "@/hooks/useAchievements";
import { Sparkles } from "lucide-react";

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: Level | null;
}

export function LevelUpModal({ isOpen, onClose, level }: LevelUpModalProps) {
  if (!level) return null;

  const getPhaseMessage = () => {
    switch (level.phase) {
      case 1:
        return "You're building great learning habits!";
      case 2:
        return "Your knowledge is growing stronger!";
      case 3:
        return "You're achieving true mastery!";
      default:
        return "Keep up the amazing work!";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-card p-8 shadow-2xl overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.5 }}
                transition={{ duration: 0.8 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Sparkles icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-4 bg-primary/10 flex items-center justify-center"
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>

              {/* Level Up text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm font-medium text-primary uppercase tracking-wider mb-2"
              >
                Level Up!
              </motion.p>

              {/* Level icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="text-6xl mb-4"
              >
                {level.icon}
              </motion.div>

              {/* Level name */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold text-foreground mb-2"
              >
                {level.name}
              </motion.h2>

              {/* Level number */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-muted-foreground mb-4"
              >
                Level {level.id} • {level.phaseName} Phase
              </motion.p>

              {/* Phase message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-muted-foreground mb-6"
              >
                {getPhaseMessage()}
              </motion.p>

              {/* Continue button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button onClick={onClose} className="w-full">
                  Continue Learning
                </Button>
              </motion.div>
            </div>

            {/* Confetti effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    y: -20, 
                    x: Math.random() * 300 - 150,
                    rotate: 0,
                    opacity: 1 
                  }}
                  animate={{ 
                    y: 400, 
                    rotate: Math.random() * 720,
                    opacity: 0 
                  }}
                  transition={{ 
                    duration: 2 + Math.random(), 
                    delay: 0.2 + Math.random() * 0.5,
                    ease: "easeIn" 
                  }}
                  className="absolute top-0 w-2 h-2"
                  style={{
                    left: `${Math.random() * 100}%`,
                    backgroundColor: [
                      "hsl(270, 70%, 60%)",
                      "hsl(330, 70%, 65%)",
                      "hsl(45, 90%, 55%)",
                      "hsl(150, 60%, 50%)",
                    ][i % 4]
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
