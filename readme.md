# Cedars Agency — Website

Plain HTML/CSS/JS, no build step, no framework. Open `index.html` in VS Code and it's the whole site.

## Files
- `index.html` — page structure/content (English text, with `data-i18n` keys for translation)
- `styles.css` — all styling, including the light/dark theme system, RTL/Arabic rules, the 3D cedar tree, and scroll animations
- `theme.js` — day/night auto theme switching + manual override
- `i18n.js` — English/Arabic dictionary + language switcher
- `script.js` — WhatsApp links, mobile menu, scroll-reveal, tilt effect, form submission
- `_headers` — security headers (Netlify format)

## 1. WhatsApp
Wired to **+961 70 332 115**. Every "Get Started" / "Start on WhatsApp" button opens a chat with a pre-filled message. To change the number, edit `WHATSAPP_NUMBER` at the top of `script.js`.

## 2. Arabic / English toggle
Click the "AR / عربي" button in the nav (or mobile menu) to switch. It:
- Swaps all visible text using the dictionaries in `i18n.js`
- Flips the whole page to right-to-left layout (`dir="rtl"`)
- Switches to an Arabic-shaped font (IBM Plex Sans Arabic)
- Remembers the visitor's choice for next time (via `localStorage` — safe here since this is a real hosted site, not a sandboxed preview)

**To edit the Arabic wording:** open `i18n.js`, find the `ar` object near the top, and edit any line — each key matches the English one directly above it in the `en` object, so it's easy to compare. **To add a new translatable piece of text:** give the HTML element a `data-i18n="your_key"` attribute (or `data-i18n-placeholder="your_key"` for form placeholders), then add `your_key` to both the `en` and `ar` objects in `i18n.js`.

## 3. Colors & theme (light by day, dark by night)
The whole site runs on a green-and-white palette defined once in `styles.css`, under `html[data-theme="light"]` and `html[data-theme="dark"]`. Every section reads from the same variables (`--bg`, `--accent`, `--text`, etc.), so there's nowhere colors are hardcoded per-section.

- **Automatic**: `theme.js` checks the visitor's own device clock — light mode from 6:00 to 18:00, dark mode outside that — and re-checks every 5 minutes so it can flip while a tab is left open through sunset.
- **Manual override**: the 🌙/☀️ button in the nav (and mobile menu) lets a visitor switch it themselves at any time. Once they do, their choice is remembered (`localStorage`) and auto-switching stops for them — the site won't flip back on them later.
- **To adjust the colors**: edit the two blocks at the very top of `styles.css`. Everything else in the file inherits from them automatically.
- **To change the light/dark hours**: edit `DAY_START_HOUR` / `DAY_END_HOUR` near the top of `theme.js`.
- **Toggle icon**: the nav button uses `icons/dark-mode.png` (shown in light mode, click to go dark) and `icons/night-mode.png` (shown in dark mode, click to go light). Both are plain black shapes on a transparent background — `styles.css` automatically inverts them to white in dark mode so they stay visible on the dark background. To use different icons, drop new PNGs into the `icons/` folder and update the two filenames in `theme.js` (`applyTheme` function). If your new icons aren't single-color black-on-transparent, remove the `filter:invert(1)` rule for `.theme-icon` in dark mode in `styles.css`, or the colors will flip in an unintended way.

## 4. Animations & the "3D" cedar
No external libraries — everything is CSS/SVG transforms + a small amount of vanilla JS, which keeps the strict `script-src 'self'` policy intact (nothing to load from a CDN, nothing that can break if a third-party script goes down):

- **Hero cedar**: an SVG cedar tree, split into a darker-left / lighter-right half on every tier (like sunlight hitting one side), gently swaying on its Y axis inside a CSS `perspective` container — reads as a dimensional object rather than a flat icon.
- **Scroll-reveal**: sections and cards fade + rise into place the first time they scroll into view (`IntersectionObserver` in `script.js`, `.reveal`/`.in-view` classes in `styles.css`).
- **Card tilt**: pricing tiers and client cards tilt slightly in 3D as your mouse moves over them (skipped automatically on touch devices, where it wouldn't mean anything).
- All of this respects `prefers-reduced-motion` — if a visitor's OS has that turned on, animations are cut to near-instant automatically.

If you later want richer 3D (real 3D models, particle effects), that's when a library like Three.js would make sense — it just means loosening the CSP to allow a CDN script, which is worth doing deliberately rather than by default.

## 5. Make the email + feedback forms actually send email
This is a static site — it has no server, so a form cannot send email by itself. You need a free form backend:

1. Go to https://formspree.io and sign up (free tier is fine to start).
2. Create a form, you'll get a URL like `https://formspree.io/f/abc12345`.
3. In `index.html`, replace:
   - `https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID` (contact form) with your real URL.
   - `https://formspree.io/f/REPLACE_WITH_YOUR_FEEDBACK_FORM_ID` (feedback form) — use a **second** Formspree form so contact and feedback land separately.
4. Formspree will send you one confirmation email the first time each form is used — click confirm.

Until you do this, the forms will show "Form isn't connected yet" instead of failing silently.

## 6. Add real clients
In `index.html`, find the `.client-grid` block. Duplicate a `.client-card` for each customer:
```html
<a class="client-card tilt reveal" href="https://theirsite.com" target="_blank" rel="noopener noreferrer">
  <div class="client-tag mono" data-i18n="client_tag">CLIENT</div>
  <h3>Their Name</h3>
  <p>What you did for them.</p>
  <span class="client-link" data-i18n="client_link">Visit page →</span>
</a>
```
Keep `target="_blank" rel="noopener noreferrer"` on every external link, and give the client's actual name/description as plain text (remove the `data-i18n` attribute from those two so the translator doesn't overwrite them, or add matching keys to `i18n.js` if you want them translated too).

## 7. Hosting
Any static host works. Easiest:
1. **Netlify** (netlify.com) — drag the whole `site` folder onto the dashboard, or connect a GitHub repo. Free SSL, and it auto-reads `_headers` for security headers.
2. Point your domain's DNS at Netlify (they walk you through it).
3. Done — HTTPS is automatic.

If you use **Vercel** or **Cloudflare Pages** instead, the headers in `_headers` need to be re-added in that platform's own config format (`vercel.json` for Vercel; a `_headers` file also works on Cloudflare Pages the same way).

## 8. Security — what's already built in, and what to keep doing
**Already in the code:**
- `Content-Security-Policy` (in both the HTML `<meta>` tag and `_headers`) — locks the page to only load styles/fonts from itself and Google Fonts, only submit forms to Formspree/WhatsApp, blocks the page from being embedded in someone else's iframe (`frame-ancestors 'none'`), and allows **zero** third-party scripts.
- `X-Content-Type-Options: nosniff` and `Strict-Transport-Security` — standard hardening headers.
- `rel="noopener noreferrer"` on every external link — prevents a linked site from getting a live JS reference to your tab (reverse tabnabbing).
- Honeypot field + `required`/`maxlength` on both forms to cut down spam.
- No inline `<script>` tags, no `eval`, no CDN dependencies — everything lives in `i18n.js`/`script.js`.

**Keep doing this as you grow:**
- Never put API keys or passwords in any front-end file — anything in this folder is visible to anyone who views page source.
- If you ever add a login, database, or payment flow, that needs a real backend with server-side validation — come back and we can plan that separately.
- Keep your Formspree account's spam filtering on — the honeypot only assists it, it doesn't replace it.
- Secure your domain registrar login with 2FA — it's the single point of failure for most small business sites.
