import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/shared/Avatar";
import { MicroWinModal } from "@/components/modals/MicroWinModal";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { Send, Sparkles, ArrowLeft, Lightbulb } from "lucide-react";
import { useLevelProgressContext } from "@/contexts/LevelProgressContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedTopics = [
  "Help me understand quadratic equations",
  "What is photosynthesis?",
  "Explain Shakespeare's themes",
  "How do I write a good essay?",
];

const aiResponses: Record<string, string> = {
  default: "That's a great question! Let me break this down for you in a way that makes sense. 📚\n\nI'm here to help you learn at your own pace. There's no rush – we'll work through this together step by step.\n\nWhat part would you like me to explain first?",
  quadratic: "Quadratic equations might seem tricky at first, but I promise they'll make sense! 🧮\n\nA quadratic equation looks like this: ax² + bx + c = 0\n\nThink of it as finding where a curved line (a parabola) crosses the x-axis. Let's start with a simple example:\n\nx² - 4 = 0\n\nCan you try to guess what x might be? (Hint: What number times itself equals 4?)",
  photosynthesis: "Great choice! Photosynthesis is how plants make their own food – like a plant's kitchen! 🌱\n\nHere's the simple version:\n• Plants take in sunlight ☀️\n• They absorb water from roots 💧\n• They take in carbon dioxide from air\n• They create glucose (sugar) for energy!\n\nThink of it like cooking: the ingredients go in, and food comes out. Would you like me to explain any part in more detail?",
  shakespeare: "Shakespeare can feel challenging, but once you get the rhythm, it's actually quite beautiful! 📖\n\nHis main themes include:\n• Love and its complications 💕\n• Power and ambition 👑\n• Fate vs free will\n• Appearance vs reality\n\nWhich play are you studying? I can help make the language easier to understand!",
  essay: "Essay writing is a skill you can definitely master! ✍️\n\nHere's my simple structure:\n\n1. **Introduction** - Hook your reader, state your main point\n2. **Body paragraphs** - One idea per paragraph with evidence\n3. **Conclusion** - Summarize and leave a lasting impression\n\nThe secret? Start with a plan! What topic is your essay about?",
};

// Map topics to subjects for diversity tracking
const topicToSubject: Record<string, string> = {
  quadratic: "Mathematics",
  equation: "Mathematics",
  photosynthesis: "Science",
  plant: "Science",
  shakespeare: "English",
  theme: "English",
  essay: "English",
  write: "English",
  writing: "English",
};

export default function LearnPage() {
  const navigate = useNavigate();
  const { 
    recordQuestion, 
    startStudySession, 
    updateStudyTime, 
    recordLearnWelcome,
    recordSubjectEngagement,
    newAchievement, 
    clearNewAchievement,
    isLoaded
  } = useLevelProgressContext();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! 👋 I'm your learning buddy. I'm here to help you understand any topic, at your own pace.\n\nThere's no such thing as a silly question here. What would you like to learn about today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMicroWin, setShowMicroWin] = useState(false);
  const [microWinMessage, setMicroWinMessage] = useState("");
  const [microWinEmoji, setMicroWinEmoji] = useState("⭐");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const studyTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Queue for showing modals one after another
  const [modalQueue, setModalQueue] = useState<Array<{ message: string; emoji: string }>>([]);
  const [isShowingModal, setIsShowingModal] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Start study session and update streak when page loads
  // Start study session timer
  useEffect(() => {
    startStudySession();
    
    // Update study time every 10 seconds for more responsive tracking
    studyTimerRef.current = setInterval(() => {
      updateStudyTime();
    }, 10000);

    return () => {
      if (studyTimerRef.current) {
        clearInterval(studyTimerRef.current);
      }
      updateStudyTime();
    };
  }, [startStudySession, updateStudyTime]);

  // Record Learn page welcome ONLY after state is loaded
  useEffect(() => {
    if (isLoaded) {
      recordLearnWelcome();
    }
  }, [isLoaded, recordLearnWelcome]);

  // Add new achievement to queue
  useEffect(() => {
    if (newAchievement) {
      setModalQueue(prev => [...prev, { message: newAchievement.message, emoji: newAchievement.emoji }]);
      clearNewAchievement();
    }
  }, [newAchievement, clearNewAchievement]);

  // Show modals one after another
  useEffect(() => {
    if (modalQueue.length > 0 && !isShowingModal) {
      const next = modalQueue[0];
      setMicroWinMessage(next.message);
      setMicroWinEmoji(next.emoji);
      setIsShowingModal(true);
      setTimeout(() => setShowMicroWin(true), 300);
    }
  }, [modalQueue, isShowingModal]);

  const handleCloseMicroWin = () => {
    setShowMicroWin(false);
    setIsShowingModal(false);
    setModalQueue(prev => prev.slice(1)); // Remove shown modal from queue
  };

  const getAIResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    if (lower.includes("quadratic") || lower.includes("equation")) {
      return aiResponses.quadratic;
    }
    if (lower.includes("photosynthesis") || lower.includes("plant")) {
      return aiResponses.photosynthesis;
    }
    if (lower.includes("shakespeare") || lower.includes("theme")) {
      return aiResponses.shakespeare;
    }
    if (lower.includes("essay") || lower.includes("write") || lower.includes("writing")) {
      return aiResponses.essay;
    }
    return aiResponses.default;
  };

  const detectSubject = (userMessage: string): string | null => {
    const lower = userMessage.toLowerCase();
    for (const [keyword, subject] of Object.entries(topicToSubject)) {
      if (lower.includes(keyword)) {
        return subject;
      }
    }
    return null;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Track question and award XP
    recordQuestion();
    
    // Track subject diversity
    const subject = detectSubject(input);
    if (subject) {
      recordSubjectEngagement(subject);
    }

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(input),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleSuggestedTopic = (topic: string) => {
    setInput(topic);
  };

  return (
    <div className="min-h-screen gradient-calm flex flex-col">
      <Header />

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-soft">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">PurpleSchool</h1>
              <p className="text-xs text-muted-foreground">Here to help you learn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-4 md:py-8 md:pt-24 overflow-y-auto pb-40 md:pb-32">
        {/* Suggested Topics */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Lightbulb className="w-4 h-4" />
              <span>Try asking about:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedTopic(topic)}
                  className="text-sm bg-secondary hover:bg-primary/10 text-secondary-foreground px-4 py-2 rounded-xl transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages */}
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {message.role === "assistant" ? (
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                ) : (
                  <Avatar name="You" size="md" className="flex-shrink-0" />
                )}
                <Card
                  className={`max-w-[80%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card"
                  }`}
                >
                  <div className="p-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <Card className="bg-card">
                <div className="p-4 flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </Card>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border p-4">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Take your time. There's no wrong question here.
          </p>
        </div>
      </div>

      <BottomNav />

      <MicroWinModal
        isOpen={showMicroWin}
        onClose={handleCloseMicroWin}
        message={microWinMessage}
        emoji={microWinEmoji}
      />
    </div>
  );
}
