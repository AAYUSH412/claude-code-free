export const siteNav = [
  { href: "/", label: "Home" },
  { href: "/setup", label: "Setup" },
  { href: "/models", label: "Models" },
  { href: "/troubleshooting", label: "Troubleshooting" },
  { href: "/daily-usage", label: "Daily Usage" },
  { href: "/shortcuts", label: "Shortcuts" },
  { href: "/plugins", label: "Plugins" },
  { href: "/best-practices", label: "Best Practices" },
  { href: "/tips", label: "Tips" },
  { href: "/faq", label: "FAQ" },
];

// ─── INSTALL COMMANDS per platform ───────────────────────────────────────────
export const installCommands = {
  mac: {
    label: "macOS",
    steps: [
      {
        title: "Native Installer (Recommended — auto-updates)",
        code: `curl -fsSL https://claude.ai/install.sh | bash`,
      },
      {
        title: "Or via Homebrew (manual updates needed)",
        code: `brew install --cask claude-code\n# To update later:\nbrew upgrade claude-code`,
      },
    ],
    shellConfig: "~/.zshrc",
    shellSource: "source ~/.zshrc",
    note: "macOS default shell is Zsh. If you use Bash, replace ~/.zshrc with ~/.bashrc",
  },
  linux: {
    label: "Linux",
    steps: [
      {
        title: "Native Installer (Recommended)",
        code: `curl -fsSL https://claude.ai/install.sh | bash`,
      },
    ],
    shellConfig: "~/.bashrc",
    shellSource: "source ~/.bashrc",
    note: "Linux default shell is Bash. If you use Zsh, replace ~/.bashrc with ~/.zshrc",
  },
  windows: {
    label: "Windows",
    steps: [
      {
        title: "Step 1 — Install Git for Windows (required)",
        code: `# Download from: https://git-scm.com/downloads/win\n# During install: select "Add to PATH"`,
      },
      {
        title: "Step 2 — Install Claude Code via PowerShell",
        code: `irm https://claude.ai/install.ps1 | iex`,
      },
      {
        title: "Step 2 (alternative) — via CMD",
        code: `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`,
      },
      {
        title: "Step 2 (alternative) — via WinGet",
        code: `winget install Anthropic.ClaudeCode\n# To update later:\nwinget upgrade Anthropic.ClaudeCode`,
      },
    ],
    shellConfig: "$PROFILE (PowerShell profile)",
    shellSource: ". $PROFILE",
    note: "Windows requires Git for Windows installed before Claude Code will work. Restart PowerShell after installing Git.",
  },
};

