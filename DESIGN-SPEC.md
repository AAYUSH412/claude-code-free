# Design Specification - Claude Code Free via NVIDIA NIM

## Visual Identity

### Typography

| Element | Font | Weights | Usage |
|---------|------|---------|-------|
| Headings | Cormorant Garamond | 300, 400, 600, 700 | Page titles, section headers |
| Body | Instrument Sans | 400, 500, 600, 700 | Paragraphs, labels, UI text |
| Code | JetBrains Mono / Fira Code | 400, 500 | Code blocks, terminal output |

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

---

## Color Palette

### Light Mode
```css
--background: #fafafa
--foreground: #1a1a1a
--card: #ffffff
--card-foreground: #1a1a1a
--popover: #fafafa
--popover-foreground: #1a1a1a
--primary: #1a1a1a
--primary-foreground: #fafafa
--secondary: #f0f0f0
--secondary-foreground: #1a1a1a
--muted: #f0f0f0
--muted-foreground: #666666
--accent: #2d55ff
--accent-foreground: #fafafa
--destructive: #d32f2f
--destructive-foreground: #fafafa
--border: #e0e0e0
--input: #e0e0e0
--ring: #2d55ff
```

### Dark Mode
```css
--background: #1a1a1a
--foreground: #fafafa
--card: #1a1a1a
--card-foreground: #fafafa
--popover: #1a1a1a
--popover-foreground: #fafafa
--primary: #fafafa
--primary-foreground: #1a1a1a
--secondary: #2a2a2a
--secondary-foreground: #fafafa
--muted: #2a2a2a
--muted-foreground: #999999
--accent: #4a70ff
--accent-foreground: #fafafa
--destructive: #cf6679
--destructive-foreground: #1a1a1a
--border: #2a2a2a
--input: #2a2a2a
--ring: #4a70ff
```

### Brand Accent Colors
- **Primary Accent**: `#2d55ff` (Electric blue for CTAs, links)
- **Secondary Accent**: `#00d4aa` (Teal for success, NVIDIA branding hint)
- **Warning**: `#ff9500` (Orange for warnings)
- **Error**: `#ff4444` (Red for errors)

---

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tiny gaps, icon spacing |
| `--space-2` | 8px | Small gaps, inline elements |
| `--space-3` | 16px | Standard padding, item spacing |
| `--space-4` | 24px | Component padding |
| `--space-5` | 32px | Section padding |
| `--space-6` | 48px | Large sections |
| `--space-7` | 64px | Hero sections |
| `--space-8` | 96px | Extra large spacing |
| `--space-9` | 128px | Maximum spacing |

---

## Component Styles

### Buttons

**Primary Button**
```css
background: var(--primary)
color: var(--primary-foreground)
padding: 12px 24px
border-radius: 8px
font-family: Instrument Sans
font-weight: 600
font-size: 16px
transition: all 0.2s ease
```

**Secondary Button**
```css
background: transparent
color: var(--foreground)
border: 1px solid var(--border)
padding: 12px 24px
border-radius: 8px
font-family: Instrument Sans
font-weight: 600
font-size: 16px
```

### Code Blocks
```css
background: #1e1e1e (dark) / #f5f5f5 (light)
border-radius: 12px
padding: 20px
font-family: JetBrains Mono
font-size: 14px
line-height: 1.6
position: relative
border: 1px solid var(--border)
```

### Cards
```css
background: var(--card)
border: 1px solid var(--border)
border-radius: 16px
padding: 24px
box-shadow: 0 1px 3px rgba(0,0,0,0.1)
```

---

## Grain Overlay Effect

```css
.grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

---

## Animations (Framer Motion)

### Fade In Reveal
```typescript
const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}
```

### Stagger Children
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}
```

---

## Breakpoints

| Name | Value | Usage |
|------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large |

---

## Shadow System

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)
```

---

## Border Radius

```css
--radius-sm: 4px
--radius: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 24px
--radius-full: 9999px
```
