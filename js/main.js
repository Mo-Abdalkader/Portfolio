/* ═══════════════════════════════════════════════════════════════════════
   Mohamed Abdalkader — AI Engineer Portfolio
   js/main.js — v2 — All JavaScript Functionality
   ═══════════════════════════════════════════════════════════════════════ */

// ─── 1. THEME (globally scoped — called by onclick in HTML) ──────────

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  var btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme') || 'dark';
  var next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
}

// ─── ARABIC TRANSLATIONS ─────────────────────────────────────────────

var TRANSLATIONS = {
  // Hero
  'hero-label':           { en: '// AI Engineer',                     ar: '// مهندس ذكاء اصطناعي' },
  'hero-name':            { en: 'Mohamed Abdalkader',                  ar: 'محمد عبدالقادر' },
  'hero-role-text':       { en: '> AI Engineer',                      ar: '> مهندس ذكاء اصطناعي' },
  'hero-subtitle-text':   { en: 'LLM Fine-tuning · Computer Vision · Medical AI · MLOps',
                            ar:  'ضبط النماذج · رؤية حاسوبية · الذكاء الطبي · MLOps' },
  'hero-desc': {
    en: 'AI Engineer with 1+ year building production ML systems for medical imaging and NLP. Delivered 240% accuracy gains via LoRA fine-tuning and multi-agent architectures. Deployed RAG pipelines indexing medical textbooks with sub-second retrieval. Reduced model memory 59% through quantization.',
    ar: 'مهندس ذكاء اصطناعي بخبرة تزيد عن عام في بناء أنظمة تعلم آلي إنتاجية للتصوير الطبي ومعالجة اللغات الطبيعية. حقق مكاسب دقة 240% عبر ضبط LoRA والمعماريات متعددة الوكلاء. نشر خطوط أنابيب RAG لفهرسة الكتب الطبية. قلّص ذاكرة النموذج 59% عبر التكميم.'
  },
  'cta-projects':         { en: 'View Projects →',                    ar: 'عرض المشاريع →' },
  'cta-blog':             { en: 'Read Blog',                          ar: 'المدونة' },
  'cta-cv':               { en: '↓ Download CV',                      ar: '↓ تحميل السيرة الذاتية' },

  // Stats
  'stat-label-1':         { en: 'Accuracy Gain',                      ar: 'تحسين الدقة' },
  'stat-label-2':         { en: 'Memory Reduction',                   ar: 'تقليص الذاكرة' },
  'stat-label-3':         { en: 'Research Grants',                    ar: 'منح بحثية' },
  'stat-label-4':         { en: 'ML Projects Shipped',                ar: 'مشاريع منجزة' },

  // Sections
  'section-featured-label': { en: '// featured work',                 ar: '// أبرز الأعمال' },
  'section-featured-h2':    { en: 'Projects',                         ar: 'المشاريع' },
  'section-featured-sub':   { en: 'Production-grade systems built with purpose.', ar: 'أنظمة بمستوى إنتاجي مبنية بهدف واضح.' },
  'section-blog-label':     { en: '// latest posts',                  ar: '// آخر المقالات' },
  'section-blog-h2':        { en: 'Blog',                             ar: 'المدونة' },
  'section-blog-sub':       { en: 'Deep dives, tutorials, and thoughts on AI.', ar: 'تحليلات معمقة، دروس، وأفكار حول الذكاء الاصطناعي.' },
  'section-contact-h2':     { en: "Let's Connect",                    ar: 'تواصل معي' },
  'section-contact-sub':    { en: 'Open to collaborations, opportunities, and interesting conversations about AI.', ar: 'مفتوح للتعاون والفرص والنقاشات المثيرة حول الذكاء الاصطناعي.' },

  // Buttons
  'btn-view-all-projects':  { en: 'View All Projects →',              ar: 'عرض جميع المشاريع →' },
  'btn-read-all-posts':     { en: 'Read All Posts →',                 ar: 'قراءة جميع المقالات →' },

  // Contact labels
  'contact-label-email':    { en: 'Email',                            ar: 'البريد الإلكتروني' },
  'contact-label-linkedin': { en: 'LinkedIn',                         ar: 'لينكد إن' },
  'contact-label-github':   { en: 'GitHub',                           ar: 'جيت هاب' },
  'contact-label-leetcode': { en: 'LeetCode',                         ar: 'لييت كود' },

  // Footer
  'footer-tagline':         { en: "AI Engineer · Building tomorrow's systems today.", ar: 'مهندس ذكاء اصطناعي · بناء أنظمة المستقبل اليوم.' },
  'footer-copy':            { en: '© 2026 Mohamed Abdalkader. All rights reserved.', ar: '© 2026 محمد عبدالقادر. جميع الحقوق محفوظة.' },


  // Projects page
  'page-projects-label':    { en: '// my work',                       ar: '// أعمالي' },
  'page-projects-h1':       { en: 'Projects',                         ar: 'المشاريع' },
  'page-projects-sub':      { en: 'Production-grade ML systems. Real results.', ar: 'أنظمة تعلم آلي إنتاجية. نتائج حقيقية.' },

  // Blog page
  'page-blog-h1':           { en: 'Blog',                             ar: 'المدونة' },
  'page-blog-sub':          { en: 'Deep dives, tutorials, and thoughts on AI.', ar: 'تحليلات معمقة، دروس، وأفكار حول الذكاء الاصطناعي.' },
};

