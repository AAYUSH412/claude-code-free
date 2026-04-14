"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { siteNav } from "@/content/site";
import { GrainOverlay } from "@/components/site/grain-overlay";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { BackToTop } from "@/components/site/back-to-top";
import { Footer } from "@/components/site/footer";

export function PageShell({
  title,
  subtitle,
  children,
  hideTitle = false,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  hideTitle?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,oklch(0.92_0.06_250)_0%,oklch(0.98_0.01_250)_35%,oklch(1_0_0)_100%)] text-foreground">
      <ScrollProgress />
      <GrainOverlay />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-black focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-black/5">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link className="text-sm font-semibold tracking-[0.14em]" href="/">
            CLAUDE CODE FREE
          </Link>
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            {siteNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive
                    ? "rounded-full border border-black bg-black px-3 py-1.5 text-white transition hover:bg-black/85"
                    : "rounded-full border border-black/10 bg-white/75 px-3 py-1.5 transition hover:border-black/20 hover:bg-white"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main id="main-content" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16 pt-8">
        {!hideTitle && (
          <div className="max-w-3xl space-y-4">
            <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-black md:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base text-black/70 md:text-lg">{subtitle}</p>
          </div>
        )}
        {children}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
