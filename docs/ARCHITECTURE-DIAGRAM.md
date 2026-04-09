# Architecture Diagram: Claude Code Free via NVIDIA NIM

## Overview
Simple flow showing how Claude Code connects to NVIDIA NIM through LiteLLM proxy.

## Diagram Description (for implementation in React/Remotion)

```
┌─────────────────┐    HTTP    ┌──────────────┐    HTTP    ┌──────────────────┐
│                 │──────────→ │              │──────────→ │                  │
│  Claude Code    │            │  LiteLLM     │            │  NVIDIA NIM      │
│  CLI            │            │  Proxy       │            │  API             │
│  (Anthropic     │            │  (Port 4001) │            │  (Free Tier)     │
│   format)       │            │              │            │                  │
└─────────────────┘    ←─────── └──────────────┘ ←───────  └──────────────────┘
          │                       │                       │
          │                       │                       │
          │    Config/Env         │    Config             │    Model Mapping
          ▼                       ▼                       ▼
   ANTHROPIC_BASE_URL    NVIDIA_NIM_API_KEY    Model: nvidia_nim/...
   ANTHROPIC_API_KEY                (from .zshrc)        gemma-4-31b-it
   ANTHROPIC_MODEL                                 nemotron-3-super-120b-a12b
                                                    mistral-small-4-119b-2603
```

## Key Components

### 1. Claude Code CLI
- **Input**: User prompts, commands (`/model`, `/compact`, etc.)
- **Output**: File edits, terminal commands, explanations
- **Configuration**: Uses Anthropic API format
- **Environment Variables Set**:
  - `ANTHROPIC_BASE_URL="http://localhost:4001"` (points to LiteLLM)
  - `ANTHROPIC_API_KEY="sk-litellm-local"` (proxy password)
  - `ANTHROPIC_MODEL="claude-sonnet-4-6"` (default model)

### 2. LiteLLM Proxy (Docker Container)
- **Port**: 4001 (mapped from container's 4000)
- **Function**: Translates Anthropic API format ↔ OpenAI API format
- **Configuration**: `/app/config.yaml`
- **Key Settings**:
  - `drop_params: true` (silently removes unsupported Anthropic params)
  - Model mapping defines which NVIDIA model corresponds to each Claude model
  - Fallbacks for reliability

### 3. NVIDIA NIM API (Free Tier)
- **Endpoint**: `https://integrate.api.nvidia.com/v1`
- **Authentication**: Bearer token with `nvapi-...` key
- **Available Models**:
  - `google/gemma-4-31b-it` → maps to `claude-sonnet-4-6`
  - `nvidia/nemotron-3-super-120b-a12b` → maps to `claude-opus-4-6`
  - `mistralai/mistral-small-4-119b-2603` → maps to `claude-haiku-4-5`
- **Rate Limits**: ~40 requests/minute (free tier)

## Data Flow

1. User runs `claude-nim` → triggers Claude Code
2. Claude Code sends request to `ANTHROPIC_BASE_URL` (localhost:4001)
3. LiteLLM receives Anthropic-format request
4. LiteLLM:
   - Validates `ANTHROPIC_API_KEY` ("sk-litellm-local")
   - Maps `ANTHROPIC_MODEL` to NVIDIA model ID via config.yaml
   - Converts request to OpenAI format
   - Adds `Authorization: Bearer $NVIDIA_NIM_API_KEY`
   - Forwards to NVIDIA NIM API
5. NVIDIA NIM processes request with specified model
6. Response returns to LiteLLM
7. LiteLLM converts back to Anthropic format
8. Claude Code receives response and presents to user
9. User continues interaction

## Implementation Notes for Website Diagram

### Visual Elements to Show:
- **Three distinct blocks** with slight drop shadows
- **Arrows** showing bidirectional flow (request/response)
- **Labels** on arrows: "HTTP Request", "HTTP Response"
- **Icons**:
  - Claude Code: Terminal/Claude logo
  - LiteLLM: Proxy/gateway icon
  - NVIDIA: NVIDIA logo or chip icon
- **Configuration details** in callouts or side panels
- **Color coding** matching website theme
- **Subtle animation** showing data flow (pulsing arrows)

### Text Content for Diagram:
**Header**: "How Claude Code Free via NVIDIA NIM Works"
**Subheader**: "Anthropic → LiteLLM Proxy → NVIDIA NIM API"

### Callout Boxes:
1. **LiteLLM Translation**:
   - Input: Anthropic API format
   - Output: OpenAI API format
   - Key Feature: `drop_params: true`

2. **Model Mapping**:
   - Sonnet → Gemma 4 31B
   - Opus → Nemotron 3 Super 120B
   - Haiku → Mistral Small 4

3. **Security**:
   - `sk-litellm-local`: Proxy-only key (safe to commit)
   - `nvapi-...`: Secret key (never expose)
   - Environment variables keep keys secure
