// app/faq/page.tsx
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
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />
      <main className="relative pt-20">
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-black/20 hidden sm:block"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  STARTUP FAQ
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
                Frequently Asked{" "}
                <span className="text-gray-500 italic font-medium">Questions</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Clear answers about startup verification, founder registry listing,
                and how Upforge builds trust in the Indian startup ecosystem.
              </p>
            </div>

            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-black/5 rounded-2xl shadow-sm p-6 sm:p-8 mb-16"
            >
              <Accordion type="single" collapsible className="w-full space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-black/5 last:border-0"
                  >
                    <AccordionTrigger className="text-left text-base sm:text-lg font-medium hover:text-[#1e3a5f] hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-sm sm:text-base leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white border border-black/5 rounded-2xl shadow-sm p-8 sm:p-12 text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tighter mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Our team responds within 24 hours. We are committed to transparency,
                compliance, and founder support.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="mailto:hello@upforge.in">
                  <Button className="h-14 px-8 rounded-full bg-[#1e3a5f] hover:bg-[#14304a] text-white text-xs uppercase tracking-[0.2em] w-full sm:w-auto">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Support
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="h-14 px-8 rounded-full border-black/20 text-black text-xs uppercase tracking-[0.2em] w-full sm:w-auto hover:bg-black/5"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
