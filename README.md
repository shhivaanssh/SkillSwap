# SkillSwap 🔁

> A Topmate.io-inspired peer-to-peer skill learning platform — built with pure HTML, CSS, and JavaScript. No frameworks. No dependencies. Full dark mode + 6 interactive features included.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen?style=flat)](.)
[![Dark Mode](https://img.shields.io/badge/dark%20mode-supported-blueviolet?style=flat)](.)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## ✨ Overview

SkillSwap is a peer-to-peer skill exchange platform where students teach what they know and learn what they need — completely free, powered by the MERN stack. This repository contains the **marketing landing page**, styled in the spirit of [Topmate.io](https://topmate.io) — clean profile cards, session booking UI, live search, animated stats, and a warm editorial aesthetic.

---

## 📁 File Structure

```
skillswap/
├── index.html    ← Full page markup — 10 sections, all features wired
├── styles.css    ← Complete styling — light & dark themes, all components
├── script.js     ← All interactivity — 14 self-contained modules
└── README.md
```

All three files must stay in the same folder. `index.html` links to both `styles.css` and `script.js` via relative paths. No build step needed.

---

## 🚀 Quick Start

```bash
# Option 1 — Just open it
open index.html

# Option 2 — Serve locally (Python)
python3 -m http.server 3000
# → http://localhost:3000

# Option 3 — Serve locally (Node)
npx serve .
# → http://localhost:3000
```

Google Fonts (Fraunces + Plus Jakarta Sans) load from the CDN — an internet connection is needed for fonts only. All layout and functionality works fully offline.

---

## 🖼️ Page Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Navbar** | Fixed, frosted-glass, dark mode toggle, mobile hamburger |
| 2 | **Hero** | Headline, CTAs, Topmate-style profile card mockup, floating stat chips |
| 3 | **Trust Bar** | 5 animated count-up stats |
| 4 | **Discover Skills** | Live search bar + 6 filterable peer profile cards |
| 5 | **How It Works** | 3-step illustrated process with arrow connectors |
| 6 | **Chat Highlight** | Split layout with animated Socket.io chat mockup |
| 7 | **Testimonials** | 3 star-rated story cards with skill-swap labels |
| 8 | **FAQ** | Accordion with 6 questions |
| 9 | **CTA** | Full-bleed conversion block with ambient glow |
| 10 | **Footer** | Brand, nav columns, socials, auto-updating copyright year |

---

## ⚙️ JavaScript Modules

All 14 modules live in `script.js` and are booted from a single `DOMContentLoaded` listener.

### Original Modules

| Module | What it does |
|--------|-------------|
| `initTheme()` | Dark/light toggle — reads localStorage, falls back to OS preference, persists choice, listens for OS changes |
| `initNavbar()` | Adds frosted-glass blur after 24px scroll; hides navbar on fast downscroll and reveals on upscroll |
| `initMobileMenu()` | Hamburger open/close with animated icon, body scroll lock, and outside-click dismiss |
| `initScrollReveal()` | IntersectionObserver fires `.visible` on `.reveal`, `.reveal-left`, `.reveal-right` elements — one-shot per element |
| `initFilterTabs()` | `data-filter` buttons toggle `data-category` cards; "all" resets every card |
| `initFAQ()` | Single-open accordion driven by CSS `max-height` and `scrollHeight` |
| `initSmoothScroll()` | Intercepts all `href="#..."` anchors and scrolls with fixed navbar height compensation |
| `initFooterYear()` | Sets `#footer-year` to `new Date().getFullYear()` automatically |

### New Feature Modules

| Module | What it does |
|--------|-------------|
| `initScrollProgress()` | A 3px coral gradient bar fixed to the top of the viewport — width tracks the user's scroll percentage through the page |
| `initCountUp()` | Watches `.ts-number` elements in the trust bar via IntersectionObserver; counts from 0 to target with ease-out cubic easing when scrolled into view |
| `initLiveSearch()` | Filters all `.skill-card` elements in real time as the user types; highlights matched text in name and bio fields; shows a "no results" message with a suggest link; clears highlights when a filter tab is clicked; debounced at 180ms |
| `initBookingModal()` | Every "Book a Swap →" and "Swap →" button opens a modal pre-populated with that peer's name and skills; form validates name, email, and skill fields; simulates async send then fires a success toast; closes on X, overlay click, or Escape key |
| `initToastSystem()` | Exposes a global `showToast(type, title, message, duration)` function; supports `success`, `error`, and `info` types; slides in from the right, auto-dismisses, pauses on hover, manually closeable |
| `initBackToTop()` | A circular floating button that appears bottom-left after 400px of scroll; turns accent-orange on hover; smoothly scrolls back to the top |

---

## 🌗 Dark Mode

Dark mode works three ways simultaneously:

| Trigger | Behaviour |
|---------|-----------|
| **Toggle button** (navbar) | Switches instantly with a press ripple animation |
| **OS preference** | Auto-matches `prefers-color-scheme` on first visit |
| **localStorage** | Remembers the user's last choice across page reloads |

### How it works

The entire theme is a single HTML attribute:

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

Swapping the accent color globally is one find-and-replace: `#F4622A` → your color.

---

## 🎨 Design System

### Color Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--bg-base` | `#FDFAF6` | `#111008` | Page background |
| `--bg-surface` | `#FFFFFF` | `#1A1710` | Cards, modal, footer |
| `--bg-subtle` | `#F5F0E8` | `#211E14` | Section backgrounds, inputs |
| `--text-primary` | `#1A1208` | `#F5F0E5` | Headings, strong text |
| `--text-muted` | `#8A7B67` | `#8A8070` | Body copy, captions |
| `--text-faint` | `#B5A898` | `#5A5445` | Timestamps, copyright |
| `--accent` | `#F4622A` | `#F47A3A` | CTAs, highlights, hover states |
| `--accent-soft` | `rgba(244,98,42,.10)` | `rgba(244,122,58,.12)` | Tag backgrounds, focus rings |
| `--border` | `rgba(26,18,8,.08)` | `rgba(245,240,229,.07)` | All card and UI borders |

### Typography

| Font | Style | Usage |
|------|-------|-------|
| **Fraunces** | Optical-size serif, italic variants | All headings, hero, quotes, modal titles |
| **Plus Jakarta Sans** | Geometric sans-serif | Body text, nav, buttons, labels, inputs |

### Spacing & Radius

```css
--section-py:    96px;    /* Vertical section padding (72px on mobile) */
--container-max: 1160px;  /* Max content width */
--r-sm:          8px;     /* Tags, small buttons */
--r-md:          14px;    /* Inputs, session rows, FAQ */
--r-lg:          20px;    /* Skill cards, testimonials, toasts */
--r-xl:          28px;    /* Hero card, chat window, modal */
--r-full:        9999px;  /* Pills, avatar badges, round buttons */
```

---

## 🔍 Live Search — How It Works

Cards use `data-category` for tab filtering:

```html
<div class="skill-card" data-category="tech">...</div>
```

The search input queries name, university, bio, and tag text across all visible cards. Matches are wrapped in a `<mark class="search-highlight">` element styled with a warm orange tint. When the search is cleared (X button or empty input), highlights are stripped and the active tab filter is restored.

To add a new card that's searchable, just add the HTML with the correct `data-category` — no JS changes needed.

---

## 📬 Booking Modal — How It Works

Every `.skc-cta` and `.pcm-book-btn` element triggers `openModal()`:

```javascript
document.querySelectorAll('.skc-cta, .pcm-book-btn').forEach(btn => {
  btn.addEventListener('click', e => { e.preventDefault(); openModal(btn); });
});
```

`openModal()` traverses up to `.skill-card` or `.pcm-body` and reads the peer's name and skill tags, then populates the modal header dynamically. Form validation checks required fields and email format before showing an error toast. On success, a 1.3s simulated delay fires a success toast.

---

## 🎉 Toast Notifications — API

```javascript
// Success
showToast('success', 'Swap Request Sent! 🎉', "You'll hear back within 24 hours.");

// Error
showToast('error', 'Missing fields', 'Please fill in all required fields.');

// Info (default duration 4500ms)
showToast('info', 'Tip', 'You can list multiple skills on your profile.', 6000);
```

Toast types apply a left border color: green for success, red for error, orange for info.

---

## 🧩 Adding a New Skill Category

1. Add a filter tab button:

```html
<button class="filter-tab" data-filter="music">Music</button>
```

2. Add `data-category="music"` to the relevant `.skill-card` elements.

3. Add a tag color in `styles.css`:

```css
.tag-music { background: rgba(139,92,246,.10); color: #8b5cf6; }
```

No JavaScript changes required — the filter and search systems pick it up automatically.

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| `> 1024px` | 2-col hero, 3-col skill grid, side-by-side chat |
| `≤ 1024px` | Stacked hero, 2-col skills, single-col chat and HIW |
| `≤ 768px` | Mobile nav (hamburger only), 1-col everything, floating chips hidden |
| `≤ 520px` | Stacked CTAs, toasts full-width, back-to-top repositioned, simplified footer |

---

## 🌐 Deployment

### Netlify Drop *(fastest)*
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `skillswap/` folder onto the page
3. Live in under 30 seconds

### GitHub Pages
```bash
git init
git add .
git commit -m "feat: skillswap landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/skillswap.git
git push -u origin main
# Settings → Pages → Deploy from branch → main / root
```

### Vercel
```bash
npx vercel --prod
```

### Cloudflare Pages
Connect repo in the dashboard. Build command: leave empty. Output directory: `/`.

---

## 🔌 Connecting to the MERN Backend

Replace placeholder `href="#"` values with your real app routes:

```html
<!-- Navbar -->
<a href="https://app.skillswap.io/auth/signin"    class="nav-signin">Sign In</a>
<a href="https://app.skillswap.io/auth/register"  class="btn-nav-cta">Get Started Free</a>

<!-- Hero -->
<a href="https://app.skillswap.io/auth/register"  class="btn-hero-primary">Start for Free</a>

<!-- Discover CTA -->
<a href="https://app.skillswap.io/discover"       class="btn-outline-lg">View All 340+ Skills →</a>

<!-- Final CTA -->
<a href="https://app.skillswap.io/auth/register"  class="btn-hero-primary btn-cta-lg">Create Your Profile</a>
```

To replace the static skill cards with real data from MongoDB, fetch from your Express API and render `.skill-card` elements using the same HTML structure and CSS classes — the filter tabs and live search will work on dynamic cards automatically.

To wire the booking modal to a real backend, replace the `setTimeout` block in `initBookingModal()` with a `fetch()` POST to your sessions endpoint.

---

## 📦 Full Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styling | Vanilla CSS3 — custom properties, Grid, Flexbox, `clamp()` |
| Interactivity | Vanilla ES6+ JavaScript — 14 modules |
| Fonts | Google Fonts CDN (Fraunces + Plus Jakarta Sans) |
| Icons | Inline SVG — zero external icon libraries |
| Animations | CSS keyframes + `IntersectionObserver` + `requestAnimationFrame` |
| Storage | `localStorage` (theme preference only) |
| Backend (separate) | MongoDB · Express · React · Node.js · Socket.io |
| Hosting | Frontend: Netlify · Backend: Render |

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

**CSS features used:** custom properties, `clamp()`, CSS Grid, Flexbox, `backdrop-filter`, `IntersectionObserver`, `requestAnimationFrame`, `performance.now()`.

---

## 📄 License

MIT — free to use, modify, and ship for personal or commercial projects.

---

## 🙌 Credits

Designed and built as a landing page for the **SkillSwap** MERN stack project.
Inspired by the UI/UX patterns of [Topmate.io](https://topmate.io), [Linear.app](https://linear.app), and [Vercel.com](https://vercel.com).