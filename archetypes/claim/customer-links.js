(function () {
  const params = new URLSearchParams(window.location.search);

  const ctaOrder = ['instagram', 'order', 'booking', 'facebook', 'tiktok', 'website', 'google'];
  const socialOrder = ['instagram', 'facebook', 'tiktok', 'google'];

  const labels = {
    instagram: 'Follow on Instagram',
    order: 'Order online',
    booking: 'Schedule an event',
    facebook: 'Follow on Facebook',
    tiktok: 'Follow on TikTok',
    website: 'Visit website',
    google: 'Google'
  };

  const shortLabels = {
    instagram: 'IG',
    facebook: 'FB',
    tiktok: 'TT',
    google: 'G'
  };

  const reasons = {
    instagram: 'See weekly specials, market updates, and new drops.',
    order: 'Order ahead, check availability, or plan your next pickup.',
    booking: 'Schedule an event, catering request, pickup, or special order.',
    facebook: 'See market reminders, weekly updates, and local announcements.',
    tiktok: 'See behind-the-scenes updates, drops, and tasting videos.',
    website: 'Find more details, updates, and ways to connect after the market.',
    google: 'Find hours, directions, reviews, and business details.'
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

    ctaOrder.forEach(function (key) {
      const existing = document.querySelector('[data-social="' + key + '"]');
      const value = clean(params.get(key)) || clean(existing && existing.getAttribute('href'));
      if (value) links[key] = value;
    });

    const action1Url = clean(params.get('action1_url'));
    const action2Url = clean(params.get('action2_url'));

    if (action1Url) {
      links.action1 = {
        href: action1Url,
        label: params.get('action1_label') || 'Order online'
      };
    }

    if (action2Url) {
      links.action2 = {
        href: action2Url,
        label: params.get('action2_label') || 'Schedule an event'
      };
    }

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

  function returnActionCandidates(links, primary) {
    const actions = [];

    if (links.action1) actions.push(links.action1);
    if (links.action2) actions.push(links.action2);

    if (!actions.length) {
      ['order', 'booking', 'website'].forEach(function (key) {
        if (links[key] && key !== primary) {
          actions.push({ href: links[key], label: labels[key] });
        }
      });
    }

    return actions.slice(0, 2);
  }

  function apply() {
    const section = document.querySelector('.rb-link-section');
    const stack = document.querySelector('.rb-link-stack');
    const heading = document.querySelector('#links-title');
    if (!section || !stack) return;

    const links = collectLinks();
    const available = ctaOrder.filter(function (key) { return links[key]; });
    const customActions = ['action1', 'action2'].filter(function (key) { return links[key]; });

    if (!available.length && !customActions.length) {
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

    if (primary) {
      const title = document.createElement('h2');
      title.className = 'rb-follow-title';
      title.textContent = labels[primary] + ' for ' + vendor + '.';

      const body = document.createElement('p');
      body.className = 'rb-follow-body';
      body.textContent = reasons[primary];

      const primaryLink = makeLink(labels[primary], links[primary], 'rb-button rb-follow-button');

      stack.appendChild(title);
      stack.appendChild(body);
      stack.appendChild(primaryLink);
    }

    const actions = returnActionCandidates(links, primary);
    if (actions.length) {
      const actionRow = document.createElement('div');
      actionRow.className = 'rb-return-actions';
      actions.forEach(function (item) {
        actionRow.appendChild(makeLink(item.label, item.href, 'rb-return-action'));
      });
      stack.appendChild(actionRow);
    }

    const socials = socialOrder.filter(function (key) { return links[key] && key !== primary; });
    if (socials.length) {
      const socialRow = document.createElement('div');
      socialRow.className = 'rb-social-icon-row';
      socials.forEach(function (key) {
        socialRow.appendChild(makeLink(shortLabels[key], links[key], 'rb-social-icon'));
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
