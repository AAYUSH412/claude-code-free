# 🚀 Claude Code Free via NVIDIA NIM

> **Run Claude Code CLI for FREE** - No paid Anthropic subscription required. Complete setup guide using NVIDIA NIM's free-tier API + LiteLLM proxy.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AAYUSH412/claude-code-free)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

---

## 🎯 What You Get

| Feature | Description |
|---------|-------------|
| **🆓 100% Free** | No credit card, no paid subscription |
| **⚡ 15-min Setup** | Quick installation guide |
| **🤖 3 Model Slots** | Sonnet, Opus, Haiku alternatives |
| **🔒 Secure** | Your API keys stay local |
| **📚 Complete Docs** | Setup, troubleshooting, tips |

---

## 📖 Documentation

Visit the live documentation site (after deployment):

- **[🏠 Homepage](https://claudecodefree.vercel.app)** - Overview & architecture
- **[⚙️ Setup Guide](https://claudecodefree.vercel.app/setup)** - Step-by-step installation
- **[🤖 Model Comparison](https://claudecodefree.vercel.app/models)** - Choose your AI model
- **[🔧 Troubleshooting](https://claudecodefree.vercel.app/troubleshooting)** - Fix common issues
- **[📚 Daily Usage](https://claudecodefree.vercel.app/daily-usage)** - Workflow commands
- **[💡 Power Tips](https://claudecodefree.vercel.app/tips)** - Pro productivity tricks
- **[❓ FAQ](https://claudecodefree.vercel.app/faq)** - Common questions

---

## 🏃 Quick Start (30 seconds)

```bash
# 1. Install Claude Code CLI (macOS/Linux/WSL)
curl -fsSL https://claude.ai/install.sh | bash
# Windows PowerShell: irm https://claude.ai/install.ps1 | iex
# Windows CMD: curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd

# 2. Get free NVIDIA API key
# Visit: https://build.nvidia.com and create account

# 3. Run LiteLLM in Docker (from your config.yaml directory)
docker run -d --name litellm-nim --restart unless-stopped -p 4001:4000 -e NVIDIA_NIM_API_KEY="nvapi-YOUR_KEY" -v "$(pwd)/config.yaml:/app/config.yaml" docker.litellm.ai/berriai/litellm:main-stable --config /app/config.yaml
# If container already exists: docker rm -f litellm-nim

# 4. Launch Claude through LiteLLM
ANTHROPIC_BASE_URL="http://localhost:4001" ANTHROPIC_API_KEY="sk-litellm-local" ANTHROPIC_MODEL="claude-sonnet-4-6" claude
```

📝 **Full guide**: See [Setup Documentation](/src/app/setup)

---

## 🛠 How It Works

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Claude Code  │───▶│   LiteLLM    │───▶│ NVIDIA NIM   │
│     CLI      │    │    Proxy     │    │     API      │
└──────────────┘    └──────────────┘    └──────────────┘
```

1. **Claude Code** sends requests in Anthropic format
2. **LiteLLM** translates to OpenAI format
3. **NVIDIA NIM** processes with free AI models (Gemma, Nemotron, Mistral)

---

## 📦 Project Structure

```
claude-code-free/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── setup/                # Step-by-step guide
│   │   ├── models/               # Model comparison
│   │   ├── troubleshooting/      # Error fixes
│   │   ├── daily-usage/          # Workflow commands
│   │   ├── tips/                 # Power user tips
│   │   ├── faq/                  # FAQs
│   │   ├── sitemap.ts            # SEO sitemap
│   │   └── robots.ts             # SEO robots.txt
│   ├── components/               # Reusable UI components
│   └── content/                  # Site content data
├── public/                       # Static assets
├── vercel.json                   # Vercel deployment config
└── README.md                     # This file
```

---

## 🚀 Deploy Your Own Copy

### Option 1: One-Click Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AAYUSH412/claude-code-free)

### Option 2: Manual Setup

```bash
# Clone the repository
git clone https://github.com/AAYUSH412/claude-code-free
cd claude-code-free

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

---

## 🎨 Design Features

- **Typography**: Cormorant Garamond + Instrument Sans
- **Grain Overlay**: Subtle texture effect
- **Minimal Aesthetic**: Clean, distraction-free reading
- **Dark Mode Ready**: Developer-friendly theme
- **Smooth Animations**: Framer Motion transitions

---

## 📊 Why This Works

| Component | Role |
|-----------|------|
| **NVIDIA NIM** | Free AI inference API (40 req/min, no credit card) |
| **LiteLLM** | Translates Anthropic → OpenAI API format |
| **Docker** | Runs proxy locally, keys stay on your machine |
| **Claude Code** | Works normally with env variable routing |

---

## 🔐 Security First

⚠️ **Important Security Practices:**

- ✅ Your API key stays **local** (never sent to third parties)
- ✅ Use environment variables (`.zshrc`, Docker env)
- ✅ Never commit keys to GitHub
- ✅ Regenerate immediately if exposed

❌ **Never:**
- Paste `nvapi-...` keys in public chats
- Commit `.env` or config files with keys
- Share screenshots with API keys visible

---

## 🤝 Contributing

Found a bug or want to improve the docs? Contributions welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 📞 Connect

- **Author**: [Aayush Vaghela](https://github.com/AAYUSH412)
- **GitHub**: [@AAYUSH412](https://github.com/AAYUSH412)
- **Issues**: [GitHub Issues](https://github.com/AAYUSH412/claude-code-free/issues)

---

## 📚 Related Resources

- [NVIDIA NIM Documentation](https://docs.nvidia.com/nim/)
- [LiteLLM Documentation](https://docs.litellm.ai/)
- [Claude Code CLI](https://github.com/anthropics/claude-code)
- [Next.js Documentation](https://nextjs.org/docs)

---

## 📜 License

MIT License - feel free to use, modify, and distribute.

---

## ⭐ Show Your Support

If this project helped you, consider giving it a **star** on GitHub! It helps others discover this free resource.

[![Star on GitHub](https://img.shields.io/github/stars/AAYUSH412/claude-code-free?style=social)](https://github.com/AAYUSH412/claude-code-free/stargazers)

---

<div align="center">

**Built with ❤️ by [Aayush Vaghela](https://github.com/AAYUSH412)**

Made for the developer community - free and open source 🚀

</div>
