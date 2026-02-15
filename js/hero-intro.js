/* Cinematic hero intro sequence */
(function () {
  "use strict";

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(
      ".hero-img-intro, .hero-overlay-intro, .hero-text-intro, .hero-nav-intro, .hero-scroll-intro"
    ).forEach(function (el) { el.classList.add("intro-done"); });
    return;
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
    var nav = document.querySelector(".hero-nav-intro");
    if (nav) {
      setTimeout(function () { nav.classList.add("intro-done"); }, 1200);
    }

    // Step 4: Scroll indicator fades in last
    var scroll = document.querySelector(".hero-scroll-intro");
    if (scroll) {
      setTimeout(function () { scroll.classList.add("intro-done"); }, 1800);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      requestAnimationFrame(runIntro);
    });
  } else {
    requestAnimationFrame(runIntro);
  }
})();
