"use client";

import { PageShell } from "@/components/site/page-shell";
import { models, modelSlotMapping } from "@/content/site";
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

export default function ModelsPage() {
  return (
    <PageShell
      title="NVIDIA coding models"
      subtitle="Compare free NIM models you can map to Claude Code Sonnet, Opus, and Haiku slots."
    >
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
          Model Slot Mapping
        </p>
        <h2 className="mt-2 text-2xl font-semibold">How Claude Code maps to NVIDIA models</h2>
        <p className="mt-2 text-black/75">
          Claude Code internally uses 3 model slots. Each maps to a different NVIDIA model for optimal performance:
        </p>

        <div className="mt-4 overflow-hidden rounded-2xl border border-black/10">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-3">Slot</th>
                <th className="px-4 py-3">Command</th>
                <th className="px-4 py-3">NVIDIA Model</th>
                <th className="px-4 py-3">Use Case</th>
              </tr>
            </thead>
            <tbody>
              {modelSlotMapping.map((slot) => (
                <motion.tr
                  key={slot.slot}
                  className="border-t border-black/10"
                  variants={itemVariants}
                >
                  <td className="px-4 py-3 font-semibold">{slot.slot}</td>
                  <td className="px-4 py-3 font-mono text-xs md:text-sm">{slot.command}</td>
                  <td className="px-4 py-3 font-mono text-xs md:text-sm">{slot.recommendedModel}</td>
                  <td className="px-4 py-3 text-black/75">{slot.useCase}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Model Comparison Table */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-4"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
          Available Models
        </p>
        <h2 className="mt-2 text-2xl font-semibold">All free NVIDIA NIM coding models</h2>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-4 overflow-hidden rounded-3xl border border-black/10 bg-white/85 shadow-sm"
      >
        <table className="w-full text-left text-sm md:text-base">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">NIM ID</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Speed</th>
              <th className="px-4 py-3">Coding</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.nimId} className="border-t border-black/10">
                <td className="px-4 py-3 font-medium">{model.name}</td>
                <td className="px-4 py-3 font-mono text-xs md:text-sm">{model.nimId}</td>
                <td className="px-4 py-3">{model.size}</td>
                <td className="px-4 py-3">{model.speed}</td>
                <td className="px-4 py-3">{model.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Rating Legend */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-4 rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
          Rating Legend
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold">⭐⭐⭐⭐⭐</p>
            <p className="text-sm text-black/70">Excellent for coding tasks</p>
          </div>
          <div>
            <p className="text-lg font-semibold">⭐⭐⭐⭐</p>
            <p className="text-sm text-black/70">Good for most tasks</p>
          </div>
          <div>
            <p className="text-lg font-semibold">⭐⭐⭐</p>
            <p className="text-sm text-black/70">Basic coding support</p>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}
