(function () {
  const storageKeys = {
    connected: "ropebridge-connected",
    name: "ropebridge-name",
    phone: "ropebridge-phone"
  };

  const config = window.ROPEBRIDGE_CONFIG || {};
  const stateNodes = Array.from(document.querySelectorAll("[data-state]"));
  const connectForm = document.querySelector("[data-connect-form]");
  const claimForm = document.querySelector("[data-claim-form]");
  const claimButton = document.querySelector("[data-claim-button]");
  const claimError = document.querySelector("[data-claim-error]");
  const recognition = document.querySelector("[data-recognition]");

  const rememberedVisitor = getRememberedVisitor();

  renderOffer();
  showState(rememberedVisitor ? "claim" : "connect");

  if (rememberedVisitor) {
    recognition.textContent = `Welcome back, ${rememberedVisitor.name}.`;
    recognition.hidden = false;
  }

  connectForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(connectForm);
    const visitorName = String(formData.get("visitor_name") || "").trim();
    const visitorPhone = String(formData.get("visitor_phone") || "").trim();

    if (!visitorName || !visitorPhone) {
      return;
    }

    localStorage.setItem(storageKeys.connected, "true");
    localStorage.setItem(storageKeys.name, visitorName);
    localStorage.setItem(storageKeys.phone, visitorPhone);
    recognition.hidden = true;
    showState("claim");
  });

  claimForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    claimError.textContent = "";
    claimButton.disabled = true;

    try {
      await insertInteraction();
      showState("connected");
    } catch (error) {
      claimError.textContent = "Something did not connect. Please try again.";
      claimButton.disabled = false;
    }
  });

  function renderOffer() {
    const offer = config.offer || {};
    document.querySelector("[data-offer-image]").src = offer.image || "";
    document.querySelector("[data-offer-image]").alt = offer.imageAlt || "";
    document.querySelector("[data-offer-title]").textContent = offer.title || "Claim";
    document.querySelector("[data-offer-description]").textContent = offer.description || "";
    document.querySelector("[data-claim-button]").textContent = offer.cta || "Claim";
    document.querySelector("[data-limit-note]").textContent = offer.limitNote || "";
  }

  function showState(nextState) {
    stateNodes.forEach(function (node) {
      node.dataset.active = String(node.dataset.state === nextState);
    });
  }

  function getRememberedVisitor() {
    const connected = localStorage.getItem(storageKeys.connected) === "true";
    const name = localStorage.getItem(storageKeys.name);
    const phone = localStorage.getItem(storageKeys.phone);

    if (!connected || !name || !phone) {
      return null;
    }

    return { name, phone };
  }

  async function insertInteraction() {
    const visitor = getRememberedVisitor();
    const supabaseConfig = config.supabase || {};
    const hasSupabaseConfig =
      supabaseConfig.url &&
      supabaseConfig.publishableKey &&
      supabaseConfig.url !== "YOUR_SUPABASE_URL" &&
      supabaseConfig.publishableKey !== "YOUR_SUPABASE_PUBLISHABLE_KEY";

    if (!hasSupabaseConfig || !window.supabase) {
      throw new Error("Supabase is not configured.");
    }

    const client = window.supabase.createClient(
      supabaseConfig.url,
      supabaseConfig.publishableKey
    );

    const payload = {
      archetype: "claim",
      campaign_id: config.campaignId,
      vendor_id: config.vendor && config.vendor.id,
      qr_id: config.tracking && config.tracking.qrId,
      visitor_name: visitor && visitor.name,
      visitor_phone: visitor && visitor.phone,
      action_label: config.offer && config.offer.cta,
      metadata: {
        offer_title: config.offer && config.offer.title,
        vendor_category: config.vendor && config.vendor.category,
        remembered: Boolean(rememberedVisitor),
        source_route: window.location.pathname
      }
    };

    const result = await client.from("interactions").insert(payload);

    if (result.error) {
      throw result.error;
    }
  }
})();