var currentLang = 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  var btnEN = document.getElementById('langEN');
  var btnAR = document.getElementById('langAR');
  if (btnEN) btnEN.classList.toggle('active', lang === 'en');
  if (btnAR) btnAR.classList.toggle('active', lang === 'ar');

  Object.keys(TRANSLATIONS).forEach(function(key) {
    var el = document.getElementById('t-' + key);
    if (!el) return;
    var val = TRANSLATIONS[key][lang] || TRANSLATIONS[key]['en'];
    el.textContent = val;
    if (lang === 'ar') {
      el.setAttribute('dir', 'rtl');
      el.style.fontFamily = "'Tajawal', sans-serif";
    } else {
      el.removeAttribute('dir');
      el.style.fontFamily = '';
    }
  });

  // Apply RTL direction to labelled containers
  document.querySelectorAll('[data-translatable]').forEach(function(el) {
    if (lang === 'ar') {
      el.setAttribute('dir', 'rtl');
      el.style.textAlign = 'right';
    } else {
      el.removeAttribute('dir');
      el.style.textAlign = '';
    }
  });
}

function loadArabicFont() {
  if (document.getElementById('tajawal-font')) return;
  var link = document.createElement('link');
  link.id = 'tajawal-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap';
  document.head.appendChild(link);
}

