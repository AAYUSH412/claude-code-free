"use client";

import Link from "next/link";
import { PageShell } from "@/components/site/page-shell";
import { bestPractices } from "@/content/site";
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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function BestPracticesPage() {
  return (
    <PageShell
      title="Best practices"
      subtitle="Master Claude Code with proven workflows, tips, and techniques from the community."
    >
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6"
      >
        {/* Core Concepts */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/85 p-6 md:p-8 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50 mb-4">
            Foundation
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">Core Concepts</h2>
          <p className="mt-2 text-sm md:text-base text-black/75">
            Understanding these three building blocks will help you use Claude Code more effectively.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {bestPractices.coreConcepts.map((concept) => (
              <div key={concept.title} className="rounded-2xl border border-black/10 bg-white p-5 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{concept.icon}</div>
                <h3 className="text-lg font-semibold">{concept.title}</h3>
                <p className="mt-2 text-sm text-black/75">{concept.description}</p>
                <div className="mt-3 pt-3 border-t border-black/5">
                  <p className="text-xs text-black/60">
                    <span className="font-semibold">Use for:</span> {concept.useCase}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.article>

        {/* Recommended Workflows */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/85 p-6 md:p-8 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50 mb-4">
            Workflows
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">Recommended Workflows</h2>
          <p className="mt-2 text-sm md:text-base text-black/75">
            Follow these proven patterns for reliable results.
          </p>

          <div className="mt-6 grid gap-4">
            {bestPractices.workflows.map((workflow) => (
              <div key={workflow.name} className="rounded-2xl border border-black/10 bg-gradient-to-br from-[#f8f9fa] to-white p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="inline-flex size-10 items-center justify-center rounded-full bg-black text-white flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{workflow.name}</h3>
                    <p className="mt-1 text-sm text-black/75">{workflow.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {workflow.steps.map((step, index) => (
                        <span key={index} className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/80">
                          <span className="text-black/40">{index + 1}.</span>
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.article>

        {/* Pro Tips */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/85 p-6 md:p-8 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50 mb-4">
            Power User
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">Pro Tips</h2>
          <p className="mt-2 text-sm md:text-base text-black/75">
            Advanced techniques to boost your productivity.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {bestPractices.proTips.map((tip, index) => (
              <div key={index} className="rounded-2xl border border-black/10 bg-white p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="inline-flex size-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 flex-shrink-0 text-sm font-bold">
                    ⭐
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-amber-600 mb-1">
                      {tip.category}
                    </p>
                    <p className="text-sm text-black/80">{tip.tip}</p>
                    <div className="mt-2 rounded-lg bg-black/5 p-2">
                      <code className="text-xs font-mono text-black/80 break-all">{tip.command}</code>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.article>

        {/* Memory Files */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/85 p-6 md:p-8 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50 mb-4">
            Context
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">Memory Files</h2>
          <p className="mt-2 text-sm md:text-base text-black/75">
            Persistent context that survives across sessions.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {bestPractices.memoryFiles.map((memory) => (
              <div key={memory.name} className="rounded-2xl border border-black/10 bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <code className="font-mono text-sm font-semibold text-black">{memory.name}</code>
                </div>
                <p className="text-sm text-black/75">{memory.purpose}</p>
                <div className="mt-3 rounded-lg bg-white/70 p-2">
                  <p className="text-xs text-black/60">{memory.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.article>

        {/* Quick Reference */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-gradient-to-br from-black to-[#1a1a1a] p-6 md:p-8 shadow-sm text-white"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Quick Command Reference</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <code className="text-xs font-mono bg-white/20 px-2 py-1 rounded text-white font-semibold">/init</code>
              <span className="text-sm text-white/80">Create CLAUDE.md</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <code className="text-xs font-mono bg-white/20 px-2 py-1 rounded text-white font-semibold">/compact</code>
              <span className="text-sm text-white/80">Free context</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <code className="text-xs font-mono bg-white/20 px-2 py-1 rounded text-white font-semibold">/btw</code>
              <span className="text-sm text-white/80">Side question</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <code className="text-xs font-mono bg-white/20 px-2 py-1 rounded text-white font-semibold">/ultraplan</code>
              <span className="text-sm text-white/80">Browser planning</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <code className="text-xs font-mono bg-white/20 px-2 py-1 rounded text-white font-semibold">!</code>
              <span className="text-sm text-white/80">Bash mode</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <code className="text-xs font-mono bg-white/20 px-2 py-1 rounded text-white font-semibold">/permissions</code>
              <span className="text-sm text-white/80">Manage rules</span>
            </div>
          </div>
        </motion.article>

        {/* Related Resources */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-gradient-to-br from-[#f8f9fa] to-white p-6 md:p-8 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Continue Learning</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/daily-usage"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-black/85 hover:-translate-y-0.5 hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Daily Usage
            </Link>
            <Link
              href="/shortcuts"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:border-black/30 hover:-translate-y-0.5 hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Keyboard Shortcuts
            </Link>
            <Link
              href="/plugins"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:border-black/30 hover:-translate-y-0.5 hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Plugins
            </Link>
          </div>
        </motion.article>
      </motion.section>
    </PageShell>
  );
}
