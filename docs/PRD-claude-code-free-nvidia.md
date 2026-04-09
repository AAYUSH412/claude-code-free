# Product Requirements Document
## Claude Code Free via NVIDIA NIM
> Run Claude Code CLI at No Cost Using NVIDIA's Free Inference API

**Version:** 1.0 | **Date:** April 2026 | **Author:** Aayush Vaghela

---

## 1. Product Overview

A website that guides developers — especially students and hobbyists — to run Claude Code CLI completely free by routing it through NVIDIA NIM's free-tier inference API via a LiteLLM proxy.

**The Core Idea:**
Claude Code normally requires a paid Anthropic subscription ($20/month). NVIDIA offers free API access to powerful open-source LLMs through build.nvidia.com with no credit card required. By placing a LiteLLM proxy between Claude Code and the NVIDIA API, users get a fully functional Claude Code experience for free.

---

## 2. Problem Statement

| Problem | Detail |
|---|---|
| **Cost Barrier** | Claude Code requires $20–$200/month, blocking students and hobbyists |
| **Usage Limits** | Even paid users hit rate limits during intensive sessions |
| **Complex Setup** | Docker + YAML config + shell aliases — intimidating for beginners |
| **No Central Guide** | No single website explains the full free setup end-to-end |

---

## 3. Goals & Success Metrics

### 3.1 Goals
- Provide a clear step-by-step guide to run Claude Code free
- Reduce setup time from hours to under **15 minutes**
- Support macOS, Linux, and Windows (WSL)
- Help users pick the best NVIDIA model for coding
- Be the #1 resource for "free Claude Code" searches

### 3.2 Success Metrics

| Metric | Target |
|---|---|
| Setup completion rate | > 70% of visitors complete full setup |
| Time to first `claude-nim` launch | < 15 minutes |
| Monthly unique visitors | > 5,000 within 3 months |
| GitHub stars (if open source) | > 200 in first month |

---

## 4. How It Works — Architecture

```
Claude Code CLI  →  LiteLLM Proxy :4000  →  NVIDIA NIM API (Free)
  (Anthropic          (Translates API           (Qwen, Gemma,
   format)             format)                   GLM-5, etc.)
```

**Why LiteLLM?**
- Claude Code speaks **Anthropic API format**
- NVIDIA speaks **OpenAI API format**
- LiteLLM **translates between them** automatically
- `drop_params: true` silently drops Anthropic-specific params NVIDIA doesn't understand

---

## 5. Website Pages & Features

### 5.1 Homepage
- Hero section: "Run Claude Code for Free" with clear CTA button
- Quick explainer: What is Claude Code? What is NVIDIA NIM? Why LiteLLM?
- Architecture diagram (visual flow)
- Requirements checklist: Docker, Claude Code CLI, NVIDIA account
- Estimated setup time badge: ⏱ Under 15 minutes

### 5.2 Step-by-Step Setup Guide
The core of the website. Every code block must have a **copy button**.

| Step | Title | Description |
|---|---|---|
| 1 | Get NVIDIA API Key | Sign up at build.nvidia.com, verify phone, generate `nvapi-...` key |
| 2 | Install Claude Code | `brew install --cask claude-code` or curl install script |
| 3 | Create `config.yaml` | LiteLLM model mapping with NVIDIA NIM model IDs |
| 4 | Start LiteLLM Docker | `docker run` command with port mapping and API key |
| 5 | Add Shell Alias | `claude-nim` alias in `~/.zshrc` |
| 6 | Launch! | `source ~/.zshrc` then `claude-nim` |

**Full Setup Code Reference:**

