// src/data/services.js - Core static data structure for dental lab services
export const SERVICES = {
  "Meta Ads": {
    description: "Reach 77% of dentists active on Facebook & Instagram with laser-targeted campaigns designed specifically for dental laboratories. Our Meta Ads specialists understand the unique challenges of marketing technical dental services to busy practitioners.",
    pricing: { Base: 770, Standard: 980, Premium: 1410 },
    features: {
      Base: ["Campaign strategy & setup", "3 custom ad creatives", "Facebook Pixel setup", "Basic audience targeting", "Weekly performance monitoring"],
      Standard: ["All Base features", "6 professional ad creatives", "Advanced retargeting campaigns", "Lookalike audience creation", "Bi-weekly optimization calls"],
      Premium: ["All Standard features", "9+ premium video/carousel ads", "Full-funnel campaign strategy", "Advanced conversion tracking", "Weekly strategy calls"]
    },
    budgetRequirements: {
      Base: "$500-$1,500 monthly ad spend to Meta",
      Standard: "$1,500-$3,000 monthly ad spend to Meta", 
      Premium: "$3,000+ monthly ad spend to Meta"
    },
    successStory: "Premier Dental Lab in Phoenix increased case inquiries by 340% in 90 days using our Meta Ads system, with a 4.8x return on ad spend targeting local dental practices.",
    icon: "📱"
  },
  "Google Ads": {
    description: "Capture high-intent searches from dentists actively looking for lab services. Dominate search results for 'dental lab near me', specialty procedures, and emergency lab services with our proven Google Ads strategies.",
    pricing: { Base: 770, Standard: 980, Premium: 1410 },
    features: {
      Base: ["Search campaign setup", "Keyword research & selection", "3 ad variations", "Basic location targeting", "Monthly performance reports"],
      Standard: ["All Base features", "Display & YouTube campaigns", "Advanced keyword optimization", "Competitor analysis", "Bi-weekly optimization"],
      Premium: ["All Standard features", "Shopping campaigns for products", "Advanced audience targeting", "Call tracking integration", "Weekly strategy sessions"]
    },
    budgetRequirements: {
      Base: "$800-$2,000 monthly ad spend to Google",
      Standard: "$2,000-$4,000 monthly ad spend to Google",
      Premium: "$4,000+ monthly ad spend to Google"
    },
    successStory: "Precision Dental Laboratory doubled their monthly case volume in 6 months, achieving a 520% ROI through strategic Google Ads targeting emergency and specialty dental procedures.",
    icon: "🔍"
  },
  "TikTok Ads": {
    description: "Connect with younger dentists where 62% consume professional content. Showcase your lab's technology, behind-the-scenes processes, and case transformations to build trust with the next generation of dental professionals.",
    pricing: { Base: 770, Standard: 980, Premium: 1410 },
    features: {
      Base: ["TikTok Business account setup", "3 video ad creatives", "Basic targeting setup", "Trend analysis", "Monthly reporting"],
      Standard: ["All Base features", "6 professional video ads", "Advanced audience targeting", "Hashtag strategy", "Bi-weekly content optimization"],
      Premium: ["All Standard features", "9+ viral-style video campaigns", "Influencer collaboration setup", "Advanced analytics", "Weekly trend adaptation"]
    },
    budgetRequirements: {
      Base: "$400-$1,000 monthly ad spend to TikTok",
      Standard: "$1,000-$2,500 monthly ad spend to TikTok",
      Premium: "$2,500+ monthly ad spend to TikTok"
    },
    successStory: "Modern Dental Arts Lab gained 15,000 followers and 45 new practice partnerships in 4 months by showcasing their digital workflow and case transformations on TikTok.",
    icon: "🎵"
  },
  "SEO Optimization": {
    description: "Rank #1 when dentists search for 'dental lab near me' and specialty services. Our dental lab SEO specialists optimize your website to capture organic traffic from dentists seeking quality lab partners.",
    pricing: { Base: 790, Standard: 1000, Premium: 1450 },
    features: {
      Base: ["Technical SEO audit", "Local SEO optimization", "5 pages optimized", "Google My Business setup", "Monthly ranking reports"],
      Standard: ["All Base features", "15 pages optimized", "Content creation (2 blogs/month)", "Local citation building", "Competitor analysis"],
      Premium: ["All Standard features", "Unlimited page optimization", "Weekly content creation", "Advanced schema markup", "Priority support"]
    },
    budgetRequirements: {
      Base: "No additional ad spend required",
      Standard: "No additional ad spend required",
      Premium: "No additional ad spend required"
    },
    successStory: "Elite Dental Laboratory achieved #1 rankings for 23 high-value keywords in their market, resulting in 280% increase in organic website traffic and 150% more qualified inquiries.",
    icon: "📈"
  },
  "Google Business Profile": {
    description: "Be 2.7x more likely to be considered reputable with an optimized Google Business Profile. Manage reviews, showcase your work, and appear prominently in local search results.",
    pricing: { Base: 315, Standard: 420, Premium: 675 },
    features: {
      Base: ["Profile optimization", "Photo uploads", "Basic review management", "Hours & contact updates", "Monthly insights"],
      Standard: ["All Base features", "Weekly photo updates", "Review response management", "Google Posts creation", "Local SEO integration"],
      Premium: ["All Standard features", "Daily monitoring", "Advanced review strategy", "Competitor tracking", "Priority response times"]
    },
    budgetRequirements: {
      Base: "No additional ad spend required",
      Standard: "No additional ad spend required",
      Premium: "No additional ad spend required"
    },
    successStory: "Coastal Dental Lab improved their Google Business Profile rating from 3.2 to 4.8 stars and increased profile views by 450% through our reputation management system.",
    icon: "📍"
  },
  "Backlink Building": {
    description: "Build authority with high-quality dental industry backlinks. Our network includes dental publications, industry associations, and reputable dental websites to boost your search rankings.",
    pricing: { Base: 420, Standard: 630, Premium: 990 },
    features: {
      Base: ["5 high-quality backlinks/month", "Dental industry focus", "Link quality analysis", "Competitor backlink research", "Monthly reports"],
      Standard: ["All Base features", "10 premium backlinks/month", "Guest posting opportunities", "Broken link building", "Advanced analytics"],
      Premium: ["All Standard features", "20+ authority backlinks/month", "Custom outreach campaigns", "PR opportunity identification", "White-label reporting"]
    },
    budgetRequirements: {
      Base: "No additional ad spend required",
      Standard: "No additional ad spend required",
      Premium: "No additional ad spend required"
    },
    successStory: "Apex Dental Laboratory increased their domain authority from 28 to 52 in 8 months, resulting in 300% improvement in search rankings for competitive keywords.",
    icon: "🔗"
  },
  "Content Creation": {
    description: "Educational content that positions your lab as the industry expert. From technical blog posts to case study showcases, we create content that educates dentists and builds trust in your expertise.",
    pricing: { Base: 210, Standard: 420, Premium: 760 },
    features: {
      Base: ["2 blog posts/month", "Basic keyword optimization", "Image sourcing", "Social media adaptation", "Content calendar"],
      Standard: ["All Base features", "4 blog posts/month", "Video content creation", "Case study development", "Email newsletter content"],
      Premium: ["All Standard features", "8+ pieces of content/month", "Interactive content creation", "Webinar development", "Content distribution strategy"]
    },
    budgetRequirements: {
      Base: "No additional ad spend required",
      Standard: "No additional ad spend required",
      Premium: "No additional ad spend required"
    },
    successStory: "Innovative Dental Solutions' blog became the #1 resource for dental lab information in their region, generating 180 qualified leads per month from organic content.",
    icon: "📝"
  },
  "Social Media Management": {
    description: "Stay top-of-mind with consistent, professional social presence. Showcase your lab's capabilities, share educational content, and build relationships with dental professionals in your market.",
    pricing: { Base: 315, Standard: 525, Premium: 895 },
    features: {
      Base: ["3 posts/week", "Basic content creation", "Community management", "Monthly analytics", "Platform optimization"],
      Standard: ["All Base features", "5 posts/week", "Video content creation", "Story management", "Engagement campaigns"],
      Premium: ["All Standard features", "Daily posting", "Live video production", "Influencer collaborations", "Advanced social listening"]
    },
    budgetRequirements: {
      Base: "No additional ad spend required",
      Standard: "$200-500/month for promoted posts (optional)",
      Premium: "$500-1000/month for comprehensive social advertising"
    },
    successStory: "Digital Dental Creations grew their social following by 850% and generated 95 new practice partnerships through strategic social media showcasing their digital workflow capabilities.",
    icon: "📱"
  }
};

