(function () {
  const params = new URLSearchParams(window.location.search);
  const order = ['instagram', 'order', 'facebook', 'tiktok', 'website'];
  const labels = {
    instagram: 'Follow on Instagram',
    order: 'Order online',
    facebook: 'Follow on Facebook',
    tiktok: 'Follow on TikTok',
    website: 'Visit website'
  };
  const reasons = {
    instagram: 'See weekly specials, market updates, and new drops.',
    order: 'Order ahead, check availability, or plan your next pickup.',
    facebook: 'See market reminders, weekly updates, and local announcements.',
    tiktok: 'See behind-the-scenes updates, drops, and tasting videos.',
    website: 'Find more details, updates, and ways to connect after the market.'
  };

  function clean(value) {
    const text = String(value || '').trim();
    if (!text || text === '#') return '';
    if (/^https?:\/\//i.test(text)) return text;
    return 'https://' + text;
  }

  function vendorName() {
    const node = document.querySelector('[data-config-text="VENDOR_NAME"]');
    return node && node.textContent.trim() ? node.textContent.trim() : 'this vendor';
  }

  function collectLinks() {
    const links = {};
    order.forEach(function (key) {
      const existing = document.querySelector('[data-social="' + key + '"]');
      const value = clean(params.get(key)) || clean(existing && existing.getAttribute('href'));
      if (value) links[key] = value;
    });
    return links;
  }

  function makeLink(label, href, className) {
    const link = document.createElement('a');
    link.className = className;
    link.href = href;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = label;
    return link;
  }

  function apply() {
    const section = document.querySelector('.rb-link-section');
    const stack = document.querySelector('.rb-link-stack');
    const heading = document.querySelector('#links-title');
    if (!section || !stack) return;

    const links = collectLinks();
    const available = order.filter(function (key) { return links[key]; });
    if (!available.length) {
      section.remove();
      return;
    }

    const requested = params.get('primary_cta');
    const primary = available.indexOf(requested) >= 0 ? requested : available[0];
    const vendor = vendorName();

    section.classList.add('rb-follow-section');
    if (heading) heading.textContent = 'Next from this vendor';
    stack.className = 'rb-follow-card-inner';
    stack.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'rb-follow-title';
    title.textContent = labels[primary] + ' for ' + vendor + '.';

    const body = document.createElement('p');
    body.className = 'rb-follow-body';
    body.textContent = reasons[primary];

    const primaryLink = makeLink(labels[primary], links[primary], 'rb-button rb-follow-button');

    const secondary = document.createElement('div');
    secondary.className = 'rb-secondary-link-line';

    available.forEach(function (key) {
      if (key !== primary) {
        secondary.appendChild(makeLink(labels[key], links[key], 'rb-secondary-link'));
      }
    });

    stack.appendChild(title);
    stack.appendChild(body);
    stack.appendChild(primaryLink);
    if (secondary.childNodes.length) stack.appendChild(secondary);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