**Step 3 — config.yaml:**
```yaml
model_list:
  - model_name: claude-sonnet-4-6
    litellm_params:
      model: nvidia_nim/google/gemma-4-31b-it
      api_key: os.environ/NVIDIA_NIM_API_KEY

  - model_name: claude-opus-4-6
    litellm_params:
      model: nvidia_nim/nvidia/nemotron-3-super-120b-a12b
      api_key: os.environ/NVIDIA_NIM_API_KEY

  - model_name: claude-haiku-4-5
    litellm_params:
      model: nvidia_nim/mistralai/mistral-small-4-119b-2603
      api_key: os.environ/NVIDIA_NIM_API_KEY

litellm_settings:
  drop_params: true
  fallbacks: [{"claude-sonnet-4-6": ["claude-opus-4-6"]}]

general_settings:
  master_key: "sk-litellm-local"
```

**Step 4 — Start Docker:**
```bash
mkdir ~/litellm-nim
cd ~/litellm-nim

docker run -d \
  -p 4001:4000 \
  -e NVIDIA_NIM_API_KEY="nvapi-YOUR_KEY_HERE" \
  -v $(pwd)/config.yaml:/app/config.yaml \
  --name litellm-nim \
  --restart always \
  docker.litellm.ai/berriai/litellm:main-stable \
  --config /app/config.yaml

# Verify it's running
docker logs litellm-nim
```

**Step 5 — Add alias to `~/.zshrc`:**
```bash
export NVIDIA_NIM_API_KEY="nvapi-YOUR_KEY_HERE"

alias claude-nim='\
  ANTHROPIC_BASE_URL="http://localhost:4001" \
  ANTHROPIC_API_KEY="sk-litellm-local" \
  ANTHROPIC_MODEL="claude-sonnet-4-6" \
  ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-4-6" \
  ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-4-6" \
  ANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-4-5" \
  claude'
```

**Step 6 — Launch:**
```bash
source ~/.zshrc
claude-nim
```

---

### 5.3 Model Selector Page
Interactive table of free NVIDIA NIM coding models:

| Model | NIM ID | Size | Speed | Coding Rating |
|---|---|---|---|---|
| Gemma 4 31B | `google/gemma-4-31b-it` | 31B Dense | Medium | ⭐⭐⭐⭐⭐ |
| Nemotron Super 120B | `nvidia/nemotron-3-super-120b-a12b` | 120B MoE | Fast | ⭐⭐⭐⭐⭐ |
| Qwen 3.5 122B | `qwen/qwen3.5-122b-a10b` | 122B MoE | Very Fast | ⭐⭐⭐⭐ |
| Mistral Small 4 | `mistralai/mistral-small-4-119b-2603` | 119B MoE | Fast | ⭐⭐⭐⭐ |
| GLM-4.7 | `z-ai/glm4_7` | 358B MoE | Medium | ⭐⭐⭐⭐ |
| Step 3.5 Flash | `stepfun-ai/step-3.5-flash` | 200B MoE | Fastest | ⭐⭐⭐ |

### 5.4 Troubleshooting Page
Common errors with fixes:

| Error | Cause | Fix |
|---|---|---|
| `403 Authorization failed` | API key expired or leaked | Generate new key at build.nvidia.com |
| `DEGRADED function cannot be invoked` | NVIDIA server overloaded | Swap to different model in config.yaml, `docker restart litellm-nim` |
| `Not logged in` | Running `claude` instead of `claude-nim` | Always use `claude-nim` alias |
| Container not found | Docker not running | Open Docker Desktop, wait 10 sec |
| `command not found: claude` | PATH not set | Run `source ~/.zshrc` |

### 5.5 Daily Usage Guide Page

**When you start your Mac:**
```bash
# Docker auto-starts if you used --restart always
# Just run:
claude-nim
```

**When you stop your Mac:**
```bash
# Exit Claude Code
Ctrl+C

# Stop container (optional, saves RAM)
docker stop litellm-nim
```

**Useful commands:**
```bash
docker start litellm-nim     # start container
docker stop litellm-nim      # stop container
docker restart litellm-nim   # restart after config change
docker logs litellm-nim      # check if running

# Resume a previous session
claude-nim --resume <session-id>
```

