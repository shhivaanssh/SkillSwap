/* ═══════════════════════════════════════════════════════════
   SKILLSWAP — script.js  (Complete — All Features)

   ORIGINAL MODULES
   1.  initTheme()          Dark/light toggle + localStorage + OS sync
   2.  initNavbar()         Scroll glass blur + hide-on-scroll
   3.  initMobileMenu()     Hamburger open/close + body-scroll lock
   4.  initScrollReveal()   IntersectionObserver stagger fade-in
   5.  initFilterTabs()     Skill card category filtering
   6.  initFAQ()            Single-open accordion
   7.  initSmoothScroll()   Anchor scroll with navbar offset
   8.  initFooterYear()     Auto copyright year

   NEW FEATURES
   9.  initScrollProgress() Coral progress bar across top
   10. initCountUp()        Animated stat counters in trust bar
   11. initLiveSearch()     Real-time search across skill cards
   12. initBookingModal()   Booking form popup from every card CTA
   13. initToastSystem()    Global showToast() notification helper
   14. initBackToTop()      Floating button after 400px scroll
═══════════════════════════════════════════════════════════ */

'use strict';

/* ── Bootstrap all modules on DOM ready ──────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  /* Original */
  initTheme();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initFilterTabs();
  initFAQ();
  initSmoothScroll();
  initFooterYear();

  /* New features */
  initScrollProgress();
  initCountUp();
  initLiveSearch();
  initBookingModal();
  initToastSystem();
  initBackToTop();
});


/* ═══════════════════════════════════════════════════════════
   1. DARK / LIGHT MODE
   - Checks localStorage first, then OS preference, then light
   - Persists choice; responds to OS changes if no manual pick
═══════════════════════════════════════════════════════════ */
function initTheme() {
  const html        = document.documentElement;
  const toggleBtn   = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'skillswap-theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    if (toggleBtn) {
      toggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
      toggleBtn.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
    }
  }

  applyTheme(getPreferredTheme());

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
      toggleBtn.classList.add('theme-ripple');
      setTimeout(() => toggleBtn.classList.remove('theme-ripple'), 300);
    });
  }

  /* Track OS changes only when no manual preference is saved */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}


/* ═══════════════════════════════════════════════════════════
   2. NAVBAR — scroll behaviour
   - Adds .scrolled after 24px (glass shadow)
   - Hides on quick downscroll; reveals on upscroll
═══════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = 0;
  let ticking     = false;

  function updateNavbar() {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 24);

    if (scrollY > 100) {
      if (scrollY > lastScrollY + 8)  navbar.classList.add('nav-hidden');
      else if (scrollY < lastScrollY - 4) navbar.classList.remove('nav-hidden');
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
   - Toggles .open on menu + hamburger icon animation
   - Locks body scroll while open
   - Closes on outside click or window resize > 768px
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
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu(!isOpen));

  mobileMenu.querySelectorAll('.mob-link, .btn-nav-cta').forEach(el => {
    el.addEventListener('click', () => toggleMenu(false));
  });

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
   4. SCROLL REVEAL
   - IntersectionObserver watches .reveal / .reveal-left / .reveal-right
   - Adds .visible to trigger CSS transition
   - Unobserves after firing (one-shot)
═══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}


/* ═══════════════════════════════════════════════════════════
   5. SKILL CARD FILTER TABS
   - data-filter on button matches data-category on card
   - "all" shows every card regardless of category
   - Adds .filtered-out (CSS handles opacity + scale)
═══════════════════════════════════════════════════════════ */
function initFilterTabs() {
  const tabs  = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.skill-card');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('filtered-out', !show);
      });
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   6. FAQ ACCORDION
   - One item open at a time
   - CSS max-height transition driven by scrollHeight
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

      /* Close all */
      faqItems.forEach(i => {
        i.dataset.open = 'false';
        const a = i.querySelector('.faq-a');
        if (a) a.style.maxHeight = '0px';
      });

      /* Open clicked (if it was closed) */
      if (!isOpen) {
        item.dataset.open     = 'true';
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   7. SMOOTH SCROLL FOR ANCHOR LINKS
   - Compensates for fixed navbar height
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
   9. SCROLL PROGRESS BAR  [NEW]
   - Thin coral gradient bar fixed to top of viewport
   - Width tracks scroll percentage of page
═══════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct       = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}


