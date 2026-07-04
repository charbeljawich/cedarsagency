/* ============================================================
   Cedars Agency — site behavior
   No external script dependencies (keeps the CSP script-src
   locked to 'self' — no third-party JS ever runs on this page).
================================================================ */

(function () {
  "use strict";

  // ----------------------------------------------------------
  // CONFIG — your WhatsApp number, digits only, no + or spaces
  // ----------------------------------------------------------
  const WHATSAPP_NUMBER = "96170332115"; // +961 70 332 115

  function buildWhatsAppLink(message) {
    const text = encodeURIComponent(message || "Hi Cedars Agency, I'd like to talk about a project.");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }

  function initWhatsAppLinks() {
    const navBtn = document.getElementById("nav-whatsapp");
    const mobileBtn = document.getElementById("mobile-whatsapp");
    const contactBtn = document.getElementById("contact-whatsapp");

    if (navBtn) navBtn.href = buildWhatsAppLink("Hi Cedars Agency, I'd like to start a project.");
    if (mobileBtn) mobileBtn.href = buildWhatsAppLink("Hi Cedars Agency, I'd like to start a project.");
    if (contactBtn) contactBtn.href = buildWhatsAppLink("Hi Cedars Agency, I'd like to talk about a project.");

    document.querySelectorAll(".whatsapp-link").forEach((el) => {
      const msg = el.getAttribute("data-msg");
      el.href = buildWhatsAppLink(msg);
    });
  }

  // ----------------------------------------------------------
  // Mobile menu toggle
  // ----------------------------------------------------------
  function initMobileMenu() {
    const btn = document.getElementById("menuBtn");
    const menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ----------------------------------------------------------
  // Scroll-reveal animation
  // Elements with class "reveal" fade + rise into place the
  // first time they enter the viewport. Respects users who
  // prefer reduced motion (see the CSS media query too).
  // ----------------------------------------------------------
  function initScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  // ----------------------------------------------------------
  // 3D tilt effect on cards (pricing tiers + client cards)
  // Pure CSS transform driven by mouse position, no library.
  // Skipped entirely on touch devices, where it has no meaning.
  // ----------------------------------------------------------
  function initTilt() {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cards = document.querySelectorAll(".tilt");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;
        const rotateY = ((x - midX) / midX) * 6;
        const rotateX = ((midY - y) / midY) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // ----------------------------------------------------------
  // Form submission (Contact + Feedback)
  //
  // SECURITY NOTES:
  // - Forms POST directly to Formspree over HTTPS; this page never
  //   sees or stores the submitted data itself.
  // - The honeypot field ("_gotcha") is left empty by real users but
  //   often auto-filled by simple bots. If it's filled, we silently
  //   drop the submission instead of sending it.
  // - required/maxlength attributes are a UX convenience only —
  //   Formspree performs the real server-side validation and spam
  //   filtering. Never assume client-side checks are sufficient.
  // ----------------------------------------------------------
  function initForm(formId, statusId) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const honeypot = form.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value.trim() !== "") {
        if (status) {
          status.textContent = "Thanks — we'll be in touch.";
          status.className = "form-status success";
        }
        form.reset();
        return;
      }

      const actionUrl = form.getAttribute("action");
      if (!actionUrl || actionUrl.includes("REPLACE_WITH_YOUR")) {
        if (status) {
          status.textContent = "Form isn't connected yet — see README.md to set up Formspree.";
          status.className = "form-status error";
        }
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      if (status) {
        status.textContent = "Sending...";
        status.className = "form-status";
      }

      try {
        const response = await fetch(actionUrl, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });

        if (response.ok) {
          if (status) {
            status.textContent = "Thanks — message sent. We'll reply soon.";
            status.className = "form-status success";
          }
          form.reset();
        } else {
          if (status) {
            status.textContent = "Something went wrong. Please try WhatsApp instead.";
            status.className = "form-status error";
          }
        }
      } catch (err) {
        if (status) {
          status.textContent = "Network error. Please try WhatsApp instead.";
          status.className = "form-status error";
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initWhatsAppLinks();
    initMobileMenu();
    initScrollReveal();
    initTilt();
    initForm("contactForm", "formStatus");
    initForm("feedbackForm", "feedbackStatus");
  });
})();
