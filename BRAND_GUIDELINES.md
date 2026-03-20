# Welkin — Color Palette & Theme Guide

> Derived from an aerial cloudscape photograph — an above-the-clouds perspective with deep blue skies and billowing white cumulus clouds.

---

## 🎨 Core Color Palette

### Primary Colors

| Role | Name | HEX | RGB | HSL | Usage |
|------|------|-----|-----|-----|-------|
| **Primary Deep** | Stratosphere Navy | `#0A2D6E` | `10, 45, 110` | `219°, 83%, 24%` | Headers, primary CTAs, dominant backgrounds |
| **Primary Mid** | Azure Sky | `#1E6CC7` | `30, 108, 199` | `212°, 74%, 45%` | Interactive elements, links, accent borders |
| **Primary Bright** | Cerulean | `#3A8FE0` | `58, 143, 224` | `209°, 73%, 55%` | Hover states, highlights, active states |
| **Primary Light** | Daylight Blue | `#6CB4F0` | `108, 180, 240` | `207°, 80%, 68%` | Secondary buttons, tags, subtle accents |

### Neutral / Cloud Colors

| Role | Name | HEX | RGB | HSL | Usage |
|------|------|-----|-----|-----|-------|
| **Cloud White** | Cumulus | `#F7FAFF` | `247, 250, 255` | `218°, 100%, 98%` | Backgrounds, cards, content areas |
| **Cloud Light** | Cirrus | `#E8EFF8` | `232, 239, 248` | `214°, 57%, 94%` | Subtle separators, alternate rows, hover bg |
| **Cloud Mid** | Stratus | `#C5D3E8` | `197, 211, 232` | `216°, 43%, 84%` | Borders, dividers, disabled states |
| **Cloud Shadow** | Nimbus | `#8FA4C2` | `143, 164, 194` | `215°, 28%, 66%` | Muted text, placeholders, secondary info |

### Atmospheric / Depth Colors

| Role | Name | HEX | RGB | HSL | Usage |
|------|------|-----|-----|-----|-------|
| **Deep Atmosphere** | Abyss Blue | `#0B1E3D` | `11, 30, 61` | `217°, 69%, 14%` | Dark mode backgrounds, depth layers |
| **Mid Atmosphere** | Twilight | `#163A6B` | `22, 58, 107` | `215°, 66%, 25%` | Dark mode cards, overlays |
| **Haze** | Mist | `#B8CBE4` | `184, 203, 228` | `214°, 40%, 81%` | Frosted glass effects, glassmorphism fills |
| **Glow** | Horizon | `#D6E5F5` | `214, 229, 245` | `211°, 60%, 90%` | Glows, soft shadows, background gradients |

---

## 🌈 Gradient Definitions

### Primary Gradients

```css
/* Sky Gradient — Main vertical background */
--gradient-sky: linear-gradient(180deg, #0A2D6E 0%, #1E6CC7 40%, #6CB4F0 70%, #D6E5F5 100%);

/* Horizon Gradient — Subtle horizontal accent */
--gradient-horizon: linear-gradient(90deg, #3A8FE0 0%, #6CB4F0 50%, #D6E5F5 100%);

/* Cloud Fade — Card / overlay backgrounds */
--gradient-cloud: linear-gradient(180deg, rgba(247,250,255,0.95) 0%, rgba(232,239,248,0.90) 100%);

/* Deep Sky — Dark mode / hero sections */
--gradient-deep: linear-gradient(180deg, #0B1E3D 0%, #0A2D6E 50%, #1E6CC7 100%);

/* Glassmorphism fill */
--gradient-glass: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%);
```

---

## 🪟 Glassmorphism / Frosted Glass Preset

```css
.glass-card {
  background: rgba(247, 250, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(10, 45, 110, 0.15);
}

.glass-card-light {
  background: rgba(255, 255, 255, 0.60);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.40);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(10, 45, 110, 0.08);
}
```

