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

// Categorize troubleshooting issues
const categorizedIssues = {
  "Authentication & API": troubleshooting.filter(
    (t) => t.error.includes("403") || t.error.includes("Authorization")
  ),
  "Docker & Container": troubleshooting.filter(
    (t) => t.error.includes("Container") || t.error.includes("Docker")
  ),
  "Installation & PATH": troubleshooting.filter(
    (t) => t.error.includes("command not found") || t.error.includes("PATH")
  ),
  "Windows Specific": troubleshooting.filter((t) => t.error.includes("Windows")),
  "Port & Network": troubleshooting.filter(
    (t) => t.error.includes("Port") || t.error.includes("4000")
  ),
  "Model Issues": troubleshooting.filter((t) => t.error.includes("DEGRADED")),
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
        className="grid gap-8"
      >
        {Object.entries(categorizedIssues).map(([category, issues]) => (
          <motion.div key={category} variants={itemVariants}>
            <h2 className="text-lg font-semibold text-black/70 mb-4 uppercase tracking-wider">
              {category}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {issues.map((issue) => (
                <article
                  key={issue.error}
                  className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
                >
                  <h3 className="text-xl font-semibold">{issue.error}</h3>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-black/45">
                    Cause
                  </p>
                  <p className="text-black/75">{issue.cause}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-black/45">
                    Fix
                  </p>
                  <p className="text-black/90">{issue.fix}</p>
                </article>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.section>
    </PageShell>
  );
}
