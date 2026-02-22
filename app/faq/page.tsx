"use client";

import {
  Accordion,
  AccordionContent,
 AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle, Mail, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Custom CSS animations (shared with homepage)
const style = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.6; filter: blur(20px); }
    50% { opacity: 1; filter: blur(25px); }
  }
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  .animate-pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }
`;

const faqs = [
  {
    question: "What is Upforge?",
    answer:
      "Upforge is an independent Indian startup registry and founder directory. We verify startups and maintain a transparent public ledger of credible founders to improve trust, visibility, and ecosystem integrity.",
  },
  {
    question: "Is listing on Upforge free?",
    answer:
      "Yes. Standard startup listing is completely free. Our mission is to organize and strengthen the Indian startup ecosystem — not sell access. We only charge a small optional one-time fee for our Verified Seal to cover manual review and compliance checks.",
  },
  {
    question: "What does the Verified Seal mean?",
    answer:
      "The Verified Seal confirms that a startup has passed manual checks including incorporation validation, founder identity review, and public data consistency. It improves hiring trust, investor confidence, and partnership credibility.",
  },
  {
    question: "How long does verification take?",
    answer:
      "Most submissions are reviewed within 4–7 business days. Complex cases may take slightly longer depending on documentation clarity.",
  },
  {
    question: "Who can apply?",
    answer:
      "Any legally registered Indian startup (Private Limited or LLP) with a verifiable founder profile can apply. We support early-stage startups, growth companies, and funded ventures.",
  },
  {
    question: "Can I update my startup profile later?",
    answer:
      "Yes. Founders can request updates anytime via dashboard access or by contacting our support team. We ensure information remains accurate and transparent.",
  },
  {
    question: "Does Upforge endorse or invest in startups?",
    answer:
      "No. Upforge is a neutral registry platform. We do not provide investment advice or endorsements. Our role is verification, visibility, and ecosystem transparency.",
  },
];

export default function FAQPage() {
  return (
    <>
      <style>{style}</style>
      <div className="relative bg-[#0a0c0e] min-h-screen text-white antialiased pt-44 pb-36 px-6 overflow-hidden">
        {/* Dynamic gradient orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-40 w-96 h-96 bg-[#1e3a5f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-[#c6a43f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#1e3a5f]/30 to-[#c6a43f]/30 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        {/* Subtle grid overlay */}
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h60v60H0z" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/%3E%3C/svg%3E')] pointer-events-none`}
        ></div>

        <div className="relative max-w-4xl mx-auto z-10">
          {/* Header */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 shadow-xl"
            >
              <Sparkles className="h-4 w-4 text-[#c6a43f]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                Startup FAQ
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#c6a43f]">
                Frequently Asked
              </span>
              <span className="block mt-2 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c6a43f] via-[#1e3a5f] to-[#c6a43f] [text-shadow:_0_0_30px_rgba(198,164,63,0.5)]">
                  Questions
                </span>
                <span className="absolute -inset-1 bg-gradient-to-r from-[#c6a43f]/30 to-[#1e3a5f]/30 blur-2xl -z-10"></span>
              </span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Clear answers about startup verification, founder registry listing,
              and how Upforge builds trust in the Indian startup ecosystem.
            </p>
          </div>

          {/* FAQ Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-20"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-white/10 last:border-0 pb-2"
                >
                  <AccordionTrigger className="text-left text-lg font-medium hover:text-[#c6a43f] hover:no-underline py-6 text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Premium CTA Section */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Subtle glow inside */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c6a43f]/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl font-light mb-6 text-white">
                Still have questions?
              </h2>

              <p className="text-gray-400 mb-10 max-w-md mx-auto">
                Our team responds within 24 hours. We are committed to transparency,
                compliance, and founder support.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="mailto:hello@upforge.in">
                  <Button className="group relative h-14 px-10 rounded-full bg-[#c6a43f] hover:bg-[#b08c2e] text-black text-xs uppercase tracking-[0.2em] w-full sm:w-auto font-semibold shadow-lg overflow-hidden">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Support
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button className="group h-14 px-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs uppercase tracking-[0.2em] w-full sm:w-auto font-semibold backdrop-blur-md">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-20 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500">
              UPFORGE INDIA · Updated February 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
