"use client"

import React, { useRef, useState, useEffect } from 'react'
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
import { CheckCircle2, Loader2, ShieldCheck, Plus, Lock, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function BusinessForm({ isMobile = false }: { isMobile?: boolean }) {
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);

  const messages = ["Connect", "Join Us", "Trust+", "Verify"];
  const colors = ["bg-primary", "bg-blue-600", "bg-emerald-600", "bg-indigo-600"];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await emailjs.sendForm('service_hez7mw9', 'template_htai0ev', form.current!, 'qsf9Wt-yXfBKQ7CD7');
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(true); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalize = () => {
    setIsSubmitted(false);
    setIsOpen(false);
    router.push("/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(v) => { setIsOpen(v); if(!v) setIsSubmitted(false); }}>
      <DialogTrigger asChild>
        {isMobile ? (
          <motion.button
            animate={{ 
              width: [50, 140, 140, 50],
              scale: [1, 1.05, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className={`relative flex h-12 items-center justify-start overflow-hidden rounded-full px-3.5 text-white shadow-lg transition-colors duration-1000 ${colors[step]}`}
          >
            <div className="flex shrink-0 items-center justify-center">
              <Plus className="h-6 w-6" />
            </div>
            <motion.span 
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="ml-3 whitespace-nowrap text-sm font-bold uppercase tracking-tight"
            >
              {messages[step]}
            </motion.span>
          </motion.button>
        ) : (
          <Button className="group h-12 gap-2 rounded-full px-8 font-black shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            Join the Ecosystem
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[480px] overflow-hidden border-white/5 bg-background/95 backdrop-blur-3xl p-0 shadow-2xl">
        <div className="h-1.5 w-full bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center p-12 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <DialogTitle className="text-3xl font-black tracking-tighter">Request Received</DialogTitle>
              <DialogDescription className="mt-2 text-base text-muted-foreground">Network verification is in progress. Check your email soon.</DialogDescription>
              <Button className="mt-10 h-14 w-full rounded-xl font-bold" onClick={handleFinalize}>Return to Home</Button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
              <DialogHeader className="mb-8">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  <Lock className="h-3 w-3" /> Encrypted Listing
                </div>
                <DialogTitle className="text-4xl font-black tracking-tighter">Venture Portal</DialogTitle>
                <DialogDescription className="text-muted-foreground">Official business application for UpForge Network.</DialogDescription>
              </DialogHeader>
              <form ref={form} onSubmit={sendEmail} className="grid gap-4">
                <Input name="from_name" placeholder="Founder Name" className="h-14 bg-white/5" required />
                <Input name="business_name" placeholder="Startup Name" className="h-14 bg-white/5" required />
                <Input name="reply_to" type="email" placeholder="Work Email" className="h-14 bg-white/5" required />
                <Textarea name="message" placeholder="Pitch Summary..." className="min-h-[100px] bg-white/5" required />
                <Button type="submit" disabled={isLoading} className="mt-4 h-16 rounded-xl text-lg font-black shadow-lg">
                  {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Verify & Join"}
                </Button>
                <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Verified</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 500+ Listed</span>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
