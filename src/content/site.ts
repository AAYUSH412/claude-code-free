export const siteNav = [
  { href: "/", label: "Home" },
  { href: "/setup", label: "Setup" },
  { href: "/models", label: "Models" },
  { href: "/troubleshooting", label: "Troubleshooting" },
  { href: "/daily-usage", label: "Daily Usage" },
  { href: "/tips", label: "Tips" },
  { href: "/faq", label: "FAQ" },
];

export const setupSteps = [
  {
    title: "Get NVIDIA API Key",
    description:
      "Create a free account at build.nvidia.com, verify your phone number, and generate an nvapi key.",
    code: `# Key format\nnvapi-YOUR_KEY_HERE`,
  },
  {
    title: "Install Claude Code",
    description: "Install Claude Code CLI and verify the installation.",
    code: `brew install --cask claude-code\nclaude --version`,
  },
  {
    title: "Create config.yaml",
    description: "Map Claude model slots to NVIDIA NIM models via LiteLLM.",
    code: `model_list:\n  - model_name: claude-sonnet-4-6\n    litellm_params:\n      model: nvidia_nim/google/gemma-4-31b-it\n      api_key: os.environ/NVIDIA_NIM_API_KEY\n\n  - model_name: claude-opus-4-6\n    litellm_params:\n      model: nvidia_nim/nvidia/nemotron-3-super-120b-a12b\n      api_key: os.environ/NVIDIA_NIM_API_KEY\n\n  - model_name: claude-haiku-4-5\n    litellm_params:\n      model: nvidia_nim/mistralai/mistral-small-4-119b-2603\n      api_key: os.environ/NVIDIA_NIM_API_KEY\n\nlitellm_settings:\n  drop_params: true\n  fallbacks: [{"claude-sonnet-4-6": ["claude-opus-4-6"]}]\n\ngeneral_settings:\n  master_key: "sk-litellm-local"`,
  },
  {
    title: "Start LiteLLM in Docker",
    description:
      "Run LiteLLM proxy on localhost so Claude Code can call Anthropic-compatible endpoints.",
    code: `mkdir -p ~/litellm-nim\ncd ~/litellm-nim\n\ndocker run -d \\\n  -p 4001:4000 \\\n  -e NVIDIA_NIM_API_KEY="nvapi-YOUR_KEY_HERE" \\\n  -v $(pwd)/config.yaml:/app/config.yaml \\\n  --name litellm-nim \\\n  --restart always \\\n  docker.litellm.ai/berriai/litellm:main-stable \\\n  --config /app/config.yaml`,
  },
  {
    title: "Add Shell Alias",
    description: "Add claude-nim alias in shell rc file to route CLI through LiteLLM.",
    code: `export NVIDIA_NIM_API_KEY="nvapi-YOUR_KEY_HERE"\n\nalias claude-nim='\\\nANTHROPIC_BASE_URL="http://localhost:4001" \\\nANTHROPIC_API_KEY="sk-litellm-local" \\\nANTHROPIC_MODEL="claude-sonnet-4-6" \\\nANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-4-6" \\\nANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-4-6" \\\nANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-4-5" \\\nclaude'`,
  },
  {
    title: "Launch",
    description: "Reload shell settings and run Claude Code via NVIDIA NIM.",
    code: `source ~/.zshrc\nclaude-nim`,
  },
];

export const models = [
  {
    name: "Gemma 4 31B",
    nimId: "google/gemma-4-31b-it",
    size: "31B Dense",
    speed: "Medium",
    rating: "5/5",
  },
  {
    name: "Nemotron Super 120B",
    nimId: "nvidia/nemotron-3-super-120b-a12b",
    size: "120B MoE",
    speed: "Fast",
    rating: "5/5",
  },
  {
    name: "Qwen 3.5 122B",
    nimId: "qwen/qwen3.5-122b-a10b",
    size: "122B MoE",
    speed: "Very Fast",
    rating: "4/5",
  },
  {
    name: "Mistral Small 4",
    nimId: "mistralai/mistral-small-4-119b-2603",
    size: "119B MoE",
    speed: "Fast",
    rating: "4/5",
  },
  {
    name: "GLM-4.7",
    nimId: "z-ai/glm4_7",
    size: "358B MoE",
    speed: "Medium",
    rating: "4/5",
  },
  {
    name: "Step 3.5 Flash",
    nimId: "stepfun-ai/step-3.5-flash",
    size: "200B MoE",
    speed: "Fastest",
    rating: "3/5",
  },
];