// ─── MAIN INIT ───────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {

  // Apply saved theme icon
  var savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  // ── 2. NAVBAR ────────────────────────────────────────────────────

  var navbar    = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var mobileMenu= document.getElementById('mobileMenu');

  // Scroll → glass navbar
  window.addEventListener('scroll', function() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger open/close
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      var open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });

    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function(e) {
      if (navbar && !navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── 3. ACTIVE NAV LINK ───────────────────────────────────────────

  var path     = window.location.pathname;
  var filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto')) return;

    // Normalise: strip leading ../ and ./
    var hrefClean = href.replace(/^(\.\.\/)+|^\.\//, '');
    var linkFile  = hrefClean.split('/').pop();

    var isHome  = (filename === '' || filename === 'index.html') &&
                  (linkFile === 'index.html' || href === '/' || href === 'index.html' || href === './index.html');
    var isMatch = !isHome && linkFile === filename;

    if (isHome || isMatch) link.classList.add('active');
  });

  // ── 4. SMOOTH SCROLL ─────────────────────────────────────────────

  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = navbar ? navbar.offsetHeight + 16 : 82;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── 5. SCROLL ANIMATIONS (IntersectionObserver) ──────────────────

  var animEls = document.querySelectorAll('[data-animate]');
  if (animEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -55px 0px', threshold: 0.08 });
    animEls.forEach(function(el) { observer.observe(el); });
  } else {
    animEls.forEach(function(el) { el.classList.add('visible'); });
  }

  // ── 6. PROJECT FILTER ────────────────────────────────────────────

  var projFilter = document.querySelector('.filter-tabs[data-filter="projects"]');
  if (projFilter) {
    var projCards = document.querySelectorAll('.project-card');
    projFilter.querySelectorAll('.filter-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        projFilter.querySelectorAll('.filter-tab').forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
        var cat = this.dataset.category;
        projCards.forEach(function(card) {
          card.classList.toggle('hidden', cat !== 'all' && card.dataset.category !== cat);
        });
      });
    });
  }

  // ── 7. BLOG FILTER ───────────────────────────────────────────────

  var blogFilter = document.querySelector('.filter-tabs[data-filter="blog"]');
  if (blogFilter) {
    var blogCards = document.querySelectorAll('.blog-card');
    blogFilter.querySelectorAll('.filter-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        blogFilter.querySelectorAll('.filter-tab').forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
        var cat = this.dataset.category;
        blogCards.forEach(function(card) {
          card.classList.toggle('hidden', cat !== 'all' && card.dataset.category !== cat);
        });
      });
    });
  }

  // ── 8. COPY CODE BUTTON ──────────────────────────────────────────

  document.querySelectorAll('.prose pre').forEach(function(pre) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.addEventListener('click', function() {
      var code = pre.querySelector('code');
      var text = code ? code.textContent : pre.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          btn.textContent = 'Copied!';
          setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
        }).catch(function() { fallbackCopy(text, btn); });
      } else {
        fallbackCopy(text, btn);
      }
    });
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try {
      document.execCommand('copy');
      btn.textContent = 'Copied!';
    } catch(e) {
      btn.textContent = 'Error';
    }
    setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
    document.body.removeChild(ta);
  }

  // ── 9. LANGUAGE TOGGLE ───────────────────────────────────────────

  var langEN = document.getElementById('langEN');
  var langAR = document.getElementById('langAR');

  var savedLang = localStorage.getItem('lang') || 'en';

  if (langEN) {
    langEN.addEventListener('click', function() { applyLang('en'); });
  }
  if (langAR) {
    langAR.addEventListener('click', function() {
      loadArabicFont();
      applyLang('ar');
    });
  }

  // Restore saved language
  if (savedLang === 'ar') {
    loadArabicFont();
    setTimeout(function() { applyLang('ar'); }, 60); // slight delay so fonts load
  } else {
    applyLang('en');
  }

});
// ═══════════════════════════════════════════════════════════════════
// PATCH v3 — Banner, Back-to-top, Reading Progress, Copy Link
// ═══════════════════════════════════════════════════════════════════

// ─── SEASONAL BANNER MANAGER ────────────────────────────────────────
// Logic:
//   Mar 1 – Mar 19  → Ramadan banner  (gold)
//   Mar 20 – Mar 25 → Eid Mubarak banner (purple)
//   Mar 26+         → no banner
// To skip seasonal logic entirely, set FORCE_BANNER = false

(function() {
  // FORCE_BANNER: 'ramadan' | 'eid' | false
  // Set to false to use date logic; set to a string to always force that banner.
  // When Ramadan ends → set to false. After Eid ends → delete both banner divs.
  var FORCE_BANNER = 'ramadan';

  function getBannerState() {
    if (FORCE_BANNER) return FORCE_BANNER;
    var now = new Date();
    var m   = now.getMonth() + 1;
    var d   = now.getDate();
    if (m === 3 && d <= 19)            return 'ramadan';
    if (m === 3 && d >= 20 && d <= 25) return 'eid';
    return 'none';
  }

  function setBannerHeight() {
    // Find whichever banner is currently shown
    var banner = document.querySelector('.announcement-banner:not([style*="display:none"]):not([style*="display: none"])');
    var h = banner ? banner.offsetHeight : 0;
    document.documentElement.style.setProperty('--banner-height', h + 'px');
    if (h > 0) document.body.classList.add('has-banner');
    else document.body.classList.remove('has-banner');
  }

  function initBanner() {
    var state = getBannerState();

    var ramadanEl = document.getElementById('ramadanBanner');
    var eidEl     = document.getElementById('eidBanner');

    // Show/hide based on date
    if (ramadanEl) ramadanEl.style.display = (state === 'ramadan') ? '' : 'none';
    if (eidEl)     eidEl.style.display     = (state === 'eid')     ? '' : 'none';

    setBannerHeight();

    // Recompute on close
    document.querySelectorAll('.ramadan-close, .eid-close').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setTimeout(setBannerHeight, 50);
      });
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBanner);
  } else {
    initBanner();
  }

  // Recompute on resize (height can change on mobile)
  window.addEventListener('resize', setBannerHeight, { passive: true });
})();

