"use client";

import Link from "next/link";
import { PageShell } from "@/components/site/page-shell";
import { plugins } from "@/content/site";
import { motion } from "framer-motion";

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

export default function PluginsPage() {
  return (
    <PageShell
      title="Plugins & Extensions"
      subtitle="Extend Claude Code with powerful plugins for better productivity and code understanding."
    >
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8"
      >
        {/* Introduction */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/85 p-6 md:p-8 shadow-sm"
        >
          <p className="text-sm text-black/75 leading-relaxed">
            Claude Code supports plugins that extend its capabilities. These plugins can provide persistent memory, codebase analysis, and more. Install them to supercharge your coding workflow.
          </p>
        </motion.article>

        {/* Plugin Cards */}
        {plugins.map((plugin) => (
          <motion.article
            key={plugin.name}
            variants={itemVariants}
            className="rounded-3xl border border-black/10 bg-white/85 overflow-hidden"
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${plugin.color} p-6 md:p-8 text-white`}>
              <div className="flex items-start gap-4">
                <div className="text-4xl">{plugin.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-semibold">{plugin.name}</h2>
                  <p className="mt-2 text-white/90">{plugin.description}</p>
                </div>
                <a
                  href={plugin.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-px bg-black/10 border-b border-black/10">
              {plugin.stats.map((stat) => (
                <div key={stat.label} className="bg-white p-4 md:p-6 text-center">
                  <p className="text-2xl md:text-3xl font-bold text-black">{stat.value}</p>
                  <p className="text-xs md:text-sm font-medium text-black/70">{stat.label}</p>
                  <p className="text-xs text-black/50">{stat.subtext}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <ul className="grid gap-3">
                {plugin.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-black/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Installation */}
              <div className="mt-6 rounded-xl bg-[#f8f9fa] border border-black/10 p-4 md:p-5">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Installation
                </h4>
                <div className="space-y-2">
                  <div className="rounded-lg bg-black/5 p-3 font-mono text-xs overflow-x-auto">
                    <code className="text-black">{plugin.installation.step1}</code>
                  </div>
                  {plugin.installation.step2 && (
                    <div className="rounded-lg bg-black/5 p-3 font-mono text-xs overflow-x-auto">
                      <code className="text-black">{plugin.installation.step2}</code>
                    </div>
                  )}
                  {plugin.installation.step3 && (
                    <div className="rounded-lg bg-black/5 p-3 font-mono text-xs overflow-x-auto">
                      <code className="text-black">{plugin.installation.step3}</code>
                    </div>
                  )}
                </div>
                {plugin.installation.note && (
                  <p className="mt-3 text-xs text-black/60">
                    <strong>Note:</strong> {plugin.installation.note}
                  </p>
                )}
              </div>

              {/* Integration */}
              <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-4 md:p-5">
                <h4 className="text-sm font-semibold mb-2 text-blue-800 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  How to Use
                </h4>
                <p className="text-sm text-blue-900">{plugin.integration}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={plugin.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-black/85 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
                {plugin.name === "Claude-Mem" && (
                  <Link
                    href="/shortcuts"
                    className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:border-black/30 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Learn More
                  </Link>
                )}
              </div>
            </div>
          </motion.article>
        ))}

        {/* Additional Resources */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-gradient-to-br from-[#f8f9fa] to-white p-6 md:p-8 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">More Plugins</h3>
          <p className="text-sm text-black/75 mb-4">
            Explore the Claude Code plugin marketplace for more extensions:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/daily-usage"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-black/85 hover:-translate-y-0.5 hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              View Commands
            </Link>
            <Link
              href="/tips"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:border-black/30 hover:-translate-y-0.5 hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              See Tips
            </Link>
          </div>
        </motion.article>
      </motion.section>
    </PageShell>
  );
}