// ─── SETUP STEPS ─────────────────────────────────────────────────────────────
export const setupSteps = [
  {
    title: "Get NVIDIA API Key",
    description:
      "Create a free account at build.nvidia.com. No credit card required. Verify your phone number, navigate to any model, and click 'Get API Key'.",
    code: `# 1. Go to: https://build.nvidia.com\n# 2. Create free account & verify phone\n# 3. Click any model → "Get API Key"\n# 4. Copy the key — it looks like:\nnvapi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`,
    note: "Keep your key private — never share it or commit it to git.",
  },
  {
    title: "Install Claude Code CLI",
    description:
      "Install the Claude Code CLI using the method for your platform. The native installer is recommended — it auto-updates in the background.",
    codeMac: `# macOS / Linux (recommended)\ncurl -fsSL https://claude.ai/install.sh | bash\n\n# Verify install\nclaude --version`,
    codeWindows: `# Windows — open PowerShell and run:\nirm https://claude.ai/install.ps1 | iex\n\n# Requires Git for Windows first:\n# https://git-scm.com/downloads/win`,
    codeBrew: `# macOS via Homebrew\nbrew install --cask claude-code\nclaude --version`,
    note: "After installing, open a new terminal window before running claude --version.",
  },
  {
    title: "Create config.yaml",
    description:
      "This file tells LiteLLM which NVIDIA NIM models to use for each Claude model slot. Create a folder and save this file inside it.",
    code: `mkdir -p ~/litellm-nim\ncd ~/litellm-nim`,
    configCode: `model_list:
  # ─── SONNET - Fast daily coding ───
  - model_name: claude-sonnet-4-6
    litellm_params:
      model: nvidia_nim/qwen/qwen3.5-122b-a10b
      api_key: os.environ/NVIDIA_NIM_API_KEY

  # ─── OPUS - Complex multi-file work ───
  - model_name: claude-opus-4-6
    litellm_params:
      model: nvidia_nim/nvidia/nemotron-3-super-120b-a12b
      api_key: os.environ/NVIDIA_NIM_API_KEY

  # ─── HAIKU - Quick answers ───
  - model_name: claude-haiku-4-5
    litellm_params:
      model: nvidia_nim/mistralai/mistral-small-4-119b-2603
      api_key: os.environ/NVIDIA_NIM_API_KEY

  # ─── CUSTOM 1: Kimi - Code from UI/screenshots ───
  - model_name: kimi-vision
    litellm_params:
      model: nvidia_nim/moonshotai/kimi-k2.5
      api_key: os.environ/NVIDIA_NIM_API_KEY

  # ─── CUSTOM 2: GLM-5 - Long agentic sessions ───
  - model_name: glm5-agentic
    litellm_params:
      model: nvidia_nim/z-ai/glm5
      api_key: os.environ/NVIDIA_NIM_API_KEY

  # ─── CUSTOM 3: Llama 3.3 - General coding ───
- model_name: llama-3.3-70b
  litellm_params:
    model: nvidia_nim/meta/llama-3.3-70b-instruct
    api_key: os.environ/NVIDIA_NIM_API_KEY

# ─── CUSTOM 4: DeepSeek V3.2 - Advanced reasoning ───
- model_name: deepseek-v3.2
  litellm_params:
    model: nvidia_nim/deepseek-ai/deepseek-v3_2
    api_key: os.environ/NVIDIA_NIM_API_KEY

# ─── CUSTOM 5: Mistral - Stable fallback ───
  - model_name: mistral-stable
    litellm_params:
      model: nvidia_nim/mistralai/mistral-small-4-119b-2603
      api_key: os.environ/NVIDIA_NIM_API_KEY

  - model_name: minimax-m2.7
    litellm_params:
      model: nvidia_nim/minimaxai/minimax-m2.7
      api_key: os.environ/NVIDIA_NIM_API_KEY

litellm_settings:
  drop_params: true

general_settings:
  master_key: "sk-litellm-local"`,
    note: 'Save this as config.yaml inside the ~/litellm-nim folder.',
  },
  {
    title: "Start LiteLLM via Docker",
    description:
      "Run LiteLLM as a local proxy. This translates Claude Code's API calls into NVIDIA NIM API calls. Make sure Docker Desktop is running first.",
    codeMacLinux: `cd ~/litellm-nim

docker run -d \\
  -p 4000:4000 \\
  -e NVIDIA_NIM_API_KEY="nvapi-YOUR_KEY_HERE" \\
  -v $(pwd)/config.yaml:/app/config.yaml \\
  --name litellm-nim \\
  --restart always \\
  docker.litellm.ai/berriai/litellm:main-stable \\
  --config /app/config.yaml

# Verify it started correctly
docker logs litellm-nim`,
    codeWindows: `cd $env:USERPROFILE\\litellm-nim

docker run -d \`
  -p 4000:4000 \`
  -e NVIDIA_NIM_API_KEY="nvapi-YOUR_KEY_HERE" \`
  -v \${PWD}/config.yaml:/app/config.yaml \`
  --name litellm-nim \`
  --restart always \`
  docker.litellm.ai/berriai/litellm:main-stable \`
  --config /app/config.yaml

# Verify it started
docker logs litellm-nim`,
    expectedLog: `INFO: Application startup complete.
INFO: Uvicorn running on http://0.0.0.0:4000`,
    note: "Replace nvapi-YOUR_KEY_HERE with your actual NVIDIA API key. The --restart always flag means the container auto-starts whenever Docker Desktop opens.",
  },
  {
    title: "Add Shell Alias",
    description:
      "Add the claude-nim alias to your shell config file. This sets the environment variables that route Claude Code through your local LiteLLM proxy instead of Anthropic's servers.",
    codeMac: `# Add to ~/.zshrc (macOS) or ~/.bashrc (Linux)
export NVIDIA_NIM_API_KEY="nvapi-YOUR_KEY_HERE"

alias claude-nim='\\
  ANTHROPIC_BASE_URL="http://localhost:4000" \\
  ANTHROPIC_API_KEY="sk-litellm-local" \\
  ANTHROPIC_MODEL="claude-sonnet-4-6" \\
  ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-4-6" \\
  ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-4-6" \\
  ANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-4-5" \\
  claude'`,
    codeWindows: `# Add to PowerShell profile — run: notepad $PROFILE
$env:NVIDIA_NIM_API_KEY = "nvapi-YOUR_KEY_HERE"

function claude-nim {
  $env:ANTHROPIC_BASE_URL = "http://localhost:4000"
  $env:ANTHROPIC_API_KEY = "sk-litellm-local"
  $env:ANTHROPIC_MODEL = "claude-sonnet-4-6"
  $env:ANTHROPIC_DEFAULT_OPUS_MODEL = "claude-opus-4-6"
  $env:ANTHROPIC_DEFAULT_SONNET_MODEL = "claude-sonnet-4-6"
  $env:ANTHROPIC_DEFAULT_HAIKU_MODEL = "claude-haiku-4-5"
  claude @args
}`,
    note: "Replace nvapi-YOUR_KEY_HERE with your actual key. On Windows, open PowerShell profile with: notepad $PROFILE",
  },
  {
    title: "Launch Claude Code",
    description:
      "Reload your shell config and launch Claude Code. When asked about API key, select Yes to use the LiteLLM key.",
    codeMac: `# macOS / Linux
source ~/.zshrc   # or source ~/.bashrc on Linux
claude-nim`,
    codeWindows: `# Windows PowerShell
. $PROFILE
claude-nim`,
    note: 'When Claude Code asks "Do you want to use this API key (sk-litellm-local)?" — select Yes (option 1).',
  },
];