// ─── BACK TO TOP BUTTON ──────────────────────────────────────────────

(function() {
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function() {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackToTop);
  } else {
    initBackToTop();
  }
})();

// ─── READING PROGRESS BAR ───────────────────────────────────────────

(function() {
  function initReadingProgress() {
    var bar = document.getElementById('readingProgress');
    if (!bar) return;

    window.addEventListener('scroll', function() {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;
      var pct = (window.scrollY / docH) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReadingProgress);
  } else {
    initReadingProgress();
  }
})();

// ─── COPY LINK BUTTON ────────────────────────────────────────────────

function copyPostLink(btn) {
  var url = window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function() {
      btn.textContent = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(function() {
        btn.textContent = '⎘ Copy Link';
        btn.classList.remove('copied');
      }, 2200);
    });
  } else {
    // Fallback
    var ta = document.createElement('textarea');
    ta.value = url;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(function() {
      btn.textContent = '⎘ Copy Link';
      btn.classList.remove('copied');
    }, 2200);
  }
}

// ─── ESTIMATED READING TIME ──────────────────────────────────────────

(function() {
  function calcReadTime() {
    var prose = document.querySelector('.prose');
    var el    = document.getElementById('readTimeCalc');
    if (!prose || !el) return;

    var words  = prose.textContent.trim().split(/\s+/).length;
    var mins   = Math.max(1, Math.round(words / 238)); // avg 238 wpm
    el.textContent = mins + ' min read';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', calcReadTime);
  } else {
    calcReadTime();
  }
})();


// ─── PROJECT SLIDER (homepage) ───────────────────────────────────────
// Auto-detects card count. Shows 3 on desktop, 2 on tablet, 1 on mobile.
// To add a project: just add another <article class="proj-slide"> in the track.

(function() {
  function initProjSlider() {
    var slider    = document.getElementById('projSlider');
    var track     = document.getElementById('projSliderTrack');
    var prevBtn   = document.getElementById('projPrev');
    var nextBtn   = document.getElementById('projNext');
    var dotsEl    = document.getElementById('projDots');

    if (!slider || !track || !prevBtn || !nextBtn) return;

    var slides    = Array.from(track.querySelectorAll('.proj-slide'));
    var total     = slides.length;
    var current   = 0;

    function getVisible() {
      var w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 640)  return 2;
      return 1;
    }

    function getGap() {
      // Match CSS gap: 1.35rem = 21.6px approx; we'll measure from DOM
      var style = window.getComputedStyle(track);
      var gap   = parseFloat(style.gap || style.columnGap || '21');
      return isNaN(gap) ? 21 : gap;
    }

    function setSlideWidth() {
      var vis    = getVisible();
      var gap    = getGap();
      var total_gap = gap * (vis - 1);
      var width  = (slider.offsetWidth - total_gap) / vis;
      slides.forEach(function(s) {
        s.style.width = width + 'px';
        s.style.minWidth = width + 'px';
      });
    }

    function maxIndex() {
      return Math.max(0, total - getVisible());
    }

    function buildDots() {
      if (!dotsEl) return;
      dotsEl.innerHTML = '';
      var max = maxIndex();
      for (var i = 0; i <= max; i++) {
        var dot = document.createElement('button');
        dot.className = 'proj-dot' + (i === current ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        (function(idx) {
          dot.addEventListener('click', function() { goTo(idx); });
        })(i);
        dotsEl.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsEl) return;
      var dots = dotsEl.querySelectorAll('.proj-dot');
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    function goTo(idx) {
      var max = maxIndex();
      current = Math.max(0, Math.min(idx, max));

      var gap   = getGap();
      var slideW = slides[0] ? (parseFloat(slides[0].style.width) || 0) : 0;
      var offset = current * (slideW + gap);
      track.style.transform = 'translateX(-' + offset + 'px)';

      prevBtn.disabled = (current === 0);
      nextBtn.disabled = (current >= max);
      updateDots();
    }

    function init() {
      setSlideWidth();
      buildDots();
      goTo(0);
    }

    prevBtn.addEventListener('click', function() { goTo(current - 1); });
    nextBtn.addEventListener('click', function() { goTo(current + 1); });

    // Touch/swipe support
    var touchStartX = 0;
    track.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function(e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goTo(current + 1);
        else          goTo(current - 1);
      }
    }, { passive: true });

    // Keyboard navigation when slider is focused
    slider.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft')  goTo(current - 1);
    });

    // Resize: recalculate widths and clamp current index
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        setSlideWidth();
        buildDots();
        goTo(Math.min(current, maxIndex()));
      }, 120);
    }, { passive: true });

    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjSlider);
  } else {
    initProjSlider();
  }
})();


