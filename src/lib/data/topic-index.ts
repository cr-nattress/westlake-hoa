/**
 * Topic Index for Quick Answers and FAQ generation
 *
 * Maps common resident questions/topics to specific documents and sections.
 * Enables instant answers without AI processing and smarter AI context selection.
 */

export type TopicCategory = "financial" | "insurance" | "rules" | "governance";

export interface TopicEntry {
  slug: string;
  name: string;
  category: TopicCategory;
  question: string; // Common question phrasing
  quickAnswer: string; // 1-2 sentence answer
  primaryDocument: string; // Document slug
  sections: string[]; // Relevant section names
  relatedDocuments: string[]; // Additional document slugs
  keywords: string[]; // Search matching keywords
}

export const TOPIC_INDEX: TopicEntry[] = [
  // ============================================
  // FINANCIAL TOPICS (9 topics)
  // ============================================
  {
    slug: "assessments",
    name: "Monthly Assessments",
    category: "financial",
    question: "When are HOA assessments due?",
    quickAnswer:
      "Monthly assessments are due on the 1st of each month. Accounts become past due after 1 day and delinquent after 15 days.",
    primaryDocument: "collections-policy-2025",
    sections: ["Assessment Due Dates"],
    relatedDocuments: ["responsible-governance-policies-2025"],
    keywords: ["assessment", "dues", "payment", "monthly", "fee", "due date", "hoa fee"],
  },
  {
    slug: "late-fees",
    name: "Late Fees",
    category: "financial",
    question: "What are the late fees for missed payments?",
    quickAnswer:
      "Late fees escalate: $50 (1 month past due), $150 (2 months), $250 (3+ months). Interest of 8% annually begins 15 days after due date.",
    primaryDocument: "collections-policy-2025",
    sections: ["Late Fee Schedule", "Interest"],
    relatedDocuments: ["responsible-governance-policies-2025"],
    keywords: ["late", "fee", "penalty", "overdue", "delinquent", "interest", "past due"],
  },
  {
    slug: "payment-plans",
    name: "Payment Plans",
    category: "financial",
    question: "Can I set up a payment plan?",
    quickAnswer:
      "Yes, the HOA must offer payment plans with a minimum term of 18 months before proceeding with collections. Contact the property manager to arrange.",
    primaryDocument: "collections-policy-2025",
    sections: ["Repayment Plans"],
    relatedDocuments: ["responsible-governance-policies-2025"],
    keywords: ["payment", "plan", "arrangement", "installment", "hardship", "repayment"],
  },
  {
    slug: "interest-rate",
    name: "Interest on Late Payments",
    category: "financial",
    question: "What is the interest rate on late assessments?",
    quickAnswer:
      "Interest accrues at 8% annually on delinquent amounts starting 15 days after the due date. This is the maximum allowed under Colorado law.",
    primaryDocument: "collections-policy-2025",
    sections: ["Interest"],
    relatedDocuments: ["responsible-governance-policies-2025"],
    keywords: ["interest", "rate", "8%", "annual", "delinquent"],
  },
  {
    slug: "foreclosure",
    name: "Foreclosure Protections",
    category: "financial",
    question: "Can the HOA foreclose on my unit?",
    quickAnswer:
      "The HOA can file liens for unpaid assessments but must offer an 18-month payment plan before foreclosure. Colorado HB25-1043 provides additional homeowner protections.",
    primaryDocument: "collections-policy-2025",
    sections: ["Foreclosure", "Homeowner Protections"],
    relatedDocuments: ["responsible-governance-policies-2025", "declaration-of-condominium"],
    keywords: ["foreclosure", "lien", "collections", "attorney", "legal", "protection"],
  },
  {
    slug: "liens",
    name: "Assessment Liens",
    category: "financial",
    question: "When does the HOA file a lien?",
    quickAnswer:
      "The HOA may file a lien after 90 days of delinquency. Liens include unpaid assessments, late fees, interest, and collection costs. The lien can affect your ability to sell or refinance.",
    primaryDocument: "collections-policy-2025",
    sections: ["Lien Procedures"],
    relatedDocuments: ["declaration-of-condominium"],
    keywords: ["lien", "title", "sell", "refinance", "collections", "delinquent"],
  },
  {
    slug: "special-assessments",
    name: "Special Assessments",
    category: "financial",
    question: "What are special assessments?",
    quickAnswer:
      "Special assessments are additional charges for major repairs or improvements not covered by regular assessments. They require board approval and owner notice. Payment plans may be available.",
    primaryDocument: "declaration-of-condominium",
    sections: ["Assessments", "Special Assessments"],
    relatedDocuments: ["bylaws", "collections-policy-2025"],
    keywords: ["special", "assessment", "repair", "improvement", "capital", "reserve"],
  },
  {
    slug: "budget",
    name: "HOA Budget",
    category: "financial",
    question: "How is the HOA budget determined?",
    quickAnswer:
      "The Board prepares an annual budget including operating expenses, reserves, and insurance. Owners receive notice before the fiscal year and can attend budget meetings.",
    primaryDocument: "bylaws",
    sections: ["Financial Management", "Budget"],
    relatedDocuments: ["declaration-of-condominium"],
    keywords: ["budget", "reserve", "expense", "financial", "fiscal", "annual"],
  },
  {
    slug: "attorney-referral",
    name: "Attorney Referral",
    category: "financial",
    question: "When is my account referred to an attorney?",
    quickAnswer:
      "Accounts may be referred to collections after 90 days of delinquency. However, you must first be offered an 18-month payment plan under Colorado law. Attorney fees become your responsibility once referred.",
    primaryDocument: "collections-policy-2025",
    sections: ["Attorney Referral", "Collections Process"],
    relatedDocuments: ["responsible-governance-policies-2025"],
    keywords: ["attorney", "lawyer", "collections", "legal", "referral", "90 days"],
  },

  // ============================================
  // INSURANCE TOPICS (7 topics)
  // ============================================
  {
    slug: "hoa-coverage",
    name: "HOA Insurance Coverage",
    category: "insurance",
    question: "What does the HOA insurance cover?",
    quickAnswer:
      "The HOA master policy covers building exteriors, common areas, and original fixtures. Coverage: $22.4M property, $1M liability, $10M umbrella. Deductible: $15,000.",
    primaryDocument: "insurance-certificate-2025-2026",
    sections: ["Coverage Summary"],
    relatedDocuments: ["unit-owners-letter-2025-2026"],
    keywords: ["insurance", "coverage", "master", "policy", "hoa", "association", "building"],
  },
  {
    slug: "owner-coverage",
    name: "Owner Insurance Responsibilities",
    category: "insurance",
    question: "What do I need to insure as a unit owner?",
    quickAnswer:
      "Owners must insure: interior improvements/upgrades, personal contents, loss of use/rental income, and personal liability inside the unit. An HO6 policy is recommended.",
    primaryDocument: "unit-owners-letter-2025-2026",
    sections: ["Owner Responsibilities"],
    relatedDocuments: ["insurance-certificate-2025-2026"],
    keywords: ["owner", "insurance", "condo", "ho6", "contents", "personal", "liability", "interior"],
  },
  {
    slug: "claims",
    name: "Filing Insurance Claims",
    category: "insurance",
    question: "How do I file an insurance claim?",
    quickAnswer:
      "Contact Mountain West Insurance: claims@mtnwst.com or 970-945-9111. For emergencies, call immediately. Have your unit number and incident details ready.",
    primaryDocument: "insurance-ready-reference-2025-2026",
    sections: ["Claims Contact"],
    relatedDocuments: ["insurance-certificate-2025-2026"],
    keywords: ["claim", "file", "report", "damage", "incident", "emergency", "mountain west"],
  },
  {
    slug: "deductible",
    name: "Insurance Deductible",
    category: "insurance",
    question: "What is the HOA insurance deductible?",
    quickAnswer:
      "The master policy deductible is $15,000 per occurrence. Owners may be responsible for the deductible if damage originates in their unit. Consider HO6 deductible coverage.",
    primaryDocument: "insurance-certificate-2025-2026",
    sections: ["Deductible"],
    relatedDocuments: ["unit-owners-letter-2025-2026"],
    keywords: ["deductible", "$15,000", "15000", "per occurrence", "loss assessment"],
  },
  {
    slug: "liability-coverage",
    name: "Liability Coverage",
    category: "insurance",
    question: "What liability coverage does the HOA have?",
    quickAnswer:
      "The HOA has $1M per occurrence general liability, $10M umbrella excess coverage, and $1M Directors & Officers liability. Personal liability in your unit requires your own HO6 policy.",
    primaryDocument: "insurance-certificate-2025-2026",
    sections: ["Liability Coverage"],
    relatedDocuments: ["unit-owners-letter-2025-2026"],
    keywords: ["liability", "lawsuit", "injury", "d&o", "directors", "officers", "umbrella"],
  },
  {
    slug: "insurance-certificate",
    name: "Insurance Certificate Requests",
    category: "insurance",
    question: "How do I get an insurance certificate?",
    quickAnswer:
      "Insurance certificates are available on the HOA Hub document library. For custom certificates (e.g., for mortgage lenders), contact Mountain West Insurance directly.",
    primaryDocument: "insurance-ready-reference-2025-2026",
    sections: ["Certificate Requests"],
    relatedDocuments: ["insurance-certificate-2025-2026"],
    keywords: ["certificate", "proof", "lender", "mortgage", "evidence", "coi"],
  },
  {
    slug: "water-damage",
    name: "Water Damage Coverage",
    category: "insurance",
    question: "Who pays for water damage?",
    quickAnswer:
      "It depends on the source. HOA covers pipes in common areas. Unit owner covers damage from appliances or interior plumbing. The source determines which policy applies.",
    primaryDocument: "unit-owners-letter-2025-2026",
    sections: ["Single Entity Coverage", "Owner Responsibilities"],
    relatedDocuments: ["insurance-certificate-2025-2026"],
    keywords: ["water", "damage", "leak", "pipe", "flood", "burst", "plumbing"],
  },

  // ============================================
  // RULES TOPICS (9 topics)
  // ============================================
  {
    slug: "pets",
    name: "Pet Policy",
    category: "rules",
    question: "Can I have a pet?",
    quickAnswer:
      "Yes, one dog or cat per unit is allowed. Pets must be leashed (10 ft max) in common areas. Tenants pay $100/month pet fee. Breed restrictions may apply.",
    primaryDocument: "rules-and-regulations-2018",
    sections: ["Pet Policy"],
    relatedDocuments: [],
    keywords: ["pet", "dog", "cat", "animal", "leash", "breed", "tenant"],
  },
  {
    slug: "parking",
    name: "Parking Rules",
    category: "rules",
    question: "What are the parking rules?",
    quickAnswer:
      "Each unit has 2 assigned parking spaces. Vehicles must be legal, registered, and insured. No commercial vehicles, RVs, or boats. Vehicles must move every 7 days.",
    primaryDocument: "rules-and-regulations-2018",
    sections: ["Parking Regulations"],
    relatedDocuments: [],
    keywords: ["parking", "car", "vehicle", "space", "garage", "rv", "commercial", "guest"],
  },
  {
    slug: "quiet-hours",
    name: "Quiet Hours",
    category: "rules",
    question: "What are the quiet hours?",
    quickAnswer:
      "Quiet hours are 10 PM to 8 AM. No excessive noise, loud music, or instruments during these hours. Construction and renovations only during daytime hours.",
    primaryDocument: "rules-and-regulations-2018",
    sections: ["Noise"],
    relatedDocuments: [],
    keywords: ["quiet", "noise", "hours", "loud", "music", "sound", "10pm", "8am"],
  },
  {
    slug: "renovations",
    name: "Renovation Approval",
    category: "rules",
    question: "Do I need approval for renovations?",
    quickAnswer:
      "Yes, written Board approval is required for plumbing, electrical, HVAC, and structural changes. Submit plans before starting work. Some work has seasonal restrictions.",
    primaryDocument: "rules-and-regulations-2018",
    sections: ["Architectural Approval", "Renovations"],
    relatedDocuments: ["declaration-of-condominium"],
    keywords: ["renovation", "remodel", "approval", "construction", "architectural", "permit", "plumbing"],
  },
  {
    slug: "trash",
    name: "Trash and Recycling",
    category: "rules",
    question: "What are the trash rules?",
    quickAnswer:
      "Use designated dumpster areas only. No large items without prior arrangement. Recycling is encouraged. Keep trash areas clean and close dumpster lids.",
    primaryDocument: "rules-and-regulations-2018",
    sections: ["Trash", "Common Areas"],
    relatedDocuments: [],
    keywords: ["trash", "garbage", "recycling", "dumpster", "disposal", "waste"],
  },
  {
    slug: "balconies",
    name: "Balcony and Patio Rules",
    category: "rules",
    question: "What can I put on my balcony?",
    quickAnswer:
      "Balconies must be kept clean and orderly. No hanging items over railings. Grilling restrictions may apply. No storage of unsightly items visible from outside.",
    primaryDocument: "rules-and-regulations-2018",
    sections: ["Balconies and Patios"],
    relatedDocuments: [],
    keywords: ["balcony", "patio", "deck", "grill", "bbq", "storage", "outdoor"],
  },
  {
    slug: "smoking",
    name: "Smoking Policy",
    category: "rules",
    question: "Is smoking allowed?",
    quickAnswer:
      "Smoking is prohibited in all common areas and within 25 feet of building entrances. Smoke infiltrating other units may result in violation notices.",
    primaryDocument: "rules-and-regulations-2018",
    sections: ["Smoking"],
    relatedDocuments: [],
    keywords: ["smoking", "smoke", "cigarette", "vape", "tobacco", "marijuana"],
  },
  {
    slug: "heating",
    name: "Minimum Heating Requirements",
    category: "rules",
    question: "Do I have to heat my unit?",
    quickAnswer:
      "Yes, maintain minimum 55 degrees F from October 1 to May 30 to prevent frozen pipes. You may be liable for damage if failure to heat causes frozen pipes.",
    primaryDocument: "rules-and-regulations-2018",
    sections: ["Heating Requirements"],
    relatedDocuments: [],
    keywords: ["heat", "heating", "temperature", "winter", "freeze", "pipes", "55"],
  },
  {
    slug: "rentals",
    name: "Rental Requirements",
    category: "rules",
    question: "Can I rent out my unit?",
    quickAnswer:
      "Yes, rentals are allowed with a minimum 30-day term. Owners must register tenants with the HOA. Tenants must comply with all rules. Short-term rentals (Airbnb) are prohibited.",
    primaryDocument: "rules-and-regulations-2018",
    sections: ["Leasing", "Rental Requirements"],
    relatedDocuments: ["declaration-of-condominium"],
    keywords: ["rent", "rental", "lease", "tenant", "airbnb", "vrbo", "short-term"],
  },

  // ============================================
  // GOVERNANCE TOPICS (6 topics)
  // ============================================
  {
    slug: "voting",
    name: "Voting Rights",
    category: "governance",
    question: "How do I vote in HOA elections?",
    quickAnswer:
      "Each unit has 1 vote. Voting occurs at annual meetings (typically November) or by mail ballot. Proxy voting is allowed. Must be current on assessments to vote.",
    primaryDocument: "bylaws",
    sections: ["Membership and Voting", "Voting Procedures"],
    relatedDocuments: ["declaration-of-condominium"],
    keywords: ["vote", "voting", "election", "ballot", "proxy", "member", "annual"],
  },
  {
    slug: "meetings",
    name: "HOA Meetings",
    category: "governance",
    question: "When are HOA meetings?",
    quickAnswer:
      "Annual meetings are held in November. Board meetings are held monthly (typically). All owners may attend board meetings. Meeting notices are posted 10-14 days in advance.",
    primaryDocument: "bylaws",
    sections: ["Meetings"],
    relatedDocuments: ["responsible-governance-policies-2025"],
    keywords: ["meeting", "annual", "board", "attend", "notice", "agenda"],
  },
  {
    slug: "board",
    name: "Board of Directors",
    category: "governance",
    question: "Who is on the HOA board?",
    quickAnswer:
      "The Board consists of 3-7 directors elected by owners. Directors serve 2-year terms. The Board meets monthly to manage association affairs. Contact info is available through the property manager.",
    primaryDocument: "bylaws",
    sections: ["Board of Directors"],
    relatedDocuments: ["articles-of-incorporation-1979"],
    keywords: ["board", "director", "president", "officer", "term", "elected"],
  },
  {
    slug: "records",
    name: "Records Inspection",
    category: "governance",
    question: "How do I request HOA records?",
    quickAnswer:
      "Submit a written request describing the records needed. The HOA must respond within 10 business days. Most records are available; attorney communications and personnel files are restricted.",
    primaryDocument: "records-inspection-policy-2025",
    sections: ["Owner Rights", "Request Procedures"],
    relatedDocuments: ["responsible-governance-policies-2025"],
    keywords: ["records", "documents", "inspection", "request", "access", "ccioa", "financial"],
  },
  {
    slug: "violations",
    name: "Rule Violations",
    category: "governance",
    question: "What happens if I violate a rule?",
    quickAnswer:
      "Process: Warning, then $100 fine, then $200 fine, then $300+ fines. You have 5 days to request a hearing. Non-safety violations capped at $500. Health/safety violations have unlimited fines.",
    primaryDocument: "enforcement-policy-2025",
    sections: ["Fine Schedule", "Hearing Rights"],
    relatedDocuments: ["responsible-governance-policies-2025", "rules-and-regulations-2018"],
    keywords: ["violation", "fine", "penalty", "enforcement", "hearing", "appeal", "warning"],
  },
  {
    slug: "appeals",
    name: "Appeal Process",
    category: "governance",
    question: "How do I appeal a fine or decision?",
    quickAnswer:
      "Request a hearing within 5 days of receiving a violation notice. You may present evidence and witnesses. The Board will provide a written decision. Further appeals may be made to the full membership.",
    primaryDocument: "enforcement-policy-2025",
    sections: ["Hearing Rights", "Appeal Process"],
    relatedDocuments: ["responsible-governance-policies-2025"],
    keywords: ["appeal", "hearing", "dispute", "contest", "challenge", "evidence"],
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Find topics that match a search query based on keywords, name, or question
 */
export function findTopicsByKeyword(query: string): TopicEntry[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/);

  return TOPIC_INDEX.filter((topic) => {
    // Check if any keyword matches
    const keywordMatch = topic.keywords.some((kw) => queryLower.includes(kw));

    // Check if topic name matches
    const nameMatch = topic.name.toLowerCase().includes(queryLower);

    // Check if question matches
    const questionMatch = topic.question.toLowerCase().includes(queryLower);

    // Check if any query word matches keywords
    const wordMatch = queryWords.some((word) =>
      topic.keywords.some((kw) => kw.includes(word) || word.includes(kw))
    );

    return keywordMatch || nameMatch || questionMatch || wordMatch;
  }).sort((a, b) => {
    // Prioritize exact keyword matches
    const aExact = a.keywords.some((kw) => queryLower === kw);
    const bExact = b.keywords.some((kw) => queryLower === kw);
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    return 0;
  });
}

/**
 * Get all topics in a specific category
 */
export function getTopicsByCategory(category: TopicCategory): TopicEntry[] {
  return TOPIC_INDEX.filter((topic) => topic.category === category);
}

/**
 * Get a single topic by its slug
 */
export function getTopicBySlug(slug: string): TopicEntry | undefined {
  return TOPIC_INDEX.find((topic) => topic.slug === slug);
}

/**
 * Get all available categories
 */
export function getAllCategories(): TopicCategory[] {
  return ["financial", "insurance", "rules", "governance"];
}

/**
 * Get category display information
 */
export function getCategoryInfo(category: TopicCategory): {
  label: string;
  description: string;
  icon: string;
} {
  const info: Record<TopicCategory, { label: string; description: string; icon: string }> = {
    financial: {
      label: "Financial",
      description: "Assessments, fees, payment plans, and collections",
      icon: "dollar-sign",
    },
    insurance: {
      label: "Insurance",
      description: "Coverage, claims, deductibles, and certificates",
      icon: "shield",
    },
    rules: {
      label: "Rules & Policies",
      description: "Pets, parking, noise, renovations, and more",
      icon: "clipboard-list",
    },
    governance: {
      label: "Governance",
      description: "Voting, meetings, records, and violations",
      icon: "users",
    },
  };
  return info[category];
}

/**
 * Get topics related to a specific document
 */
export function getTopicsForDocument(documentSlug: string): TopicEntry[] {
  return TOPIC_INDEX.filter(
    (topic) =>
      topic.primaryDocument === documentSlug ||
      topic.relatedDocuments.includes(documentSlug)
  );
}

/**
 * Get the top N most common topics (for homepage or quick access)
 */
export function getPopularTopics(count: number = 6): TopicEntry[] {
  // Prioritize commonly searched topics
  const popularSlugs = [
    "assessments",
    "late-fees",
    "pets",
    "parking",
    "hoa-coverage",
    "violations",
    "quiet-hours",
    "renovations",
  ];

  const popular = popularSlugs
    .map((slug) => TOPIC_INDEX.find((t) => t.slug === slug))
    .filter((t): t is TopicEntry => t !== undefined);

  return popular.slice(0, count);
}
