"use client";

import { CodeSnippet } from "@/components/site/code-snippet";
import { PageShell } from "@/components/site/page-shell";
import { dailyCommands, insideClaudeCommands, claudeCommands } from "@/content/site";
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

export default function DailyUsagePage() {
  const commandBlock = [
    "# Launch commands",
    ...dailyCommands.launch.map((c) => `${c.cmd}`),
    "",
    "# Management commands",
    ...dailyCommands.manage.map((c) => `${c.cmd}`),
  ].join("\n");

  return (
    <PageShell
      title="Daily usage workflow"
      subtitle="Minimal operating checklist for daily coding with the LiteLLM proxy stack."
    >
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6"
      >
        {/* Start of Day */}
        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-5 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold">Start of day</h2>
          <p className="mt-2 text-sm md:text-base text-black/75">
            With <code>--restart always</code> enabled, Docker usually auto-recovers your proxy. In most cases you only need one command.
          </p>
          <CodeSnippet code="claude-nim" />
        </motion.article>

        {/* Operational Commands */}
        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-5 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold">Operational commands</h2>
          <p className="mt-2 text-sm md:text-base text-black/75">
            Keep these commands handy for restart, inspection, and session recovery.
          </p>
          <CodeSnippet code={commandBlock} />
        </motion.article>
      </motion.section>

      {/* Inside Claude Commands */}
      <motion.section
        variants={itemVariants}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-3xl border border-black/10 bg-white/85 p-5 md:p-6 shadow-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Inside Claude Code
        </p>
        <h2 className="mt-2 text-xl md:text-2xl font-semibold">Commands available in the Claude Code session</h2>
        <p className="mt-2 text-sm md:text-base text-black/75">
          Once you&apos;re inside Claude Code (after running <code>claude-nim</code>), you can use these commands:
        </p>

        <div className="mt-4 overflow-x-auto overflow-y-hidden rounded-2xl border border-black/10">
          <table className="w-full text-left text-sm md:text-base min-w-[400px]">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-3">Command</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {insideClaudeCommands.map((cmd) => (
                <tr key={cmd.command} className="border-t border-black/10">
                  <td className="px-4 py-3 font-mono text-sm">{cmd.command}</td>
                  <td className="px-4 py-3 text-black/75">{cmd.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Full Command Reference */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6"
      >
        <div className="text-center mb-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
            Complete Reference
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold">All Claude Code commands</h2>
          <p className="mt-2 text-sm md:text-base text-black/75 max-w-2xl mx-auto">
            Type <code className="bg-black/5 px-2 py-0.5 rounded text-xs">/</code> inside Claude Code to see all available commands, or use the quick reference below.
          </p>
        </div>

        {/* Session Management */}
        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-blue-500 text-sm font-semibold text-white">
              ⏯
            </span>
            <h3 className="text-lg md:text-xl font-semibold">Session Management</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {claudeCommands.session.map((cmd) => (
              <div key={cmd.command} className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/5 transition-colors">
                <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded text-black font-semibold whitespace-nowrap">
                  {cmd.command}
                </code>
                <span className="text-sm text-black/70">{cmd.description}</span>
              </div>
            ))}
          </div>
        </motion.article>

        {/* Development Workflow */}
        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-green-500 text-sm font-semibold text-white">
              💻
            </span>
            <h3 className="text-lg md:text-xl font-semibold">Development Workflow</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {claudeCommands.development.map((cmd) => (
              <div key={cmd.command} className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/5 transition-colors">
                <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded text-black font-semibold whitespace-nowrap">
                  {cmd.command}
                </code>
                <span className="text-sm text-black/70">{cmd.description}</span>
              </div>
            ))}
          </div>
        </motion.article>

        {/* Debugging & Diagnostics */}
        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-amber-500 text-sm font-semibold text-white">
              🔧
            </span>
            <h3 className="text-lg md:text-xl font-semibold">Debugging & Diagnostics</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {claudeCommands.debugging.map((cmd) => (
              <div key={cmd.command} className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/5 transition-colors">
                <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded text-black font-semibold whitespace-nowrap">
                  {cmd.command}
                </code>
                <span className="text-sm text-black/70">{cmd.description}</span>
              </div>
            ))}
          </div>
        </motion.article>

        {/* Model & Performance */}
        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-purple-500 text-sm font-semibold text-white">
              ⚡
            </span>
            <h3 className="text-lg md:text-xl font-semibold">Model & Performance</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {claudeCommands.model.map((cmd) => (
              <div key={cmd.command} className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/5 transition-colors">
                <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded text-black font-semibold whitespace-nowrap">
                  {cmd.command}
                </code>
                <span className="text-sm text-black/70">{cmd.description}</span>
              </div>
            ))}
          </div>
        </motion.article>

        {/* Settings & Configuration */}
        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-pink-500 text-sm font-semibold text-white">
              ⚙️
            </span>
            <h3 className="text-lg md:text-xl font-semibold">Settings & Configuration</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {claudeCommands.settings.map((cmd) => (
              <div key={cmd.command} className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/5 transition-colors">
                <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded text-black font-semibold whitespace-nowrap">
                  {cmd.command}
                </code>
                <span className="text-sm text-black/70">{cmd.description}</span>
              </div>
            ))}
          </div>
        </motion.article>

        {/* Productivity & Utilities */}
        <motion.article variants={itemVariants} className="rounded-3xl border border-black/10 bg-white/85 p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-indigo-500 text-sm font-semibold text-white">
              🚀
            </span>
            <h3 className="text-lg md:text-xl font-semibold">Productivity & Utilities</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {claudeCommands.productivity.map((cmd) => (
              <div key={cmd.command} className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/5 transition-colors">
                <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded text-black font-semibold whitespace-nowrap">
                  {cmd.command}
                </code>
                <span className="text-sm text-black/70">{cmd.description}</span>
              </div>
            ))}
          </div>
        </motion.article>
      </motion.section>

      {/* Session Management Tips */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
          Session Management
        </p>
        <h2 className="mt-2 text-xl font-semibold">Resuming previous work</h2>
        <p className="mt-2 text-black/75">
          List available sessions and resume where you left off:
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <CodeSnippet code="ls ~/.claude/sessions/" />
          <CodeSnippet code="claude-nim --resume &lt;session-id&gt;" />
        </div>
      </motion.section>
    </PageShell>
  );
}