// ─── BLOG SLIDER (homepage) ──────────────────────────────────────────────
// Same logic as project slider, adapted for blog section
// Shows 3 on desktop, 2 on tablet, 1 on mobile.

(function() {
  function initBlogSlider() {
    var slider    = document.getElementById('blogSlider');
    var track     = document.getElementById('blogSliderTrack');
    var prevBtn   = document.getElementById('blogPrev');
    var nextBtn   = document.getElementById('blogNext');
    var dotsEl    = document.getElementById('blogDots');

    if (!slider || !track || !prevBtn || !nextBtn) return;

    var slides    = Array.from(track.querySelectorAll('.blog-slide'));
    var total     = slides.length;
    var current   = 0;

    function getVisible() {
      var w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 640)  return 2;
      return 1;
    }

    function getGap() {
      var style = window.getComputedStyle(track);
      var gap   = parseFloat(style.gap || style.columnGap || '21');
      return isNaN(gap) ? 21 : gap;
    }

    function setSlideWidth() {
      var vis    = getVisible();
      var gap    = getGap();
      var total_gap = gap * (vis - 1);
      var width  = (slider.offsetWidth - total_gap) / vis;
      slides.forEach(function(s) {
        s.style.width = width + 'px';
        s.style.minWidth = width + 'px';
      });
    }

    function maxIndex() {
      return Math.max(0, total - getVisible());
    }

    function buildDots() {
      if (!dotsEl) return;
      dotsEl.innerHTML = '';
      var max = maxIndex();
      for (var i = 0; i <= max; i++) {
        var dot = document.createElement('button');
        dot.className = 'blog-dot' + (i === current ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        (function(idx) {
          dot.addEventListener('click', function() { goTo(idx); });
        })(i);
        dotsEl.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsEl) return;
      var dots = dotsEl.querySelectorAll('.blog-dot');
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    function goTo(idx) {
      var max = maxIndex();
      current = Math.max(0, Math.min(idx, max));

      var gap   = getGap();
      var slideW = slides[0] ? (parseFloat(slides[0].style.width) || 0) : 0;
      var offset = current * (slideW + gap);
      track.style.transform = 'translateX(-' + offset + 'px)';

      prevBtn.disabled = (current === 0);
      nextBtn.disabled = (current >= max);
      updateDots();
    }

    function init() {
      setSlideWidth();
      buildDots();
      goTo(0);
    }

    prevBtn.addEventListener('click', function() { goTo(current - 1); });
    nextBtn.addEventListener('click', function() { goTo(current + 1); });

    // Touch/swipe support
    var touchStartX = 0;
    track.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function(e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goTo(current + 1);
        else          goTo(current - 1);
      }
    }, { passive: true });

    // Keyboard navigation when slider is focused
    slider.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft')  goTo(current - 1);
    });

    // Resize: recalculate widths and clamp current index
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        setSlideWidth();
        buildDots();
        goTo(Math.min(current, maxIndex()));
      }, 120);
    }, { passive: true });

    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogSlider);
  } else {
    initBlogSlider();
  }
})();


