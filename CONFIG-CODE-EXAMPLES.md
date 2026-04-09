# Configuration Code Examples

## Step 1: NVIDIA API Key

Get your API key from [build.nvidia.com](https://build.nvidia.com):

1. Sign up / Log in
2. Verify phone number
3. Navigate to API section
4. Generate new key
5. Copy the key (format: `nvapi-...`)

---

## Step 2: Install Claude Code CLI

### macOS
```bash
brew install --cask claude-code
```

### Alternative (npm)
```bash
npm install -g @anthropic-ai/claude-code
```

### Verify Installation
```bash
claude --version
```

---

## Step 3: Create LiteLLM config.yaml

Create a file at `~/litellm-nim/config.yaml`:

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

---

## Step 4: Start LiteLLM Docker Container

```bash
# Create directory
mkdir -p ~/litellm-nim
cd ~/litellm-nim

# Copy config.yaml here (if not already in this directory)

# Run Docker container
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

### Useful Docker Commands
```bash
# Start container
docker start litellm-nim

# Stop container
docker stop litellm-nim

# Restart container (after config changes)
docker restart litellm-nim

# View logs
docker logs litellm-nim

# Check container status
docker ps -a | grep litellm-nim
```

---

## Step 5: Add Shell Alias

Add to your `~/.zshrc` (or `~/.bashrc` for bash):

```bash
# NVIDIA NIM API Key (replace with your actual key)
export NVIDIA_NIM_API_KEY="nvapi-YOUR_KEY_HERE"

# Claude Code alias with NVIDIA NIM proxy
alias claude-nim='\
ANTHROPIC_BASE_URL="http://localhost:4001" \
ANTHROPIC_API_KEY="sk-litellm-local" \
ANTHROPIC_MODEL="claude-sonnet-4-6" \
ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-4-6" \
ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-4-6" \
ANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-4-5" \
claude'
```

### Apply the changes
```bash
source ~/.zshrc
```

---

## Step 6: Launch!

```bash
claude-nim
```

---

## Model Switching (Inside Claude)

Once inside Claude Code, you can switch models:

```
/model → Shows available models
/model 1 → Switch to Sonnet (gemma-4-31b-it)
/model 3 → Switch to Opus (nemotron-3-super-120b-a12b)
/model 4 → Switch to Haiku (mistral-small-4-119b-2603)
```

---

## Session Management

### Resume Previous Session
```bash
claude-nim --resume <session-id>
```

### List Available Sessions
```bash
ls ~/.claude/sessions/
```

### Useful Commands Inside Claude
```
/compact     → Free up context when sessions get slow
/init        → Create CLAUDE.md for your project
/clear       → Clear conversation history
/help        → Show all available commands
```

---

## Troubleshooting Commands

### Check if Docker is running
```bash
docker ps
```

### Check if LiteLLM is responding
```bash
curl http://localhost:4001/v1/models
```

### Restart everything
```bash
docker restart litellm-nim
source ~/.zshrc
```

### Regenerate NVIDIA API Key
If you get `403 Authorization failed`:
1. Go to [build.nvidia.com](https://build.nvidia.com)
2. Revoke old key
3. Generate new key
4. Update `~/.zshrc` with new key
5. Update `docker run` command or recreate container

---

## Complete Setup Script (Optional)

Save as `setup-claude-nim.sh`:

```bash
#!/bin/bash

set -e

echo "🚀 Setting up Claude Code via NVIDIA NIM..."

# Create directory
mkdir -p ~/litellm-nim
cd ~/litellm-nim

# Create config.yaml
cat > config.yaml << 'EOF'
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
EOF

echo "✅ Config created"

# Ask for API key
read -p "Enter your NVIDIA NIM API Key (nvapi-...): " API_KEY

# Start container
docker run -d \
  -p 4001:4000 \
  -e NVIDIA_NIM_API_KEY="$API_KEY" \
  -v $(pwd)/config.yaml:/app/config.yaml \
  --name litellm-nim \
  --restart always \
  docker.litellm.ai/berriai/litellm:main-stable \
  --config /app/config.yaml

echo "✅ Docker container started"

# Add alias to ~/.zshrc
cat >> ~/.zshrc << EOF

# Claude Code via NVIDIA NIM
export NVIDIA_NIM_API_KEY="$API_KEY"
alias claude-nim='\
ANTHROPIC_BASE_URL="http://localhost:4001" \
ANTHROPIC_API_KEY="sk-litellm-local" \
ANTHROPIC_MODEL="claude-sonnet-4-6" \
ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-4-6" \
ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-4-6" \
ANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-4-5" \
claude'
EOF

echo "✅ Shell alias added"

# Reload shell
source ~/.zshrc

echo ""
echo "🎉 Setup complete! Run 'claude-nim' to start using Claude Code for free."
echo ""
```

### Usage
```bash
chmod +x setup-claude-nim.sh
./setup-claude-nim.sh
```
