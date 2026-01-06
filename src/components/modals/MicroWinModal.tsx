import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";

interface MicroWinModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  emoji?: string;
}

export function MicroWinModal({ isOpen, onClose, message, emoji = "🎉" }: MicroWinModalProps) {
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
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 mx-auto max-w-sm z-50 md:inset-x-auto md:left-1/2 md:-translate-x-1/2"
          >
            <div className="gradient-card rounded-3xl p-8 shadow-glow border border-primary/20 text-center relative overflow-hidden">
              {/* Decorative sparkles */}
              <div className="absolute top-4 right-4">
                <Sparkles className="w-5 h-5 text-primary/40 animate-pulse-soft" />
              </div>
              <div className="absolute bottom-6 left-6">
                <Sparkles className="w-4 h-4 text-accent/40 animate-pulse-soft" style={{ animationDelay: "0.5s" }} />
              </div>

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
                className="text-6xl mb-4"
              >
                {emoji}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold text-foreground mb-2"
              >
                Amazing!
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground mb-6"
              >
                {message}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button onClick={onClose} className="w-full">
                  Keep Going!
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