/* ═══════════════════════════════════════════════════════════
   10. ANIMATED COUNT-UP  [NEW]
   - Watches .ts-number elements in the trust bar
   - Counts from 0 to target with ease-out cubic when scrolled in
   - Skips non-numeric values like "Free"
═══════════════════════════════════════════════════════════ */
function initCountUp() {
  /* Map display text → numeric target + suffix */
  const statsMap = {
    '1,200+': { target: 1200, suffix: '+' },
    '340+'  : { target: 340,  suffix: '+' },
    '800+'  : { target: 800,  suffix: '+' },
    '98%'   : { target: 98,   suffix: '%' },
  };

  const statEls = document.querySelectorAll('.ts-number');
  if (!statEls.length) return;

  /* Annotate numeric elements */
  statEls.forEach(el => {
    const original = el.textContent.trim();
    const config   = statsMap[original];
    if (!config) return;
    el.dataset.target   = config.target;
    el.dataset.suffix   = config.suffix;
    el.dataset.original = original;
    el.textContent      = '0' + config.suffix;
  });

  /* Trigger count when visible */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        if (isNaN(target)) return;
        animateCountUp(el, 0, target, 1600, suffix);
        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  statEls.forEach(el => { if (el.dataset.target) observer.observe(el); });
}

/**
 * Ease-out cubic counter animation
 * @param {HTMLElement} el
 * @param {number}      from
 * @param {number}      to
 * @param {number}      duration  ms
 * @param {string}      suffix
 */
