// Mobile nav toggle + active link + footer year
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Highlight active nav link based on current path
  const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    if (href && href !== '#' && (path === href || (href !== '/' && path.startsWith(href)))) {
      a.classList.add('active');
    }
  });

  // Trigger the animated-logo iframe only when scrolled into view
  document.querySelectorAll('.feature-iframe iframe').forEach(iframe => {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const send = () => iframe.contentWindow && iframe.contentWindow.postMessage('play', '*');
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') send();
          else iframe.addEventListener('load', send, { once: true });
          send();
          obs.unobserve(iframe);
        }
      });
    }, { threshold: 0.35 });
    io.observe(iframe);
  });

  // AJAX submit for the contact form — show inline thank-you instead of redirect
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalLabel = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      try {
        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok && (json.success === true || json.success === 'true')) {
          form.innerHTML = `
            <div class="form-success">
              <div class="form-success-mark">✓</div>
              <h3>Thank you!</h3>
              <p>We got your message and will be in touch within 24 hours.</p>
            </div>`;
        } else {
          if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
          alert((json && json.message) || 'Something went wrong. Please try again or email 412events724@gmail.com.');
        }
      } catch (err) {
        if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
        alert('Network error. Please try again or email 412events724@gmail.com.');
      }
    });
  }
});