export const BUSINESS_TYPES = ["Dental Lab", "Dental Clinic", "Small Business", "Fitness", "Something Else"];

export const INDUSTRY_MESSAGING = {
  "Dental Lab": {
    "Meta Ads": {
      Base: "Perfect for labs wanting to attract local dental practices with basic digital presence",
      Standard: "Ideal for established labs ready to scale their practice partnerships regionally",
      Premium: "Best for large labs seeking market dominance and premium practice relationships"
    },
    "Google Ads": {
      Base: "Great for labs wanting to capture emergency and urgent case opportunities",
      Standard: "Perfect for labs ready to dominate local search for specialty procedures",
      Premium: "Ideal for labs seeking to become the go-to choice for high-value cases"
    },
    "TikTok Ads": {
      Base: "Connect with younger dentists just starting their practices",
      Standard: "Build brand awareness among tech-savvy dental professionals",
      Premium: "Become the trendsetting lab that innovative dentists choose"
    },
    "SEO Optimization": {
      Base: "Essential foundation for labs wanting to be found online",
      Standard: "Perfect for labs ready to outrank competitors consistently",
      Premium: "Ideal for labs seeking to dominate search results market-wide"
    },
    "Google Business Profile": {
      Base: "Must-have for labs wanting professional local presence",
      Standard: "Great for labs focused on reputation and local visibility",
      Premium: "Perfect for labs wanting to maximize local search dominance"
    },
    "Backlink Building": {
      Base: "Good starting point for improving search authority",
      Standard: "Ideal for labs wanting to compete with established players",
      Premium: "Perfect for labs seeking industry thought leadership status"
    },
    "Content Creation": {
      Base: "Great for labs wanting to educate their dental partners",
      Standard: "Perfect for labs ready to showcase expertise consistently",
      Premium: "Ideal for labs seeking to become the industry knowledge leader"
    },
    "Social Media Management": {
      Base: "Essential for labs wanting professional social presence",
      Standard: "Perfect for labs ready to showcase capabilities regularly",
      Premium: "Ideal for labs wanting to build strong community relationships"
    }
  },
  "Dental Clinic": {
    "Meta Ads": {
      Base: "Perfect for clinics wanting to fill empty chairs with routine care patients",
      Standard: "Ideal for clinics ready to book high-value procedures like implants & ortho",
      Premium: "Best for multi-location practices seeking market expansion"
    },
    "Google Ads": {
      Base: "Great for capturing emergency dental appointments and urgent care",
      Standard: "Perfect for dominating local search for dental services",
      Premium: "Ideal for clinics wanting to become the premier choice in their market"
    },
    "TikTok Ads": {
      Base: "Connect with younger patients seeking modern dental care",
      Standard: "Build brand awareness among health-conscious demographics",
      Premium: "Become the go-to practice for patients who value innovation"
    }
  },
  "Small Business": {
    "Meta Ads": {
      Base: "Perfect for local businesses wanting to reach nearby customers",
      Standard: "Ideal for businesses ready to expand their customer base",
      Premium: "Best for businesses seeking market leadership in their area"
    },
    "Google Ads": {
      Base: "Great for capturing customers actively searching for your services",
      Standard: "Perfect for dominating local search results",
      Premium: "Ideal for businesses wanting comprehensive online visibility"
    }
  }
};