// ─── MODELS TABLE ─────────────────────────────────────────────────────────────
export const models = [
  {
    name: "Nemotron Super 120B",
    nimId: "nvidia/nemotron-3-super-120b-a12b",
    provider: "NVIDIA",
    logoName: "NVIDIA",
    size: "120B MoE",
    speed: "⚡ Fast",
    coding: "⭐⭐⭐⭐⭐",
    bestFor: "Agentic coding, 1M context window",
    category: "Top Tier",
  },
  {
    name: "Llama 3.3 70B",
    nimId: "meta/llama-3.3-70b-instruct",
    provider: "Meta",
    logoName: "Meta",
    size: "70B Dense",
    speed: "⚡ Fast",
    coding: "⭐⭐⭐⭐⭐",
    bestFor: "General coding & reasoning",
    category: "Top Tier",
  },
  {
    name: "GLM-5",
    nimId: "z-ai/glm5",
    provider: "Zhipu",
    logoName: "AI",
    size: "744B MoE",
    speed: "🔵 Medium",
    coding: "⭐⭐⭐⭐⭐",
    bestFor: "Complex agentic tasks",
    category: "Top Tier",
  },
  {
    name: "Kimi K2.5",
    nimId: "moonshotai/kimi-k2.5",
    provider: "Moonshot AI",
    logoName: "AI",
    size: "Large MoE",
    speed: "⚡ Fast",
    coding: "⭐⭐⭐⭐⭐",
    bestFor: "Vision & code from UI/screenshots",
    category: "Top Tier",
  },
  {
    name: "DeepSeek V3.2",
    nimId: "deepseek-ai/deepseek-v3_2",
    provider: "DeepSeek",
    logoName: "AI",
    size: "Large Dense",
    speed: "⚡ Fast",
    coding: "⭐⭐⭐⭐⭐",
    bestFor: "Advanced coding & reasoning",
    category: "Top Tier",
  },
  {
    name: "MiniMax M2.7",
    nimId: "minimaxai/minimax-m2.7",
    provider: "MiniMax",
    logoName: "AI",
    size: "Large MoE",
    speed: "⚡ Fast",
    coding: "⭐⭐⭐⭐",
    bestFor: "Reliable general-purpose coding",
    category: "Fast & Efficient",
  },
  {
    name: "Gemma 4 31B",
    nimId: "google/gemma-4-31b-it",
    provider: "Google",
    logoName: "Google",
    size: "31B Dense",
    speed: "⚡ Very Fast",
    coding: "⭐⭐⭐⭐",
    bestFor: "Reasoning + fast coding",
    category: "Fast & Efficient",
  },
  {
    name: "Qwen 3.5 122B",
    nimId: "qwen/qwen3.5-122b-a10b",
    provider: "Qwen",
    logoName: "CodeIgniter",
    size: "122B MoE",
    speed: "⚡ Fast",
    coding: "⭐⭐⭐⭐",
    bestFor: "Daily coding — fast response",
    category: "Reasoning & Logic",
  },
  {
    name: "Mistral Small 4",
    nimId: "mistralai/mistral-small-4-119b-2603",
    provider: "Mistral",
    logoName: "Missing",
    size: "119B MoE",
    speed: "⚡ Fast",
    coding: "⭐⭐⭐⭐",
    bestFor: "Reliable fallback, 256K context",
    category: "Fast & Efficient",
  },
  {
    name: "Flux.2 Text-to-Image",
    nimId: "black-forest-labs/flux_2-klein-4b",
    provider: "Black Forest",
    logoName: "Image",
    size: "4B Dense",
    speed: "⚡ Fast",
    coding: "N/A",
    bestFor: "Image generation",
    category: "Vision & Creative",
  },
];

