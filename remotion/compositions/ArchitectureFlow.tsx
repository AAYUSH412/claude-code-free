import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type ArchitectureFlowProps = {
  title: string;
  subtitle: string;
};

const cardBase: CSSProperties = {
  width: 430,
  height: 260,
  borderRadius: 28,
  border: "1px solid rgba(255,255,255,0.28)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,255,255,0.07))",
  boxShadow: "0 40px 80px rgba(5, 8, 18, 0.25)",
  backdropFilter: "blur(4px)",
  padding: 28,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const packetColor = "#54b9ff";

const modelRows = [
  "Sonnet -> google/gemma-4-31b-it",
  "Opus -> nvidia/nemotron-3-super-120b-a12b",
  "Haiku -> mistralai/mistral-small-4-119b-2603",
];

export const ArchitectureFlow = ({ title, subtitle }: ArchitectureFlowProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const introOpacity = interpolate(frame, [0, 22, 60], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const cardPop = (delay: number) =>
    spring({
      fps,
      frame: frame - delay,
      config: {
        damping: 200,
        stiffness: 150,
      },
    });

  const leftScale = cardPop(10);
  const midScale = cardPop(24);
  const rightScale = cardPop(38);

  const leftX = 170;
  const midX = 740;
  const rightX = 1310;
  const cardY = 330;

  const flowWindowStart = 95;
  const flowWindowLength = 210;
  const phase = ((frame - flowWindowStart) % flowWindowLength + flowWindowLength) % flowWindowLength;
  const normalized = phase / flowWindowLength;

  const forwardPacketX = interpolate(normalized, [0, 0.5, 1], [leftX + 430, midX + 215, rightX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const backwardPacketX = interpolate(normalized, [0, 0.5, 1], [rightX, midX + 215, leftX + 430], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const packetOpacity = frame < flowWindowStart ? 0 : 0.95;

  const pulse = 1 + Math.sin(frame / 11) * 0.04;

  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Afacad Flux', 'Trebuchet MS', sans-serif",
        background:
          "radial-gradient(circle at 14% 10%, #3558ff 0%, #152268 30%, #08122f 62%, #070d21 100%)",
        color: "#eef2ff",
      }}
    >
      <AbsoluteFill
        style={{
          opacity: 0.2,
          backgroundImage:
            "linear-gradient(rgba(196, 210, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 210, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: "70px 120px auto",
          opacity: introOpacity,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 22,
            textTransform: "uppercase",
            letterSpacing: "0.28em",
            color: "#b8c8ff",
          }}
        >
          Architecture Walkthrough
        </p>
        <h1 style={{ margin: "18px 0 14px", fontSize: 66, lineHeight: 1.05 }}>{title}</h1>
        <p style={{ margin: 0, fontSize: 30, color: "#d3dcff", maxWidth: 1300 }}>{subtitle}</p>
      </div>

      <div
        style={{
          position: "absolute",
          left: leftX,
          top: cardY,
          ...cardBase,
          transform: `scale(${leftScale})`,
          transformOrigin: "left top",
        }}
      >
        <p style={{ margin: 0, fontSize: 18, color: "#b3c6ff", letterSpacing: "0.12em" }}>CLIENT</p>
        <div>
          <h2 style={{ margin: 0, fontSize: 43, lineHeight: 1.08 }}>Claude Code CLI</h2>
          <p style={{ margin: "12px 0 0", fontSize: 24, color: "#d6e0ff" }}>Anthropic request format</p>
        </div>
        <p style={{ margin: 0, fontSize: 20, color: "#b4c5ff" }}>
          Uses ANTHROPIC_BASE_URL + local proxy key
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          left: midX,
          top: cardY,
          ...cardBase,
          transform: `scale(${midScale})`,
          transformOrigin: "center top",
        }}
      >
        <p style={{ margin: 0, fontSize: 18, color: "#b3c6ff", letterSpacing: "0.12em" }}>TRANSLATION</p>
        <div>
          <h2 style={{ margin: 0, fontSize: 43, lineHeight: 1.08 }}>LiteLLM Proxy</h2>
          <p style={{ margin: "12px 0 0", fontSize: 24, color: "#d6e0ff" }}>Anthropic to OpenAI format</p>
        </div>
        <p style={{ margin: 0, fontSize: 20, color: "#b4c5ff" }}>
          drop_params: true | Port 4001 to 4000
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          left: rightX,
          top: cardY,
          ...cardBase,
          transform: `scale(${rightScale})`,
          transformOrigin: "right top",
        }}
      >
        <p style={{ margin: 0, fontSize: 18, color: "#b3c6ff", letterSpacing: "0.12em" }}>INFERENCE</p>
        <div>
          <h2 style={{ margin: 0, fontSize: 43, lineHeight: 1.08 }}>NVIDIA NIM API</h2>
          <p style={{ margin: "12px 0 0", fontSize: 24, color: "#d6e0ff" }}>Free-tier model execution</p>
        </div>
        <p style={{ margin: 0, fontSize: 20, color: "#b4c5ff" }}>
          Auth: nvapi key | ~40 req/min
        </p>
      </div>

      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: introOpacity }}
      >
        <line x1={600} y1={460} x2={740} y2={460} stroke="rgba(188,205,255,0.6)" strokeWidth="5" />
        <line x1={1170} y1={460} x2={1310} y2={460} stroke="rgba(188,205,255,0.6)" strokeWidth="5" />
        <line x1={740} y1={530} x2={600} y2={530} stroke="rgba(188,205,255,0.34)" strokeWidth="4" />
        <line x1={1310} y1={530} x2={1170} y2={530} stroke="rgba(188,205,255,0.34)" strokeWidth="4" />

        <circle
          cx={forwardPacketX}
          cy={460}
          r={16 * pulse}
          fill={packetColor}
          opacity={packetOpacity}
          filter="drop-shadow(0 0 12px rgba(84, 185, 255, 0.7))"
        />
        <circle
          cx={backwardPacketX}
          cy={530}
          r={11}
          fill="#8ee4cc"
          opacity={packetOpacity * 0.86}
          filter="drop-shadow(0 0 10px rgba(142, 228, 204, 0.65))"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 140,
          bottom: 88,
          width: 1640,
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.25)",
          background: "rgba(5, 10, 30, 0.5)",
          padding: "24px 30px",
          opacity: interpolate(frame, [120, 170], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }),
        }}
      >
        <p style={{ margin: 0, fontSize: 20, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9eb6ff" }}>
          Model Mapping
        </p>
        {modelRows.map((row) => (
          <p key={row} style={{ margin: "10px 0 0", fontSize: 30, color: "#f3f6ff" }}>
            {row}
          </p>
        ))}
      </div>
    </AbsoluteFill>
  );
};
