"use client";

import { CodeSnippet } from "@/components/site/code-snippet";
import { PageShell } from "@/components/site/page-shell";
import { setupSteps } from "@/content/site";
import { motion } from "framer-motion";
import { SectionDivider } from "@/components/site/section-divider";

const quickChecks = `# 1) Confirm container is running
docker ps --filter "name=litellm-nim"

# 2) Confirm proxy can list models
# macOS / Linux / WSL
curl http://localhost:4001/v1/models

# Windows PowerShell
iwr http://localhost:4001/v1/models

# 3) Launch Claude through LiteLLM
# macOS / Linux / WSL
ANTHROPIC_BASE_URL="http://localhost:4001" ANTHROPIC_API_KEY="sk-litellm-local" ANTHROPIC_MODEL="claude-sonnet-4-6" claude

# Windows PowerShell
$env:ANTHROPIC_BASE_URL="http://localhost:4001"; $env:ANTHROPIC_API_KEY="sk-litellm-local"; $env:ANTHROPIC_MODEL="claude-sonnet-4-6"; claude`;

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

export default function SetupPage() {
  return (
    <PageShell
      title="Step-by-step setup"
      subtitle="A beginner-friendly setup for macOS, Linux, WSL, and Windows PowerShell using NVIDIA NIM + LiteLLM."
    >
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6"
      >
        {/* 6 Core Steps */}
        {setupSteps.map((step, index) => (
          <motion.article
            key={step.title}
            variants={itemVariants}
            className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-sm md:p-8 overflow-hidden"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h2 className="text-2xl font-semibold">{step.title}</h2>
            </div>
            <p className="mb-4 text-black/75">{step.description}</p>
            {step.code && <CodeSnippet code={step.code} />}
            {step.configCode && <>
              <span className="mt-4 mb-2 block text-sm font-semibold text-black/70">config.yaml</span>
              <CodeSnippet code={step.configCode} />
            </>}
            {step.codeMacLinux && <>
              <span className="mt-4 mb-2 block text-sm font-semibold text-black/70">macOS / Linux</span>
              <CodeSnippet code={step.codeMacLinux} />
            </>}
            {step.codeMac && <>
              <span className="mt-4 mb-2 block text-sm font-semibold text-black/70">macOS / Linux</span>
              <CodeSnippet code={step.codeMac} />
            </>}
            {step.codeWindows && <>
              <span className="mt-4 mb-2 block text-sm font-semibold text-black/70">Windows</span>
              <CodeSnippet code={step.codeWindows} />
            </>}
            {step.codeBrew && <>
              <span className="mt-4 mb-2 block text-sm font-semibold text-black/70">macOS (Homebrew)</span>
              <CodeSnippet code={step.codeBrew} />
            </>}
            {step.expectedLog && <>
              <span className="mt-4 mb-2 block text-sm font-semibold text-black/70">Expected Output</span>
              <CodeSnippet code={step.expectedLog} />
            </>}
            {step.note && (
              <div className="mt-4 rounded-xl bg-[#e9eeff] p-4">
                <p className="text-sm text-black/80 flex items-start gap-2">
                  <span aria-hidden="true">📌</span>
                  <span>{step.note}</span>
                </p>
              </div>
            )}
          </motion.article>
        ))}

        <SectionDivider />

        {/* Quick Validation Section */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-sm md:p-8 overflow-hidden"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#2d55ff] text-sm font-semibold text-white">
              ✓
            </span>
            <h2 className="text-2xl font-semibold">Quick validation (recommended)</h2>
          </div>
          <p className="mb-4 text-black/75">
            Before adding aliases or advanced model routing, run these checks to confirm your base setup is working.
          </p>
          <CodeSnippet code={quickChecks} />
          <div className="mt-4 rounded-xl bg-[#e9eeff] p-4">
            <p className="text-sm text-black/80">
              <strong>Tip:</strong> After this works, then add permanent aliases/functions to your shell profile.
            </p>
          </div>
        </motion.article>

        {/* Quick Links to Troubleshooting */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-sm md:p-8"
        >
          <h2 className="text-2xl font-semibold">Need help?</h2>
          <p className="mt-2 text-black/75">
            If you encounter issues during setup, check our troubleshooting guide for common fixes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/troubleshooting"
              className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-black/85 hover:-translate-y-0.5 hover:shadow-md"
            >
              View Troubleshooting Guide
            </a>
            <a
              href="/faq"
              className="rounded-full border border-black/15 bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:border-black/30 hover:-translate-y-0.5 hover:shadow-md"
            >
              Read FAQ
            </a>
          </div>
        </motion.article>

        <SectionDivider />

        {/* API Key Setup Warning */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-sm md:p-8"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-white">
              !
            </span>
            <h2 className="text-2xl font-semibold">Important: API Key Setup</h2>
          </div>
          <p className="mb-4 text-black/75">
            When you first run <code>claude-nim</code>, Claude Code will ask you:
          </p>
          <div className="mb-4 rounded-xl bg-black/5 border border-black/10 p-4 font-mono text-sm text-black">
            Do you want to use this API key (sk-litellm-local)?
          </div>
          <p className="mb-4 text-black/75">
            <strong>Important:</strong> You must select <strong>Yes (option 1)</strong>. This tells Claude Code to use the LiteLLM proxy key instead of looking for an Anthropic API key in your environment.
          </p>
          <div className="rounded-xl bg-[#fff8e6] border border-amber-200 p-4">
            <p className="text-sm text-black/80 flex items-start gap-2">
              <span aria-hidden="true">⚠️</span>
              <span>
                <strong>Warning:</strong> If you select &quot;No&quot;, Claude Code will not know where to find your API key and will fail to connect. You may need to restart the session with <code>claude-nim</code> if you accidentally select No.
              </span>
            </p>
          </div>
          <div className="mt-4 rounded-xl bg-[#e9eeff] p-4">
            <p className="text-sm text-black/80">
              <strong>How it works:</strong> The <code>sk-litellm-local</code> key is just a local proxy password that tells LiteLLM to route your requests to NVIDIA NIM. It&apos;s safe and required for this setup to work.
            </p>
          </div>
        </motion.article>
      </motion.section>
    </PageShell>
  );
}