// ─── MODEL SLOT MAPPING ───────────────────────────────────────────────────────
export const modelSlotMapping = [
  {
    slot: "Sonnet (default)",
    command: "/model → 1 or 5",
    recommendedModel: "meta/llama-3.1-405b-instruct",
    useCase: "Daily coding — highly capable",
    provider: "Meta",
    logoName: "Meta",
  },
  {
    slot: "Opus (powerful)",
    command: "/model → 3",
    recommendedModel: "nvidia/nemotron-3-super-120b-a12b",
    useCase: "Complex multi-file work",
    provider: "NVIDIA",
    logoName: "NVIDIA",
  },
  {
    slot: "Haiku (quick)",
    command: "/model → 4",
    recommendedModel: "google/gemma-4-31b-it",
    useCase: "Quick questions, very fast",
    provider: "Google",
    logoName: "Google",
  },
];

// ─── TROUBLESHOOTING ──────────────────────────────────────────────────────────
export const troubleshooting = [
  {
    error: "403 Authorization failed",
    cause: "API key expired or was leaked",
    fix: "Generate a new key at build.nvidia.com → API Keys. Update it in your shell config and restart Docker with the new key.",
  },
  {
    error: "DEGRADED function cannot be invoked",
    cause: "NVIDIA model endpoint is overloaded",
    fix: "Edit config.yaml and change the model to a different one (e.g. swap qwen for gemma-4-31b-it). Run: docker restart litellm-nim",
  },
  {
    error: "Not logged in / Please run /login",
    cause: "Running claude instead of claude-nim",
    fix: "Always use claude-nim alias. It injects the right env vars. If it still shows, check that source ~/.zshrc was run.",
  },
  {
    error: "Container not found / Cannot connect to Docker",
    cause: "Docker Desktop is not running",
    fix: "Open Docker Desktop and wait 10 seconds, then run: docker start litellm-nim",
  },
  {
    error: "command not found: claude",
    cause: "Claude Code not in PATH after install",
    fix: "Close terminal and open a new one. If still broken, run:\necho 'export PATH=\"$HOME/.local/bin:$PATH\"' >> ~/.zshrc && source ~/.zshrc",
  },
  {
    error: "Port 4000 already in use",
    cause: "Another service is using port 4000",
    fix: "Change -p 4000:4000 to -p 4002:4000 in the Docker command, and update ANTHROPIC_BASE_URL to http://localhost:4002 in your alias.",
  },
  {
    error: "Windows: The token '&&' is not a valid statement separator",
    cause: "Running CMD command in PowerShell",
    fix: "Use the PowerShell version of the command (irm ... | iex) instead of the curl version.",
  },
  {
    error: "Windows: command not found after restart",
    cause: "PATH not updated in PowerShell profile",
    fix: "Run: . $PROFILE to reload your PowerShell profile. If the function is missing, re-add it to $PROFILE.",
  },
];

// ─── DAILY COMMANDS ───────────────────────────────────────────────────────────
export const dailyCommands = {
  launch: [
    { cmd: "claude-nim", description: "Start Claude Code via NVIDIA NIM" },
    { cmd: "docker start litellm-nim", description: "Start proxy if it stopped" },
    { cmd: "docker logs litellm-nim", description: "Check proxy is healthy" },
  ],
  manage: [
    { cmd: "docker stop litellm-nim", description: "Stop container (saves RAM)" },
    { cmd: "docker restart litellm-nim", description: "Restart after config change" },
    { cmd: "claude-nim --resume <id>", description: "Continue a previous session" },
  ],
};

