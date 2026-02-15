/* Scroll-triggered reveal animations using IntersectionObserver */
(function () {
  "use strict";

  // Add data-scroll to nearby cards and gallery items dynamically
  function tagRepeatedElements() {
    // Nearby cards — stagger them
    document.querySelectorAll("#nearby .grid > div").forEach(function (card, i) {
      if (!card.hasAttribute("data-scroll")) {
        card.setAttribute("data-scroll", "up");
        card.setAttribute("data-scroll-delay", String((i % 3) * 100));
      }
    });
  }

  function applyDelays() {
    document.querySelectorAll("[data-scroll-delay]").forEach(function (el) {
      var delay = el.getAttribute("data-scroll-delay");
      el.style.transitionDelay = delay + "ms";
    });
  }

  function initObserver() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-scroll]").forEach(function (el) {
      observer.observe(el);
    });
  }

  // Also animate gallery sections once they're rendered (they load async)
  var galleryWrapper = document.getElementById("gallery-wrapper");
  if (galleryWrapper) {
    var mo = new MutationObserver(function () {
      galleryWrapper.querySelectorAll("section").forEach(function (sec) {
        if (!sec.hasAttribute("data-scroll")) {
          sec.setAttribute("data-scroll", "up");
        }
      });
      applyDelays();
      initObserver();
    });
    mo.observe(galleryWrapper, { childList: true });
  }

  // Respect prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("[data-scroll]").forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      tagRepeatedElements();
      applyDelays();
      initObserver();
    });
  } else {
    tagRepeatedElements();
    applyDelays();
    initObserver();
  }
})();
