import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Brain,
  MessageCircle,
  Sparkles,
  Target,
  BookOpen,
  Award,
  Zap,
  TrendingUp,
  CheckCircle2,
  Users,
  GraduationCap,
  Heart,
  ArrowRight,
  Flame,
  Star,
  Shield,
  BadgeCheck,
  Mail,
  HelpCircle,
  HeartHandshake
} from "lucide-react";


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 }
  },
  viewport: { once: true }
};

export default function Landingpage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="pt-20 pb-20 md:pt-6 md:pb-6 px-4">
        
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary/10 border border-primary/20">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-lg font-medium text-primary">PurpleSchool</span>
            </div>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-4xl md:text-6xl lg:text-4xl font-bold mb-6 tracking-tight"
          >
            The AI tutor that supports{" "}
            <span className="text-primary">West African Examination Council (WAEC)</span>
          </motion.h1>

          <motion.p
            {...fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
          >
            Learning shouldn't be confusing or stressful.
            <br />
            It should feel <span className="text-foreground font-medium">clear</span>, <span className="text-foreground font-medium">personal</span>, and <span className="text-foreground font-medium">encouraging</span>.
          </motion.p>

          <motion.p
            {...fadeInUp}
            className="text-base text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            PurpleSchool helps secondary school students prepare for WAEC, NECO, and JAMB with confidence—using smart AI guidance, step-by-step explanations, and gamified learning.
          </motion.p>

          <motion.div {...fadeInUp}>
            <Button
              size="lg"
              onClick={() => navigate('/auth')}
              className="text-base px-8"
            >
              Start Learning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Button
              size="lg"
              onClick={() => {
                const donateSection = document.getElementById("donate");
                if (donateSection) {
                  donateSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-base px-8 mt-3"
            >
              <HeartHandshake className="w-3 h-3" />
              Support Us
            </Button>

          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 md:py-28 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">The Problem</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Many students study hard…<br />but still struggle.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-4 max-w-xl mx-auto mb-12"
          >
            {[
              "They memorize instead of truly learning",
              "They learn without proper guide (WAEC marking scheme is still a black box)",
              "No personal teacher to explain further",
              "Lose confidence before major examinations"
            ].map((problem, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-destructive mt-2 shrink-0" />
                <p className="text-muted-foreground">{problem}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            {...fadeInUp}
            className="text-center text-lg font-medium text-foreground"
          >
            We built PurpleSchool to change that story.
          </motion.p>
        </div>
      </section>

      {/* What PurpleSchool Is */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">What PurpleSchool Is</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              A smarter way to learn
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              PurpleSchool is an AI-powered learning platform designed specifically for:
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10"
          >
            {[
              { icon: GraduationCap, text: "Secondary school students (SS1 – SS3)" },
              { icon: Target, text: "WAEC, NECO, and JAMB candidates" },
              { icon: BookOpen, text: "The West African curriculum" },
              { icon: Award, text: "Real exam success" }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="font-medium">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center space-y-2">
            <p className="text-muted-foreground">It's not just a study app.</p>
            <p className="text-lg font-medium text-foreground">
              It's a personal tutor that explains topics the way students actually understand them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 md:py-28 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Who PurpleSchool Is For</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Built for real West African learners
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
          >
            {[
              "Students preparing for WAEC, NECO, and JAMB",
              "JSS1–SS3 learners who need step-by-step explanations",
              "Students who want to truly understand subjects",
              "Candidates practicing exam-standard questions",
              "Parents looking for reliable academic support",
              "Teachers and schools that want smarter learning tools"
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
              >
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            {...fadeInUp}
            className="text-center text-muted-foreground"
          >
            If you're a West African student aiming for better grades and deeper understanding—
            <br />
            <span className="text-foreground font-semibold">PurpleSchool is built for you.</span>
          </motion.p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Ask. Learn. Understand. Improve.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {[
              {
                icon: MessageCircle,
                title: "Ask questions anytime",
                desc: "Chat with an AI tutor about any topic."
              },
              {
                icon: BookOpen,
                title: "Get clear, simple explanations",
                desc: "Answers are broken down according to WAEC marking schemes, step by step."
              },
              {
                icon: Target,
                title: "Practice exam-style learning",
                desc: "Focused on WAEC/NECO/JAMB standards."
              },
              {
                icon: TrendingUp,
                title: "Track real progress",
                desc: "Earn XP, build streaks, and level up as you study."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            {...fadeInUp}
            className="text-center mt-10 text-muted-foreground"
          >
            Learning becomes <span className="text-foreground font-medium">structured</span>, <span className="text-foreground font-medium">engaging</span>, and <span className="text-foreground font-medium">effective</span>.
          </motion.p>
        </div>
      </section>

      {/* Learning Approach */}
      <section className="py-20 md:py-28 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Our Learning Approach</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Understanding over cramming
            </h2>
            <p className="text-muted-foreground">Most students are taught to memorize.</p>
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mb-10">
            <p className="text-lg font-medium text-foreground mb-6">PurpleSchool teaches you to:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Understand concepts deeply",
                "Break down tough topics",
                "Think like an exam candidate",
                "Build confidence over time"
              ].map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-primary/10 text-primary font-medium rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="text-center space-y-1">
            <p className="text-muted-foreground">We don't just help you pass exams.</p>
            <p className="text-lg font-semibold text-foreground">We help you become smarter learners.</p>
          </motion.div>
        </div>
      </section>

      {/* Gamification */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Gamified for Motivation</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Small wins. Big confidence.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10"
          >
            {[
              { icon: Zap, label: "Earn XP for every question" },
              { icon: Flame, label: "Build daily learning streaks" },
              { icon: Award, label: "Unlock achievements" },
              { icon: TrendingUp, label: "Track your improvement" },
              { icon: Heart, label: "See your confidence grow" }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-4 bg-card rounded-xl border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center space-y-1">
            <p className="text-muted-foreground">Not to pressure you.</p>
            <p className="text-lg font-medium text-foreground">But to encourage you.</p>
          </motion.div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-20 md:py-28 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Why PurpleSchool Is Different</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Designed for West Africa
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlike generic global learning apps, PurpleSchool is:
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-3 max-w-xl mx-auto mb-10"
          >
            {[
              "Aligned with the West African curriculum",
              "Focused on WAEC, NECO, and JAMB success",
              "Built around how local students actually learn",
              "Tailored to common exam challenges",
              "Simple, friendly, and student-centered"
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <p className="font-medium">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            {...fadeInUp}
            className="text-center text-lg font-semibold text-primary"
          >
            This is learning built for YOUR system.
          </motion.p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 md:py-28 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div {...fadeInUp}>
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Our Vision</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10">
              Every student deserves confident learning
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4 mb-10"
          >
            {[
              "No student should feel ashamed to ask questions",
              "Understanding matters more than memorizing",
              "Consistency beats last-minute cramming",
              "Confidence is the foundation of success"
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-4 bg-card rounded-xl border border-border"
              >
                <p className="text-sm text-muted-foreground">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            {...fadeInUp}
            className="text-lg font-medium text-foreground"
          >
            PurpleSchool exists to give West African students that confidence.
          </motion.p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Student Stories</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              What students are saying
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                name: "Adaeze O.",
                class: "SS3, Lagos",
                quote: "PurpleSchool helped me finally understand maths. I went from failing to getting a B1 in my mock exams!",
                rating: 5
              },
              {
                name: "Emeka C.",
                class: "SS2, Enugu",
                quote: "The step-by-step explanations are amazing. It's like having a personal teacher available 24/7.",
                rating: 5
              },
              {
                name: "Fatima A.",
                class: "JSS3, Kano",
                quote: "I used to cram everything. Now I actually understand the concepts and feel confident for WAEC.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-6 bg-card rounded-2xl border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.class}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            {...fadeInUp}
            className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
          >
            {[
              { icon: BadgeCheck, text: "WAEC Curriculum Aligned" },
              { icon: Shield, text: "Secure & Private" },
              { icon: Users, text: "Trusted by Students Across Nigeria" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground">
                <badge.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">FAQs</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                {
                  question: "What is PurpleSchool?",
                  answer: "PurpleSchool is an AI-powered learning platform designed specifically for West African secondary school students. It provides personalized tutoring, step-by-step explanations, and exam-focused practice for WAEC, NECO, and JAMB."
                },
                {
                  question: "Is it free?",
                  answer: "Yes! PurpleSchool offers free access to core features. We believe every student deserves quality education. Premium features are available for those who want extra practice and advanced analytics."
                },
                {
                  question: "Does it really cover the WAEC syllabus?",
                  answer: "Absolutely. Our content is specifically aligned with the West African Examination Council (WAEC) syllabus. We cover all major subjects and ensure our explanations match the exam standards and marking schemes."
                },
                {
                  question: "Can I use it on my phone?",
                  answer: "Yes! PurpleSchool is fully mobile-friendly. You can learn on any device—phone, tablet, or computer. No app download required, just open it in your browser."
                },
                {
                  question: "How accurate are the answers?",
                  answer: "Our AI tutor is trained on verified educational content aligned with the West African curriculum. While we strive for accuracy, we always encourage students to cross-reference with their textbooks and teachers."
                },
                {
                  question: "Do you support NECO and JAMB?",
                  answer: "Yes! PurpleSchool supports WAEC, NECO, and JAMB preparation. Our content covers the overlapping syllabi, and we provide specific practice for each examination body."
                }
              ].map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-card border border-border rounded-xl px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-20 md:py-28 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-accent/20 border border-accent/30">
              <Heart className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-medium text-accent">Support Our Mission</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Help us reach every student who dreams of a better future
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every child deserves a chance to learn. Your support can change a student's life forever.
            </p>
          </motion.div>

          {/* Emotional Story */}
          <motion.div
            {...fadeInUp}
            className="bg-card p-8 md:p-10 rounded-2xl border border-border mb-12"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Why we need your support</h3>
                <p className="text-muted-foreground italic">
                  "Imagine a student in a rural village, studying under a kerosene lamp, dreaming of passing WAEC and becoming a doctor. She has the drive, but no access to quality tutoring. PurpleSchool can be her personal teacher—if we can keep it free and accessible."
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Behind every question asked on PurpleSchool is a student fighting for their future. Some come from homes where books are a luxury. Some study in schools with no science labs. Some have never met a tutor who believed in them. <span className="text-foreground font-medium">Your donation doesn't just fund technology—it funds hope.</span>
            </p>
          </motion.div>

          {/* Reasons Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6 mb-12"
          >
            {[
              {
                icon: GraduationCap,
                title: "Education for All",
                desc: "Keep PurpleSchool free for students who can't afford private tutors. Your support ensures no student is left behind because of their financial situation.",
                color: "text-primary"
              },
              {
                icon: Brain,
                title: "Building Better AI",
                desc: "Help us train smarter AI models that understand West African curriculum deeply. More data means better, more accurate explanations for every student.",
                color: "text-primary"
              },
              {
                icon: BookOpen,
                title: "Curriculum Development",
                desc: "Fund the creation of more WAEC, NECO, and JAMB-aligned content. We're building the most comprehensive West African learning library.",
                color: "text-primary"
              },
              {
                icon: TrendingUp,
                title: "Gathering Learning Data",
                desc: "Your support helps us understand how West African students learn best—what topics they struggle with, what explanations work, and how to improve.",
                color: "text-primary"
              },
              {
                icon: Users,
                title: "Reaching Rural Communities",
                desc: "Help us bring PurpleSchool to students in remote areas. Every naira helps us extend our reach to villages and underserved communities.",
                color: "text-primary"
              },
              {
                icon: Sparkles,
                title: "Innovation & Growth",
                desc: "Support new features like offline mode, voice tutoring, and local language support. Help us build the future of African education.",
                color: "text-primary"
              }
            ].map((reason, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <reason.icon className={`w-6 h-6 ${reason.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Impact Numbers */}
          <motion.div
            {...fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          >
            {[
              { number: "10,000+", label: "Students to reach" },
              { number: "50+", label: "Topics to cover" },
              { number: "∞", label: "Dreams to support" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.number}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Donation Options */}
          <motion.div {...fadeInUp} className="bg-card p-8 md:p-10 rounded-2xl border border-border text-center" > <h3 className="text-2xl font-bold mb-4">Every contribution matters</h3> <p className="text-muted-foreground mb-8 max-w-xl mx-auto"> Whether you sponsor one student or support our entire mission, your generosity creates ripples of change across West Africa. </p> <div className="grid sm:grid-cols-3 gap-4 mb-8"> {[{ amount: "₦5,000", label: "Sponsor a student for 1 month", icon: Heart }, { amount: "₦25,000", label: "Fund curriculum development", icon: BookOpen }, { amount: "Any Amount", label: "Support our mission", icon: Sparkles }].map((option, i) => (<div key={i} className="p-4 bg-muted/50 rounded-xl border border-border hover:border-primary/30 transition-colors cursor-pointer" > <option.icon className="w-6 h-6 text-primary mx-auto mb-2" /> <p className="text-xl font-bold text-primary">{option.amount}</p> <p className="text-xs text-muted-foreground">{option.label}</p> </div>))} </div> <div className="flex flex-col sm:flex-row gap-4 justify-center"> <Button size="lg" className="text-base bg-accent hover:bg-accent/90 text-accent-foreground"> <Heart className="w-4 h-4 mr-2" /> Donate Now </Button> <Button size="lg" variant="outline" className="text-base"> <HeartHandshake className="w-4 h-4 mr-2" /> Partner With Us </Button> </div> <p className="text-sm text-muted-foreground mt-6"> Want to support differently?{" "} <button className="text-primary hover:underline font-medium">Contact us</button> {" "}to discuss corporate partnerships, sponsorships, or volunteer opportunities. </p> </motion.div> {/* Closing Emotional Note */} <motion.div {...fadeInUp} className="text-center mt-12" > <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto"> "When you support PurpleSchool, you're not just donating to an app. You're investing in the dreams of thousands of young Africans who believe that education can change their lives—and the lives of their families." </p> <p className="text-foreground font-semibold mt-4">— The PurpleSchool Team 💜</p> </motion.div> </div> </section>

      {/* Final CTA */}
      < section className="py-20 md:py-28 px-4" >
        <div className="container mx-auto max-w-3xl">
          <motion.div
            {...fadeInUp}
            className="text-center p-10 md:p-14 bg-primary/5 rounded-3xl border border-primary/20"
          >
            <Brain className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Ready to prepare for WAEC, NECO, and JAMB the smart way?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Start learning with an AI tutor that understands your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="text-base"
              >
                Create Free Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/learn')}
                className="text-base"
              >
                Start Learning Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section >

      {/* Footer */}
      < footer className="py-12 px-4 border-t border-border" >
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-bold text-lg">PurpleSchool</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Built for West African students.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => navigate('/learn')} className="hover:text-primary transition-colors">
                    Start Learning
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/auth')} className="hover:text-primary transition-colors">
                    Create Account
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-1">
                  <HelpCircle className="w-3 h-3" />
                  <span>FAQ</span>
                </li>
                <li className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  <span>Contact Us</span>
                </li>
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <h4 className="font-semibold mb-4">Get Involved</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-1">
                  <HeartHandshake className="w-3 h-3" />
                  <span>Support Us</span>
                </li>
                <li className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>Partner With Us</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 PurpleSchool. All rights reserved.
            </p>
            <Button
              size="sm"
              onClick={() => navigate('/learn')}
              className="text-sm"
            >
              Start Learning Free Today
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </footer >

      <div className="pb-20 md:pb-0" />
    </div >
  );
}
