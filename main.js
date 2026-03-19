/* ═══════════════════════════════════════════════════
   AETHER — Main JavaScript
   Video background + UI interactions
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ────────────────────────
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── Mobile menu toggle ──────────────────────────
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ── Nav link active state ───────────────────────
  const navLinkElements = document.querySelectorAll('.nav-link');
  // Just set active based on current window location
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinkElements.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ── YouTube background — ensure it keeps playing ─
  // The iframe is set to autoplay+mute+loop in the URL params.
  // This uses the YT IFrame API to restart if needed.
  const ytIframe = document.getElementById('yt-bg');
  if (ytIframe) {
    // Prevent any click interaction from reaching the iframe
    ytIframe.style.pointerEvents = 'none';
  }

  // ── Cycle Landing Phrases ─────────────────────────
  const phrases = [
    "Aether f*cks iboss",
    "An RHMS original",
    "Where's Mr. Rivera?",
    "Made by a monkey",
    "Unblock your true potential",
    "Bypassing firewalls with style"
  ];
  let currentPhraseIndex = 0;
  const heroSub = document.getElementById('hero-sub');
  
  if (heroSub && heroSub.classList.contains('landing-phrases')) {
    setInterval(() => {
      heroSub.style.opacity = '0';
      setTimeout(() => {
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        heroSub.textContent = phrases[currentPhraseIndex];
        heroSub.style.opacity = '1';
      }, 500); // Wait for transition fade out
    }, 5000);
  }

});
