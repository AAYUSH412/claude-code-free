"use client";

import { useEffect, useState } from "react";

export function ArchitectureDiagram() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-[#fafafa] to-[#f0f0f0] p-8">
      <svg
        viewBox="0 0 800 280"
        className="mx-auto w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e8e8e8" />
          </linearGradient>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2d55ff" />
            <stop offset="100%" stopColor="#4a70ff" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Claude Code Box */}
        <g filter="url(#shadow)">
          <rect
            x="20"
            y="80"
            width="200"
            height="120"
            rx="16"
            fill="url(#boxGradient)"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
        </g>
        <text x="120" y="120" textAnchor="middle" fontSize="16" fontWeight="600" fill="#1a1a1a">
          Claude Code
        </text>
        <text x="120" y="145" textAnchor="middle" fontSize="12" fill="#666">
          CLI / Terminal
        </text>
        <text x="120" y="165" textAnchor="middle" fontSize="10" fill="#999">
          Anthropic API Format
        </text>

        {/* LiteLLM Box */}
        <g filter="url(#shadow)">
          <rect
            x="300"
            y="80"
            width="200"
            height="120"
            rx="16"
            fill="url(#boxGradient)"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
        </g>
        <text x="400" y="120" textAnchor="middle" fontSize="16" fontWeight="600" fill="#1a1a1a">
          LiteLLM
        </text>
        <text x="400" y="145" textAnchor="middle" fontSize="12" fill="#666">
          Proxy :4001
        </text>
        <text x="400" y="165" textAnchor="middle" fontSize="10" fill="#999">
          drop_params: true
        </text>

        {/* NVIDIA NIM Box */}
        <g filter="url(#shadow)">
          <rect
            x="580"
            y="80"
            width="200"
            height="120"
            rx="16"
            fill="url(#boxGradient)"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
        </g>
        <text x="680" y="120" textAnchor="middle" fontSize="16" fontWeight="600" fill="#1a1a1a">
          NVIDIA NIM
        </text>
        <text x="680" y="145" textAnchor="middle" fontSize="12" fill="#666">
          Free API
        </text>
        <text x="680" y="165" textAnchor="middle" fontSize="10" fill="#999">
          Gemma / Nemotron
        </text>

        {/* Animated Arrows */}
        <g>
          {/* Arrow 1: Claude to LiteLLM */}
          <line
            x1="240"
            y1="140"
            x2="285"
            y2="140"
            stroke="url(#arrowGradient)"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          {isAnimating && (
            <circle r="4" fill="#2d55ff">
              <animateMotion
                dur="1.5s"
                repeatCount="indefinite"
                path="M240,140 L285,140"
              />
            </circle>
          )}
          <text x="262" y="130" textAnchor="middle" fontSize="10" fill="#2d55ff">
            Request
          </text>
        </g>

        <g>
          {/* Arrow 2: LiteLLM to NVIDIA */}
          <line
            x1="520"
            y1="140"
            x2="565"
            y2="140"
            stroke="url(#arrowGradient)"
            strokeWidth="2"
          />
          {isAnimating && (
            <circle r="4" fill="#2d55ff">
              <animateMotion
                dur="1.5s"
                repeatCount="indefinite"
                path="M520,140 L565,140"
              />
            </circle>
          )}
          <text x="542" y="130" textAnchor="middle" fontSize="10" fill="#2d55ff">
            Translated
          </text>
        </g>

        {/* Return Arrow 1 */}
        <g>
          <line
            x1="565"
            y1="155"
            x2="520"
            y2="155"
            stroke="#00d4aa"
            strokeWidth="2"
            strokeDasharray="4,2"
          />
          {isAnimating && (
            <circle r="3" fill="#00d4aa">
              <animateMotion
                dur="1.5s"
                repeatCount="indefinite"
                path="M565,155 L520,155"
              />
            </circle>
          )}
          <text x="542" y="175" textAnchor="middle" fontSize="9" fill="#00d4aa">
            Response
          </text>
        </g>

        {/* Return Arrow 2 */}
        <g>
          <line
            x1="285"
            y1="155"
            x2="240"
            y2="155"
            stroke="#00d4aa"
            strokeWidth="2"
            strokeDasharray="4,2"
          />
          {isAnimating && (
            <circle r="3" fill="#00d4aa">
              <animateMotion
                dur="1.5s"
                repeatCount="indefinite"
                path="M285,155 L240,155"
              />
            </circle>
          )}
        </g>

        {/* Arrowhead marker */}
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#2d55ff" />
        </marker>
      </svg>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-[#2d55ff]" />
          <span className="text-xs text-gray-600">Request (Anthropic → OpenAI)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-[#00d4aa]" />
          <span className="text-xs text-gray-600">Response (OpenAI → Anthropic)</span>
        </div>
      </div>
    </div>
  );
}
