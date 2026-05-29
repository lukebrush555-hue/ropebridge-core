(async function () {
  const storageKeys = {
    connected: "ropebridge-connected",
    name: "ropebridge-name",
    phone: "ropebridge-phone"
  };

  const remoteConfig = await loadRemoteConfig();
  const config = applyUrlConfig(mergeConfig(window.ROPEBRIDGE_CONFIG || {}, remoteConfig || {}));
  const copy = config.copy || {};
  const vendor = config.vendor || {};
  const offer = config.offer || {};
  const tracking = config.tracking || {};
  const supabaseConfig = config.supabase || {};

  const states = {
    connect: document.querySelector("#state-connect"),
    claim: document.querySelector("#state-claim"),
    redeem: document.querySelector("#state-redeem"),
    connected: document.querySelector("#state-connected")
  };

  const connectForm = document.querySelector("#connect-form");
  const claimForm = document.querySelector("#claim-form");
  const redeemForm = document.querySelector("#redeem-form");
  const submitButton = document.querySelector("#submit-button");
  const redeemStatus = document.querySelector("#redeem-status");
  const status = document.querySelector("#form-status");
  const nameInput = document.querySelector("#connect-name");
  const phoneInput = document.querySelector("#connect-phone");
  const recognitionBanner = document.querySelector("#recognition-banner");
  const pinInputs = Array.from(document.querySelectorAll(".rb-pin-input"));

  const defaultSubmitLabel = submitButton.textContent.trim();

  applyConfigText();
  applyConfigAssets();
  applySocialLinks();
  installPhoneFormatter();
  installPinInputs();

  const savedVisitor = getSavedVisitor();

  if (savedVisitor.name && nameInput) {
    nameInput.value = savedVisitor.name;
  }

  if (savedVisitor.phone && phoneInput) {
    phoneInput.value = formatPhoneForDisplay(savedVisitor.phone);
  }

  if (savedVisitor.connected && savedVisitor.phone) {
    showRecognitionIfAvailable();
    activateState(states.claim);
  } else {
    activateState(states.connect);
  }

  connectForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!connectForm.checkValidity()) {
      connectForm.reportValidity();
      return;
    }

    saveVisitorFromForm();
    showRecognitionIfAvailable();
    activateState(states.claim);
  });

  claimForm.addEventListener("submit", function (event) {
    event.preventDefault();
    setStatus("", null);
    activateState(states.redeem);
    setTimeout(function () {
      if (pinInputs[0]) pinInputs[0].focus();
    }, 150);
  });

  redeemForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    setRedeemStatus("", null);

    const expectedPin = String((config.redeem && config.redeem.pin) || "1234");
    const enteredPin = pinInputs.map(function (input) { return input.value; }).join("");

    if (enteredPin.length !== 4) {
      setRedeemStatus("Enter the 4-digit code from the vendor.", "error");
      return;
    }

    if (enteredPin !== expectedPin) {
      setRedeemStatus("That code does not match. Ask the vendor to confirm it.", "error");
      pinInputs.forEach(function (input) { input.value = ""; });
      if (pinInputs[0]) pinInputs[0].focus();
      return;
    }

    const hasSupabaseConfig =
      supabaseConfig.url &&
      supabaseConfig.publishableKey &&
      supabaseConfig.url !== "YOUR_SUPABASE_URL" &&
      supabaseConfig.publishableKey !== "YOUR_SUPABASE_PUBLISHABLE_KEY";

    if (!hasSupabaseConfig) {
      setRedeemStatus("Redeemed locally. Supabase is not configured yet.", "success");
      activateState(states.connected);
      return;
    }

    const redeemButton = document.querySelector("#redeem-button");
    if (redeemButton) {
      redeemButton.disabled = true;
      redeemButton.textContent = "Redeeming...";
    }

    try {
      await submitInteraction();
      setRedeemStatus("Successfully verified.", "success");
      activateState(states.connected);
    } catch (error) {
      console.error(error);
      setRedeemStatus("Redeemed on this device, but we could not save it yet.", "error");
      activateState(states.connected);
    } finally {
      if (redeemButton) {
        redeemButton.disabled = false;
        redeemButton.textContent = "Redeem";
      }
      submitButton.disabled = false;
      submitButton.textContent = offer.cta || defaultSubmitLabel;
    }
  });

  async function loadRemoteConfig() {
    const params = new URLSearchParams(window.location.search);
    const configId = params.get("c");

    if (!configId || !/^[a-z0-9-]+$/i.test(configId)) {
      return null;
    }

    const endpoint = "https://chqwqnxxggswbsijxnio.supabase.co/storage/v1/object/public/ropebridge-offer-images/claim-configs/" + encodeURIComponent(configId) + ".json";

    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) throw new Error("Remote config unavailable.");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  function mergeConfig(baseConfig, overrideConfig) {
    const merged = Object.assign({}, baseConfig, overrideConfig);
    merged.vendor = Object.assign({}, baseConfig.vendor || {}, overrideConfig.vendor || {});
    merged.offer = Object.assign({}, baseConfig.offer || {}, overrideConfig.offer || {});
    merged.copy = Object.assign({}, baseConfig.copy || {}, overrideConfig.copy || {});
    merged.tracking = Object.assign({}, baseConfig.tracking || {}, overrideConfig.tracking || {});
    merged.supabase = Object.assign({}, baseConfig.supabase || {}, overrideConfig.supabase || {});
    merged.redeem = Object.assign({}, baseConfig.redeem || {}, overrideConfig.redeem || {});
    return merged;
  }

  function getSavedVisitor() {
    return {
      connected: localStorage.getItem(storageKeys.connected) === "true",
      name: localStorage.getItem(storageKeys.name) || "",
      phone: localStorage.getItem(storageKeys.phone) || ""
    };
  }

  function digitsOnly(value) {
    return String(value || "").replace(/\D/g, "").slice(0, 10);
  }

  function formatPhoneForDisplay(value) {
    const digits = digitsOnly(value.replace(/^\+1\s*/, ""));

    if (digits.length <= 3) {
      return digits ? `(${digits}` : "";
    }

    if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }

  function normalizePhone(value) {
    const digits = digitsOnly(value);
    return digits ? `+1 ${digits}` : "";
  }

  function installPhoneFormatter() {
    if (!phoneInput) return;

    phoneInput.addEventListener("input", function () {
      phoneInput.value = formatPhoneForDisplay(phoneInput.value);
    });
  }

  function installPinInputs() {
    pinInputs.forEach(function (input, index) {
      input.addEventListener("input", function () {
        input.value = String(input.value || "").replace(/\D/g, "").slice(0, 1);
        if (input.value && pinInputs[index + 1]) {
          pinInputs[index + 1].focus();
        }
      });

      input.addEventListener("keydown", function (event) {
        if (event.key === "Backspace" && !input.value && pinInputs[index - 1]) {
          pinInputs[index - 1].focus();
        }
      });

      input.addEventListener("paste", function (event) {
        event.preventDefault();
        const digits = String(event.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 4);
        digits.split("").forEach(function (digit, digitIndex) {
          if (pinInputs[digitIndex]) pinInputs[digitIndex].value = digit;
        });
        const focusIndex = Math.min(digits.length, pinInputs.length - 1);
        if (pinInputs[focusIndex]) pinInputs[focusIndex].focus();
      });
    });
  }

  function saveVisitorFromForm() {
    const formData = new FormData(connectForm);
    const name = String(formData.get("name") || "").trim();
    const normalizedPhone = normalizePhone(formData.get("phone"));

    localStorage.setItem(storageKeys.connected, "true");
    localStorage.setItem(storageKeys.name, name);
    localStorage.setItem(storageKeys.phone, normalizedPhone.trim());
  }

  function showRecognitionIfAvailable() {
    const visitor = getSavedVisitor();

    if (!recognitionBanner || !visitor.connected) {
      return;
    }

    recognitionBanner.textContent = visitor.name
      ? `Welcome back, ${visitor.name}.`
      : "Welcome back.";
    recognitionBanner.classList.add("is-visible");
  }

  function activateState(targetState) {
    Object.values(states).forEach(function (section) {
      if (section) section.classList.remove("is-active");
    });

    targetState.classList.add("is-active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setStatus(message, type) {
    status.textContent = message || "";
    status.className = "rb-status";

    if (type) {
      status.classList.add(`is-${type}`);
    }
  }

  function setRedeemStatus(message, type) {
    redeemStatus.textContent = message || "";
    redeemStatus.className = "rb-status";

    if (type) {
      redeemStatus.classList.add(`is-${type}`);
    }
  }

  function applyConfigText() {
    const values = {
      CONNECT_HEADLINE: copy.connectHeadline,
      CONNECT_SUBHEADLINE: copy.connectSubheadline,
      CONNECT_BODY: copy.connectBody,
      CONNECT_PRIMARY_ACTION: copy.connectPrimaryAction,
      VENDOR_NAME: vendor.name,
      PRODUCT_NAME: offer.title,
      PRODUCT_DESCRIPTION: offer.description,
      CTA_LABEL: offer.cta,
      LIMIT_NOTE: offer.limitNote,
      CONNECTED_HEADLINE: copy.connectedHeadline,
      CONNECTED_BODY: copy.connectedBody,
      CONNECTED_NOTE: copy.connectedNote
    };

    document.querySelectorAll("[data-config-text]").forEach(function (element) {
      const value = values[element.dataset.configText];
      if (value) {
        element.textContent = value;
      }
    });
  }

  function applyConfigAssets() {
    document.querySelectorAll("[data-config-src]").forEach(function (element) {
      if (offer.image) {
        element.setAttribute("src", offer.image);
      }
    });

    document.querySelectorAll("[data-config-alt]").forEach(function (element) {
      if (offer.imageAlt) {
        element.setAttribute("alt", offer.imageAlt);
      }
    });
  }

  function applySocialLinks() {
    if (!vendor.links) {
      return;
    }

    document.querySelectorAll("[data-social]").forEach(function (link) {
      const key = link.dataset.social;
      const value = vendor.links[key];

      if (value) {
        link.href = value;
        link.target = "_blank";
        link.rel = "noreferrer";
      } else {
        link.remove();
      }
    });
  }

  function applyUrlConfig(baseConfig) {
    const params = new URLSearchParams(window.location.search);

    if (!Array.from(params.keys()).length) {
      return baseConfig;
    }

    const nextConfig = Object.assign({}, baseConfig);
    const nextVendor = Object.assign({}, baseConfig.vendor || {});
    const nextOffer = Object.assign({}, baseConfig.offer || {});
    const nextTracking = Object.assign({}, baseConfig.tracking || {});
    const nextLinks = Object.assign({}, nextVendor.links || {});
    const nextRedeem = Object.assign({}, baseConfig.redeem || {});

    if (params.get("vendor")) nextVendor.name = params.get("vendor");
    if (params.get("vendor_id")) nextVendor.id = params.get("vendor_id");
    if (params.get("category")) nextVendor.category = params.get("category");

    if (params.get("title")) nextOffer.title = params.get("title");
    if (params.get("description")) nextOffer.description = params.get("description");
    if (params.get("cta")) nextOffer.cta = params.get("cta");
    if (params.get("limit")) nextOffer.limitNote = params.get("limit");
    if (params.get("image")) nextOffer.image = params.get("image");
    if (params.get("image_alt")) nextOffer.imageAlt = params.get("image_alt");

    if (params.get("website")) nextLinks.website = params.get("website");
    if (params.get("order")) nextLinks.order = params.get("order");
    if (params.get("instagram")) nextLinks.instagram = params.get("instagram");
    if (params.get("facebook")) nextLinks.facebook = params.get("facebook");
    if (params.get("tiktok")) nextLinks.tiktok = params.get("tiktok");
    if (params.get("google")) nextLinks.google = params.get("google");
    if (params.get("booking")) nextLinks.booking = params.get("booking");

    if (params.get("pin")) nextRedeem.pin = params.get("pin");

    if (params.get("campaign")) nextConfig.campaignId = params.get("campaign");
    if (params.get("qr")) nextTracking.qrId = params.get("qr");

    nextVendor.links = nextLinks;
    nextConfig.vendor = nextVendor;
    nextConfig.offer = nextOffer;
    nextConfig.tracking = nextTracking;
    nextConfig.redeem = nextRedeem;

    return nextConfig;
  }

  async function submitInteraction() {
    const visitor = getSavedVisitor();
    const endpoint = `${supabaseConfig.url.replace(/\/$/, "")}/rest/v1/interactions`;

    const payload = {
      archetype: "claim",
      campaign_id: config.campaignId,
      vendor_id: vendor.id,
      qr_id: tracking.qrId,
      visitor_name: visitor.name || "RopeBridge Visitor",
      visitor_phone: visitor.phone || "pending-connect",
      business_name: vendor.name,
      action_label: offer.cta,
      metadata: {
        offer_title: offer.title,
        vendor_category: vendor.category,
        remembered: visitor.connected,
        source_route: window.location.pathname,
        redeemed: true
      }
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: supabaseConfig.publishableKey,
        Authorization: `Bearer ${supabaseConfig.publishableKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Interaction insert failed.");
    }
  }
})();