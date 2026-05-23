(function () {
  const editable = document.querySelectorAll('[data-field]');
  const vendorName = document.querySelector('#vendor-name');
  const imageUpload = document.querySelector('#image-upload');
  const imageUploadButton = document.querySelector('#image-upload-button');
  const image = document.querySelector('#offer-image');
  const previewToggle = document.querySelector('#preview-toggle');
  const submitApproval = document.querySelector('#submit-approval');
  const inlinePreviewCard = document.querySelector('#inline-preview-card');
  const inlinePreview = document.querySelector('#inline-preview');
  const status = document.querySelector('#copy-status');
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

  function placeholder(node) {
    return String(node && node.dataset && node.dataset.placeholder || '').trim();
  }

  function valueOrPlaceholder(node, fallback) {
    return text(node) || placeholder(node) || fallback;
  }

  function slug(value) {
    return String(value || 'vendor').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'vendor';
  }

  function fieldNode(name) {
    return document.querySelector('[data-field="' + name + '"]');
  }

  function field(name, fallback) {
    return valueOrPlaceholder(fieldNode(name), fallback);
  }

  function claimUrl() {
    const url = new URL(window.location.href);
    url.pathname = url.pathname.replace('/create/', '/');
    url.search = '';

    const vendor = valueOrPlaceholder(vendorName, 'Sample Vendor');
    const vendorId = slug(vendor);
    const imageUrl = uploadedImageUrl || defaultImage;
    const imageAlt = uploadedImageAlt || vendor + ' sample preview';

    url.searchParams.set('vendor', vendor);
    url.searchParams.set('vendor_id', vendorId);
    url.searchParams.set('category', 'Free Sample');
    url.searchParams.set('title', field('title', 'Free Sample'));
    url.searchParams.set('description', field('description', 'A local sample from this vendor.'));
    url.searchParams.set('cta', field('cta', 'Claim sample'));
    url.searchParams.set('limit', field('limitNote', 'One claim per person, per day.'));
    url.searchParams.set('image', imageUrl);
    url.searchParams.set('image_alt', imageAlt);
    url.searchParams.set('campaign', vendorId + '-sample');
    url.searchParams.set('qr', vendorId + '-instant-qr');

    return url.toString();
  }

  function update() {
    scheduleInlinePreviewRefresh(claimUrl());
  }

  function scheduleInlinePreviewRefresh(link) {
    if (!previewIsOpen || !inlinePreview) return;

    window.clearTimeout(previewRefreshTimer);
    previewRefreshTimer = window.setTimeout(function () {
      inlinePreview.src = link;
    }, 250);
  }

  function toggleInlinePreview() {
    previewIsOpen = !previewIsOpen;
    inlinePreviewCard.classList.toggle('is-visible', previewIsOpen);
    previewToggle.setAttribute('aria-expanded', String(previewIsOpen));
    previewToggle.textContent = previewIsOpen ? 'Hide preview' : 'Preview page';
    submitApproval.hidden = !previewIsOpen;

    if (previewIsOpen) {
      inlinePreview.src = claimUrl();
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

    if (!allowedTypes.includes(file.type)) throw new Error('Use a JPG, PNG, WebP, or GIF image.');
    if (file.size > maxSize) throw new Error('Image is too large. Use a file under 5 MB.');
  }

  async function uploadImage(file) {
    validateImage(file);

    const vendorId = slug(valueOrPlaceholder(vendorName, 'vendor'));
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

    if (!response.ok) throw new Error('Image upload failed. Try a smaller image or try again.');
    return storageConfig.url.replace(/\/$/, '') + '/storage/v1/object/public/' + storageBucket + '/' + encodeURI(objectPath);
  }

  function validateSubmission() {
    if (!text(vendorName)) throw new Error('Add a business name before submitting.');
    if (!text(fieldNode('title'))) throw new Error('Add a sample name before submitting.');
  }

  async function handleSubmitApproval() {
    status.textContent = '';
    status.className = 'rb-status';

    try {
      validateSubmission();
      await navigator.clipboard.writeText(claimUrl());
      submitApproval.disabled = true;
      submitApproval.textContent = 'Submitted';
      status.textContent = 'Submitted for approval. The draft link was copied for review.';
      status.className = 'rb-status is-success';
    } catch (error) {
      console.error(error);
      status.textContent = error.message || 'Submission failed. Please try again.';
      status.className = 'rb-status is-error';
    }
  }

  editable.forEach(function (node) {
    node.addEventListener('input', update);
  });

  vendorName.addEventListener('input', update);
  previewToggle.addEventListener('click', toggleInlinePreview);
  submitApproval.addEventListener('click', handleSubmitApproval);

  imageUploadButton.addEventListener('click', function () {
    imageUpload.click();
  });

  imageUpload.addEventListener('change', async function () {
    const file = imageUpload.files && imageUpload.files[0];
    if (!file) return;

    uploadedImageUrl = '';
    uploadedImageAlt = valueOrPlaceholder(vendorName, 'Vendor') + ' sample preview';
    image.src = URL.createObjectURL(file);
    image.alt = uploadedImageAlt;
    status.textContent = 'Uploading image...';
    status.className = 'rb-status';
    update();

    try {
      uploadedImageUrl = await uploadImage(file);
      status.textContent = 'Image uploaded.';
      status.className = 'rb-status is-success';
      update();
    } catch (error) {
      console.error(error);
      uploadedImageUrl = '';
      status.textContent = error.message || 'Image upload failed. The draft will use the placeholder image.';
      status.className = 'rb-status is-error';
      update();
    }
  });

  update();
})();
