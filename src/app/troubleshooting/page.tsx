"use client";

import { PageShell } from "@/components/site/page-shell";
import { troubleshooting } from "@/content/site";
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

export default function TroubleshootingPage() {
  return (
    <PageShell
      title="Troubleshooting"
      subtitle="Fast fixes for the most common setup and runtime issues across Claude Code, Docker, LiteLLM, and NVIDIA NIM."
    >
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-2"
      >
        {troubleshooting.map((issue) => (
          <motion.article
            key={issue.error}
            variants={itemVariants}
            className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">{issue.error}</h2>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-black/45">Cause</p>
            <p className="text-black/75">{issue.cause}</p>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-black/45">Fix</p>
            <p className="text-black/90">{issue.fix}</p>
          </motion.article>
        ))}
      </motion.section>
    </PageShell>
  );
}
