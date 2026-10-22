/* Sanjeevv Kkumar Dass — Portfolio · vanilla JS */
(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.querySelector('.theme-toggle');
  var metaTheme = document.querySelector('meta[name="theme-color"]');
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#0f0e0b' : '#f0c420');
  }
  var themeAnimTimer;
  applyTheme(root.getAttribute('data-theme') || 'light');
  // Follow system changes until the user makes an explicit choice
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (mq) {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    if (!saved) applyTheme(mq.matches ? 'dark' : 'light');
  });
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (!prefersReduced.matches) {
        root.classList.add('theme-anim');
        clearTimeout(themeAnimTimer);
        themeAnimTimer = setTimeout(function () { root.classList.remove('theme-anim'); }, 600);
      }
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- Header state ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector('.menu-toggle');
  var menu = document.getElementById('nav-menu');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (body.classList.contains('menu-open') && !e.target.closest('.nav')) setMenu(false);
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (mq) { if (mq.matches) setMenu(false); });
  }

  /* ---------- Active nav link (scroll position based) ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]:not(.btn)'));
  var spySections = navLinks.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  var spyTicking = false;
  function updateSpy() {
    spyTicking = false;
    var line = window.scrollY + window.innerHeight * 0.35;   // reading line, ~1/3 down the viewport
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    var current = -1;
    spySections.forEach(function (sec, i) {
      if (sec && sec.getBoundingClientRect().top + window.scrollY <= line) current = i;
    });
    if (atBottom && window.scrollY > 0) current = spySections.length - 1;
    navLinks.forEach(function (a, i) {
      var on = i === current;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  function requestSpy() { if (!spyTicking) { spyTicking = true; window.requestAnimationFrame(updateSpy); } }
  window.addEventListener('scroll', requestSpy, { passive: true });
  window.addEventListener('resize', requestSpy);
  window.addEventListener('load', requestSpy);
  updateSpy();

  /* ---------- Scroll reveal ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  // stagger siblings inside grids
  document.querySelectorAll('.spec-grid, .work-grid, .faq-list, .tools-grid').forEach(function (group) {
    Array.prototype.forEach.call(group.querySelectorAll('.reveal'), function (el, i) { el.style.setProperty('--d', (i * 0.07) + 's'); });
  });
  if (prefersReduced.matches || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Tool filters ---------- */
  var chips = Array.prototype.slice.call(document.querySelectorAll('.filters .chip'));
  var toolCards = Array.prototype.slice.call(document.querySelectorAll('.tool-card[data-cat]'));
  var toolsStatus = document.getElementById('tools-status');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      var shown = 0;
      toolCards.forEach(function (card) {
        var match = f === 'all' || card.getAttribute('data-cat') === f;
        card.hidden = !match;
        if (match) { shown++; card.classList.add('is-in'); }
      });
      if (toolsStatus) {
        var label = chip.childNodes[0].textContent.trim();
        toolsStatus.textContent = 'Showing ' + shown + ' tool' + (shown === 1 ? '' : 's') + (f === 'all' ? '' : ' in ' + label) + '.';
      }
    });
  });

  /* ---------- Toast ---------- */
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2400);
  }

  /* ---------- Copy link ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? resolve() : reject(new Error('copy failed')); }
      catch (err) { reject(err); }
      finally { document.body.removeChild(ta); }
    });
  }
  // Native share (mobile / supported browsers)
  var nativeItem = document.querySelector('.share-native-item');
  if (nativeItem && navigator.share) {
    nativeItem.hidden = false;
    nativeItem.querySelector('button').addEventListener('click', function () {
      navigator.share({
        title: document.title,
        text: 'Sanjeevv Kkumar Dass – Smart Digital Tools & Content',
        url: (document.querySelector('link[rel="canonical"]') || {}).href || location.href
      }).catch(function () { /* user cancelled */ });
    });
  }

  document.querySelectorAll('.copy-btn, .copy-btn-inline').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var url = btn.getAttribute('data-url');
      copyText(url).then(function () {
        btn.classList.add('is-copied');
        showToast('Link copied to clipboard');
        setTimeout(function () { btn.classList.remove('is-copied'); }, 1800);
      }).catch(function () {
        showToast('Couldn’t copy — please copy it manually');
      });
    });
  });

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contact-form');
  if (!form) return;

  var ENDPOINT = 'https://formsubmit.co/ajax/932a3e3ae7e8c98832893be9bd2ed12e';
  var MAX = 1000;
  var fields = {
    name: form.querySelector('#name'),
    email: form.querySelector('#email'),
    message: form.querySelector('#message')
  };
  var honey = form.querySelector('#hp-field');
  var counter = document.getElementById('message-counter');
  var status = document.getElementById('form-status');
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn.querySelector('.btn-label');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validate(key) {
    var v = fields[key].value.trim();
    switch (key) {
      case 'name':
        if (!v) return 'Please enter your name.';
        if (v.length < 2) return 'Your name looks a little short.';
        return '';
      case 'email':
        if (!v) return 'Please enter your email address.';
        if (!EMAIL_RE.test(v)) return 'Please enter a valid email, like name@example.com.';
        return '';
      case 'message':
        if (!v) return 'Please write a message.';
        if (v.length < 10) return 'Please add a little more detail (at least 10 characters).';
        if (v.length > MAX) return 'Please keep your message under ' + MAX + ' characters.';
        return '';
    }
    return '';
  }

  function showError(key, msg) {
    var input = fields[key];
    var wrap = input.closest('.field');
    var err = document.getElementById(key + '-error');
    wrap.classList.toggle('has-error', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    err.textContent = msg;
  }

  var touched = {};
  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener('blur', function () {
      if (fields[key].value.trim() !== '') touched[key] = true;
      if (touched[key]) showError(key, validate(key));
    });
    fields[key].addEventListener('input', function () {
      if (touched[key]) showError(key, validate(key));
    });
  });

  function updateCounter() {
    var n = fields.message.value.length;
    counter.textContent = n + ' / ' + MAX;
    counter.classList.toggle('is-near', n >= MAX * 0.9 && n < MAX);
    counter.classList.toggle('is-max', n >= MAX);
  }
  fields.message.addEventListener('input', updateCounter);
  updateCounter();

  function setStatus(type, title, text) {
    status.hidden = false;
    status.className = 'form-status is-' + type;
    status.innerHTML = '';
    var wrap = document.createElement('div');
    var strong = document.createElement('strong');
    strong.textContent = title;
    var p = document.createElement('span');
    p.textContent = text;
    wrap.appendChild(strong); wrap.appendChild(p);
    status.appendChild(wrap);
  }

  function setSending(on) {
    form.classList.toggle('is-sending', on);
    submitBtn.disabled = on;
    submitBtn.setAttribute('aria-busy', String(on));
    submitLabel.textContent = on ? 'Sending…' : 'Send message';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.hidden = true;

    var firstInvalid = null;
    Object.keys(fields).forEach(function (key) {
      touched[key] = true;
      var msg = validate(key);
      showError(key, msg);
      if (msg && !firstInvalid) firstInvalid = fields[key];
    });
    if (firstInvalid) { firstInvalid.focus(); return; }

    // Honeypot: silently pretend success for bots
    if (honey && honey.value) {
      form.reset(); updateCounter();
      setStatus('success', 'Thanks!', 'Your message has been sent.');
      return;
    }

    var payload = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      message: fields.message.value.trim(),
      _honey: honey ? honey.value : ''
    };

    setSending(true);
    var controller = 'AbortController' in window ? new AbortController() : null;
    var timeout = controller ? setTimeout(function () { controller.abort(); }, 15000) : null;

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller ? controller.signal : undefined
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          var ok = res.ok && (data.success === true || data.success === 'true');
          if (!ok) throw new Error((data && data.message) || ('Request failed (' + res.status + ')'));
          return data;
        });
      })
      .then(function () {
        form.reset();
        touched = {};
        Object.keys(fields).forEach(function (k) { showError(k, ''); });
        updateCounter();
        setStatus('success', 'Thanks — your message has been sent.', 'I’ll get back to you by email as soon as I can.');
      })
      .catch(function (err) {
        var reason = err && err.name === 'AbortError' ? 'The request timed out.' : 'Something went wrong while sending.';
        setStatus('error', 'Oops! Your message wasn’t sent.', reason + ' Please check your connection and try again.');
      })
      .then(function () {
        clearTimeout(timeout);
        setSending(false);
      });
  });
})();
