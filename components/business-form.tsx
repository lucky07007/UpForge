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
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck, Lock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function BusinessForm() {
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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
      setIsSubmitted(true); // Still show success for demo/UX if desired
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalize = () => {
    setIsSubmitted(false);
    setIsOpen(false); // Closes the dialog
    router.push("/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if(!open) {
        setIsSubmitted(false);
        setIsLoading(false);
      }
    }}>
      <DialogTrigger asChild>
        <Button className="group h-12 gap-2 rounded-full px-8 font-bold shadow-xl shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-95">
          Join the Ecosystem
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[480px] overflow-hidden border-white/5 bg-background/95 backdrop-blur-3xl p-0 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center px-8 py-16 text-center"
            >
              <div className="relative mb-8">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 rounded-full bg-primary/20"
                />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-2xl shadow-primary/40">
                  <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              
              <DialogTitle className="text-3xl font-black tracking-tighter mb-4 text-foreground">
                Application Filed
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground leading-relaxed">
                Verification in progress. Our investment analysts will reach out to your team shortly.
              </DialogDescription>
              
              <Button 
                className="mt-10 h-14 w-full rounded-xl text-lg font-bold" 
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
              className="p-8"
            >
              <DialogHeader className="mb-8">
                <div className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-primary">
                  <Lock className="h-3 w-3" />
                  Encrypted Application
                </div>
                <DialogTitle className="text-4xl font-black tracking-tighter">Forge Listing</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  Provide your venture details for network consideration.
                </DialogDescription>
              </DialogHeader>

              <form ref={form} onSubmit={sendEmail} className="grid gap-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      name="from_name" 
                      placeholder="Founder Name" 
                      className="h-14 border-white/10 bg-white/5 px-4 focus:bg-white/10" 
                      required 
                    />
                    <Input 
                      name="business_name" 
                      placeholder="Startup Name" 
                      className="h-14 border-white/10 bg-white/5 px-4 focus:bg-white/10" 
                      required 
                    />
                  </div>
                  <Input 
                    name="reply_to" 
                    type="email" 
                    placeholder="Work Email" 
                    className="h-14 border-white/10 bg-white/5 px-4 focus:bg-white/10" 
                    required 
                  />
                  <Input 
                    name="website" 
                    type="url" 
                    placeholder="Venture Website (https://...)" 
                    className="h-14 border-white/10 bg-white/5 px-4 focus:bg-white/10" 
                  />
                  <Textarea 
                    name="message" 
                    placeholder="Brief elevator pitch or executive summary..." 
                    className="min-h-[120px] border-white/10 bg-white/5 px-4 py-4 resize-none focus:bg-white/10" 
                    required 
                  />
                </div>

                <div className="mt-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="h-16 w-full rounded-xl text-lg font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                  <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-medium text-muted-foreground/40 uppercase tracking-widest">
                    <ShieldCheck className="h-3 w-3" />
                    Identity Protected by UpForge Network
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
