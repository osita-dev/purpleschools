import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flame, X, Heart } from "lucide-react";

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStreak: number;
  targetStreak?: number;
  isAtRisk?: boolean;
}

export function StreakModal({ 
  isOpen, 
  onClose, 
  currentStreak, 
  targetStreak = 7,
  isAtRisk = false 
}: StreakModalProps) {
  const daysToTarget = targetStreak - currentStreak;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[45%] -translate-y-1/2 mx-auto max-w-sm z-50 md:inset-x-auto md:left-1/2 md:-translate-x-1/2"
          >
            <div className="bg-card rounded-3xl p-8 shadow-glow border border-warning/20 text-center relative overflow-hidden">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 10 }}
                className="relative inline-flex items-center justify-center mb-4"
              >
                <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center">
                  <Flame className="w-10 h-10 text-warning animate-bounce-gentle" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-1 mb-2"
              >
                <span className="text-4xl font-bold text-gradient">{currentStreak}</span>
                <span className="text-lg text-muted-foreground">days</span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-bold text-foreground mb-2"
              >
                {isAtRisk ? "You're so close!" : "Great streak!"}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground mb-6"
              >
                {isAtRisk 
                  ? `Just ${daysToTarget} more day${daysToTarget > 1 ? 's' : ''} to reach your ${targetStreak}-day goal. You can do this!`
                  : "Every day you show up matters. Keep building your learning habit!"
                }
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <Button onClick={onClose} className="w-full">
                  <Heart className="w-4 h-4 mr-2" />
                  Continue Learning
                </Button>
                <p className="text-xs text-muted-foreground">
                  You can always continue anytime. No pressure.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
