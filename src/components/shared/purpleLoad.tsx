import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <motion.div
        className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    </div>
  );
}
