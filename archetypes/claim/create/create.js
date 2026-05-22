(function () {
  const editable = document.querySelectorAll('[data-field]');
  const vendorName = document.querySelector('#vendor-name');
  const vendorCategory = document.querySelector('#vendor-category');
  const imageUpload = document.querySelector('#image-upload');
  const image = document.querySelector('#offer-image');
  const previewLink = document.querySelector('#preview-link');
  const qrCode = document.querySelector('#qr-code');
  const copyButton = document.querySelector('#copy-link');
  const copyStatus = document.querySelector('#copy-status');
  const defaultImage = '../../assets/images/claim-image-arriving-soon.svg';

  function text(node) {
    return String(node && ('value' in node ? node.value : node.textContent) || '').replace(/\s+/g, ' ').trim();
  }

  function slug(value) {
    return String(value || 'vendor').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'vendor';
  }

  function field(name) {
    return text(document.querySelector('[data-field="' + name + '"]'));
  }

  function claimUrl() {
    const url = new URL(window.location.href);
    url.pathname = url.pathname.replace('/create/', '/');
    url.search = '';

    const vendor = text(vendorName) || 'Sample Vendor';
    const vendorId = slug(vendor);

    url.searchParams.set('vendor', vendor);
    url.searchParams.set('vendor_id', vendorId);
    url.searchParams.set('category', text(vendorCategory) || 'Free Sample');
    url.searchParams.set('title', field('title') || 'Free Sample');
    url.searchParams.set('description', field('description') || 'A local sample from this vendor.');
    url.searchParams.set('cta', field('cta') || 'Claim sample');
    url.searchParams.set('limit', field('limitNote') || 'One claim per person, per day.');
    url.searchParams.set('image', defaultImage);
    url.searchParams.set('image_alt', 'Your image is arriving shortly');
    url.searchParams.set('campaign', vendorId + '-sample');
    url.searchParams.set('qr', vendorId + '-instant-qr');

    return url.toString();
  }

  function update() {
    const link = claimUrl();

    previewLink.href = link;
    qrCode.innerHTML = '';

    if (window.QRCode) {
      new QRCode(qrCode, { text: link, width: 196, height: 196 });
    } else {
      qrCode.textContent = 'QR unavailable. Use the copied link instead.';
    }
  }

  editable.forEach(function (node) {
    node.addEventListener('input', update);
  });

  [vendorName, vendorCategory].forEach(function (node) {
    node.addEventListener('input', update);
  });

  imageUpload.addEventListener('change', function () {
    const file = imageUpload.files && imageUpload.files[0];

    if (!file) return;

    image.src = URL.createObjectURL(file);
    image.alt = (text(vendorName) || 'Vendor') + ' sample preview';
    copyStatus.textContent = 'Image preview updated. The scanned link will show the arriving-soon placeholder until image storage is added.';
    copyStatus.className = 'rb-status';
  });

  copyButton.addEventListener('click', function () {
    navigator.clipboard.writeText(previewLink.href).then(function () {
      copyStatus.textContent = 'Link copied.';
      copyStatus.className = 'rb-status is-success';
    }).catch(function () {
      copyStatus.textContent = 'Copy failed. Press and hold the button area to copy from browser tools.';
      copyStatus.className = 'rb-status is-error';
    });
  });

  update();
})();
