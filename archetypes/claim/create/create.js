(function () {
  const editable = document.querySelectorAll('[data-field]');
  const vendorName = document.querySelector('#vendor-name');
  const imageUpload = document.querySelector('#image-upload');
  const imageUploadButton = document.querySelector('#image-upload-button');
  const image = document.querySelector('#offer-image');
  const previewLink = document.querySelector('#preview-link');
  const previewToggle = document.querySelector('#preview-toggle');
  const inlinePreviewCard = document.querySelector('#inline-preview-card');
  const inlinePreview = document.querySelector('#inline-preview');
  const qrCode = document.querySelector('#qr-code');
  const copyButton = document.querySelector('#copy-link');
  const copyStatus = document.querySelector('#copy-status');
  const defaultImage = '../../assets/images/claim-image-arriving-soon.svg';
  const storageBucket = 'ropebridge-offer-images';
  const storageConfig = {
    url: 'https://chqwqnxxggswbsijxnio.supabase.co',
    publishableKey: 'sb_publishable_KY_sTlKcppTc8dlDZjCqaA_2XV6COmP'
  };

  let uploadedImageUrl = '';
  let uploadedImageAlt = '';
  let previewIsOpen = false;
  let previewRefreshTimer = null;

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
    const imageUrl = uploadedImageUrl || defaultImage;
    const imageAlt = uploadedImageAlt || 'Your image is arriving shortly';

    url.searchParams.set('vendor', vendor);
    url.searchParams.set('vendor_id', vendorId);
    url.searchParams.set('category', 'Free Sample');
    url.searchParams.set('title', field('title') || 'Free Sample');
    url.searchParams.set('description', field('description') || 'A local sample from this vendor.');
    url.searchParams.set('cta', field('cta') || 'Claim sample');
    url.searchParams.set('limit', field('limitNote') || 'One claim per person, per day.');
    url.searchParams.set('image', imageUrl);
    url.searchParams.set('image_alt', imageAlt);
    url.searchParams.set('campaign', vendorId + '-sample');
    url.searchParams.set('qr', vendorId + '-instant-qr');

    return url.toString();
  }

  function scheduleInlinePreviewRefresh(link) {
    if (!previewIsOpen || !inlinePreview) return;

    window.clearTimeout(previewRefreshTimer);
    previewRefreshTimer = window.setTimeout(function () {
      inlinePreview.src = link;
    }, 250);
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

    scheduleInlinePreviewRefresh(link);
  }

  function toggleInlinePreview() {
    previewIsOpen = !previewIsOpen;
    inlinePreviewCard.classList.toggle('is-visible', previewIsOpen);
    previewToggle.setAttribute('aria-expanded', String(previewIsOpen));
    previewToggle.textContent = previewIsOpen ? 'Hide preview' : 'Preview page';

    if (previewIsOpen) {
      inlinePreview.src = previewLink.href;
      inlinePreviewCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function extensionFor(file) {
    const extension = String(file.name || '').split('.').pop();

    if (extension && extension.length <= 5) {
      return extension.toLowerCase();
    }

    if (file.type === 'image/png') return 'png';
    if (file.type === 'image/webp') return 'webp';
    if (file.type === 'image/gif') return 'gif';

    return 'jpg';
  }

  function validateImage(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Use a JPG, PNG, WebP, or GIF image.');
    }

    if (file.size > maxSize) {
      throw new Error('Image is too large. Use a file under 5 MB.');
    }
  }

  async function uploadImage(file) {
    validateImage(file);

    const vendorId = slug(text(vendorName));
    const fileName = vendorId + '-' + Date.now() + '.' + extensionFor(file);
    const objectPath = vendorId + '/' + fileName;
    const uploadEndpoint = storageConfig.url.replace(/\/$/, '') + '/storage/v1/object/' + storageBucket + '/' + encodeURI(objectPath);

    const response = await fetch(uploadEndpoint, {
      method: 'POST',
      headers: {
        apikey: storageConfig.publishableKey,
        Authorization: 'Bearer ' + storageConfig.publishableKey,
        'Content-Type': file.type,
        'x-upsert': 'true'
      },
      body: file
    });

    if (!response.ok) {
      throw new Error('Image upload failed. Try a smaller image or try again.');
    }

    return storageConfig.url.replace(/\/$/, '') + '/storage/v1/object/public/' + storageBucket + '/' + encodeURI(objectPath);
  }

  function qrImageDataUrl() {
    const img = qrCode.querySelector('img');
    if (img && img.src) return img.src;

    const canvas = qrCode.querySelector('canvas');
    if (canvas) return canvas.toDataURL('image/png');

    return '';
  }

  function downloadQrCode() {
    const dataUrl = qrImageDataUrl();

    if (!dataUrl) {
      throw new Error('QR code is not ready yet.');
    }

    const vendorId = slug(text(vendorName));
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = vendorId + '-ropebridge-qr.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  }

  async function copyAndDownloadQr() {
    let copied = false;

    try {
      await navigator.clipboard.writeText(previewLink.href);
      copied = true;
    } catch (error) {
      console.error(error);
    }

    try {
      downloadQrCode();
      copyStatus.textContent = copied ? 'Link copied and QR code downloaded.' : 'QR code downloaded. Copy failed; use Open full page to copy the URL.';
      copyStatus.className = copied ? 'rb-status is-success' : 'rb-status is-error';
    } catch (error) {
      console.error(error);
      copyStatus.textContent = copied ? 'Link copied. QR download failed.' : 'Copy and QR download failed. Open the full page and try again.';
      copyStatus.className = 'rb-status is-error';
    }
  }

  editable.forEach(function (node) {
    node.addEventListener('input', update);
  });

  vendorName.addEventListener('input', update);
  previewToggle.addEventListener('click', toggleInlinePreview);

  imageUploadButton.addEventListener('click', function () {
    imageUpload.click();
  });

  imageUpload.addEventListener('change', async function () {
    const file = imageUpload.files && imageUpload.files[0];

    if (!file) return;

    uploadedImageUrl = '';
    uploadedImageAlt = (text(vendorName) || 'Vendor') + ' sample preview';
    image.src = URL.createObjectURL(file);
    image.alt = uploadedImageAlt;
    copyStatus.textContent = 'Uploading image...';
    copyStatus.className = 'rb-status';
    update();

    try {
      uploadedImageUrl = await uploadImage(file);
      copyStatus.textContent = 'Image uploaded. The QR code now uses this image.';
      copyStatus.className = 'rb-status is-success';
      update();
    } catch (error) {
      console.error(error);
      uploadedImageUrl = '';
      copyStatus.textContent = error.message || 'Image upload failed. The QR code will use the placeholder image.';
      copyStatus.className = 'rb-status is-error';
      update();
    }
  });

  copyButton.addEventListener('click', copyAndDownloadQr);

  update();
})();
