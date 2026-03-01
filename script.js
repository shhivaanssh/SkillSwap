/* ═══════════════════════════════════════════════════════════
   SKILLSWAP — script.js
   Features:
   · Dark / Light mode toggle (persisted to localStorage)
   · Navbar scroll behaviour
   · Mobile hamburger menu
   · Scroll-reveal (IntersectionObserver)
   · Skill card filter tabs
   · FAQ accordion
   · Smooth anchor scroll
   · Footer year auto-update
═══════════════════════════════════════════════════════════ */

'use strict';

/* ── DOM Ready ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initFilterTabs();
  initFAQ();
  initSmoothScroll();
  initFooterYear();
});


/* ═══════════════════════════════════════════════════════════
   1. DARK / LIGHT MODE
═══════════════════════════════════════════════════════════ */
function initTheme() {
  const html        = document.documentElement;
  const toggleBtn   = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'skillswap-theme';

  /* Determine initial theme:
     1. Check localStorage  2. Check OS preference  3. Default light */
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    // Update toggle button aria-label
    if (toggleBtn) {
      toggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
      toggleBtn.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
    }
  }

  // Apply on load
  applyTheme(getPreferredTheme());

  // Toggle on click
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');

      // Tiny ripple animation
      toggleBtn.classList.add('theme-ripple');
      setTimeout(() => toggleBtn.classList.remove('theme-ripple'), 300);
    });
  }

  // Respond to OS theme change (only if no saved preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}


/* ═══════════════════════════════════════════════════════════
   2. NAVBAR — scroll behaviour
═══════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = 0;
  let ticking     = false;

  function updateNavbar() {
    const scrollY = window.scrollY;

    // Add "scrolled" class after 24px
    navbar.classList.toggle('scrolled', scrollY > 24);

    // Optional: hide navbar on quick downscroll, show on upscroll
    // (comment out if you want it always visible)
    if (scrollY > 100) {
      if (scrollY > lastScrollY + 8) {
        navbar.classList.add('nav-hidden');
      } else if (scrollY < lastScrollY - 4) {
        navbar.classList.remove('nav-hidden');
      }
    } else {
      navbar.classList.remove('nav-hidden');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });
}


/* ═══════════════════════════════════════════════════════════
   3. MOBILE HAMBURGER MENU
═══════════════════════════════════════════════════════════ */
function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  let isOpen = false;

  function toggleMenu(open) {
    isOpen = open;
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    // Prevent body scroll when menu is open
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu(!isOpen));

  // Close on mobile nav link click
  mobileMenu.querySelectorAll('.mob-link, .btn-nav-cta').forEach(el => {
    el.addEventListener('click', () => toggleMenu(false));
  });

  // Close on outside click / resize
  document.addEventListener('click', (e) => {
    if (isOpen && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      toggleMenu(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isOpen) toggleMenu(false);
  });
}


/* ═══════════════════════════════════════════════════════════
   4. SCROLL REVEAL (IntersectionObserver)
═══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const revealSelectors = '.reveal, .reveal-left, .reveal-right';
  const elements = document.querySelectorAll(revealSelectors);
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}


/* ═══════════════════════════════════════════════════════════
   5. SKILL CARD FILTER TABS
═══════════════════════════════════════════════════════════ */
function initFilterTabs() {
  const tabs       = document.querySelectorAll('.filter-tab');
  const cards      = document.querySelectorAll('.skill-card');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;
        const show     = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('filtered-out');
          // Re-trigger reveal if it had been hidden
          card.style.display = '';
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   6. FAQ ACCORDION
═══════════════════════════════════════════════════════════ */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.dataset.open === 'true';

      // Close all first
      faqItems.forEach(i => {
        i.dataset.open     = 'false';
        const a = i.querySelector('.faq-a');
        if (a) a.style.maxHeight = '0px';
      });

      // Toggle clicked
      if (!isOpen) {
        item.dataset.open  = 'true';
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   7. SMOOTH SCROLL FOR ANCHOR LINKS
═══════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.getElementById('navbar')?.offsetHeight || 64;
      const targetY   = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   8. FOOTER YEAR
═══════════════════════════════════════════════════════════ */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}


/* ═══════════════════════════════════════════════════════════
   EXTRA: Add navbar hide CSS if not in stylesheet
═══════════════════════════════════════════════════════════ */
(function injectNavHideStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .navbar {
      transition: transform 0.35s ease, background 0.3s ease,
                  border-color 0.3s ease, box-shadow 0.3s ease,
                  padding 0.3s ease !important;
    }
    .navbar.nav-hidden {
      transform: translateY(-100%);
    }
    .theme-btn.theme-ripple {
      animation: ripple-press 0.3s ease;
    }
    @keyframes ripple-press {
      0%   { transform: scale(1); }
      50%  { transform: scale(0.88); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
})();
