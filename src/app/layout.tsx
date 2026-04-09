import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const bodyFont = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const codeFont = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Claude Code Free - Run AI Coding Assistant for Free",
    template: "%s | Claude Code Free",
  },
  description:
    "Run Claude Code CLI for free using NVIDIA NIM's free-tier API and LiteLLM proxy. No credit card required. Complete setup guide for students and developers. 15-minute installation.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  keywords: [
    "Claude Code",
    "Claude Code free",
    "NVIDIA NIM",
    "LiteLLM",
    "AI coding assistant",
    "free coding AI",
    "Claude alternative",
    "open source AI",
    "coding assistant free",
    "NVIDIA API",
  ],
  authors: [{ name: "Aayush Vaghela" }],
  creator: "Aayush Vaghela",
  publisher: "Aayush Vaghela",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://claudecodefree.dev"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://claudecodefree.dev",
    title: "Claude Code Free - Run AI Coding Assistant for Free",
    description:
      "Run Claude Code CLI for free using NVIDIA NIM's free-tier API and LiteLLM proxy. No credit card required. Complete setup guide.",
    siteName: "Claude Code Free",
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "Claude Code Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code Free - Run AI Coding Assistant for Free",
    description:
      "Run Claude Code CLI for free using NVIDIA NIM's free-tier API and LiteLLM proxy.",
    images: ["/og-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // twitter: 'your-twitter-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} ${codeFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
