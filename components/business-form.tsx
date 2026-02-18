"use client"

import React, { useRef, useState } from 'react'
import { useRouter } from "next/navigation"
import emailjs from '@emailjs/browser'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function BusinessForm() {
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm(
        'service_hez7mw9', 
        'template_htai0ev', 
        form.current!, 
        'qsf9Wt-yXfBKQ7CD7'
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setIsSubmitted(true); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalize = () => {
    setIsSubmitted(false);
    router.push("/"); // Redirect to home
  };

  return (
    <Dialog onOpenChange={(open) => { if(!open) { setIsSubmitted(false); setIsLoading(false); } }}>
      <DialogTrigger asChild>
        <Button className="group gap-2 px-8 py-6 text-base font-bold shadow-2xl shadow-primary/20 transition-all hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95">
          Join the Ecosystem
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[450px] overflow-hidden border-white/10 bg-background/95 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="relative mb-8">
                {/* Ripple Effect Animation */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-green-500/30"
                />
                <div className="relative rounded-full bg-gradient-to-br from-green-400 to-green-600 p-5 shadow-2xl shadow-green-500/50">
                  <CheckCircle2 className="h-14 w-14 text-white" />
                </div>
              </div>
              
              <DialogTitle className="text-3xl font-black tracking-tight mb-3 text-foreground">
                Application Received
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground px-6 leading-relaxed">
                Thank you for your interest. Our analysts will review your venture and contact you regarding the listing.
              </DialogDescription>
              
              <Button 
                className="mt-10 w-full py-6 text-lg font-bold shadow-lg" 
                onClick={handleFinalize}
              >
                Return to Home
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader className="mb-6">
                <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/60">
                  <ShieldCheck className="h-3 w-3" />
                  Verified Partner Portal
                </div>
                <DialogTitle className="text-3xl font-black tracking-tight">List Your Startup</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  Provide your official business details to begin the verification process.
                </DialogDescription>
              </DialogHeader>

              <form ref={form} onSubmit={sendEmail} className="grid gap-5">
                <div className="grid gap-3">
                  <Input 
                    name="from_name" 
                    placeholder="Founder / Representative Name" 
                    className="h-12 border-white/10 bg-secondary/20 px-4 focus-visible:ring-primary/30" 
                    required 
                  />
                  <Input 
                    name="business_name" 
                    placeholder="Registered Entity Name" 
                    className="h-12 border-white/10 bg-secondary/20 px-4 focus-visible:ring-primary/30" 
                    required 
                  />
                  <Input 
                    name="reply_to" 
                    type="email" 
                    placeholder="Corporate Email Address" 
                    className="h-12 border-white/10 bg-secondary/20 px-4 focus-visible:ring-primary/30" 
                    required 
                  />
                  <Input 
                    name="website" 
                    type="url" 
                    placeholder="Official Website (https://...)" 
                    className="h-12 border-white/10 bg-secondary/20 px-4 focus-visible:ring-primary/30" 
                  />
                  <Textarea 
                    name="message" 
                    placeholder="Brief Executive Summary..." 
                    className="min-h-[120px] border-white/10 bg-secondary/20 px-4 py-3 resize-none focus-visible:ring-primary/30" 
                    required 
                  />
                </div>

                <div className="mt-2">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="h-14 w-full text-lg font-black transition-all hover:brightness-110"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      "Submit for Verification"
                    )}
                  </Button>
                  <p className="mt-4 text-center text-[10px] text-muted-foreground/60 uppercase tracking-tighter">
                    By submitting, you agree to our institutional terms of service.
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
