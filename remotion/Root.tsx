import { Composition } from "remotion";

import { ArchitectureFlow } from "./compositions/ArchitectureFlow";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ArchitectureFlow"
        component={ArchitectureFlow}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={420}
        defaultProps={{
          title: "How Claude Code Free via NVIDIA NIM Works",
          subtitle: "Anthropic format -> LiteLLM translation -> NVIDIA free inference",
        }}
      />
    </>
  );
};