---

## 🌗 Light & Dark Mode Tokens

### Light Mode

| Token | Value | Purpose |
|-------|-------|---------|
| `--bg-primary` | `#F7FAFF` | Page background |
| `--bg-secondary` | `#E8EFF8` | Card / section background |
| `--bg-tertiary` | `#D6E5F5` | Inset / nested backgrounds |
| `--text-primary` | `#0B1E3D` | Headings, body text |
| `--text-secondary` | `#163A6B` | Subheadings, descriptions |
| `--text-muted` | `#8FA4C2` | Placeholders, captions |
| `--accent` | `#1E6CC7` | Links, buttons, interactive |
| `--accent-hover` | `#3A8FE0` | Hover state |
| `--border` | `#C5D3E8` | Dividers, card borders |

### Dark Mode

| Token | Value | Purpose |
|-------|-------|---------|
| `--bg-primary` | `#0B1E3D` | Page background |
| `--bg-secondary` | `#163A6B` | Card / section background |
| `--bg-tertiary` | `#0A2D6E` | Inset / nested backgrounds |
| `--text-primary` | `#F7FAFF` | Headings, body text |
| `--text-secondary` | `#D6E5F5` | Subheadings, descriptions |
| `--text-muted` | `#8FA4C2` | Placeholders, captions |
| `--accent` | `#6CB4F0` | Links, buttons, interactive |
| `--accent-hover` | `#3A8FE0` | Hover state |
| `--border` | rgba(255, 255, 255, 0.12) | Dividers, card borders |

---

## ✍️ Typography Recommendations

| Element | Font | Weight | Size | Color Token |
|---------|------|--------|------|-------------|
| H1 | Inter / Outfit | 700 (Bold) | 48px | `--text-primary` |
| H2 | Inter / Outfit | 600 (Semibold) | 32px | `--text-primary` |
| H3 | Inter / Outfit | 600 (Semibold) | 24px | `--text-secondary` |
| Body | Inter | 400 (Regular) | 16px | `--text-primary` |
| Caption | Inter | 400 (Regular) | 13px | `--text-muted` |
| Button | Inter | 600 (Semibold) | 14-16px | `#FFFFFF` on accent bg |

---

## 💫 Shadow & Elevation System

```css
/* Subtle — cards, inputs */
--shadow-sm: 0 2px 8px rgba(10, 45, 110, 0.06);

/* Default — elevated cards, modals */
--shadow-md: 0 4px 16px rgba(10, 45, 110, 0.10);

/* Prominent — dropdowns, popovers */
--shadow-lg: 0 8px 32px rgba(10, 45, 110, 0.15);

/* Dramatic — floating elements, hero CTAs */
--shadow-xl: 0 16px 48px rgba(10, 45, 110, 0.20);

/* Glow effect for interactive elements */
--shadow-glow: 0 0 20px rgba(58, 143, 224, 0.35);
```

---

## 🎭 Theme Summary for LLM Prompt

> **Theme Name:** Welkin  
> **Mood:** Ethereal, expansive, clean, premium, heavenly  
> **Inspiration:** Above-the-clouds aerial view — deep blue stratosphere fading into brilliant white cumulus  
> **Personality:** Calm confidence, clarity, openness, trustworthiness  
> **Color Story:** A monochromatic blue palette ranging from deep navy (#0A2D6E) through cerulean (#3A8FE0) to near-white cloud tones (#F7FAFF). No warm colors — strictly cool blue spectrum.  
> **Key Visual Techniques:** Glassmorphism, vertical sky gradients, soft blue-tinted shadows, frosted glass overlays, subtle glow effects  
> **Avoid:** Warm colors (red, orange, yellow), harsh contrast, flat/matte designs, heavy dark borders  
> **Pair With:** Smooth micro-animations, parallax cloud effects, blur/transparency layers, fluid rounded corners (12-20px)
