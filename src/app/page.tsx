"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { PageShell } from "@/components/site/page-shell";
import { ArchitectureDiagram } from "@/components/site/architecture-diagram";

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
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Home() {
  return (
    <PageShell
      title="Get Claude Code for Free"
      subtitle="Use NVIDIA&apos;s free AI models as a replacement for paid Claude subscriptions. No credit card required."
    >
      {/* Hero CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-4"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 text-sm font-medium text-black/70">
          <span className="text-green-600">✓</span>
          <span>15-minute setup | No credit card | Open source</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/setup"
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85 hover:shadow-lg"
          >
            Start Setup
          </Link>
          <Link
            href="/models"
            className="rounded-full border border-black/20 bg-white/80 px-6 py-3 text-sm font-semibold text-black transition hover:border-black/30 hover:bg-white"
          >
            See How It Works
          </Link>
        </div>
      </motion.section>

      {/* What You Get Section - Moved Up */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-3"
      >
        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-600">
            What You Get
          </p>
          <h3 className="mt-2 text-xl font-semibold">Free Claude Code access</h3>
          <p className="mt-2 text-black/75">
            Run the full Claude Code CLI without a paid Anthropic subscription. Use powerful AI
            coding assistance for free.
          </p>
        </motion.article>

        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            How It Works
          </p>
          <h3 className="mt-2 text-xl font-semibold">NVIDIA NIM + LiteLLM</h3>
          <p className="mt-2 text-black/75">
            NVIDIA provides free AI models. LiteLLM translates requests so Claude Code works
            normally with your free NVIDIA key.
          </p>
        </motion.article>

        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
            What You Need
          </p>
          <h3 className="mt-2 text-xl font-semibold">Just 3 things</h3>
          <ul className="mt-2 text-sm text-black/75">
            <li>• Docker Desktop</li>
            <li>• Claude Code CLI</li>
            <li>• Free NVIDIA account</li>
          </ul>
        </motion.article>
      </motion.section>

      {/* Quick Explainer Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-3"
      >
        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
            What is Claude Code?
          </p>
          <h3 className="mt-2 text-xl font-semibold">AI that writes code</h3>
          <p className="mt-2 text-black/75">
            Claude Code is an AI coding assistant that can edit files, run terminal commands,
            and help with complex development tasks directly in your terminal.
          </p>
        </motion.article>

        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
            What is NVIDIA NIM?
          </p>
          <h3 className="mt-2 text-xl font-semibold">Free AI inference API</h3>
          <p className="mt-2 text-black/75">
            NVIDIA NIM provides free access to powerful open-source models like Gemma,
            Nemotron, and Mistral. No credit card required.
          </p>
        </motion.article>

        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
            Why LiteLLM?
          </p>
          <h3 className="mt-2 text-xl font-semibold">API translation layer</h3>
          <p className="mt-2 text-black/75">
            LiteLLM translates Claude Code&apos;s Anthropic API format to OpenAI format
            that NVIDIA NIM understands. drop_params: true handles compatibility.
          </p>
        </motion.article>
      </motion.section>

      {/* Architecture Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid gap-4 md:grid-cols-[1.4fr_1fr]"
      >
        <article className="rounded-3xl border border-black/10 bg-white/85 p-7 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/55">Architecture</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
            Claude Code CLI → LiteLLM Proxy → NVIDIA NIM API
          </h2>
          <p className="mt-3 max-w-[62ch] text-black/75">
            Claude Code sends Anthropic-format requests. LiteLLM translates them into OpenAI format and forwards
            them with your NVIDIA key. Responses are translated back so Claude Code works normally.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-[#e9eeff] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">Client</p>
              <p className="mt-1 text-lg font-semibold">Claude Code</p>
              <p className="text-sm text-black/70">ANTHROPIC_BASE_URL and model slot envs</p>
            </div>
            <div className="rounded-2xl bg-[#e8fff9] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">Proxy</p>
              <p className="mt-1 text-lg font-semibold">LiteLLM</p>
              <p className="text-sm text-black/70">drop_params: true and model mapping</p>
            </div>
            <div className="rounded-2xl bg-[#f3efff] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">Inference</p>
              <p className="mt-1 text-lg font-semibold">NVIDIA NIM</p>
              <p className="text-sm text-black/70">gemma, nemotron, mistral endpoints</p>
            </div>
          </div>
        </article>

        <aside className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/55">How it works</p>
          <p className="mt-2 text-black/75">
            Your Claude Code requests flow through a local LiteLLM proxy that translates them to NVIDIA&apos;s API format.
          </p>
          <div className="mt-4">
            <ArchitectureDiagram />
          </div>
        </aside>
      </motion.section>

      {/* Requirements Checklist */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/55">Requirements</p>
        <h2 className="mt-2 text-2xl font-semibold">What you need before starting</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 text-green-600">✓</span>
            <span><strong>Docker Desktop</strong> installed and running</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 text-green-600">✓</span>
            <span><strong>Claude Code CLI</strong> installed (brew or npm)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 text-green-600">✓</span>
            <span><strong>Free NVIDIA account</strong> at build.nvidia.com</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 text-green-600">✓</span>
            <span><strong>macOS 13+</strong>, <strong>Ubuntu 20.04+</strong>, or <strong>Windows 10+ with WSL</strong></span>
          </li>
        </ul>
      </motion.section>

      {/* Value Props */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-4 md:grid-cols-3"
      >
        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm">
          <h3 className="text-xl font-semibold">15-minute target</h3>
          <p className="mt-2 text-black/75">Install CLI, run LiteLLM Docker, add alias, then launch with claude-nim.</p>
        </motion.article>
        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm">
          <h3 className="text-xl font-semibold">No paid Anthropic plan</h3>
          <p className="mt-2 text-black/75">Use NVIDIA free-tier APIs and keep your key secure through env variables.</p>
        </motion.article>
        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Three model slots</h3>
          <p className="mt-2 text-black/75">Map Sonnet, Opus, and Haiku to optimized NVIDIA models for task fit.</p>
        </motion.article>
      </motion.section>
    </PageShell>
  );
}