export const troubleshooting = [
  {
    error: "403 Authorization failed",
    cause: "API key expired or leaked",
    fix: "Generate a new key from build.nvidia.com and update shell + Docker env.",
  },
  {
    error: "DEGRADED function cannot be invoked",
    cause: "NVIDIA endpoint overloaded",
    fix: "Swap to another model in config.yaml and restart container.",
  },
  {
    error: "Not logged in",
    cause: "Launching claude instead of claude-nim",
    fix: "Always run claude-nim alias so endpoint and keys are injected.",
  },
  {
    error: "Container not found",
    cause: "Docker not running",
    fix: "Start Docker Desktop and retry docker start litellm-nim.",
  },
  {
    error: "command not found: claude",
    cause: "CLI missing from PATH",
    fix: "Re-install CLI and source shell profile.",
  },
];

export const dailyCommands = [
  "claude-nim",
  "docker start litellm-nim",
  "docker stop litellm-nim",
  "docker restart litellm-nim",
  "docker logs litellm-nim",
  "claude-nim --resume <session-id>",
];

export const insideClaudeCommands = [
  { command: "/model", description: "Switch between Sonnet/Opus/Haiku model slots" },
  { command: "/compact", description: "Free up context when sessions get slow" },
  { command: "/init", description: "Create CLAUDE.md for your project" },
  { command: "/clear", description: "Clear conversation history" },
  { command: "Ctrl+C", description: "Exit Claude Code" },
];

export const tips = [
  // Workflow tips
  {
    category: "Workflow",
    tip: "Use /model to switch between Sonnet, Opus, and Haiku slots for different task complexity.",
  },
  {
    category: "Workflow",
    tip: "Use /init in new projects to quickly generate CLAUDE.md context for better AI assistance.",
  },
  {
    category: "Workflow",
    tip: "Use /compact when long sessions become slow to free up context window.",
  },
  {
    category: "Workflow",
    tip: "Use /clear to reset conversation history when starting a new task.",
  },
  // Reliability tips
  {
    category: "Reliability",
    tip: "If a model is overloaded, swap it in config.yaml and restart LiteLLM with docker restart litellm-nim.",
  },
  {
    category: "Reliability",
    tip: "Keep Docker Desktop running in the background for instant claude-nim launches.",
  },
  {
    category: "Reliability",
    tip: "Use docker logs litellm-nim to check proxy health before starting a long session.",
  },
  // Security tips
  {
    category: "Security",
    tip: "Keep your nvapi key out of screenshots and public repos - regenerate immediately if exposed.",
  },
  {
    category: "Security",
    tip: "Never commit .zshrc or config files containing API keys to version control.",
  },
  {
    category: "Security",
    tip: "The sk-litellm-local key is just a local proxy password - safe to share in documentation.",
  },
  // Productivity tips
  {
    category: "Productivity",
    tip: "Map your preferred models once in config.yaml and switch with /model command inside Claude.",
  },
  {
    category: "Productivity",
    tip: "Use claude-nim --resume <session-id> to continue previous work exactly where you left off.",
  },
  {
    category: "Productivity",
    tip: "Stop the container with docker stop litellm-nim when not in use to save RAM.",
  },
];

export const modelSlotMapping = [
  {
    slot: "Sonnet",
    command: "/model → 1 or 5",
    recommendedModel: "gemma-4-31b-it",
    useCase: "Daily coding tasks",
  },
  {
    slot: "Opus",
    command: "/model → 3",
    recommendedModel: "nemotron-3-super-120b-a12b",
    useCase: "Complex multi-file work",
  },
  {
    slot: "Haiku",
    command: "/model → 4",
    recommendedModel: "mistral-small-4-119b-2603",
    useCase: "Quick questions",
  },
];

export const faqs = [
  {
    question: "Do I need a paid Claude account?",
    answer:
      "No. This flow uses NVIDIA NIM free-tier APIs through LiteLLM and does not require a paid Anthropic plan.",
  },
  {
    question: "Is this legal?",
    answer:
      "Yes. Claude Code is open source. NVIDIA NIM free tier is publicly available. LiteLLM is open source.",
  },
  {
    question: "Will it behave exactly like real Claude?",
    answer:
      "Core coding tasks work well, but model behavior differs because requests are served by open-source models. Basic file editing, git operations, and single-file refactors work reliably. Extended thinking and complex multi-file edits may be less consistent than actual Claude.",
  },
  {
    question: "How much free usage do I get?",
    answer:
      "NVIDIA free tier typically allows around 40 requests/minute with no credit card required and no expiry.",
  },
  {
    question: "What if a model goes down?",
    answer:
      "Edit config.yaml to swap the model mapping and run docker restart litellm-nim. Popular models may go DEGRADED during peak hours.",
  },
  {
    question: "Do I need to restart Docker every time?",
    answer:
      "No. The --restart always flag ensures the container auto-starts with Docker Desktop. Just run claude-nim when you need it.",
  },
];
