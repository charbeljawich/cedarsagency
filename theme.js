/* ============================================================
   Cedars Agency — theme engine
   Default behavior: light mode during the day, dark mode at
   night, based on the visitor's own device clock (no location
   or server lookup involved). A manual toggle lets a visitor
   override this at any time; once they do, their choice is
   remembered and auto-switching stops for them.
================================================================ */

const ThemeManager = (function () {
  "use strict";

  const STORAGE_KEY = "nf_theme_override";
  const DAY_START_HOUR = 6;   // 6:00 — light mode begins
  const DAY_END_HOUR = 18;    // 18:00 — dark mode begins
  const RECHECK_MS = 5 * 60 * 1000; // re-check the clock every 5 minutes

  function getOverride() {
    try {
      return localStorage.getItem(STORAGE_KEY); // "light" | "dark" | null
    } catch (e) {
      return null;
    }
  }

  function setOverride(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* no persistence available — toggle still works for this page view */
    }
  }

  function timeBasedTheme() {
    const hour = new Date().getHours();
    return hour >= DAY_START_HOUR && hour < DAY_END_HOUR ? "light" : "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll(".theme-icon").forEach((icon) => {
      // Icon shows the mode a click will switch TO:
      // light mode → "dark-mode.png" (click to go dark)
      // dark mode  → "night-mode.png" (click to go light)
      // Both are plain black shapes on a transparent background;
      // styles.css inverts them to white automatically in dark mode
      // so they stay visible on either background.
      icon.src = theme === "dark" ? "icons/night-mode.png" : "icons/dark-mode.png";
    });
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function refresh() {
    const override = getOverride();
    applyTheme(override || timeBasedTheme());
  }

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    setOverride(next);
    applyTheme(next);
  }

  function init() {
    refresh();
    document.querySelectorAll(".theme-btn").forEach((btn) => {
      btn.addEventListener("click", toggle);
    });
    // Keep following the clock for visitors who haven't overridden it.
    setInterval(() => {
      if (!getOverride()) applyTheme(timeBasedTheme());
    }, RECHECK_MS);
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", ThemeManager.init);