**Inside Claude Code:**
```
/model          → switch between Sonnet/Opus/Haiku
/compact        → free up context when sessions get slow
/init           → create CLAUDE.md for your project
/clear          → clear conversation history
Ctrl+C          → exit
```

---

## 6. Technical Requirements

### 6.1 User Prerequisites
- Docker Desktop installed
- macOS 13+, Ubuntu 20.04+, or Windows 10+ with WSL
- Internet connection
- Free NVIDIA account (no credit card)

### 6.2 Website Tech Stack (Recommended)
- **Framework:** Next.js or Astro (fast static site)
- **Styling:** Tailwind CSS
- **Code blocks:** Shiki or Prism.js with copy button
- **Hosting:** Vercel or Netlify (free tier)
- **Domain:** claudecodefree.vercel.app or similar

### 6.3 Website Performance Requirements
- Page load < 2 seconds
- Mobile responsive
- Dark mode support (developers prefer dark mode)
- All code blocks have one-click copy button

---

## 7. Model Slot Mapping

Claude Code internally uses 3 model slots. Each maps to a different NVIDIA model:

| Claude Code Slot | Command | Recommended NVIDIA Model | Use Case |
|---|---|---|---|
| **Sonnet** (default) | `/model` → 1 or 5 | `gemma-4-31b-it` | Daily coding tasks |
| **Opus** (powerful) | `/model` → 3 | `nemotron-3-super-120b-a12b` | Complex multi-file work |
| **Haiku** (fast) | `/model` → 4 | `mistral-small-4-119b-2603` | Quick questions |

---

## 8. Known Limitations

- Claude Code talks to open-source models, **not actual Claude**
- Extended thinking and complex multi-file edits may be less reliable than real Claude
- NVIDIA free tier has rate limits (~40 requests/minute)
- Popular models may go **DEGRADED** during peak hours (fix: swap model in config.yaml)
- API key must be regenerated if exposed — never share it publicly

---

## 9. Security Guidelines (Website Must Mention)

- ⚠️ Never paste your `nvapi-...` key in any chat or public forum
- ⚠️ Never commit your `.zshrc` or config files with keys to GitHub
- ✅ Use environment variables (`os.environ/NVIDIA_NIM_API_KEY`)
- ✅ Regenerate key immediately if accidentally exposed
- ✅ The `sk-litellm-local` key is just a local proxy password — safe to share

---

## 10. Future Features (v2)

- [ ] Auto-config generator (web form → downloads ready config.yaml + alias)
- [ ] Model status checker (live ping NVIDIA API to show which models are UP)
- [ ] One-click install script (`curl install.sh | bash`)
- [ ] VS Code extension setup guide
- [ ] GitHub Actions CI/CD setup with NVIDIA NIM
- [ ] Video walkthrough (YouTube)

---

## 11. Website Sitemap

```
/                          → Homepage
/setup                     → Full step-by-step guide
/models                    → Model selector & comparison
/troubleshooting           → Error fixes
/daily-usage               → Daily workflow guide
/tips                      → 10x tips (CLAUDE.md, /compact, etc.)
/faq                       → Frequently asked questions
```

---

## 12. FAQ Content

**Q: Do I need a paid Claude account?**
No. This setup uses NVIDIA's free API. No Anthropic account needed.

**Q: Is this legal?**
Yes. Claude Code is open source. NVIDIA NIM free tier is publicly available. LiteLLM is open source.

**Q: Will it work exactly like real Claude Code?**
Basic coding, file editing, git operations work well. Complex reasoning may differ since these are open-source models, not Claude.

**Q: What if a model goes down?**
Edit config.yaml to swap the model and run `docker restart litellm-nim`.

**Q: Do I need to restart Docker every time?**
No. Use `--restart always` flag (included in setup) so the container auto-starts with Docker Desktop.

**Q: How much does NVIDIA's free tier allow?**
~40 requests/minute with no expiry and no credit card required.

---

*PRD v1.0 — Claude Code Free via NVIDIA NIM*
