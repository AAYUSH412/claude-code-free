"use client";

import { PageShell } from "@/components/site/page-shell";
import { models, modelSlotMapping } from "@/content/site";
import { ModelCard } from "@/components/site/model-card";
import { motion } from "framer-motion";
import { SectionDivider } from "@/components/site/section-divider";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

export default function ModelsPage() {
  return (
    <PageShell
      title="NVIDIA coding models"
      subtitle="Compare free NIM models you can seamlessly map to Claude 4.6 Sonnet and Opus."
    >
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
        className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm mb-12"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
          Model Slot Mapping
        </p>
        <h2 className="mt-2 text-2xl font-semibold">How Claude Code maps to NVIDIA models</h2>
        <p className="mt-2 text-black/70 mb-6 max-w-3xl">
          Claude Code relies on internal sub-slots (Sonnet, Opus, and Haiku) for optimal tooling workflows. This chart outlines exactly how to pipe those Anthropic models into free NVIDIA endpoints for top-tier performance.
        </p>

        <div className="relative overflow-x-auto rounded-2xl border border-black/10 bg-white">
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="sticky top-0 z-10 bg-[#fafafa] border-b border-black/10 text-black">
              <tr>
                <th className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-black/50">Claude Slot</th>
                <th className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-black/50">CLI Command</th>
                <th className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-black/50">Target NVIDIA Model</th>
                <th className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-black/50">Optimization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {modelSlotMapping.map((slot) => (
                <motion.tr
                  key={slot.slot}
                  variants={itemVariants}
                  className="transition-colors hover:bg-black/[0.02]"
                >
                  <td className="px-6 py-5 font-semibold text-[#1a1a1a]">{slot.slot}</td>
                  <td className="px-6 py-5">
                    <span className="bg-black/5 border border-black/10 px-2 py-1 rounded font-mono text-[11px] font-bold text-[#1a1a1a]">
                      {slot.command}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-mono text-xs text-black/60">{slot.recommendedModel}</td>
                  <td className="px-6 py-5 text-sm text-black/70">{slot.useCase}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <SectionDivider />

      {/* Model Inventory Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
              Available Models
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Free NVIDIA NIM computing</h2>
            <p className="text-sm text-black/70 mt-2 max-w-2xl">Browse the full registry of open-weights models available on NVIDIA&apos;s platform compatible through your LiteLLM proxy.</p>
          </div>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 pb-8">
          {models.map((model) => (
            <ModelCard key={model.nimId} model={{
              ...model,
              coding: String(model.coding),
              category: model.category || "General",
              logoName: model.logoName || "AI"
            }} />
          ))}
        </div>
      </motion.section>

      {/* Rating Legend */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-3xl border border-black/10 bg-white/50 p-6 md:p-8 shadow-sm backdrop-blur-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Coding Capability Rating
        </p>
        <div className="mt-4 grid gap-4 md:gap-6 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10">
          <div className="pt-4 md:pt-0">
            <p className="text-lg md:text-xl font-semibold tracking-widest text-[#1a1a1a]">⭐⭐⭐⭐⭐</p>
            <p className="mt-1 text-xs md:text-sm text-black/70 font-medium">Exceptional for agentic coding & complex refactors</p>
          </div>
          <div className="pt-4 md:pt-0 md:pl-4 md:pl-6">
            <p className="text-lg md:text-xl font-semibold tracking-widest text-[#1a1a1a]">⭐⭐⭐⭐</p>
            <p className="mt-1 text-xs md:text-sm text-black/70 font-medium">Reliable fallback and fast general generation</p>
          </div>
          <div className="pt-4 md:pt-0 md:pl-4 md:pl-6">
            <p className="text-lg md:text-xl font-semibold tracking-widest text-[#1a1a1a]">⭐⭐⭐</p>
            <p className="mt-1 text-xs md:text-sm text-black/70 font-medium">Basic coding support and documentation</p>
          </div>
        </div>
      </motion.section>

      {/* Explore More Models */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-3xl border border-black/10 bg-gradient-to-br from-[#f8f9fa] to-white p-6 md:p-8 shadow-sm"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50 mb-2">
              Stay Updated
            </p>
            <h3 className="text-xl md:text-2xl font-semibold">New models added daily</h3>
            <p className="mt-2 text-sm text-black/75 max-w-2xl">
              NVIDIA NIM constantly adds new models. Visit the official registry to explore the full catalog and discover the latest models for your coding needs.
            </p>
          </div>
          <a
            href="https://build.nvidia.com/models"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/85 hover:-translate-y-0.5 hover:shadow-md flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Explore All Models
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </motion.section>
    </PageShell>
  );
}
