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
  supabase: {
    url: "YOUR_SUPABASE_URL",
    publishableKey: "YOUR_SUPABASE_PUBLISHABLE_KEY"
  },
  tracking: {
    qrId: "farmers-market-table-sign-001"
  }
};
