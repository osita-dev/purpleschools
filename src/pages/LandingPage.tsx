import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import aboutBackground from "@/assets/about-background.jpg";
import { 
  Brain, 
  Heart, 
  Shield, 
  Sparkles, 
  Users, 
  Target, 
  BookOpen, 
  Award,
  Zap,
  MessageCircle,
  X,
  Play
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Our intelligent tutor adapts to your pace, level, and learning style for personalized education."
  },
  {
    icon: Heart,
    title: "Emotionally Safe",
    description: "No shame, no pressure. Every interaction is designed to encourage and support you."
  },
  {
    icon: Shield,
    title: "Safe Learning Space",
    description: "A judgment-free zone where mistakes are celebrated as stepping stones to success."
  },
  {
    icon: Sparkles,
    title: "Micro-Wins System",
    description: "Celebrate every achievement, no matter how small. Progress is progress!"
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Set your own learning goals and track your journey towards academic excellence."
  },
  {
    icon: Users,
    title: "Built for Students",
    description: "Designed specifically for secondary school students with age-appropriate content."
  }
];

const stats = [
  { value: "10K+", label: "Active Students" },
  { value: "50+", label: "Subjects Covered" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "AI Support" }
];

const values = [
  {
    icon: BookOpen,
    title: "Learn at Your Pace",
    description: "No rushing, no falling behind. Your learning journey is uniquely yours."
  },
  {
    icon: Award,
    title: "Celebrate Progress",
    description: "Every question answered, every topic explored adds to your growth."
  },
  {
    icon: Zap,
    title: "Stay Motivated",
    description: "Gentle streaks and achievements keep you engaged without pressure."
  },
  {
    icon: MessageCircle,
    title: "Ask Anything",
    description: "No question is too simple. Our AI tutor is here to help you understand."
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);
  
  // Replace with your actual YouTube video ID
  const youtubeVideoId = "dQw4w9WgXcQ";
  
  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background image with dark overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutBackground})` }}
        />
        <div className="absolute inset-0 bg-overlay/50" />
        
        <div className="container relative z-10 px-4 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary-foreground/20 border border-primary-foreground/30">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Welcome to Purple School</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground">
              Learning Without Limits
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              Purple School is a revolutionary AI-powered learning platform designed specifically for 
              secondary school students. We believe every student deserves a safe, encouraging, and 
              personalized learning experience.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={() => navigate('/auth')}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 cursor-pointer"
              >
                Start Learning Free
              </motion.button>
              <motion.button
                onClick={() => setShowDemo(true)}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-card border border-border rounded-xl font-semibold cursor-pointer flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-card/50 border-y border-border">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Purple School?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've built a platform that puts your emotional wellbeing and learning success first.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At Purple School, we believe that learning should be a joyful journey, not a stressful race. 
                Our mission is to create an educational environment where every student feels valued, 
                supported, and empowered to reach their full potential.
              </p>
              <p className="text-muted-foreground mb-6">
                We understand that traditional education can sometimes leave students feeling overwhelmed 
                or discouraged. That's why we've designed Purple School to be different – a place where 
                mistakes are learning opportunities, where progress is celebrated at every step, and where 
                no question is ever considered "too simple."
              </p>
              <div className="flex items-center gap-3 text-primary font-medium">
                <Heart className="w-5 h-5 fill-primary" />
                <span>Built with love for every learner</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-4 bg-card rounded-xl border border-border"
                >
                  <value.icon className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-1 text-sm">{value.title}</h4>
                  <p className="text-xs text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-8 md:p-12 bg-primary/5 rounded-3xl border border-border"
          >
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of students who are already experiencing the joy of learning with Purple School. 
              Your path to academic success starts here.
            </p>
            <motion.button
              onClick={() => navigate('/auth')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 cursor-pointer"
            >
              Get Started for Free
            </motion.button>
          </motion.div>
        </div>
      </section>

      <div className="pb-20 md:pb-0" />

      {/* Demo Video Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-overlay/80 backdrop-blur-sm"
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video bg-card rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-overlay/50 hover:bg-overlay/70 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-primary-foreground" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                title="Purple School Demo"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
