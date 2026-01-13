import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, User, GraduationCap, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Avatar } from "@/components/shared/Avatar";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { useLevelProgressContext } from "@/contexts/LevelProgressContext";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: BookOpen, label: "Learn", path: "/learn" },
  { icon: Info, label: "About", path: "/about" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function Header() {
  const location = useLocation();
  const userName = localStorage.getItem("userName") || "Student";
  const { achievements, unreadCount, markAsRead, markAllAsRead } = useLevelProgressContext();

  return (
    <header className="hidden md:block fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border z-40">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-soft">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">PurpleSchool</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex items-center gap-2 px-4 py-2 rounded-xl transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabDesktop"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  />
                )}
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors relative z-10",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "font-medium relative z-10",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="flex items-center gap-3">
          <NotificationCenter
            achievements={achievements}
            unreadCount={unreadCount}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
          />
          <Link to="/profile" className="flex items-center gap-2">
            <Avatar name={userName} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  );
}
