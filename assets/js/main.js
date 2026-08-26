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
    var pauseBtn = hero.querySelector("[data-hero-pause]");
    var pauseLabel = hero.querySelector("[data-hero-pause-label]");
    var current = 0;
    var timer = null;
    var userPaused = false;
    var hovering = false;

    function show(index) {
      slides[current].hidden = true;
      slides[current].classList.remove("is-active");
      if (dots[current]) { dots[current].classList.remove("is-active"); dots[current].setAttribute("aria-current", "false"); }
      current = (index + slides.length) % slides.length;
      slides[current].hidden = false;
      slides[current].classList.add("is-active");
      if (dots[current]) { dots[current].classList.add("is-active"); dots[current].setAttribute("aria-current", "true"); }
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
      timer = null;
      if (!reduceMotion && !userPaused && !hovering && slides.length > 1) timer = setInterval(next, 7000);
    }

    if (pauseBtn) {
      pauseBtn.addEventListener("click", function () {
        userPaused = !userPaused;
        pauseBtn.setAttribute("aria-pressed", String(userPaused));
        if (pauseLabel) pauseLabel.textContent = userPaused ? "Resume story rotation" : "Pause story rotation";
        restart();
      });
      hero.addEventListener("mouseenter", function () { hovering = true; restart(); });
      hero.addEventListener("mouseleave", function () { hovering = false; restart(); });
      hero.addEventListener("focusin", function () { hovering = true; restart(); });
      hero.addEventListener("focusout", function () { hovering = false; restart(); });
    }

    restart();
  }

  // Copy link button on article pages
  var copyBtn = document.querySelector("[data-copy-link]");
  if (copyBtn) {
    var copyFeedback = document.querySelector("[data-copy-feedback]");
    var feedbackTimer = null;
    // Only ever reports what actually happened: clipboard access needs a secure
    // context, so the failure path has to say so rather than claim success.
    function showCopyFeedback(message) {
      if (!copyFeedback) return;
      copyFeedback.textContent = message;
      copyFeedback.hidden = false;
      if (feedbackTimer) clearTimeout(feedbackTimer);
      feedbackTimer = setTimeout(function () { copyFeedback.hidden = true; }, 2000);
    }
    copyBtn.addEventListener("click", function () {
      var failed = function () { showCopyFeedback("Copy the address bar instead"); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href).then(function () {
          showCopyFeedback("Link copied");
        }, failed);
      } else {
        failed();
      }
    });
  }

  // Contact form: real validation, but no backend exists yet, so we say so instead of faking success
  var contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = contactForm.querySelector("[data-contact-success]");
      if (success) success.hidden = false;
      contactForm.reset();
    });
  }

  // Newsletter form: same story — validate for real, but don't fake a subscription
  var newsletterForm = document.querySelector("[data-newsletter-form]");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = document.querySelector("[data-newsletter-success]");
      if (success) success.hidden = false;
      newsletterForm.reset();
    });
  }

  // ---------- Special report: reading progress ----------
  var gateReport = document.querySelector("[data-gate-report]");
  var progressFill = document.querySelector("[data-gate-progress]");
  if (gateReport && progressFill) {
    var updateProgress = function () {
      var rect = gateReport.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      progressFill.style.transform = "scaleX(" + (scrolled / Math.max(total, 1)) + ")";
    };
    var progressTick = null;
    var onProgressScroll = function () {
      if (progressTick) return;
      progressTick = window.requestAnimationFrame(function () { progressTick = null; updateProgress(); });
    };
    window.addEventListener("scroll", onProgressScroll, { passive: true });
    window.addEventListener("resize", onProgressScroll);
    updateProgress();
  }

  // ---------- Special report: scroll reveals + confidence meters ----------
  // Reveals fail open. Without JS the <noscript> override in head.html shows
  // everything, and with JS the scroll pass, the print hook and the fallback
  // below cover deep links, find-in-page and stitched captures.
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  var meterFills = Array.prototype.slice.call(document.querySelectorAll("[data-meter-fill]"));

  function reveal(el) {
    el.classList.add("is-visible");
    Array.prototype.forEach.call(el.querySelectorAll("[data-meter-fill]"), function (fill) {
      fill.style.transform = "scaleX(" + (parseFloat(fill.getAttribute("data-value") || "0") / 100) + ")";
    });
  }
  function revealIntersecting() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    revealEls.forEach(function (el) {
      if (el.classList.contains("is-visible")) return;
      var rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.92 && rect.bottom > 0) reveal(el);
    });
  }

  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { reveal(entry.target); io.unobserve(entry.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px 8% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
    var revealTick = null;
    var onRevealScroll = function () {
      if (revealTick) return;
      revealTick = window.requestAnimationFrame(function () { revealTick = null; revealIntersecting(); });
    };
    window.addEventListener("scroll", onRevealScroll, { passive: true });
    window.addEventListener("resize", onRevealScroll);
    window.addEventListener("beforeprint", function () { revealEls.forEach(reveal); });
    revealIntersecting();
    // Last-resort pass for anything the observer never fired on. Long enough
    // that a reader scrolling normally still meets each section unrevealed.
    setTimeout(revealIntersecting, 2500);
  }
  if (meterFills.length && !revealEls.length) {
    meterFills.forEach(function (fill) {
      fill.style.transform = "scaleX(" + (parseFloat(fill.getAttribute("data-value") || "0") / 100) + ")";
    });
  }

  // ---------- Special report: memo declassification ----------
  var memoDoc = document.querySelector(".gate-doc");
  if (memoDoc) {
    var redactions = Array.prototype.slice.call(memoDoc.querySelectorAll("[data-declassify]"));
    var declassAll = memoDoc.querySelector("[data-declassify-all]");
    var declassNote = memoDoc.querySelector("[data-declassify-note]");
    var setRedaction = function (btn, open) {
      btn.setAttribute("aria-pressed", String(open));
    };
    var anyOpen = function () {
      return redactions.some(function (btn) { return btn.getAttribute("aria-pressed") === "true"; });
    };
    redactions.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-pressed") !== "true";
        setRedaction(btn, open);
        if (anyOpen()) memoDoc.classList.add("is-declassified");
        else memoDoc.classList.remove("is-declassified");
        syncAll();
      });
    });
    function syncAll() {
      if (!declassAll) return;
      var open = anyOpen();
      declassAll.setAttribute("aria-pressed", String(open));
      declassAll.textContent = open ? "Re-classify" : "Request Declassification";
      if (declassNote) declassNote.hidden = !open;
    }
    if (declassAll) {
      declassAll.addEventListener("click", function () {
        var target = !anyOpen();
        redactions.forEach(function (btn) { setRedaction(btn, target); });
        memoDoc.classList.toggle("is-declassified", target);
        syncAll();
      });
    }
  }

  // ---------- Polls: Moo Meter + Gate Files verdict ----------
  // Shared logic: one vote per browser (localStorage), deterministic results
  // seeded from option weights. Results are not scientific. Neither are cows.
  function setupPoll(root, storageKey, votedText) {
    if (!root) return;
    var choices = Array.prototype.slice.call(root.querySelectorAll("[data-vote-choice], [data-verdict-choice]"));
    if (!choices.length) return;

    var weights = choices.map(function (c) { return parseFloat(c.getAttribute("data-weight") || "1"); });
    var totalWeight = weights.reduce(function (a, b) { return a + b; }, 0);

    // Votes are keyed by option label rather than position, so reordering the
    // options in YAML cannot silently reassign a stored vote to a new answer.
    function labelOf(choice) { return choice.querySelector(".moo__label, .gate-poll__alias"); }
    function keyOf(choice, i) {
      var label = labelOf(choice);
      return label ? label.textContent.trim() : String(i);
    }

    function renderResults(votedKey) {
      choices.forEach(function (choice, i) {
        var pct = Math.round((weights[i] / totalWeight) * 1000) / 10;
        var pctEl = choice.querySelector("[data-moo-pct], [data-verdict-pct]");
        choice.disabled = true;
        if (pctEl) {
          pctEl.hidden = false;
          pctEl.textContent = pct.toFixed(pct % 1 ? 1 : 0) + "%";
        }
        choice.style.setProperty("--pct", pct + "%");
        var isVote = keyOf(choice, i) === votedKey;
        choice.setAttribute("aria-pressed", String(isVote));
        if (isVote) {
          choice.classList.add("is-voted");
          var label = labelOf(choice);
          if (label && votedText) label.insertAdjacentHTML("beforeend", ' <span class="poll-voted-mark">' + votedText + "</span>");
        }
      });
      var foot = root.querySelector("[data-moo-foot], [data-verdict-foot]");
      if (foot) foot.hidden = false;
    }

    var saved = null;
    try { saved = localStorage.getItem(storageKey); } catch (e) {}
    if (saved !== null && choices.some(function (c, i) { return keyOf(c, i) === saved; })) {
      renderResults(saved);
      return;
    }

    choices.forEach(function (choice, i) {
      choice.setAttribute("aria-pressed", "false");
      choice.addEventListener("click", function () {
        var key = keyOf(choice, i);
        try { localStorage.setItem(storageKey, key); } catch (e) {}
        renderResults(key);
      });
    });
  }

  var mooRoot = document.querySelector("[data-moo-meter]");
  if (mooRoot) setupPoll(mooRoot, "moometer-" + mooRoot.getAttribute("data-question-id"), "YOUR VOTE");
  var verdictRoot = document.querySelector("[data-gate-verdict]");
  if (verdictRoot) setupPoll(verdictRoot, verdictRoot.getAttribute("data-storage-key"), "YOUR VOTE");

  // ---------- Easter egg: urgent news override ----------
  // ↑ ↑ ↓ ↓ ← → ← → B A — because serious newsrooms have cheat codes too.
  (function () {
    var overlay = document.querySelector("[data-breaking-overlay]");
    if (!overlay) return;
    var closeBtn = overlay.querySelector("[data-breaking-close]");
    var sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    var position = 0;
    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      overlay.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    }
    function close() {
      overlay.setAttribute("hidden", "");
      document.body.style.overflow = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
      else if (closeBtn) closeBtn.blur();
      lastFocused = null;
    }

    document.addEventListener("keydown", function (e) {
      if (!overlay.hasAttribute("hidden")) {
        if (e.key === "Escape") close();
        // aria-modal hides the page from assistive tech but does not stop Tab,
        // so keep focus on the one control the dialog has.
        if (e.key === "Tab" && closeBtn) { e.preventDefault(); closeBtn.focus(); }
        return;
      }
      // Arrow keys inside a field belong to the field, not to the cheat code.
      var t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) { position = 0; return; }
      var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      position = key === sequence[position] ? position + 1 : (key === sequence[0] ? 1 : 0);
      if (position === sequence.length) {
        position = 0;
        open();
      }
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
  })();
})();
