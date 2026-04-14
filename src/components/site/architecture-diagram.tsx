"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ArchitectureDiagram() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Keep a rhythmic pulse
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-black/5 bg-linear-to-br from-[#fafafa] to-[#f0f0f0] p-8 md:p-12 shadow-inner">
      <motion.svg
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewBox="0 0 800 280"
        className="mx-auto w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="boxGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8f8f8" />
          </linearGradient>
          <linearGradient id="nimGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0fdd4" /> {/* Very subtle green tint */}
          </linearGradient>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2d55ff" />
            <stop offset="100%" stopColor="#4a70ff" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.04" />
          </filter>
          <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="16" floodColor="#76b900" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Claude Code Box */}
        <g filter="url(#shadow)">
          <rect x="20" y="80" width="200" height="120" rx="20" fill="url(#boxGradient)" stroke="#e0e0e0" strokeWidth="1" />
          <rect x="20" y="80" width="200" height="4" fill="#1a1a1a" opacity="0.05" />
        </g>
        <text x="120" y="125" textAnchor="middle" fontSize="18" fontWeight="600" fill="#1a1a1a" fontFamily="var(--font-heading)">
          Claude Code
        </text>
        <text x="120" y="150" textAnchor="middle" fontSize="11" fill="#666" fontFamily="var(--font-mono)" letterSpacing="0.05em">
          ANTHROPIC API
        </text>

        {/* LiteLLM Box */}
        <g filter="url(#shadow)">
          <rect x="300" y="80" width="200" height="120" rx="20" fill="url(#boxGradient)" stroke="#e0e0e0" strokeWidth="1" />
          <rect x="300" y="80" width="200" height="4" fill="#2d55ff" opacity="0.1" />
        </g>
        <text x="400" y="125" textAnchor="middle" fontSize="18" fontWeight="600" fill="#1a1a1a" fontFamily="var(--font-heading)">
          LiteLLM
        </text>
        <text x="400" y="150" textAnchor="middle" fontSize="11" fill="#666" fontFamily="var(--font-mono)" letterSpacing="0.05em">
          PROXY :4001
        </text>
        <text x="400" y="170" textAnchor="middle" fontSize="10" fill="#999" fontStyle="italic">
          drop_params: true
        </text>

        {/* NVIDIA NIM Box */}
        <g filter="url(#glowGreen)">
          <rect x="580" y="80" width="200" height="120" rx="20" fill="url(#nimGradient)" stroke="#76b900" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="580" y="80" width="200" height="4" fill="#76b900" opacity="0.2" />
        </g>
        <text x="680" y="125" textAnchor="middle" fontSize="18" fontWeight="600" fill="#1a1a1a" fontFamily="var(--font-heading)">
          NVIDIA NIM
        </text>
        <text x="680" y="150" textAnchor="middle" fontSize="11" fill="#76b900" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.05em">
          FREE TIER CLOUD
        </text>
        <text x="680" y="170" textAnchor="middle" fontSize="10" fill="#999">
          Llama 3.1 / Nemotron
        </text>

        {/* Animated Arrows */}
        <g>
          {/* Arrow 1: Claude to LiteLLM */}
          <line x1="230" y1="140" x2="290" y2="140" stroke="url(#arrowGradient)" strokeWidth="2" strokeDasharray="4 4" />
          {isAnimating && (
            <circle r="4" fill="#2d55ff">
              <animateMotion dur="1s" repeatCount="indefinite" path="M230,140 L290,140" />
            </circle>
          )}
          <text x="260" y="130" textAnchor="middle" fontSize="10" fill="#2d55ff" fontWeight="500">
            Request
          </text>
        </g>

        <g>
          {/* Arrow 2: LiteLLM to NVIDIA */}
          <line x1="510" y1="140" x2="570" y2="140" stroke="#76b900" strokeWidth="2" strokeDasharray="4 4" />
          {isAnimating && (
            <circle r="4" fill="#76b900">
              <animateMotion dur="1s" repeatCount="indefinite" path="M510,140 L570,140" />
            </circle>
          )}
          <text x="540" y="130" textAnchor="middle" fontSize="10" fill="#76b900" fontWeight="500">
            Translated
          </text>
        </g>

        {/* Return Arrow */}
        <g>
          <line x1="570" y1="160" x2="510" y2="160" stroke="#00d4aa" strokeWidth="2" strokeDasharray="3 5" />
          <line x1="290" y1="160" x2="230" y2="160" stroke="#00d4aa" strokeWidth="2" strokeDasharray="3 5" />
          
          {isAnimating && (
            <>
              <circle r="3" fill="#00d4aa">
                <animateMotion dur="1.2s" repeatCount="indefinite" path="M570,160 L510,160" />
              </circle>
              <circle r="3" fill="#00d4aa">
                <animateMotion dur="1.2s" repeatCount="indefinite" path="M290,160 L230,160" />
              </circle>
            </>
          )}
          <text x="540" y="178" textAnchor="middle" fontSize="9" fill="#00d4aa">
            Stream
          </text>
        </g>
      </motion.svg>
    </div>
  );
}