function animateCountUp(el, from, to, duration, suffix) {
  const startTime = performance.now();

  function step(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
    const current  = Math.round(from + (to - from) * eased);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}


/* ═══════════════════════════════════════════════════════════
   11. LIVE SKILL SEARCH  [NEW]
   - Filters .skill-card elements as user types
   - Highlights matched text in name, bio, and tags
   - Shows "no results" message when nothing matches
   - Clears highlights when tab filter is clicked
   - Debounced at 180ms
═══════════════════════════════════════════════════════════ */
function initLiveSearch() {
  const input      = document.getElementById('skill-search');
  const clearBtn   = document.getElementById('search-clear');
  const noResults  = document.getElementById('search-no-results');
  const searchSpan = document.getElementById('search-term');
  const cards      = document.querySelectorAll('.skill-card');
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (!input || !cards.length) return;

  /* Build searchable text string from a card */
  function getSearchText(card) {
    const name = card.querySelector('.skc-name')?.textContent || '';
    const uni  = card.querySelector('.skc-uni')?.textContent  || '';
    const bio  = card.querySelector('.skc-bio')?.textContent  || '';
    const tags = Array.from(card.querySelectorAll('.skc-tag'))
                      .map(t => t.textContent).join(' ');
    return `${name} ${uni} ${bio} ${tags}`.toLowerCase();
  }

  /* Wrap first match in a <mark> element */
  function highlightMatch(card, query) {
    ['.skc-name', '.skc-bio'].forEach(sel => {
      const el = card.querySelector(sel);
      if (!el) return;
      const text  = el.textContent;
      const lower = text.toLowerCase();
      const idx   = lower.indexOf(query);
      if (idx === -1) { el.innerHTML = text; return; }
      const before = escapeHtml(text.slice(0, idx));
      const match  = escapeHtml(text.slice(idx, idx + query.length));
      const after  = escapeHtml(text.slice(idx + query.length));
      el.innerHTML = `${before}<mark class="search-highlight">${match}</mark>${after}`;
    });
  }

  /* Restore original text content (strip marks) */
  function clearHighlights(card) {
    ['.skc-name', '.skc-bio'].forEach(sel => {
      const el = card.querySelector(sel);
      if (el) el.textContent = el.textContent; /* removes innerHTML marks */
    });
  }

  /* Escape special HTML chars before inserting into innerHTML */
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function runSearch(query) {
    const q = query.trim().toLowerCase();
    clearBtn.classList.toggle('visible', q.length > 0);

    let visible = 0;
    const activeFilter = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';

    cards.forEach(card => {
      if (q === '') {
        /* Respect active category tab when search is empty */
        const show = activeFilter === 'all' || card.dataset.category === activeFilter;
        card.classList.toggle('filtered-out', !show);
        clearHighlights(card);
        if (show) visible++;
      } else {
        const match = getSearchText(card).includes(q);
        card.classList.toggle('filtered-out', !match);
        if (match) {
          highlightMatch(card, q);
          visible++;
        } else {
          clearHighlights(card);
        }
      }
    });

    /* No results message */
    if (noResults && searchSpan) {
      if (q && visible === 0) {
        searchSpan.textContent = query;
        noResults.classList.add('visible');
      } else {
        noResults.classList.remove('visible');
      }
    }
  }

  /* Debounce helper */
  function debounce(fn, ms) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  }

  input.addEventListener('input', debounce(e => runSearch(e.target.value), 180));

  clearBtn.addEventListener('click', () => {
    input.value = '';
    runSearch('');
    input.focus();
  });

  /* When a filter tab is clicked, clear any active search */
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (input.value) {
        input.value = '';
        clearBtn.classList.remove('visible');
        noResults?.classList.remove('visible');
        cards.forEach(c => clearHighlights(c));
      }
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   12. BOOKING MODAL  [NEW]
   - Opens when any .skc-cta or .pcm-book-btn is clicked
   - Populates header from the clicked card's data
   - Validates name, email, skill fields before submit
   - Simulates async send, then fires success toast
   - Closes on X button, overlay click, or Escape key
═══════════════════════════════════════════════════════════ */
function initBookingModal() {
  const overlay  = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  const form     = document.getElementById('booking-form');
  if (!overlay) return;

  /* ── Open ─────────────────────────────────────── */
  function openModal(triggerEl) {
    const card    = triggerEl?.closest('.skill-card, .pcm-body');
    const name    = card?.querySelector('.skc-name, .pcm-name')?.textContent?.trim() || 'a Peer';
    const tags    = Array.from(card?.querySelectorAll('.skc-tag, .pcm-pills span') || [])
                        .map(t => t.textContent.trim()).join(' · ') || '';
    const letter  = name[0]?.toUpperCase() || 'P';

    const elTitle    = document.getElementById('modal-title');
    const elSubtitle = document.getElementById('modal-subtitle');
    const elAvatar   = document.getElementById('modal-avatar');

    if (elTitle)    elTitle.textContent    = `Book a Swap with ${name.split(' ')[0]}`;
    if (elSubtitle) elSubtitle.textContent = tags || 'Peer · SkillSwap';
    if (elAvatar)   elAvatar.textContent   = letter;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    setTimeout(() => overlay.querySelector('.form-input')?.focus(), 220);
  }

  /* ── Close ────────────────────────────────────── */
  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* Attach to all card CTAs */
  document.querySelectorAll('.skc-cta, .pcm-book-btn').forEach(btn => {
    btn.addEventListener('click', e => { e.preventDefault(); openModal(btn); });
  });

  closeBtn?.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  /* ── Form validation + submit ─────────────────── */
  form?.addEventListener('submit', e => {
    e.preventDefault();

    const nameField  = form.querySelector('#your-name');
    const emailField = form.querySelector('#your-email');
    const skillField = form.querySelector('#your-skill');
    let valid = true;

    [nameField, emailField, skillField].forEach(field => {
      if (!field) return;
      field.classList.remove('error');
      if (!field.value.trim()) { field.classList.add('error'); valid = false; }
    });

    if (emailField?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.classList.add('error');
      valid = false;
    }

    if (!valid) {
      showToast('error', 'Missing fields', 'Please fill in all required fields correctly.');
      return;
    }

    /* Simulate network request */
    const submitBtn          = form.querySelector('.btn-modal-submit');
    const originalContent    = submitBtn.innerHTML;
    submitBtn.innerHTML      = 'Sending…';
    submitBtn.disabled       = true;

    setTimeout(() => {
      closeModal();
      form.reset();
      submitBtn.innerHTML  = originalContent;
      submitBtn.disabled   = false;
      showToast('success', 'Swap Request Sent! 🎉', "You'll hear back within 24 hours.");
    }, 1300);
  });

  /* Clear error styling on input */
  form?.querySelectorAll('.form-input').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
}


/* ═══════════════════════════════════════════════════════════
   13. TOAST NOTIFICATION SYSTEM  [NEW]
   - Exposes window.showToast(type, title, message, duration)
   - Types: 'success' | 'error' | 'info'
   - Auto-dismisses after duration ms (default 4500)
   - Pauses timer on hover
   - Animated slide-in / slide-out
═══════════════════════════════════════════════════════════ */
function initToastSystem() {
  window.showToast = showToast;
}

function showToast(type = 'info', title = '', message = '', duration = 4500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '✅', error: '❌', info: '💡' };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || '💬'}</span>
    <div class="toast-content">
      <p class="toast-title">${title}</p>
      ${message ? `<p class="toast-message">${message}</p>` : ''}
    </div>
    <button class="toast-close" aria-label="Dismiss">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
           stroke-linecap="round" width="14" height="14">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>`;

  container.appendChild(toast);

  let autoTimer = setTimeout(() => removeToast(toast), duration);

  toast.querySelector('.toast-close').addEventListener('click', () => {
    clearTimeout(autoTimer);
    removeToast(toast);
  });

  /* Pause on hover */
  toast.addEventListener('mouseenter', () => clearTimeout(autoTimer));
  toast.addEventListener('mouseleave', () => {
    autoTimer = setTimeout(() => removeToast(toast), 1800);
  });
}

function removeToast(toast) {
  if (!toast || toast.classList.contains('removing')) return;
  toast.classList.add('removing');
  toast.addEventListener('animationend', () => toast.remove(), { once: true });
}


/* ═══════════════════════════════════════════════════════════
   14. BACK TO TOP BUTTON  [NEW]
   - Appears after 400px of scroll
   - Smoothly scrolls to top on click
   - Turns accent color on hover (via CSS)
═══════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}