// Pricing calculation utilities
export const calculateBundleDiscount = (serviceCount) => {
  const discounts = {
    2: 0.01,
    3: 0.025,
    4: 0.04,
    5: 0.055,
    6: 0.07,
    7: 0.085,
    8: 0.10
  };
  return discounts[serviceCount] || 0;
};

export const calculateCommitmentDiscount = (months) => {
  const discounts = {
    3: 0,
    6: 0.02,
    9: 0.035,
    12: 0.05,
    18: 0.08,
    24: 0.10
  };
  return discounts[months] || 0;
};

// Pre-configured bundles
export const BUNDLES = {
  foundation: {
    id: 'foundation',
    name: 'Foundation Bundle',
    description: 'Essential digital presence for growing labs',
    services: ['SEO Optimization', 'Google Business Profile', 'Content Creation'],
    tier: 'Base',
    basePrice: 1325, // 790 + 315 + 210
    popular: false,
    bestFor: 'Labs under $1M annual revenue'
  },
  growth: {
    id: 'growth',
    name: 'Growth Bundle',
    description: 'Accelerate your lab\'s market expansion',
    services: ['Google Ads', 'Meta Ads', 'SEO Optimization', 'Content Creation', 'Social Media Management'],
    tier: 'Standard',
    basePrice: 3825, // 980 + 980 + 1000 + 420 + 525
    popular: true,
    bestFor: 'Labs $1M-$5M annual revenue'
  },
  domination: {
    id: 'domination',
    name: 'Domination Bundle',
    description: 'Complete digital marketing dominance',
    services: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'SEO Optimization', 'Google Business Profile', 'Backlink Building', 'Content Creation', 'Social Media Management'],
    tier: 'Premium',
    basePrice: 7570, // All premium tier prices
    popular: false,
    bestFor: 'Labs over $5M annual revenue'
  }
};

export default SERVICES;
