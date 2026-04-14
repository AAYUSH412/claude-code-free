"use client";

import { useState } from "react";
import { PageShell } from "@/components/site/page-shell";
import { faqs } from "@/content/site";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function FaqPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <PageShell
      title="Frequently asked questions"
      subtitle="Answers to common concerns about setup cost, model behavior, and operational reliability."
    >
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4"
      >
        {faqs.map((faq, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <motion.article
              key={faq.question}
              variants={itemVariants}
              className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm overflow-hidden"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between text-left"
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpandedIndex(isExpanded ? null : index);
                  }
                }}
                aria-expanded={isExpanded}
                aria-controls={`faq-answer-${index}`}
              >
                <h2 className="text-xl font-semibold pr-4">{faq.question}</h2>
                <span
                  className={`flex-shrink-0 ml-4 text-2xl font-light text-black/50 transition-transform duration-300 ${
                    isExpanded ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <p id={`faq-answer-${index}`} className="mt-2 text-black/75">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </motion.section>

      {/* Security Warning Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 rounded-3xl border border-red-200 bg-red-50 p-6"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
          Security Reminder
        </p>
        <ul className="mt-3 space-y-2 text-red-800">
          <li>⚠️ Never paste your <code>nvapi-...</code> key in any chat or public forum</li>
          <li>⚠️ Never commit shell profile files or config files with keys to GitHub</li>
          <li>✅ Use environment variables (<code>os.environ/NVIDIA_NIM_API_KEY</code>)</li>
          <li>✅ Regenerate key immediately if accidentally exposed</li>
        </ul>
      </motion.section>
    </PageShell>
  );
}