// ─── INSIDE CLAUDE COMMANDS ───────────────────────────────────────────────────
export const insideClaudeCommands = [
  { command: "/model", description: "Switch between Sonnet / Opus / Haiku model slots" },
  { command: "/compact", description: "Free up context when sessions get slow" },
  { command: "/init", description: "Generate CLAUDE.md for your project (recommended)" },
  { command: "/clear", description: "Clear conversation history, start fresh" },
  { command: "/resume [session]", description: "Resume a previous conversation" },
  { command: "/export [filename]", description: "Export conversation as text" },
  { command: "/diff", description: "View uncommitted changes interactively" },
  { command: "/doctor", description: "Diagnose installation issues" },
  { command: "/context", description: "Visualize context usage" },
  { command: "/cost", description: "Show token usage statistics" },
  { command: "/btw <question>", description: "Ask a quick side question" },
  { command: "/tasks", description: "List and manage background tasks" },
  { command: "Ctrl+B", description: "Background running tasks" },
  { command: "Ctrl+O", description: "Toggle transcript viewer" },
  { command: "Ctrl+R", description: "Reverse search command history" },
  { command: "! <command>", description: "Run bash command directly" },
];

// ─── CLAUDE CODE COMMANDS REFERENCE ───────────────────────────────────────────
export const claudeCommands = {
  session: [
    { command: "/resume [session]", description: "Resume a previous conversation by ID or name" },
    { command: "/export [filename]", description: "Export conversation as plain text" },
    { command: "/compact [instructions]", description: "Compress conversation to free context" },
    { command: "/branch [name]", description: "Create a conversation branch at this point" },
    { command: "/clear", description: "Clear conversation history and start fresh" },
    { command: "/exit", description: "Exit the CLI (alias: /quit)" },
  ],
  development: [
    { command: "/batch <instruction>", description: "Run parallel agents for large-scale changes" },
    { command: "/simplify [focus]", description: "Auto-review code for quality improvements" },
    { command: "/security-review", description: "Analyze changes for security vulnerabilities" },
    { command: "/diff", description: "View uncommitted changes interactively" },
    { command: "/pr-comments [PR]", description: "Fetch and display PR comments" },
  ],
  debugging: [
    { command: "/doctor", description: "Diagnose and verify installation issues" },
    { command: "/debug [description]", description: "Enable debug logging for troubleshooting" },
    { command: "/context", description: "Visualize context usage as a grid" },
    { command: "/cost", description: "Show token usage statistics" },
    { command: "/usage", description: "Show plan usage limits and rate limits" },
  ],
  model: [
    { command: "/model [model]", description: "Switch models without clearing context" },
    { command: "/effort [level]", description: "Set model effort (low/medium/high/auto)" },
    { command: "/fast [on|off]", description: "Toggle fast mode on or off" },
    { command: "/effort", description: "Show current effort level" },
  ],
  settings: [
    { command: "/config", description: "Open settings interface (alias: /settings)" },
    { command: "/theme", description: "Change color theme" },
    { command: "/color [color]", description: "Set prompt bar color for session" },
    { command: "/permissions", description: "Manage allow/ask/deny rules" },
    { command: "/status", description: "Show version, model, account info" },
  ],
  productivity: [
    { command: "/btw <question>", description: "Ask quick side question without cluttering context" },
    { command: "/tasks", description: "List and manage background tasks (alias: /bashes)" },
    { command: "/stats", description: "Visualize daily usage, sessions, streaks" },
    { command: "/insights", description: "Generate session analysis report" },
    { command: "/memory", description: "Edit CLAUDE.md memory files" },
  ],
};

