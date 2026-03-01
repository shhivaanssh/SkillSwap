# SkillSwap 🔁

> A Topmate.io-inspired peer-to-peer skill learning platform — built with pure HTML, CSS, and JavaScript. No frameworks. No dependencies. Full dark mode included.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen?style=flat)](.)
[![Dark Mode](https://img.shields.io/badge/dark%20mode-supported-blueviolet?style=flat)](.)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## ✨ Overview

SkillSwap is a peer-to-peer skill exchange platform where students teach what they know and learn what they need — completely free, powered by the MERN stack. This repository contains the **marketing landing page**, styled in the spirit of [Topmate.io](https://topmate.io) — clean profile cards, session booking UI, and a warm editorial aesthetic.

---

## 🖼️ Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Navbar** | Fixed, frosted-glass, with dark mode toggle + mobile hamburger |
| 2 | **Hero** | Headline, CTAs, Topmate-style profile card mockup with floating stat chips |
| 3 | **Trust Bar** | 5 live stats — learners, skills, sessions, satisfaction, pricing |
| 4 | **Discover Skills** | 6 filterable peer cards with avatars, ratings, skill tags, and session types |
| 5 | **How It Works** | 3-step illustrated process with arrow connectors |
| 6 | **Chat Highlight** | Split layout with an animated Socket.io chat mockup |
| 7 | **Testimonials** | 3 story cards with star ratings and skill-swap labels |
| 8 | **FAQ** | Accordion with 6 common questions |
| 9 | **CTA** | Full-bleed conversion block with ambient glow |
| 10 | **Footer** | Brand, navigation columns, socials, auto-updating year |

---

## 📁 File Structure

```
skillswap/
├── index.html      ← Full page markup — semantic HTML5, all sections
├── styles.css      ← Complete styling — light & dark themes, all components
├── script.js       ← All interactivity — 8 self-contained modules
└── README.md
```

All three files must be kept together in the same folder. `index.html` links to both `styles.css` and `script.js` via relative paths.

---

## 🚀 Quick Start

**No build step. No npm install. No config.**

```bash
# Option 1 — Just open it
open index.html

# Option 2 — Serve locally with Python
python3 -m http.server 3000
# → http://localhost:3000

# Option 3 — Serve with Node (npx)
npx serve .
# → http://localhost:3000
```

Google Fonts (Fraunces + Plus Jakarta Sans) load from the CDN — an internet connection is needed for fonts only. The layout falls back gracefully to system serif/sans-serif if offline.

---

## 🌗 Dark Mode

Dark mode is fully implemented and works three ways:

| Trigger | Behaviour |
|---------|-----------|
| **Toggle button** (navbar) | Switches theme instantly with a press animation |
| **OS preference** | Automatically matches `prefers-color-scheme` on first visit |
| **localStorage** | Remembers the user's last choice across page reloads |

### How it works in code

The entire theme is controlled by a single attribute on the `<html>` element:

```html
<html data-theme="light">   ← light mode
<html data-theme="dark">    ← dark mode
```

All colors are CSS custom properties scoped to each theme:

```css
/* Light (default) */
:root {
  --bg-base:      #FDFAF6;
  --text-primary: #1A1208;
  --accent:       #F4622A;
  /* ... */
}

/* Dark override */
[data-theme="dark"] {
  --bg-base:      #111008;
  --text-primary: #F5F0E5;
  --accent:       #F47A3A;
  /* ... */
}
```

To change the accent color globally, find and replace `#F4622A` / `#F47A3A` in `styles.css`.

---

## 🎨 Design System

### Color Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--bg-base` | `#FDFAF6` | `#111008` | Page background |
| `--bg-surface` | `#FFFFFF` | `#1A1710` | Cards, panels |
| `--bg-subtle` | `#F5F0E8` | `#211E14` | Section backgrounds |
| `--text-primary` | `#1A1208` | `#F5F0E5` | Headings, strong text |
| `--text-muted` | `#8A7B67` | `#8A8070` | Body, descriptions |
| `--accent` | `#F4622A` | `#F47A3A` | CTAs, highlights, links |
| `--border` | `rgba(26,18,8,0.08)` | `rgba(245,240,229,0.07)` | Card & UI borders |

### Typography

| Font | Style | Usage |
|------|-------|-------|
| **Fraunces** | Display serif, italic variants | All headings, hero, section titles |
| **Plus Jakarta Sans** | Geometric sans-serif | Body text, UI labels, nav, buttons |

### Spacing & Shape

```css
--section-py:    96px;   /* Vertical section padding */
--container-max: 1160px; /* Max content width */
--r-sm:          8px;    /* Small radius (buttons, inputs) */
--r-md:          14px;   /* Medium radius (session cards) */
--r-lg:          20px;   /* Large radius (skill cards) */
--r-xl:          28px;   /* Extra large (hero card, chat window) */
--r-full:        9999px; /* Pills, badges, fully rounded */
```

---

## ⚙️ JavaScript Modules

`script.js` is organised into 8 self-contained functions, all called inside a single `DOMContentLoaded` listener:

```
initTheme()         → Dark/light toggle, localStorage, OS preference sync
initNavbar()        → Scroll detection, glass blur, hide-on-scroll behaviour
initMobileMenu()    → Hamburger open/close, body scroll lock, outside-click dismiss
initScrollReveal()  → IntersectionObserver-based stagger fade-in animations
initFilterTabs()    → Skill card category filtering with smooth transitions
initFAQ()           → Single-open accordion with CSS max-height animation
initSmoothScroll()  → Anchor navigation with fixed navbar offset compensation
initFooterYear()    → Auto-updates copyright year
```

Every module is independently readable and can be extracted or replaced without touching the others.

---

## 🧩 Skill Card Filter

Cards are tagged using `data-category` attributes in the HTML:

```html
<div class="skill-card" data-category="tech">...</div>
<div class="skill-card" data-category="design">...</div>
```

Filter buttons use a matching `data-filter` attribute:

```html
<button class="filter-tab active" data-filter="all">All Skills</button>
<button class="filter-tab" data-filter="tech">Tech</button>
```

To add a new category:

1. Add a new `<button class="filter-tab" data-filter="music">Music</button>` in the filter row
2. Add `data-category="music"` to the relevant skill cards
3. Add a `.tag-music` style in `styles.css` following the existing tag pattern

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout Changes |
|-----------|----------------|
| `> 1024px` | Full 2-col hero, 3-col skills grid, 2-col chat split |
| `≤ 1024px` | Stacked hero, 2-col skills, stacked chat, stacked HIW |
| `≤ 768px` | Mobile nav (hamburger), 1-col skills, floating chips hidden |
| `≤ 520px` | Single-column everything, stacked CTAs, simplified footer |

---

## 🌐 Deployment

### Netlify Drop *(fastest — 30 seconds)*
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `skillswap/` folder onto the page
3. Live instantly — no config needed

### GitHub Pages
```bash
git init
git add .
git commit -m "feat: skillswap landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/skillswap.git
git push -u origin main
```
Then: **Settings → Pages → Deploy from branch → main / root**

### Vercel
```bash
npx vercel --prod
# Select the folder root when prompted
```

### Cloudflare Pages
```bash
# In Cloudflare dashboard → Pages → Connect Git
# Build command: (leave empty)
# Output directory: /  (root)
```

Any static host works — the site is just three files with no server-side requirements.

---

## 🔌 Connecting to the MERN Backend

Replace placeholder `href="#"` values with your real app routes:

```html
<!-- Navbar -->
<a href="https://app.skillswap.io/auth/signin" class="nav-signin">Sign In</a>
<a href="https://app.skillswap.io/auth/register" class="btn-nav-cta">Get Started Free</a>

<!-- Hero -->
<a href="https://app.skillswap.io/auth/register" class="btn-hero-primary">Start for Free</a>

<!-- Skill Cards (each "Book a Swap" button) -->
<a href="https://app.skillswap.io/discover" class="skc-cta">Book a Swap →</a>

<!-- Final CTA -->
<a href="https://app.skillswap.io/auth/register" class="btn-hero-primary">Create Your Profile</a>
```

For dynamic skill cards fetched from MongoDB, replace the static `.skills-grid` HTML with a JS `fetch()` call to your Express API and render cards programmatically using the same `.skill-card` CSS classes.

---

## 🛠️ Customisation Guide

### Change the accent color
Find and replace in `styles.css`:
- `#F4622A` → your color (light mode accent)
- `#F47A3A` → your color slightly lighter (dark mode accent)
- Update `rgba(244,98,42,...)` soft variants accordingly

### Add a new section
Each section follows this pattern:

```html
<section class="section" id="my-section">
  <div class="section-container">
    <div class="section-head reveal">
      <span class="section-eyebrow">Tag</span>
      <h2 class="section-h2">Heading<br><em>with italic.</em></h2>
    </div>
    <!-- Your content with reveal/reveal-left/reveal-right classes -->
  </div>
</section>
```

### Swap fonts
1. Replace the Google Fonts `<link>` in `<head>`
2. Update `--font-display` and `--font-body` in the `:root` block in `styles.css`

### Add more skill cards
Copy an existing `.skill-card` block in `index.html`. Set the correct `data-category` and update the avatar color class (`.skc-av-1` through `.skc-av-6` are pre-defined).

---

## 🧪 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 80+ | ✅ Full |
| Firefox | 75+ | ✅ Full |
| Safari | 13.1+ | ✅ Full |
| Edge | 80+ | ✅ Full |
| Opera | 67+ | ✅ Full |
| IE 11 | — | ❌ Not supported |

**CSS features used:** custom properties, `clamp()`, CSS Grid, Flexbox, `backdrop-filter`, `IntersectionObserver` (JS), `prefers-color-scheme`.

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styling | Vanilla CSS3 with custom properties |
| Interactivity | Vanilla ES6+ JavaScript |
| Fonts | Google Fonts CDN |
| Icons | Inline SVG (zero external icon libraries) |
| Animations | CSS keyframes + `IntersectionObserver` |
| Storage | `localStorage` (theme preference only) |

**Backend (separate repo):** MongoDB · Express · React · Node.js · Socket.io
**Deployment:** Frontend on Netlify · Backend on Render

---

## 📄 License

MIT — free to use, modify, and ship for personal or commercial projects.

---

## 🙌 Credits

Designed and built as a landing page for the **SkillSwap** MERN stack project.
Inspired by the UI/UX patterns of [Topmate.io](https://topmate.io), [Linear.app](https://linear.app), and [Vercel.com](https://vercel.com).
