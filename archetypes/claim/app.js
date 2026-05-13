(function () {
  const storageKeys = {
    connected: "ropebridge-connected",
    name: "ropebridge-name",
    phone: "ropebridge-phone"
  };

  const config = window.ROPEBRIDGE_CONFIG || {};
  const copy = config.copy || {};
  const vendor = config.vendor || {};
  const offer = config.offer || {};
  const tracking = config.tracking || {};
  const supabaseConfig = config.supabase || {};

  const states = {
    connect: document.querySelector("#state-connect"),
    claim: document.querySelector("#state-claim"),
    connected: document.querySelector("#state-connected")
  };

  const connectForm = document.querySelector("#connect-form");
  const claimForm = document.querySelector("#claim-form");
  const submitButton = document.querySelector("#submit-button");
  const status = document.querySelector("#form-status");
  const nameInput = document.querySelector("#connect-name");
  const phoneInput = document.querySelector("#connect-phone");
  const recognitionBanner = document.querySelector("#recognition-banner");

  const defaultSubmitLabel = submitButton.textContent.trim();

  applyConfigText();
  applyConfigAssets();
  applySocialLinks();

  const savedVisitor = getSavedVisitor();

  if (savedVisitor.name && nameInput) {
    nameInput.value = savedVisitor.name;
  }

  if (savedVisitor.phone && phoneInput) {
    phoneInput.value = savedVisitor.phone.replace(/^\+1\s*/, "");
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

  claimForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    setStatus("", null);

    const hasSupabaseConfig =
      supabaseConfig.url &&
      supabaseConfig.publishableKey &&
      supabaseConfig.url !== "YOUR_SUPABASE_URL" &&
      supabaseConfig.publishableKey !== "YOUR_SUPABASE_PUBLISHABLE_KEY";

    if (!hasSupabaseConfig) {
      setStatus("Supabase is not configured yet. Add the project URL and publishable key to the demo config.", "error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Saving...";

    try {
      await submitInteraction();
      activateState(states.connected);
    } catch (error) {
      console.error(error);
      setStatus("We could not save that yet. Please try again or show this screen to the vendor.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = offer.cta || defaultSubmitLabel;
    }
  });

  function getSavedVisitor() {
    return {
      connected: localStorage.getItem(storageKeys.connected) === "true",
      name: localStorage.getItem(storageKeys.name) || "",
      phone: localStorage.getItem(storageKeys.phone) || ""
    };
  }

  function normalizePhone(value) {
    return String(value || "").replace(/[^0-9+]/g, "").trim();
  }

  function saveVisitorFromForm() {
    const formData = new FormData(connectForm);
    const name = String(formData.get("name") || "").trim();
    const phone = normalizePhone(formData.get("phone"));
    const normalizedPhone = phone.startsWith("+1") ? phone : `+1 ${phone}`;

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
      section.classList.remove("is-active");
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

  function applyConfigText() {
    const values = {
      CONNECT_HEADLINE: copy.connectHeadline,
      CONNECT_SUBHEADLINE: copy.connectSubheadline,
      CONNECT_BODY: copy.connectBody,
      CONNECT_PRIMARY_ACTION: copy.connectPrimaryAction,
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
        source_route: window.location.pathname
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