// ─── PLUGINS ──────────────────────────────────────────────────────────────────
export const plugins = [
  {
    name: "Code Review Graph",
    description: "Local knowledge graph for codebases that builds a structural map using Tree-sitter",
    githubUrl: "https://github.com/tirth8205/code-review-graph",
    icon: "📊",
    color: "from-blue-500 to-indigo-500",
    stats: [
      { label: "Token Reduction", value: "6.8×", subtext: "on code reviews" },
      { label: "Daily Tasks", value: "49×", subtext: "reduction possible" },
      { label: "Languages", value: "19+", subtext: "supported" },
    ],
    features: [
      "Blast-radius analysis - traces dependencies affected by changes",
      "Incremental updates - re-parses only changed files in <2 seconds",
      "Supports Python, JS/TS, Go, Rust, Java, and 14 more languages",
      "Auto-update hooks - graph updates on git commits/file saves",
      "22 MCP tools for reviewing, architecture mapping, debugging",
    ],
    installation: {
      step1: "pip install code-review-graph",
      step2: "code-review-graph install",
      step3: "code-review-graph build",
      note: "Requires Python 3.10+. Use uv for better performance.",
    },
    integration: 'After installing, restart your editor and ask Claude: "Build the code review graph for this project"',
  },
  {
    name: "Claude-Mem",
    description: "Persistent memory across coding sessions that automatically captures and compresses everything Claude does",
    githubUrl: "https://github.com/thedotmack/claude-mem",
    icon: "🧠",
    color: "from-purple-500 to-pink-500",
    stats: [
      { label: "Memory", value: "Persistent", subtext: "across sessions" },
      { label: "Search", value: "3-layer", subtext: "token-efficient" },
      { label: "UI", value: "Local", subtext: "web viewer" },
    ],
    features: [
      "Auto-captures everything Claude does during coding sessions",
      "AI-powered compression with Claude's agent-sdk",
      "Smart context injection for future sessions",
      "Web viewer UI at http://localhost:37777",
      "Privacy controls via <private> tags - no manual steps required",
    ],
    installation: {
      step1: "npx claude-mem install",
      step2: "Or via plugin marketplace: /plugin marketplace add thedotmack/claude-mem",
      step3: "For IDE integration: npx claude-mem install --ide gemini-cli",
      note: "Web viewer runs automatically at localhost:37777 after installation.",
    },
    integration: "Once installed, Claude-Mem automatically captures your sessions. No additional configuration needed.",
  },
];

// ─── BEST PRACTICES ───────────────────────────────────────────────────────────
export const bestPractices = {
  coreConcepts: [
    {
      title: "Agents",
      description: "Autonomous actors in fresh isolated context with custom tools, permissions, model, memory, and persistent identity",
      icon: "🤖",
      useCase: "Use for parallel work, isolated experiments, or long-running tasks",
    },
    {
      title: "Commands",
      description: "Knowledge injected into existing context - simple user-invoked prompt templates for workflow orchestration",
      icon: "⌨️",
      useCase: "Use for quick workflows, repeating patterns, or team-standardized tasks",
    },
    {
      title: "Skills",
      description: "Configurable, preloadable, auto-discoverable workflows with context forking and progressive disclosure",
      icon: "🎯",
      useCase: "Use for complex multi-step processes, team playbooks, or reusable patterns",
    },
  ],
  workflows: [
    {
      name: "Research → Plan → Execute → Review → Ship",
      description: "The standard workflow pattern for reliable results",
      steps: ["Gather context", "Draft plan", "Implement changes", "Review quality", "Ship confidently"],
    },
    {
      name: "Browser-based Plan Review",
      description: "Use /ultraplan for browser-based plan review with inline comments",
      steps: ["Run /ultraplan <prompt>", "Review in browser", "Add comments", "Execute remotely or return to terminal"],
    },
    {
      name: "Auto Mode for Safety",
      description: "Enable Auto Mode to replace manual permission prompts with AI safety classification",
      steps: ["Auto Mode enabled", "Claude decides what's safe", "Risks blocked automatically", "Focus on coding"],
    },
  ],
  proTips: [
    {
      category: "Terminal Setup",
      tip: "Configure terminal for Option as Meta (Mac users) to unlock Alt/Option key shortcuts",
      command: "iTerm2: Preferences → Profiles → Keys → Left/Right Option key = Esc+",
    },
    {
      category: "Bash Commands",
      tip: "Use ! prefix for direct bash commands without going through Claude interpretation",
      command: "! npm test && ! git status",
    },
    {
      category: "Permissions",
      tip: "Set up permission rules proactively using /permissions to manage allow/ask/deny rules",
      command: "/permissions",
    },
    {
      category: "Side Questions",
      tip: "Use /btw for quick questions without cluttering the main context",
      command: "/btw what was that config file name?",
    },
    {
      category: "Context Management",
      tip: "Leverage /compact to free context space on long sessions",
      command: "/compact focus on the bug fix approach",
    },
    {
      category: "Flicker-Free Sessions",
      tip: "Set CLAUDE_CODE_NO_FLICKER=1 for stable, flicker-free terminal sessions",
      command: "export CLAUDE_CODE_NO_FLICKER=1",
    },
    {
      category: "Scheduled Tasks",
      tip: "Use /schedule for cloud-based prompts that run even when offline",
      command: "/schedule check deploy status every 10m",
    },
  ],
  memoryFiles: [
    {
      name: "CLAUDE.md",
      purpose: "Persistent low-level project context",
      tip: "Run /init at project start to auto-generate",
    },
    {
      name: ".claude/",
      purpose: "Configuration for skills, hooks, and memory files",
      tip: "Store team playbooks and custom workflows here",
    },
  ],
};

