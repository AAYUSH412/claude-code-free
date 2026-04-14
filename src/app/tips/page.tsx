"use client";

import { PageShell } from "@/components/site/page-shell";
import { tips } from "@/content/site";
import { motion } from "framer-motion";

// Group tips by category
const groupedTips = tips.reduce((acc, tip) => {
  if (!acc[tip.category]) {
    acc[tip.category] = [];
  }
  acc[tip.category].push(tip.tip);
  return acc;
}, {} as Record<string, string[]>);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function TipsPage() {
  return (
    <PageShell
      title="Power tips"
      subtitle="Improve reliability, security, and speed while using free NVIDIA-backed Claude Code workflows."
    >
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6"
      >
        {Object.entries(groupedTips).map(([category, categoryTips]) => (
          <motion.article
            key={category}
            variants={itemVariants}
            className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
          >
            <h2 className="text-2xl font-semibold">{category}</h2>
            <ul className="mt-4 space-y-4">
              {categoryTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex size-5 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="text-black/85">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.section>

      {/* Quick Reference Card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 rounded-3xl border border-black/10 bg-gradient-to-br from-[#f8f9fa] to-white p-6 md:p-8 shadow-sm"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
          Quick Reference
        </p>
        <h2 className="mt-2 text-xl font-semibold text-black">Most used commands</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-4 border border-black/5 shadow-sm">
            <p className="font-mono text-sm text-black/90">claude-nim</p>
            <p className="mt-1 text-xs text-black/60">Start Claude Code</p>
          </div>
          <div className="rounded-2xl bg-white p-4 border border-black/5 shadow-sm">
            <p className="font-mono text-sm text-black/90">/compact</p>
            <p className="mt-1 text-xs text-black/60">Free up context</p>
          </div>
          <div className="rounded-2xl bg-white p-4 border border-black/5 shadow-sm">
            <p className="font-mono text-sm text-black/90">docker logs litellm-nim</p>
            <p className="mt-1 text-xs text-black/60">Check proxy health</p>
          </div>
          <div className="rounded-2xl bg-white p-4 border border-black/5 shadow-sm">
            <p className="font-mono text-sm text-black/90">/model</p>
            <p className="mt-1 text-xs text-black/60">Switch model slot</p>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}
