(function() {
  'use strict';

  const FORMSPREE_URL = "https://formspree.io/f/xkovzeny"; 

  let trigger, overlay, panel, closeBtn, form, submitBtn, statusEl;
  let nameInput, topicSelect, pageInput, messageTextarea, charCount;

  function init() {
    trigger         = document.getElementById('feedbackTrigger');
    overlay         = document.getElementById('feedbackOverlay');
    panel           = document.getElementById('feedbackPanel');
    closeBtn        = document.getElementById('feedbackClose');
    form            = document.getElementById('feedbackForm');
    submitBtn       = document.getElementById('feedbackSubmit');
    statusEl        = document.getElementById('feedbackStatus');
    nameInput       = document.getElementById('feedbackName');
    topicSelect     = document.getElementById('feedbackTopic');
    pageInput       = document.getElementById('feedbackPage');
    messageTextarea = document.getElementById('feedbackMessage');
    charCount       = document.getElementById('charCount');

    if (!trigger || !panel || !form) return;

    setPageName();

    trigger.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);
    form.addEventListener('submit', handleSubmit);
    messageTextarea.addEventListener('input', updateCharCount);

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        closePanel();
      }
    });

    window.addEventListener('scroll', function() {
      trigger.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
  }

  function openPanel() {
    panel.classList.add('open');
    overlay.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => nameInput && nameInput.focus(), 300);
  }

  function closePanel() {
    panel.classList.remove('open');
    overlay.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (trigger) trigger.focus();
  }

  function setPageName() {
    if (!pageInput) return;
    let title = document.title || '';
    title = title.replace(/\s*[—–|-]\s*Mohamed Abdalkader.*$/i, '');
    title = title.replace(/\s*\|\s*Mohamed Abdalkader.*$/i, '');
    if (!title || title.trim() === 'Mohamed Abdalkader') {
      let path = window.location.pathname;
      let page = path.split('/').pop().replace('.html', '');
      title = (!page || page === 'index') ? 'Home' : page.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }
    pageInput.value = title.trim() || 'Unknown Page';
  }

  function updateCharCount() {
    if (!charCount || !messageTextarea) return;
    charCount.textContent = messageTextarea.value.length;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: (nameInput?.value || 'Anonymous').trim(),
      topic: (topicSelect?.value || 'General').trim(),
      page: (pageInput?.value || 'Unknown').trim(),
      message: (messageTextarea?.value || '').trim()
    };

    if (!data.message) {
      showStatus('error', '⚠ Please write a message before sending.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    hideStatus();

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        showStatus('success', '✓ Feedback sent! Thank you.');
        form.reset();
        setPageName();
        updateCharCount();
        setTimeout(closePanel, 2500);
      } else {
        showStatus('error', '⚠ Failed to send. Please try again.');
      }
    } catch (err) {
      showStatus('error', '⚠ Network error. Please check your connection.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Feedback';
    }
  }

  function showStatus(type, msg) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'feedback-status ' + type;
    statusEl.style.display = 'block';
  }

  function hideStatus() {
    if (!statusEl) return;
    statusEl.style.display = 'none';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
