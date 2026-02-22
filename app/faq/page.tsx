"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { HelpCircle, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "What is Upforge?",
    answer:
      "Upforge is an independent Indian startup registry and founder directory. We verify startups and maintain a transparent public ledger of credible founders to improve trust, visibility, and ecosystem integrity."
  },
  {
    question: "Is listing on Upforge free?",
    answer:
      "Yes. Standard startup listing is completely free. Our mission is to organize and strengthen the Indian startup ecosystem — not sell access. We only charge a small optional one-time fee for our Verified Seal to cover manual review and compliance checks."
  },
  {
    question: "What does the Verified Seal mean?",
    answer:
      "The Verified Seal confirms that a startup has passed manual checks including incorporation validation, founder identity review, and public data consistency. It improves hiring trust, investor confidence, and partnership credibility."
  },
  {
    question: "How long does verification take?",
    answer:
      "Most submissions are reviewed within 4–7 business days. Complex cases may take slightly longer depending on documentation clarity."
  },
  {
    question: "Who can apply?",
    answer:
      "Any legally registered Indian startup (Private Limited or LLP) with a verifiable founder profile can apply. We support early-stage startups, growth companies, and funded ventures."
  },
  {
    question: "Can I update my startup profile later?",
    answer:
      "Yes. Founders can request updates anytime via dashboard access or by contacting our support team. We ensure information remains accurate and transparent."
  },
  {
    question: "Does Upforge endorse or invest in startups?",
    answer:
      "No. Upforge is a neutral registry platform. We do not provide investment advice or endorsements. Our role is verification, visibility, and ecosystem transparency."
  }
]

export default function FAQPage() {
  return (
    <div className="relative bg-[#fbf9f6] min-h-screen text-[#1e1b1b] antialiased pt-44 pb-36 px-6">
      
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 8px)",
        }}
      />

      <div className="relative max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#1e3a5f]/10 shadow-sm mb-6"
          >
            <HelpCircle className="h-4 w-4 text-[#c6a43f]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f]">
              Startup FAQ
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-8">
            Frequently Asked <span className="font-semibold text-[#1e3a5f]">Questions</span>
          </h1>

          <p className="text-lg text-[#4a4a4a] max-w-xl mx-auto">
            Clear answers about startup verification, founder registry listing,
            and how Upforge builds trust in the Indian startup ecosystem.
          </p>
        </div>

        {/* FAQ Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-[#1e3a5f]/10 rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-20"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-[#1e3a5f]/10 last:border-0 pb-2"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-[#c6a43f] hover:no-underline py-6 text-[#1e1b1b]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#4a4a4a] text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Premium CTA Section */}
        <div className="bg-gradient-to-br from-[#0f1e2f] via-[#12283f] to-[#0c1622] rounded-[3rem] p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">

          <div className="relative z-10">
            <h2 className="text-3xl font-light mb-6">
              Still have questions?
            </h2>

            <p className="text-zinc-400 mb-10 max-w-md mx-auto">
              Our team responds within 24 hours. We are committed to transparency,
              compliance, and founder support.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              
              <Link href="mailto:hello@upforge.in">
                <Button className="h-14 px-10 rounded-full bg-[#c6a43f] hover:bg-[#b08c2e] text-[#0f1e2f] text-xs uppercase tracking-[0.2em] w-full sm:w-auto font-semibold shadow-lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </Button>
              </Link>

              <Link href="/contact">
                <Button className="h-14 px-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white text-xs uppercase tracking-[0.2em] w-full sm:w-auto font-semibold backdrop-blur-md">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#4a4a4a]">
            UPFORGE INDIA · Updated February 2026
          </p>
        </div>

      </div>
    </div>
  )
}