// ─── BLOG PROGRESS TRACKER ──────────────────────────────────────────────────
// Calculates progress bar width based on a master list of published posts.
// Add slug to the list when you publish a post — progress auto-updates.

(function() {
  // Master list of all 30 posts in the series (add slug when publishing each post)
  const PUBLISHED_POSTS = [
    'intro-to-ml.html',            // Day 1  - Feb 19
    'ml-pipeline.html',            // Day 2  - Feb 20
    'how-models-learn.html',       // Day 3  - Feb 21
    'linear-regression.html',      // Day 4  - Feb 22
  ];

  const TOTAL_POSTS = 30;

function updateBlogProgress() {
  var published = PUBLISHED_POSTS.length;
  var percent   = (published / TOTAL_POSTS) * 100;

  // ── blog.html: ramadan-callout progress bar ──────────────────────
  var calloutFill = document.querySelector('.ramadan-callout .progress-fill');
  if (calloutFill) calloutFill.style.width = percent.toFixed(2) + '%';

  // blog.html: subtitle text "X of 30 posts published"
  var calloutSub = document.querySelector('.ramadan-callout .callout-subtitle');
  if (calloutSub) {
    calloutSub.textContent = calloutSub.textContent.replace(
      /\d+ of \d+ posts published/,
      published + ' of ' + TOTAL_POSTS + ' posts published'
    );
  }

  // blog.html: "X / 30" label above the progress bar
  var calloutCount = document.querySelector('.ramadan-callout .progress-label span:last-child');
  if (calloutCount) calloutCount.textContent = published + ' / ' + TOTAL_POSTS;

  // ── categories.html: series-progress bar ─────────────────────────
  var seriesFill = document.querySelector('.series-progress-fill');
  if (seriesFill) seriesFill.style.width = percent.toFixed(2) + '%';

  // categories.html: "X / 30 posts published" stat
  var seriesStat = document.querySelector('.series-progress-stat');
  if (seriesStat) seriesStat.innerHTML = '<em>' + published + '</em> / ' + TOTAL_POSTS + ' posts published';

  // ── categories.html: unlock rows matching PUBLISHED_POSTS ─────────
  PUBLISHED_POSTS.forEach(function(slug) {
    var row = document.querySelector('.cat-row[href="' + slug + '"]');
    if (row) row.classList.remove('locked');
  });

  // ── categories.html: update each category badge count ────────────
  document.querySelectorAll('.cat-section').forEach(function(section) {
    var total    = section.querySelectorAll('.cat-row').length;
    var unlocked = section.querySelectorAll('.cat-row:not(.locked)').length;
    var badge    = section.querySelector('.cat-count-badge');
    if (badge) badge.textContent = unlocked + ' / ' + total + ' posts';
  });

  // ── blog.html: show only published cards ─────────────────────────
  document.querySelectorAll('.blog-card[data-slug]').forEach(function(card) {
    var slug = card.getAttribute('data-slug');
    card.style.display = PUBLISHED_POSTS.includes(slug) ? '' : 'none';
  });

  // ── blog.html: update filter tab counts ──────────────────────────
  var allVisible = document.querySelectorAll('.blog-card[data-slug]:not([style*="display: none"])').length;
  var allTab = document.querySelector('.filter-tab[data-category="all"]');
  if (allTab) allTab.textContent = 'All (' + allVisible + ')';

  document.querySelectorAll('.filter-tab:not([data-category="all"])').forEach(function(tab) {
    var cat = tab.getAttribute('data-category');
    var count = Array.from(document.querySelectorAll('.blog-card[data-slug]')).filter(function(c) {
      return PUBLISHED_POSTS.includes(c.getAttribute('data-slug')) &&
            c.getAttribute('data-category') === cat;
    }).length;
    tab.textContent = tab.textContent.replace(/\(\d+\)/, '(' + count + ')');
  });
}

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateBlogProgress);
  } else {
    updateBlogProgress();
  }
})();