// ─── KEYBOARD SHORTCUTS ───────────────────────────────────────────────────────
export const keyboardShortcuts = {
  general: [
    { shortcut: "Ctrl+C", description: "Cancel current input or generation", category: "Standard interrupt" },
    { shortcut: "Ctrl+D", description: "Exit Claude Code session", category: "EOF signal" },
    { shortcut: "Ctrl+L", description: "Clear prompt input", category: "Keeps conversation history" },
    { shortcut: "Ctrl+O", description: "Toggle transcript viewer", category: "Shows detailed tool usage" },
    { shortcut: "Ctrl+R", description: "Reverse search command history", category: "Interactive search" },
    { shortcut: "Ctrl+B", description: "Background running tasks", category: "Continue working while tasks run" },
    { shortcut: "Ctrl+T", description: "Toggle task list", category: "Show/hide terminal status" },
    { shortcut: "Ctrl+G or Ctrl+X Ctrl+E", description: "Open in text editor", category: "Edit your prompt" },
    { shortcut: "Esc + Esc", description: "Rewind or summarize", category: "Restore to previous point" },
  ],
  textEditing: [
    { shortcut: "Ctrl+K", description: "Delete to end of line", category: "Stores for pasting" },
    { shortcut: "Ctrl+U", description: "Delete from cursor to line start", category: "Stores for pasting" },
    { shortcut: "Ctrl+Y", description: "Paste deleted text", category: "Yank previous deletion" },
    { shortcut: "Alt+Y", description: "Cycle paste history", category: "After Ctrl+Y" },
    { shortcut: "Alt+B", description: "Move cursor back one word", category: "Requires Option as Meta on Mac" },
    { shortcut: "Alt+F", description: "Move cursor forward one word", category: "Requires Option as Meta on Mac" },
    { shortcut: "Alt+M", description: "Toggle permission modes", category: "Cycle default/acceptEdits/plan" },
  ],
  navigation: [
    { shortcut: "Up/Down arrows", description: "Navigate command history", category: "Recall previous inputs" },
    { shortcut: "Left/Right arrows", description: "Cycle through dialog tabs", category: "Permission dialogs" },
    { shortcut: "Shift+Tab or Alt+M", description: "Cycle permission modes", category: "default → acceptEdits → plan" },
    { shortcut: "Option+P or Alt+P", description: "Switch model", category: "Without clearing prompt" },
    { shortcut: "Option+T or Alt+T", description: "Toggle extended thinking", category: "Requires Option as Meta on Mac" },
    { shortcut: "Option+O or Alt+O", description: "Toggle fast mode", category: "Enable/disable fast mode" },
  ],
  display: [
    { shortcut: "Ctrl+V or Cmd+V (iTerm2)", description: "Paste image from clipboard", category: "Inserts [Image #N] chip" },
    { shortcut: "Ctrl+T", description: "Toggle syntax highlighting", category: "In /theme picker menu" },
    { shortcut: "Shift+Tab", description: "Cycle permission modes", category: "In menus and dialogs" },
  ],
  multiline: [
    { shortcut: "\\ + Enter", description: "Quick escape for multiline", category: "Works in all terminals" },
    { shortcut: "Option+Enter (macOS)", description: "New line", category: "Default on macOS" },
    { shortcut: "Shift+Enter", description: "New line", category: "Works in iTerm2, WezTerm, Ghostty, Kitty" },
    { shortcut: "Ctrl+J", description: "New line", category: "Line feed character" },
  ],
  quickCommands: [
    { shortcut: "/ at start", description: "Command or skill", category: "Type / to see all" },
    { shortcut: "! at start", description: "Bash mode", category: "Run commands directly" },
    { shortcut: "@", description: "File path mention", category: "Triggers autocomplete" },
    { shortcut: "Space (hold)", description: "Push-to-talk dictation", category: "Requires voice enabled" },
  ],
  vimMode: [
    { shortcut: "Esc", description: "Enter NORMAL mode", category: "From INSERT mode" },
    { shortcut: "i", description: "Insert before cursor", category: "NORMAL → INSERT" },
    { shortcut: "A", description: "Insert at end of line", category: "From NORMAL mode" },
    { shortcut: "dd", description: "Delete line", category: "In NORMAL mode" },
    { shortcut: "yy", description: "Yank (copy) line", category: "In NORMAL mode" },
    { shortcut: "p", description: "Paste after cursor", category: "In NORMAL mode" },
    { shortcut: ">>", description: "Indent line", category: "In NORMAL mode" },
    { shortcut: "gg", description: "Beginning of input", category: "In NORMAL mode" },
    { shortcut: "G", description: "End of input", category: "In NORMAL mode" },
  ],
  transcript: [
    { shortcut: "Ctrl+E", description: "Toggle show all content", category: "In transcript viewer" },
    { shortcut: "q, Ctrl+C, or Esc", description: "Exit transcript view", category: "In transcript viewer" },
    { shortcut: "f", description: "Fix any issues", category: "In /doctor output" },
  ],
};

