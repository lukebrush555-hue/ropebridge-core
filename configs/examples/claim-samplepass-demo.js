window.ROPEBRIDGE_CONFIG = {
  archetype: "claim",
  campaignId: "backyard-blooms-sample",
  vendor: {
    id: "backyard-blooms",
    name: "Backyard Blooms",
    category: "Raw Honey",
    links: {
      order: "https://example.com/order",
      instagram: "https://instagram.com/example",
      facebook: "https://facebook.com/example",
      website: "https://example.com"
    }
  },
  offer: {
    title: "Wildflower Raw Honey",
    description: "Made locally in small seasonal batches using wildflower nectar gathered throughout the Saucon Valley region.",
    cta: "Claim sample",
    limitNote: "One claim per person, per day.",
    image: "../../assets/images/samplepass-stand.jpg",
    imageAlt: "Backyard Blooms wildflower raw honey sample"
  },
  copy: {
    connectHeadline: "Sign in once. Easier every time.",
    connectSubheadline: "Use your phone number so participating vendors can recognize you when you scan again.",
    connectBody: "No password. No account to manage. Just a faster path back to the vendor you already met.",
    connectPrimaryAction: "Continue",
    connectedHeadline: "You’re connected.",
    connectedBody: "Next time you scan, we’ll know where to pick up. You can also use this page to find this vendor again.",
    connectedNote: "Your details are saved for next time."
  },
  supabase: {
    url: "YOUR_SUPABASE_URL",
    publishableKey: "YOUR_SUPABASE_PUBLISHABLE_KEY"
  },
  tracking: {
    qrId: "farmers-market-table-sign-001"
  }
};
