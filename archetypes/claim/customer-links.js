(function () {
  const params = new URLSearchParams(window.location.search);
  const tiktok = params.get('tiktok');

  if (!tiktok) return;

  function applyTikTokLink() {
    const link = document.querySelector('[data-social="tiktok"]');
    if (!link) return;

    link.href = tiktok;
    link.target = '_blank';
    link.rel = 'noreferrer';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTikTokLink);
  } else {
    applyTikTokLink();
  }
})();
