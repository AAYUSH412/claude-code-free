"use client";

import { PageShell } from "@/components/site/page-shell";
import { faqs } from "@/content/site";
import { motion } from "framer-motion";

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
        {faqs.map((faq) => (
          <motion.article
            key={faq.question}
            variants={itemVariants}
            className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">{faq.question}</h2>
            <p className="mt-2 text-black/75">{faq.answer}</p>
          </motion.article>
        ))}
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
          <li>⚠️ Never commit your <code>.zshrc</code> or config files with keys to GitHub</li>
          <li>✅ Use environment variables (<code>os.environ/NVIDIA_NIM_API_KEY</code>)</li>
          <li>✅ Regenerate key immediately if accidentally exposed</li>
        </ul>
      </motion.section>
    </PageShell>
  );
}
