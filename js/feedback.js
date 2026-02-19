(function() {
  'use strict';

  const TELEGRAM_TOKEN = "8205587724:AAFOG2WqeLB6nafaw6t79A7jD-d2z4gMkxE"; 
  const TELEGRAM_CHAT_ID = "1088552029";

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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
    });

    window.addEventListener('scroll', () => {
      trigger.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
  }

  function openPanel() {
    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { if (nameInput) nameInput.focus(); }, 300);
  }

  function closePanel() {
    panel.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function setPageName() {
    if (!pageInput) return;
    let title = document.title || 'Home';
    title = title.replace(/\s*[—–|-]\s*Mohamed Abdalkader.*$/i, '');
    pageInput.value = title.trim();
  }

  function updateCharCount() {
    if (charCount && messageTextarea) charCount.textContent = messageTextarea.value.length;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: (nameInput?.value || 'Anonymous').trim(),
      topic: (topicSelect?.value || 'General').trim(),
      page: (pageInput?.value || 'Unknown').trim(),
      message: (messageTextarea?.value || '').trim()
    };

    if (!data.message) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    hideStatus();

    // تجهيز النص بصيغة MarkdownV2
    const escape = (s) => s.replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
    const text = [
      `📬 *New Feedback — Portfolio*`,
      ``,
      `👤 *Name:* ${escape(data.name)}`,
      `🏷️ *Topic:* ${escape(data.topic)}`,
      `📄 *Page:* ${escape(data.page)}`,
      ``,
      `💬 *Message:*`,
      escape(data.message),
    ].join("\n");

    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: "MarkdownV2"
        })
      });

      if (res.ok) {
        showStatus('success', '✓ Sent directly to Telegram!');
        form.reset();
        updateCharCount();
        setTimeout(closePanel, 2000);
      } else {
        showStatus('error', '⚠ Telegram API Error.');
      }
    } catch (err) {
      showStatus('error', '⚠ Connection failed.');
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

  function hideStatus() { if (statusEl) statusEl.style.display = 'none'; }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();