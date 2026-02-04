import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Heart, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    school: "",
    className: "",
  });

  const API_BASE = "https://purpleschool-api.onrender.com";
  // const API_BASE = "http://localhost:5000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin ? `${API_BASE}/auth/login` : `${API_BASE}/auth/register`;

      // Just send formData; backend handles required fields
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Something went wrong",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // ✅ Save token & user for auto-login
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast({
        title: isLogin ? "Welcome Back!" : "Account Created!",
        description: `Hello ${data.user.name}, let's continue your learning journey.`,
      });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      toast({
        title: "Network Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen primary-calm flex flex-col">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="px-6 pt-12 pb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-glow mb-6">
          <GraduationCap className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">PurpleSchool</h1>
        The AI tutor that supports{" "}
            <span className="text-primary">West African Examination Council (WAEC)</span>
      </motion.div>

      {/* Features */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex justify-center gap-6 px-6 pb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4 text-primary" />
          <span>Adaptive Learning</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Heart className="w-4 h-4 text-accent" />
          <span>Gentle Support</span>
        </div>
      </motion.div>

      {/* Auth Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex-1 px-4 pb-8 " >
        <Card className="max-w-md mx-auto rounded-none" >
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">{isLogin ? "Welcome Back!" : "Join PurpleSchool"}</CardTitle>
            <CardDescription>
              {isLogin ? "Continue your learning journey" : "Start your personalized learning adventure"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <Input placeholder="Your name" className="rounded-none" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  <Input placeholder="School name" className="rounded-none" value={formData.school} onChange={(e) => setFormData({ ...formData, school: e.target.value })} />
                  <Input placeholder="Class (e.g., JSS1- SSS3)" className="rounded-none" value={formData.className} onChange={(e) => setFormData({ ...formData, className: e.target.value })} />
                </>
              )}
              <Input type="email" placeholder="Email address" className="rounded-none" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              <Input type="password" placeholder="Password" className="rounded-none" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />

              <Button type="submit" className="w-full rounded-none" size="lg" disabled={loading}>
                {loading ? "Processing..." : isLogin ? "Start Learning" : "Create Account"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
