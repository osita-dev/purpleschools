import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LevelProgressProvider } from "@/contexts/LevelProgressContext";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import LearnPage from "./pages/LearnPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useRegisterSW } from "virtual:pwa-register/react";

const queryClient = new QueryClient();

export default function App() {

  const { updateServiceWorker } = useRegisterSW({
    onNeedRefresh() {
      updateServiceWorker(true);
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LevelProgressProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/welcome" element={<LandingPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/about" element={<AboutPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LevelProgressProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
