# SkillSwap — Landing Page

> A premium, Stripe-style SaaS landing page for SkillSwap — a peer-to-peer skill learning platform built on the MERN stack.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen?style=flat)

---

## Preview

| Section | Description |
|---|---|
| Navbar | Fixed, blur-on-scroll, mobile hamburger |
| Hero | Headline, CTA buttons, floating browser mockup |
| Stats | 4 key metrics with scroll-triggered animation |
| Features | 6-card grid — Discover, Teach, Chat, Match, Auth, Dashboard |
| How It Works | 3-step process with connector line |
| Chat Highlight | Split layout with live Socket.io chat mockup |
| Testimonials | 3 star-rated cards |
| CTA | Bold conversion block |
| Footer | Links, socials, copyright |

---

## Quick Start

No build step. No npm. No config.

```bash
# Clone or download the file
git clone https://github.com/yourusername/skillswap-landing.git

# Open directly in browser
open skillswap.html
```

Or just double-click `skillswap.html` — it works offline too (except Google Fonts, which requires internet).

---

## File Structure

```
skillswap-landing/
├── skillswap.html      ← Everything: HTML + CSS + JS in one file
└── README.md
```

The entire page lives in a single file by design — easy to deploy, share, or drop into any project.

---

## Sections Breakdown

### 1. Navbar
- Fixed position with transparent → frosted glass transition on scroll
- Active mobile menu with hamburger toggle
- Smooth scroll to all anchor sections

### 2. Hero
- Animated badge with pulsing dot
- Large gradient headline using `Syne` display font
- Two CTAs: primary (teal) and outline
- Browser chrome mockup with 3 floating skill cards
- Floating chat bubble + match badge (hidden on mobile)
- Ambient background orbs and grid overlay

### 3. Stats / Social Proof
- 4 animated stat counters: **1,200+ learners**, **340+ skills**, **800+ sessions**, **98% satisfaction**
- University/org name strip (MIT, Stanford, IIT, UCL, NUS)
- Scroll-triggered fade-in

### 4. Features Grid
- 6 cards in a 3-column grid (2-col on tablet, 1-col on mobile)
- Each card has a colored icon, title, and description
- Hover: lift + border highlight

### 5. How It Works
- 3 numbered steps with a horizontal connector line on desktop
- Steps: Create Profile → Get Matched → Start Swapping
- Staggered scroll reveal

### 6. Real-Time Chat Highlight
- Split layout: text + chat UI mockup
- Animated typing indicator (3 bouncing dots)
- Checklist of Socket.io features
- Directional scroll reveal (text from left, UI from right)

### 7. Testimonials
- 3 cards with 5-star ratings, quotes, and author avatars
- Priya Sharma (IIT Delhi), James O'Brien (UCL), Aya Tanaka (NUS)

### 8. Final CTA
- Full-bleed card with grid texture overlay
- "Start Learning Free" + "View on GitHub" buttons

### 9. Footer
- Logo, nav links, social icons (GitHub, X, LinkedIn)
- Auto-updating copyright year via JS

---

## Design System

### Colors

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#080c14` | Page background |
| `--surface` | `#0f1623` | Cards, panels |
| `--teal` | `#63cab7` | Primary accent, CTAs |
| `--blue` | `#4a9fe0` | Secondary accent |
| `--purple` | `#a78bfa` | Tertiary accent |
| `--amber` | `#f59e0b` | Star ratings |
| `--muted` | `rgba(255,255,255,0.45)` | Body text |
| `--border` | `rgba(255,255,255,0.07)` | Card borders |

### Typography

| Font | Weight | Usage |
|---|---|---|
| **Syne** | 700, 800 | All headings, logo, labels |
| **DM Sans** | 300, 400, 500 | Body text, captions, nav |

### Animations

| Animation | Trigger | Class |
|---|---|---|
| Fade + slide up | Scroll into view | `.reveal` |
| Slide from left | Scroll into view | `.reveal-left` |
| Slide from right | Scroll into view | `.reveal-right` |
| Card float | CSS keyframe loop | `.float-sticker` |
| Badge pulse | CSS keyframe loop | `.hero-badge-dot` |
| Typing dots | CSS keyframe loop | `.typing-dot` |

---

## JavaScript Features

All vanilla JS — no libraries required.

```
✓ Navbar scroll detection (transparent → glass)
✓ Mobile hamburger menu (open / close toggle)
✓ IntersectionObserver scroll reveals
✓ Staggered animation delays on grid cards
✓ Smooth scroll for all # anchor links
✓ Auto current year in footer
```

---

## Customisation

### Change accent color
Find and replace `#63cab7` and `#7dd8c6` with your brand color throughout the `<style>` block.

### Update copy
All text is plain HTML — search for any string and edit directly.

### Add a section
Each section follows the same pattern:

```html
<section id="my-section">
  <div class="section-inner">
    <div class="section-header">
      <span class="section-tag">Tag</span>
      <h2 class="section-h2">Heading</h2>
    </div>
    <!-- content -->
  </div>
</section>
```

### Swap fonts
Replace the Google Fonts `<link>` in `<head>` and update `--font-head` / `--font-body` CSS variables.

---

## Deployment

Since it's a single HTML file, deployment is trivial.

**Netlify Drop**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop `skillswap.html`
3. Done — live in seconds

**GitHub Pages**
```bash
git init
git add skillswap.html README.md
git commit -m "init: skillswap landing page"
git branch -M main
git remote add origin https://github.com/yourusername/skillswap-landing.git
git push -u origin main
# Enable Pages in repo Settings → Pages → Deploy from main
```

**Vercel**
```bash
npx vercel --prod
# Select skillswap.html as root
```

Any static host — Render, Cloudflare Pages, Surge, Firebase Hosting — all work identically.

---

## Connecting to the MERN Backend

Replace the `href="#"` placeholders in the CTA buttons and navbar with your actual app URLs:

```html
<!-- Navbar -->
<a href="https://app.skillswap.io/login" class="btn-ghost">Sign In</a>
<a href="https://app.skillswap.io/register" class="btn-primary">Get Started →</a>

<!-- Hero CTA -->
<a href="https://app.skillswap.io/register" class="btn-primary">Get Started Free</a>

<!-- Final CTA -->
<a href="https://app.skillswap.io/register" class="btn-primary">Start Learning Free</a>
```

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 80+ | ✅ Full |
| Firefox 75+ | ✅ Full |
| Safari 13.1+ | ✅ Full |
| Edge 80+ | ✅ Full |
| IE 11 | ❌ Not supported |

Uses: CSS custom properties, `backdrop-filter`, `IntersectionObserver`, CSS Grid, `clamp()`.

---

## License

MIT — free to use, modify, and deploy for personal or commercial projects.

---

## Related

- [SkillSwap App Repo](https://github.com/yourusername/skillswap) — MERN backend + React frontend
- [Live Demo](https://skillswap.netlify.app) — Deployed on Netlify
