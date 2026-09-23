/* ==========================================================================
   Wild Roots Hauling and Junk Removal — Site scripts
   Vanilla JS. No dependencies, no external requests.
   ========================================================================== */
(function () {
  "use strict";

  var BUSINESS_EMAIL = "wildrootshauling@gmail.com";

  /* ----------------------------------------------------------------------
     Mobile navigation
     ---------------------------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector(".nav__toggle");
    var menu = document.getElementById("primary-menu");
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    document.addEventListener("click", function (e) {
      if (!menu.classList.contains("is-open")) return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) close();
    });
  }

  /* ----------------------------------------------------------------------
     Sticky header shadow
     ---------------------------------------------------------------------- */
  function initStickyHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function update() {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ----------------------------------------------------------------------
     FAQ accordion
     ---------------------------------------------------------------------- */
  function initFaq() {
    var items = document.querySelectorAll(".faq__item");
    Array.prototype.forEach.call(items, function (item) {
      var btn = item.querySelector(".faq__q");
      var panel = item.querySelector(".faq__a");
      if (!btn || !panel) return;

      btn.addEventListener("click", function () {
        var isOpen = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        panel.hidden = !isOpen;
      });
    });
  }

  /* ----------------------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    // Content is visible by default in CSS. Without IntersectionObserver, or if
    // the visitor prefers reduced motion, we simply leave everything as-is.
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-hidden");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -60px 0px", threshold: 0.08 });

    var fold = window.innerHeight * 0.92;
    var queued = [];

    Array.prototype.forEach.call(els, function (el) {
      // Only animate elements that start below the fold — anything already on
      // screen stays put, so there is no flash of hidden content on load.
      if (el.getBoundingClientRect().top > fold) {
        el.classList.add("is-hidden");
        queued.push(el);
      }
    });

    queued.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });

    // Safety net: if anything is still hidden after a few seconds (observer
    // never fired, layout shifted, etc.), show it rather than lose the content.
    window.setTimeout(function () {
      queued.forEach(function (el) { el.classList.remove("is-hidden"); });
    }, 4000);
  }

  /* ----------------------------------------------------------------------
     Footer year
     ---------------------------------------------------------------------- */
  function initYear() {
    var nodes = document.querySelectorAll("[data-year]");
    var year = String(new Date().getFullYear());
    Array.prototype.forEach.call(nodes, function (n) { n.textContent = year; });
  }

  /* ----------------------------------------------------------------------
     Quote form
     Builds a pre-filled email to the business (no backend, no third-party
     service, no environment variables required).
     ---------------------------------------------------------------------- */
  function initForm() {
    var form = document.getElementById("quote-form");
    if (!form) return;

    var status = document.getElementById("form-status");

    function setError(field, message) {
      var wrap = field.closest(".field");
      var slot = wrap ? wrap.querySelector(".error") : null;
      if (slot) slot.textContent = message || "";
      if (message) {
        field.setAttribute("aria-invalid", "true");
      } else {
        field.removeAttribute("aria-invalid");
      }
    }

    function showStatus(type, message) {
      if (!status) return;
      status.className = "form-status is-visible form-status--" + type;
      status.textContent = message;
    }

    function validEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    }

    function validPhone(value) {
      var digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    }

    function validate() {
      var ok = true;
      var required = form.querySelectorAll("[required]");

      Array.prototype.forEach.call(required, function (field) {
        var value = (field.value || "").trim();
        if (!value) {
          setError(field, "This field is required.");
          ok = false;
          return;
        }
        if (field.type === "email" && !validEmail(value)) {
          setError(field, "Enter a valid email address.");
          ok = false;
          return;
        }
        if (field.type === "tel" && !validPhone(value)) {
          setError(field, "Enter a valid phone number.");
          ok = false;
          return;
        }
        setError(field, "");
      });

      return ok;
    }

    // Clear an error as soon as the visitor fixes the field.
    Array.prototype.forEach.call(form.querySelectorAll("input, select, textarea"), function (field) {
      field.addEventListener("input", function () {
        if (field.getAttribute("aria-invalid") === "true") setError(field, "");
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot — silently ignore obvious bots.
      var trap = form.querySelector('input[name="company_website"]');
      if (trap && trap.value) return;

      if (!validate()) {
        showStatus("err", "Please correct the highlighted fields and try again.");
        var firstBad = form.querySelector('[aria-invalid="true"]');
        if (firstBad) firstBad.focus();
        return;
      }

      var data = new FormData(form);
      function get(name) { return String(data.get(name) || "").trim(); }

      var lines = [
        "New quote request from the Wild Roots Hauling website",
        "",
        "Name: " + get("name"),
        "Phone: " + get("phone"),
        "Email: " + get("email"),
        "Service address / area: " + (get("address") || "Not provided"),
        "Service needed: " + (get("service") || "Not specified"),
        "Estimated load size: " + (get("load") || "Not specified"),
        "Preferred timing: " + (get("timing") || "Not specified"),
        "",
        "Details:",
        get("details") || "No additional details provided."
      ];

      var subject = "Quote request — " + get("name") + " (" + (get("service") || "Junk removal") + ")";
      var mailto =
        "mailto:" + BUSINESS_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));

      showStatus(
        "ok",
        "Thanks, " + get("name").split(" ")[0] + "! Your email app is opening with your request ready to send. " +
        "If nothing opens, email us at " + BUSINESS_EMAIL + " or call +1 (458) 867-8037."
      );

      window.location.href = mailto;
      form.reset();
    });
  }

  /* ----------------------------------------------------------------------
     Prefill the service dropdown from a ?service= link (services page CTAs)
     ---------------------------------------------------------------------- */
  function initPrefill() {
    var select = document.getElementById("service");
    if (!select || !window.location.search) return;

    var params = new URLSearchParams(window.location.search);
    var wanted = params.get("service");
    if (!wanted) return;

    Array.prototype.forEach.call(select.options, function (opt) {
      if (opt.value.toLowerCase() === wanted.toLowerCase()) select.value = opt.value;
    });
  }

  /* ---------------------------------------------------------------------- */
  function init() {
    initNav();
    initStickyHeader();
    initFaq();
    initReveal();
    initYear();
    initForm();
    initPrefill();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
