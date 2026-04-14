"use client";

import { useState } from "react";

export function CodeSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#0f172a]">
      <button
        type="button"
        className="absolute right-3 top-3 rounded-md border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/90 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0f172a]"
        onClick={async () => {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        }}
        aria-label="Copy code to clipboard"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto p-5 pr-20 text-sm leading-6 text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
