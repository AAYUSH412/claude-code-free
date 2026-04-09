"use client";

import { CodeSnippet } from "@/components/site/code-snippet";
import { PageShell } from "@/components/site/page-shell";
import { setupSteps } from "@/content/site";
import { motion } from "framer-motion";

const completeSetupScript = `#!/bin/bash

set -e

echo "🚀 Setting up Claude Code via NVIDIA NIM..."

# Create directory
mkdir -p ~/litellm-nim
cd ~/litellm-nim

# Create config.yaml
cat > config.yaml << 'EOF'
model_list:
  - model_name: claude-sonnet-4-6
    litellm_params:
      model: nvidia_nim/google/gemma-4-31b-it
      api_key: os.environ/NVIDIA_NIM_API_KEY

  - model_name: claude-opus-4-6
    litellm_params:
      model: nvidia_nim/nvidia/nemotron-3-super-120b-a12b
      api_key: os.environ/NVIDIA_NIM_API_KEY

  - model_name: claude-haiku-4-5
    litellm_params:
      model: nvidia_nim/mistralai/mistral-small-4-119b-2603
      api_key: os.environ/NVIDIA_NIM_API_KEY

litellm_settings:
  drop_params: true
  fallbacks: [{"claude-sonnet-4-6": ["claude-opus-4-6"]}]

general_settings:
  master_key: "sk-litellm-local"
EOF

echo "✅ Config created"

# Ask for API key
read -p "Enter your NVIDIA NIM API Key (nvapi-...): " API_KEY

# Start container
docker run -d \\
  -p 4001:4000 \\
  -e NVIDIA_NIM_API_KEY="$API_KEY" \\
  -v $(pwd)/config.yaml:/app/config.yaml \\
  --name litellm-nim \\
  --restart always \\
  docker.litellm.ai/berriai/litellm:main-stable \\
  --config /app/config.yaml

echo "✅ Docker container started"

# Add alias to ~/.zshrc
cat >> ~/.zshrc << EOF

# Claude Code via NVIDIA NIM
export NVIDIA_NIM_API_KEY="$API_KEY"
alias claude-nim='\\\\
ANTHROPIC_BASE_URL="http://localhost:4001" \\\\
ANTHROPIC_API_KEY="sk-litellm-local" \\\\
ANTHROPIC_MODEL="claude-sonnet-4-6" \\\\
ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-4-6" \\\\
ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-4-6" \\\\
ANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-4-5" \\\\
claude'
EOF

echo "✅ Shell alias added"

# Reload shell
source ~/.zshrc

echo ""
echo "🎉 Setup complete! Run 'claude-nim' to start using Claude Code for free."
echo ""`;

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
      subtitle="A practical flow to run Claude Code using NVIDIA NIM through a local LiteLLM proxy in under 15 minutes."
    >
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4"
      >
        {/* 6 Core Steps */}
        {setupSteps.map((step, index) => (
          <motion.article
            key={step.title}
            variants={itemVariants}
            className="rounded-3xl border border-black/10 bg-white/80 p-5 shadow-sm md:p-7"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h2 className="text-2xl font-semibold">{step.title}</h2>
            </div>
            <p className="mb-4 text-black/75">{step.description}</p>
            <CodeSnippet code={step.code} />
          </motion.article>
        ))}

        {/* Complete Setup Script Section */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/80 p-5 shadow-sm md:p-7"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#2d55ff] text-sm font-semibold text-white">
              B
            </span>
            <h2 className="text-2xl font-semibold">Bonus: Automated Setup Script</h2>
          </div>
          <p className="mb-4 text-black/75">
            Prefer a one-liner? Save this script, make it executable, and run it to automate the entire setup.
          </p>
          <CodeSnippet code={completeSetupScript} />
          <div className="mt-4 rounded-xl bg-[#e9eeff] p-4">
            <p className="text-sm text-black/80">
              <strong>Usage:</strong> Save as <code>setup-claude-nim.sh</code>, then run{' '}
              <code>chmod +x setup-claude-nim.sh && ./setup-claude-nim.sh</code>
            </p>
          </div>
        </motion.article>

        {/* Quick Links to Troubleshooting */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/80 p-5 shadow-sm md:p-7"
        >
          <h2 className="text-2xl font-semibold">Need help?</h2>
          <p className="mt-2 text-black/75">
            If you encounter issues during setup, check our troubleshooting guide for common fixes.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="/troubleshooting"
              className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/85"
            >
              View Troubleshooting Guide
            </a>
            <a
              href="/faq"
              className="rounded-full border border-black/15 px-4 py-2 text-sm font-medium transition hover:border-black/30"
            >
              Read FAQ
            </a>
          </div>
        </motion.article>
      </motion.section>
    </PageShell>
  );
}
