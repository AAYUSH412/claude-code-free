"use client";

import { PageShell } from "@/components/site/page-shell";
import { keyboardShortcuts } from "@/content/site";
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

export default function ShortcutsPage() {
  return (
    <PageShell
      title="Keyboard shortcuts"
      subtitle="Master the keyboard shortcuts for efficient Claude Code usage."
    >
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6"
      >
        {/* Mac Terminal Setup Warning */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-white flex-shrink-0">
              i
            </span>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">macOS Terminal Setup</h2>
              <p className="mt-2 text-sm text-black/75">
                For Alt/Option key shortcuts to work on macOS, configure your terminal:
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-blue-50 p-4 border border-blue-100">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-blue-600 mb-2">iTerm2</p>
                  <p className="text-sm text-black/80">
                    Preferences → Profiles → Keys → Set Left/Right Option key to <code className="bg-black/10 px-1 rounded">Esc+</code>
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 p-4 border border-blue-100">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-blue-600 mb-2">Terminal.app</p>
                  <p className="text-sm text-black/80">
                    Preferences → Profiles → Keyboard → Check <code className="bg-black/10 px-1 rounded">Use Option as Meta Key</code>
                  </p>
                </div>
              </div>
              <div className="mt-3 rounded-xl bg-[#e9eeff] p-4">
                <p className="text-sm text-black/80">
                  <strong>Pro tip:</strong> Run <code className="bg-black/10 px-1 rounded">/terminal-setup</code> inside Claude Code to automatically configure Shift+Enter for multiline input.
                </p>
              </div>
            </div>
          </div>
        </motion.article>

        {/* General Controls */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-blue-500 text-sm font-semibold text-white">
              ⚡
            </span>
            <h3 className="text-lg font-semibold">General Controls</h3>
          </div>
          <div className="overflow-x-auto rounded-xl border border-black/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs">Shortcut</th>
                  <th className="px-4 py-3 text-xs">Description</th>
                  <th className="px-4 py-3 text-xs text-white/60">Context</th>
                </tr>
              </thead>
              <tbody>
                {keyboardShortcuts.general.map((item) => (
                  <tr key={item.shortcut} className="border-t border-black/10 hover:bg-black/[0.02]">
                    <td className="px-4 py-3 font-mono text-xs bg-black/5">{item.shortcut}</td>
                    <td className="px-4 py-3 text-black/80">{item.description}</td>
                    <td className="px-4 py-3 text-xs text-black/50">{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.article>

        {/* Text Editing */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-green-500 text-sm font-semibold text-white">
              ✏️
            </span>
            <h3 className="text-lg font-semibold">Text Editing</h3>
          </div>
          <div className="overflow-x-auto rounded-xl border border-black/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs">Shortcut</th>
                  <th className="px-4 py-3 text-xs">Description</th>
                  <th className="px-4 py-3 text-xs text-white/60">Note</th>
                </tr>
              </thead>
              <tbody>
                {keyboardShortcuts.textEditing.map((item) => (
                  <tr key={item.shortcut} className="border-t border-black/10 hover:bg-black/[0.02]">
                    <td className="px-4 py-3 font-mono text-xs bg-black/5">{item.shortcut}</td>
                    <td className="px-4 py-3 text-black/80">{item.description}</td>
                    <td className="px-4 py-3 text-xs text-black/50">{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.article>

        {/* Navigation */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-purple-500 text-sm font-semibold text-white">
              🧭
            </span>
            <h3 className="text-lg font-semibold">Navigation</h3>
          </div>
          <div className="overflow-x-auto rounded-xl border border-black/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs">Shortcut</th>
                  <th className="px-4 py-3 text-xs">Description</th>
                  <th className="px-4 py-3 text-xs text-white/60">Note</th>
                </tr>
              </thead>
              <tbody>
                {keyboardShortcuts.navigation.map((item) => (
                  <tr key={item.shortcut} className="border-t border-black/10 hover:bg-black/[0.02]">
                    <td className="px-4 py-3 font-mono text-xs bg-black/5">{item.shortcut}</td>
                    <td className="px-4 py-3 text-black/80">{item.description}</td>
                    <td className="px-4 py-3 text-xs text-black/50">{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.article>

        {/* Multiline Input */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-pink-500 text-sm font-semibold text-white">
              📝
            </span>
            <h3 className="text-lg font-semibold">Multiline Input</h3>
          </div>
          <div className="overflow-x-auto rounded-xl border border-black/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs">Shortcut</th>
                  <th className="px-4 py-3 text-xs">Description</th>
                  <th className="px-4 py-3 text-xs text-white/60">Compatibility</th>
                </tr>
              </thead>
              <tbody>
                {keyboardShortcuts.multiline.map((item) => (
                  <tr key={item.shortcut} className="border-t border-black/10 hover:bg-black/[0.02]">
                    <td className="px-4 py-3 font-mono text-xs bg-black/5">{item.shortcut}</td>
                    <td className="px-4 py-3 text-black/80">{item.description}</td>
                    <td className="px-4 py-3 text-xs text-black/50">{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.article>

        {/* Quick Commands */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-indigo-500 text-sm font-semibold text-white">
              ⌨️
            </span>
            <h3 className="text-lg font-semibold">Quick Commands</h3>
          </div>
          <div className="overflow-x-auto rounded-xl border border-black/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs">Prefix</th>
                  <th className="px-4 py-3 text-xs">Description</th>
                  <th className="px-4 py-3 text-xs text-white/60">Usage</th>
                </tr>
              </thead>
              <tbody>
                {keyboardShortcuts.quickCommands.map((item) => (
                  <tr key={item.shortcut} className="border-t border-black/10 hover:bg-black/[0.02]">
                    <td className="px-4 py-3 font-mono text-xs bg-black/5">{item.shortcut}</td>
                    <td className="px-4 py-3 text-black/80">{item.description}</td>
                    <td className="px-4 py-3 text-xs text-black/50">{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.article>

        {/* Vim Mode */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-amber-500 text-sm font-semibold text-white">
              📌
            </span>
            <h3 className="text-lg font-semibold">Vim Mode</h3>
          </div>
          <p className="mb-4 text-sm text-black/75">
            Enable vim-style editing via <code className="bg-black/5 px-2 py-0.5 rounded text-xs">/config → Editor mode</code>
          </p>
          <div className="overflow-x-auto rounded-xl border border-black/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs">Key</th>
                  <th className="px-4 py-3 text-xs">Description</th>
                  <th className="px-4 py-3 text-xs text-white/60">Mode</th>
                </tr>
              </thead>
              <tbody>
                {keyboardShortcuts.vimMode.map((item) => (
                  <tr key={item.shortcut} className="border-t border-black/10 hover:bg-black/[0.02]">
                    <td className="px-4 py-3 font-mono text-xs bg-black/5">{item.shortcut}</td>
                    <td className="px-4 py-3 text-black/80">{item.description}</td>
                    <td className="px-4 py-3 text-xs text-black/50">{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.article>

        {/* Transcript Viewer */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-cyan-500 text-sm font-semibold text-white">
              👁️
            </span>
            <h3 className="text-lg font-semibold">Transcript Viewer</h3>
          </div>
          <p className="mb-4 text-sm text-black/75">
            Press <code className="bg-black/5 px-2 py-0.5 rounded text-xs">Ctrl+O</code> to open the transcript viewer, then use:
          </p>
          <div className="overflow-x-auto rounded-xl border border-black/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs">Shortcut</th>
                  <th className="px-4 py-3 text-xs">Description</th>
                  <th className="px-4 py-3 text-xs text-white/60">Context</th>
                </tr>
              </thead>
              <tbody>
                {keyboardShortcuts.transcript.map((item) => (
                  <tr key={item.shortcut} className="border-t border-black/10 hover:bg-black/[0.02]">
                    <td className="px-4 py-3 font-mono text-xs bg-black/5">{item.shortcut}</td>
                    <td className="px-4 py-3 text-black/80">{item.description}</td>
                    <td className="px-4 py-3 text-xs text-black/50">{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.article>

        {/* Quick Reference Card */}
        <motion.article
          variants={itemVariants}
          className="rounded-3xl border border-black/10 bg-gradient-to-br from-black to-[#1a1a1a] p-6 shadow-sm text-white"
        >
          <h3 className="text-lg font-semibold mb-4">Most Used Shortcuts</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <code className="text-xs font-mono bg-white/20 px-2 py-1 rounded text-white font-semibold">Ctrl+C</code>
              <span className="text-sm text-white/80">Cancel</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <code className="text-xs font-mono bg-white/20 px-2 py-1 rounded text-white font-semibold">Ctrl+D</code>
              <span className="text-sm text-white/80">Exit</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <code className="text-xs font-mono bg-white/20 px-2 py-1 rounded text-white font-semibold">Ctrl+O</code>
              <span className="text-sm text-white/80">Transcript</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <code className="text-xs font-mono bg-white/20 px-2 py-1 rounded text-white font-semibold">Ctrl+B</code>
              <span className="text-sm text-white/80">Background</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <code className="text-xs font-mono bg-white/20 px-2 py-1 rounded text-white font-semibold">Ctrl+R</code>
              <span className="text-sm text-white/80">Search</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <code className="text-xs font-mono bg-white/20 px-2 py-1 rounded text-white font-semibold">/</code>
              <span className="text-sm text-white/80">Commands</span>
            </div>
          </div>
        </motion.article>
      </motion.section>
    </PageShell>
  );
}
