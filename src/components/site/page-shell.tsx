import Link from "next/link";
import type { ReactNode } from "react";

import { siteNav } from "@/content/site";
import { GrainOverlay } from "@/components/site/grain-overlay";

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,oklch(0.92_0.06_250)_0%,oklch(0.98_0.01_250)_35%,oklch(1_0_0)_100%)] text-foreground">
      <GrainOverlay />
      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <Link className="text-sm font-semibold tracking-[0.14em]" href="/">
          CLAUDE CODE FREE
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          {siteNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-black/10 bg-white/75 px-3 py-1.5 transition hover:border-black/20 hover:bg-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16 pt-4">
        <div className="max-w-3xl space-y-4">
          <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-black md:text-6xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base text-black/70 md:text-lg">{subtitle}</p>
        </div>
        {children}
      </main>
    </div>
  );
}
