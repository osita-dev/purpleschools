import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MessageSquare, 
  Mail, 
  Send, 
  Star, 
  CheckCircle2,
  User,
  Phone
} from "lucide-react";
import { toast } from "sonner";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export function FeedbackContactSection() {
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    toast.success("Thank you for your feedback! We truly appreciate it.");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
            We'd Love to Hear From You
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Feedback & Contact
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Your voice matters. Share your experience or reach out with questions—we're here to help.
          </p>
        </motion.div>

        <motion.div {...fadeInUp}>
          <Tabs defaultValue="feedback" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-muted/50 rounded-none">
              <TabsTrigger 
                value="feedback" 
                className="flex items-center gap-2 rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MessageSquare className="w-4 h-4" />
                Give Feedback
              </TabsTrigger>
              <TabsTrigger 
                value="contact"
                className="flex items-center gap-2 rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </TabsTrigger>
            </TabsList>

            {/* Feedback Tab */}
            <TabsContent value="feedback">
              <div className="bg-card border border-border p-6 md:p-8">
                {feedbackSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-4">
                      Your feedback helps us improve PurpleSchool for every student.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setFeedbackSubmitted(false);
                        setFeedbackRating(0);
                      }}
                    >
                      Submit Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        How would you rate your experience?
                      </Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFeedbackRating(star)}
                            className="p-1 transition-transform hover:scale-110"
                          >
                            <Star 
                              className={`w-8 h-8 transition-colors ${
                                star <= feedbackRating 
                                  ? "fill-accent text-accent" 
                                  : "text-muted-foreground/30"
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedback-name">Your Name (optional)</Label>
                      <Input 
                        id="feedback-name" 
                        placeholder="e.g. Christopher Osita" 
                        className="bg-background rounded-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedback-message">What's on your mind?</Label>
                      <Textarea 
                        id="feedback-message" 
                        placeholder="Tell us what you love, what could be better, or any suggestions..."
                        className="min-h-[120px] bg-background resize-none rounded-none"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedback-feature">
                        What feature would help you most? (optional)
                      </Label>
                      <Input 
                        id="feedback-feature" 
                        placeholder="e.g. More Chemistry topics, offline mode..."
                        className="bg-background rounded-none"
                      />
                    </div>

                    <Button type="submit" className="w-full rounded-none" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </Button>
                  </form>
                )}
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact">
              <div className="bg-card  border border-border p-6 md:p-8 rounded-none">
                {contactSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-4">
                      We'll respond within 24-48 hours. Check your email!
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setContactSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input 
                            id="contact-name" 
                            placeholder="Your full name"
                            className="pl-10 bg-background rounded-none"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input 
                            id="contact-email" 
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10 bg-background rounded-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Phone Number (optional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="contact-phone" 
                          type="tel"
                          placeholder="+234..."
                          className="pl-10 bg-background rounded-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Subject</Label>
                      <Input 
                        id="contact-subject" 
                        placeholder="What is this about?"
                        className="bg-background rounded-none"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Your Message</Label>
                      <Textarea 
                        id="contact-message" 
                        placeholder="How can we help you?"
                        className="min-h-[120px] bg-background resize-none rounded-none"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full rounded-none" size="lg">
                      <Send className="w-4 h-4 mr-2 " />
                      Send Message
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Or email us directly at{" "}
                      <a 
                        href="mailto:hello@purpleschool.ng" 
                        className="text-primary hover:underline"
                      >
                        purpleschool@gmail.com
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
