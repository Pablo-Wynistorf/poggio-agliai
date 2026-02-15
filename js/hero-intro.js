/* Cinematic hero intro sequence */
(function () {
  "use strict";

  // Respect reduced motion
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    document.querySelectorAll(
      ".hero-img-intro, .hero-overlay-intro, .hero-text-intro, .hero-nav-intro, .hero-scroll-intro"
    ).forEach(function (el) { el.classList.add("intro-done"); });
  }

  function runIntro() {
    // Step 1: Image zoom-out + overlay lift (immediate)
    var img = document.querySelector(".hero-img-intro");
    var overlay = document.querySelector(".hero-overlay-intro");
    if (img) img.classList.add("intro-done");
    if (overlay) overlay.classList.add("intro-done");

    // Step 2: Text elements cascade in
    var texts = document.querySelectorAll(".hero-text-intro");
    texts.forEach(function (el, i) {
      setTimeout(function () { el.classList.add("intro-done"); }, 600 + i * 250);
    });

    // Step 3: Nav drops in
    document.querySelectorAll(".hero-nav-intro").forEach(function (nav) {
      setTimeout(function () { nav.classList.add("intro-done"); }, 1200);
    });

    // Step 4: Scroll indicator fades in last
    var scroll = document.querySelector(".hero-scroll-intro");
    if (scroll) {
      setTimeout(function () { scroll.classList.add("intro-done"); }, 1800);
    }
  }

  // Mobile nav toggle
  function initMobileNav() {
    var toggle = document.getElementById("mobile-nav-toggle");
    var menu = document.getElementById("mobile-nav-menu");
    var openIcon = document.getElementById("mobile-nav-open-icon");
    var closeIcon = document.getElementById("mobile-nav-close-icon");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var isOpen = !menu.classList.contains("hidden");
      menu.classList.toggle("hidden", isOpen);
      menu.classList.toggle("flex", !isOpen);
      openIcon.classList.toggle("hidden", !isOpen);
      closeIcon.classList.toggle("hidden", isOpen);
    });

    // Close menu when a link is tapped
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.add("hidden");
        menu.classList.remove("flex");
        openIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      });
    });
  }

  function boot() {
    initMobileNav();
    if (!reducedMotion) requestAnimationFrame(runIntro);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
