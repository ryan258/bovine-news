(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile nav toggle
  var navToggle = document.querySelector("[data-nav-toggle]");
  var mobileNav = document.querySelector("[data-mobile-nav]");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      if (open) {
        mobileNav.setAttribute("hidden", "");
        mobileNav.removeAttribute("data-open");
      } else {
        mobileNav.removeAttribute("hidden");
        mobileNav.setAttribute("data-open", "");
      }
    });
  }

  // Breaking ticker: pause on hover/focus, always respect reduced motion (handled in CSS too)
  var ticker = document.querySelector("[data-ticker]");
  if (ticker) {
    ["mouseenter", "focusin"].forEach(function (evt) {
      ticker.addEventListener(evt, function () { ticker.setAttribute("data-paused", ""); });
    });
    ["mouseleave", "focusout"].forEach(function (evt) {
      ticker.addEventListener(evt, function () { ticker.removeAttribute("data-paused"); });
    });
  }

  // Hero carousel
  var hero = document.querySelector("[data-hero]");
  if (hero) {
    var slides = Array.prototype.slice.call(hero.querySelectorAll("[data-hero-slide]"));
    var dots = Array.prototype.slice.call(hero.querySelectorAll("[data-hero-dot]"));
    var current = 0;
    var timer = null;

    function show(index) {
      slides[current].hidden = true;
      slides[current].classList.remove("is-active");
      if (dots[current]) dots[current].classList.remove("is-active");
      current = (index + slides.length) % slides.length;
      slides[current].hidden = false;
      slides[current].classList.add("is-active");
      if (dots[current]) dots[current].classList.add("is-active");
    }

    function next() { show(current + 1); }
    function prev() { show(current - 1); }

    var nextBtn = hero.querySelector("[data-hero-next]");
    var prevBtn = hero.querySelector("[data-hero-prev]");
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { show(i); restart(); });
    });

    function restart() {
      if (timer) clearInterval(timer);
      if (!reduceMotion && slides.length > 1) timer = setInterval(next, 7000);
    }
    restart();
  }

  // Copy link button on article pages
  var copyBtn = document.querySelector("[data-copy-link]");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      navigator.clipboard && navigator.clipboard.writeText(window.location.href);
    });
  }

  // Contact form mock submit
  var contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = contactForm.querySelector("[data-contact-success]");
      if (success) success.hidden = false;
      contactForm.reset();
    });
  }
})();
