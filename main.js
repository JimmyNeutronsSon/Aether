/* ═══════════════════════════════════════════════════
   AETHER — Main JavaScript
   Video background + UI interactions
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // The navbar was removed in previous versions, so we don't need scroll or active link logic here anymore.

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
