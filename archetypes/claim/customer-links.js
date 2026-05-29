(function () {
  const params = new URLSearchParams(window.location.search);
  const actionOrder = ['order', 'booking', 'website'];
  const socialOrder = ['instagram', 'facebook', 'tiktok', 'google'];

  const labels = {
    order: 'Order Online',
    booking: 'Schedule an Event',
    website: 'Website',
    instagram: 'Instagram',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    google: 'Google'
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

  function getLink(key) {
    const existing = document.querySelector('[data-social="' + key + '"]');
    return clean(params.get(key)) || clean(existing && existing.getAttribute('href'));
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

  function collectActions() {
    const actions = [];
    const action1Url = clean(params.get('action1_url'));
    const action2Url = clean(params.get('action2_url'));

    if (action1Url) {
      actions.push({ href: action1Url, label: params.get('action1_label') || 'Order Online' });
    }

    if (action2Url) {
      actions.push({ href: action2Url, label: params.get('action2_label') || 'Schedule an Event' });
    }

    if (!actions.length) {
      actionOrder.forEach(function (key) {
        const href = getLink(key);
        if (href) actions.push({ href: href, label: labels[key] });
      });
    }

    return actions.slice(0, 2);
  }

  function collectSocials() {
    return socialOrder.map(function (key) {
      return { key: key, href: getLink(key), label: labels[key] };
    }).filter(function (item) {
      return item.href;
    });
  }

  function apply() {
    const connectedCard = document.querySelector('.rb-connected-card');
    const section = document.querySelector('.rb-link-section');
    const stack = document.querySelector('.rb-link-stack');
    const heading = document.querySelector('#links-title');

    if (connectedCard) connectedCard.remove();
    if (!section || !stack) return;

    const actions = collectActions();
    const socials = collectSocials();

    if (!actions.length && !socials.length) {
      section.remove();
      return;
    }

    section.classList.add('rb-return-card-section');
    if (heading) heading.remove();
    stack.className = 'rb-return-card-inner';
    stack.innerHTML = '';

    const vendor = document.createElement('h1');
    vendor.className = 'rb-return-vendor';
    vendor.textContent = vendorName();
    stack.appendChild(vendor);

    if (actions.length) {
      const actionRow = document.createElement('div');
      actionRow.className = 'rb-return-actions';
      actions.forEach(function (item) {
        actionRow.appendChild(makeLink(item.label, item.href, 'rb-return-action'));
      });
      stack.appendChild(actionRow);
    }

    if (socials.length) {
      const socialRow = document.createElement('div');
      socialRow.className = 'rb-social-text-row';
      socials.forEach(function (item, index) {
        if (index) {
          const dot = document.createElement('span');
          dot.className = 'rb-social-dot';
          dot.textContent = '·';
          socialRow.appendChild(dot);
        }
        socialRow.appendChild(makeLink(item.label, item.href, 'rb-social-text-link'));
      });
      stack.appendChild(socialRow);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
