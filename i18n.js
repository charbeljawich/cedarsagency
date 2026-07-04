/* ============================================================
   Cedars Agency — i18n (English / Arabic)
   Vanilla JS, no dependencies. Loops over [data-i18n] and
   [data-i18n-placeholder] elements and swaps text content.
   Also flips <html dir> for proper RTL layout in Arabic.
================================================================ */

const TRANSLATIONS = {
  en: {
    brand: "CEDARS AGENCY",
    nav_services: "Services",
    nav_clients: "Clients",
    nav_pricing: "Pricing",
    nav_contact: "Contact",
    start_whatsapp: "Start on WhatsApp",
    toggle_theme: "Dark Mode",

    hero_eyebrow: "Marketing & Creative Studio",
    hero_h1_line1: "Rooted in Lebanon.",
    hero_h1_line2: "Built to",
    hero_h1_accent: "grow.",
    hero_sub: "Cedars Agency runs your social, ads, websites, and content — shot, edited, and launched by one team. No hand-offs, no static.",
    see_packages: "See Packages",
    what_we_do: "What We Do",

    services_eyebrow: "Services",
    services_h2: "Six channels. One studio.",
    services_p: "Tune into whichever channel your brand needs — or run all six together for a single, consistent signal.",

    ch1_title: "Meta & Social",
    ch1_desc: "Profile setup, content calendars, and day-to-day community management across Instagram and Facebook.",
    ch2_title: "Websites & Landing Pages",
    ch2_desc: "Fast, mobile-first sites and campaign landing pages, built to convert visitors into customers.",
    ch3_title: "Ads & Boosts",
    ch3_desc: "Meta and Google Ads — audience targeting, budget management, and boosted posts, optimized weekly.",
    ch4_title: "Photo & Video Shooting",
    ch4_desc: "On-site production for products, spaces, events, and short-form content.",
    ch5_title: "Editing & Post-Production",
    ch5_desc: "Reels, ads, and photography, edited and color-graded until it's ready to publish.",
    ch6_title: "Brand & Strategy",
    ch6_desc: "Identity, copywriting, and monthly reporting so every channel pulls in the same direction.",

    process_eyebrow: "Process",
    process_h2: "How a project runs",
    proc1_title: "Tune In",
    proc1_desc: "A short call to understand your audience, goals, and current channels.",
    proc2_title: "Build",
    proc2_desc: "We shoot, design, and set up your site, ads, and content calendar.",
    proc3_title: "Broadcast",
    proc3_desc: "Campaigns go live across your chosen channels, tracked from day one.",
    proc4_title: "Tune Up",
    proc4_desc: "Monthly reporting and optimization — we adjust based on what's working.",

    clients_eyebrow: "Our Clients",
    clients_h2: "Growing with Cedars Agency",
    clients_p: "A few of the brands we've built pages, campaigns, and content for.",
    client_tag: "CLIENT",
    client_name: "Client Name",
    client_desc: "Short one-line description of the work — website, ads, or content.",
    client_link: "Visit page →",

    pricing_eyebrow: "Pricing",
    pricing_h2: "Choose Your Package",
    pricing_p: "Three packages built to scale with you. Ad spend is billed separately from the management fee.",
    per_month: "/ month",
    most_popular: "Most Popular",
    get_started: "Get Started",

    tier_basic_label: "Basic",
    tier_basic_desc: "For brands just getting started",
    basic_f1: "Social setup + 10 posts/mo",
    basic_f2: "Basic photo/video editing",
    basic_f3: "1 boosted post/mo",
    basic_f4: "1-page landing site",

    tier_pro_label: "Pro",
    tier_pro_desc: "For brands ready to grow",
    pro_f1: "Everything in Basic",
    pro_f2: "Meta Ads campaign management",
    pro_f3: "1 shoot + 6 edited reels/mo",
    pro_f4: "Multi-page website",
    pro_f5: "Monthly performance report",

    tier_premium_label: "Premium",
    tier_premium_desc: "For full-service brand management",
    premium_f1: "Everything in Pro",
    premium_f2: "Google Ads added",
    premium_f3: "Weekly content shoots",
    premium_f4: "Email marketing setup",
    premium_f5: "Bi-weekly strategy calls",

    pricing_note: "Starting rates — customize to fit your market. Setup fees apply for branding and full website builds.",

    contact_h2: "Ready to grow with us?",
    contact_p: "Message us on WhatsApp for the fastest reply, or send an email below.",
    message_whatsapp: "Message us on WhatsApp",
    or_email: "or email us",
    your_name: "Your name",
    your_email: "Your email",
    tell_project: "Tell us about your project...",
    send_email: "Send Email",

    feedback_eyebrow: "Feedback",
    feedback_h2: "Working with us? Tell us how it's going.",
    feedback_p: "Quick feedback helps us improve — takes under a minute.",
    company_optional: "Company (optional)",
    rate_experience: "Rate your experience:",
    feedback_placeholder: "What's working well? What could be better?",
    send_feedback: "Send Feedback",

    footer_text: "© 2026 Cedars Agency. Marketing & Creative.",
  },

  ar: {
    brand: "CEDARS AGENCY",
    nav_services: "الخدمات",
    nav_clients: "عملاؤنا",
    nav_pricing: "الأسعار",
    nav_contact: "تواصل معنا",
    start_whatsapp: "تواصل عبر واتساب",
    toggle_theme: "الوضع المظلم",

    hero_eyebrow: "استوديو تسويق وإبداع",
    hero_h1_line1: "متجذرون في لبنان",
    hero_h1_line2: "نبني لتكبر",
    hero_h1_accent: "علامتك.",
    hero_sub: "وكالة الأرز تدير حساباتك الاجتماعية، إعلاناتك، موقعك، ومحتواك — تصوير وتعديل وإطلاق بفريق واحد. بلا تسليم بين فرق متعددة، وبلا تشويش.",
    see_packages: "شاهد الباقات",
    what_we_do: "ماذا نقدّم",

    services_eyebrow: "الخدمات",
    services_h2: "ست قنوات. استوديو واحد.",
    services_p: "اختر القناة التي تحتاجها علامتك التجارية — أو فعّل الست معًا لصوت واحد متكامل.",

    ch1_title: "ميتا والسوشيال ميديا",
    ch1_desc: "إعداد الحسابات، تقويم المحتوى، وإدارة التفاعل مع المتابعين على إنستغرام وفيسبوك.",
    ch2_title: "المواقع وصفحات الهبوط",
    ch2_desc: "تصميم وبناء مواقع سريعة تناسب الهاتف، وصفحات هبوط للحملات الإعلانية.",
    ch3_title: "الإعلانات والمنشورات المعزّزة",
    ch3_desc: "إعلانات ميتا وجوجل — استهداف الجمهور، إدارة الميزانية، وتعزيز المنشورات مع تحسين أسبوعي.",
    ch4_title: "تصوير فوتوغرافي وفيديو",
    ch4_desc: "تصوير في الموقع للمنتجات، الأماكن، الفعاليات، والمحتوى القصير.",
    ch5_title: "المونتاج والمعالجة النهائية",
    ch5_desc: "مونتاج الريلز والإعلانات والصور، مع تصحيح الألوان حتى تصبح جاهزة للنشر.",
    ch6_title: "الهوية والاستراتيجية",
    ch6_desc: "الهوية البصرية، كتابة المحتوى، وتقارير شهرية لتتماشى كل القنوات في اتجاه واحد.",

    process_eyebrow: "آلية العمل",
    process_h2: "كيف يسير المشروع",
    proc1_title: "نستمع لك",
    proc1_desc: "مكالمة قصيرة لفهم جمهورك، أهدافك، وقنواتك الحالية.",
    proc2_title: "نبني",
    proc2_desc: "نصوّر، نصمم، ونجهز موقعك، إعلاناتك، وتقويم محتواك.",
    proc3_title: "نبثّ",
    proc3_desc: "تنطلق الحملات على القنوات التي تختارها، مع تتبّع من اليوم الأول.",
    proc4_title: "نطوّر",
    proc4_desc: "تقارير شهرية وتحسين مستمر — نعدّل حسب ما ينجح فعليًا.",

    clients_eyebrow: "عملاؤنا",
    clients_h2: "علامات نمت مع CEDARS AGENCY",
    clients_p: "بعض العلامات التجارية التي بنينا لها مواقع، حملات، ومحتوى.",
    client_tag: "عميل",
    client_name: "اسم العميل",
    client_desc: "وصف قصير للعمل — موقع، إعلانات، أو محتوى.",
    client_link: "زيارة الصفحة ←",

    pricing_eyebrow: "الأسعار",
    pricing_h2: "اختر باقتك",
    pricing_p: "ثلاث باقات مصممة لتنمو معك. تُدفع تكاليف الإعلانات بشكل منفصل عن رسوم الإدارة.",
    per_month: "/ شهريًا",
    most_popular: "الأكثر طلبًا",
    get_started: "ابدأ الآن",

    tier_basic_label: "أساسية",
    tier_basic_desc: "للعلامات الناشئة حديثًا",
    basic_f1: "إعداد الحسابات + ١٠ منشورات شهريًا",
    basic_f2: "مونتاج أساسي للصور والفيديو",
    basic_f3: "منشور معزّز واحد شهريًا",
    basic_f4: "صفحة هبوط واحدة",

    tier_pro_label: "برو",
    tier_pro_desc: "للعلامات الجاهزة للنمو",
    pro_f1: "كل ما في الباقة الأساسية",
    pro_f2: "إدارة حملات إعلانات ميتا",
    pro_f3: "جلسة تصوير + ٦ ريلز مُعدّلة شهريًا",
    pro_f4: "موقع متعدد الصفحات",
    pro_f5: "تقرير أداء شهري",

    tier_premium_label: "مميزة",
    tier_premium_desc: "لإدارة كاملة ومتكاملة للعلامة",
    premium_f1: "كل ما في باقة البرو",
    premium_f2: "إضافة إعلانات جوجل",
    premium_f3: "جلسات تصوير أسبوعية",
    premium_f4: "إعداد التسويق عبر البريد الإلكتروني",
    premium_f5: "مكالمات استراتيجية كل أسبوعين",

    pricing_note: "أسعار أوّلية — عدّلها بما يناسب سوقك. تُضاف رسوم تأسيس للهوية البصرية والمواقع الكاملة.",

    contact_h2: "جاهزون تنمو مع CEDARS AGENCY؟",
    contact_p: "راسلنا على واتساب لأسرع رد، أو أرسل بريدًا إلكترونيًا في الأسفل.",
    message_whatsapp: "راسلنا على واتساب",
    or_email: "أو راسلنا بالبريد الإلكتروني",
    your_name: "اسمك",
    your_email: "بريدك الإلكتروني",
    tell_project: "أخبرنا عن مشروعك...",
    send_email: "إرسال البريد",

    feedback_eyebrow: "ملاحظاتكم",
    feedback_h2: "تعملون معنا؟ أخبرونا كيف تسير الأمور.",
    feedback_p: "ملاحظاتكم السريعة تساعدنا على التحسّن — تستغرق أقل من دقيقة.",
    company_optional: "الشركة (اختياري)",
    rate_experience: "قيّم تجربتك:",
    feedback_placeholder: "ما الذي يسير بشكل جيد؟ وما الذي يمكن تحسينه؟",
    send_feedback: "إرسال الملاحظات",

    footer_text: "© 2026 CEDARS AGENCY. تسويق وإبداع.",
  },
};

const LangManager = (function () {
  "use strict";

  function getSavedLang() {
    try {
      return localStorage.getItem("nf_lang");
    } catch (e) {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem("nf_lang", lang);
    } catch (e) {
      /* localStorage unavailable — language just won't persist, no big deal */
    }
  }

  function applyLang(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    document.documentElement.setAttribute("lang", lang === "ar" ? "ar" : "en");
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.body.classList.toggle("rtl", lang === "ar");

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.textContent = lang === "ar" ? "EN / English" : "AR / عربي";
    });

    saveLang(lang);
  }

  function currentLang() {
    return document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
  }

  function toggle() {
    applyLang(currentLang() === "ar" ? "en" : "ar");
  }

  function init() {
    applyLang(getSavedLang() || "en");
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", toggle);
    });
  }

  return { init, applyLang, toggle };
})();

document.addEventListener("DOMContentLoaded", LangManager.init);
