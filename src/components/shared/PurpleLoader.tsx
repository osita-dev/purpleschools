import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function PurpleLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
        className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg"
      >
        <GraduationCap className="w-8 h-8 text-white" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        className="mt-4 text-2xl font-bold text-primary"
      >
        PurpleSchool
      </motion.h1>

      <p className="text-muted-foreground mt-2 text-sm">
        Preparing your learning space...
      </p>
    </div>
  );
}