// ─── TIPS ─────────────────────────────────────────────────────────────────────
export const tips = [
  {
    category: "Workflow",
    tip: "Run /init at the start of any new project to create CLAUDE.md — this gives Claude permanent context about your codebase.",
  },
  {
    category: "Workflow",
    tip: "Use /model to switch to Opus for complex multi-file refactors, then switch back to Sonnet for speed.",
  },
  {
    category: "Workflow",
    tip: "Use /compact when long sessions slow down — it compresses history and frees context space.",
  },
  {
    category: "Reliability",
    tip: "If a model goes DEGRADED, swap it in config.yaml and run docker restart litellm-nim. No need to restart Claude Code.",
  },
  {
    category: "Reliability",
    tip: "Use docker logs -f litellm-nim in a second terminal to watch which model handles each request live.",
  },
  {
    category: "Reliability",
    tip: "The --restart always flag means your proxy auto-starts with Docker Desktop — no manual docker start needed.",
  },
  {
    category: "Security",
    tip: "Never share your nvapi-... key in screenshots, chat messages, or public repos. Regenerate immediately if exposed.",
  },
  {
    category: "Security",
    tip: "The sk-litellm-local key is just a local proxy password — it's safe to share in documentation.",
  },
  {
    category: "Productivity",
    tip: "Be specific in prompts: 'fix the login bug in src/auth/login.js where empty password is accepted' beats 'fix bug'.",
  },
  {
    category: "Productivity",
    tip: "Use claude-nim --resume <session-id> to continue exactly where you left off after closing the terminal.",
  },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────
export const faqs = [
  {
    question: "Do I need a paid Claude account?",
    answer:
      "No. This setup uses NVIDIA NIM's free API tier routed through LiteLLM. No Anthropic subscription required.",
  },
  {
    question: "Is this legal?",
    answer:
      "Yes. Claude Code CLI is open source (Apache 2.0). NVIDIA NIM free tier is publicly available to anyone. LiteLLM is open source (MIT). You are using all three as intended by their creators.",
  },
  {
    question: "Will it behave exactly like real Claude?",
    answer:
      "Core coding tasks work well — file editing, git operations, single-file refactors, and code generation all work reliably. Complex extended reasoning or very large multi-file rewrites may be less consistent since you're using open-source models, not Claude itself.",
  },
  {
    question: "How much free usage do I get from NVIDIA?",
    answer:
      "NVIDIA free tier allows approximately 40 requests/minute with no credit card required and no expiry. It's enough for normal development sessions.",
  },
  {
    question: "What if a model goes down?",
    answer:
      "Edit config.yaml to swap the model for a different one, then run docker restart litellm-nim. Popular models may go DEGRADED during peak hours — just switch to a less popular one.",
  },
  {
    question: "Do I need to restart Docker every time I open my computer?",
    answer:
      "No. The --restart always flag in the Docker command means the container starts automatically whenever Docker Desktop opens. Just open Docker Desktop and run claude-nim.",
  },
  {
    question: "Does this work on Windows?",
    answer:
      "Yes. Install Git for Windows first (required by Claude Code), then use the PowerShell install command. The alias syntax is different — see the Setup page for Windows-specific instructions.",
  },
  {
    question: "Why do I get 'Not logged in' errors?",
    answer:
      "You ran claude instead of claude-nim. Always use the claude-nim alias — it injects the environment variables that bypass Anthropic's login and route through your local proxy.",
  },
];