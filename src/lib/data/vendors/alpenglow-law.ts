// Alpenglow Law, LLC - HOA Legal Counsel
// Source: docs/ALPENGLOW-OVERVIEW.md

import type { VendorProfile } from "@/types/institutional";

export const alpenglowLaw: VendorProfile = {
  id: "alpenglow-law",
  slug: "alpenglow-law",
  name: "Alpenglow Law, LLC",
  legalName: "Alpenglow Law, LLC",
  type: "legal",
  tagline: "Mountain community legal counsel for real estate, business, and HOA law",

  founded: "December 2017",
  headquarters: "Avon, CO",

  description:
    "Alpenglow Law, LLC is a specialized legal entity serving the Colorado Rocky Mountains region. Headquartered in Avon, Colorado, the firm operates as a dual-partnership structure covering transactional law and civil dispute resolution. The name 'Alpenglow' references the optical phenomenon where mountain summits are illuminated by a reddish glow near twilight, signaling local authenticity and a 'bright outlook' on complex legal challenges.",

  missionStatement:
    "The firm's philosophy reframes legal counsel not as a distinct, sterile professional service, but as an integral component of the 'mountain lifestyle.' The partners market themselves as holistic participants in the community - fathers, skiers, and civic leaders - reducing the psychological distance between attorney and client.",

  history:
    "Established in December 2017 by founding partners Daniel D. Reynolds and T.J. Voboril. The firm emerged from the strategic dissolution of its predecessor, Reynolds, Kalamaya & Voboril, LLC (RKV Law), representing a deliberate shift toward a lean, agile practice model tailored to mountain communities. The split was amicable, allowing partners to refocus on their respective specializations.",

  services: [
    {
      name: "Real Estate Law",
      description:
        "Comprehensive legal services for high-value property transactions in resort communities.",
      details: [
        "1031 exchanges",
        "Lending and finance documentation",
        "Quiet title actions",
        "Boundary disputes",
        "Landlord-tenant relations",
        "Commercial and residential transactions",
      ],
      icon: "Home",
    },
    {
      name: "Business Law",
      description:
        "Entity formation and corporate legal services for mountain businesses.",
      details: [
        "Entity formation (LLC, S-Corp, C-Corp)",
        "Operating agreements",
        "Mergers and acquisitions",
        "Commercial contracts",
        "Trademark protection",
        "Licensing requirements",
      ],
      icon: "Briefcase",
    },
    {
      name: "HOA Law",
      description:
        "General counsel services for homeowner associations under Colorado law.",
      details: [
        "General counsel for HOA boards",
        "CCIOA compliance",
        "Document interpretation",
        "Governing document amendments",
        "Covenant enforcement",
        "Assessment collections (including foreclosure)",
        "Short-term rental regulations",
      ],
      icon: "Building2",
    },
    {
      name: "Civil Litigation",
      description:
        "Dispute resolution services using the 'Trailhead to Summit' methodology.",
      details: [
        "Civil litigation",
        "Appellate advocacy (Colorado Court of Appeals)",
        "Business disputes",
        "Real estate disputes",
        "Construction defect claims",
      ],
      icon: "Scale",
    },
    {
      name: "Mediation Services",
      description:
        "Neutral mediation through Voice Of Reason Dispute Resolution.",
      details: [
        "Business dispute mediation",
        "Real estate mediation",
        "Personal dispute resolution",
        "Settlement facilitation",
      ],
      icon: "Handshake",
    },
  ],

  contact: {
    phone: "(970) 306-6456",
    email: "tj@alpenglowlaw.com",
    website: "https://alpenglowlaw.com",
    address: "82 East Beaver Creek Boulevard, Suite 201, Avon, CO 81620",
  },

  leadership: [
    {
      name: "Daniel D. Reynolds",
      title: "Partner - Transactional Law",
      background:
        "Over two decades of experience specific to the Vail Valley market. Graduate of Washington University in St. Louis (BA) and University of Oregon School of Law (JD). Relocated to Vail Valley in 2000. Focus on pragmatism and 'fortune-altering' business advice.",
      recognition: [
        "Super Lawyers Rising Star in Real Estate (2010)",
        "Martindale-Hubbell Client Distinction Award",
        "Founded Vail Valley Young Professionals Association (VVYPA)",
      ],
    },
    {
      name: "T.J. Voboril",
      title: "Partner - Litigation & Mediation",
      background:
        "Graduate of Dartmouth College (AB, cum laude, Geography) and University of Virginia School of Law (JD). Began career in Atlanta 'Big Law' handling large-scale commercial and securities litigation. Writes 'Open Bar' column in Vail Daily for public legal education.",
      recognition: [
        "Super Lawyers (ADR)",
        "Avvo 10.0 Rating",
        "Colorado Supreme Court Pro Bono Award",
        "Eagle Valley Land Trust Board (VP 2016-2018)",
        "Edwards Rotary Club President",
      ],
      contact: {
        email: "tj@alpenglowlaw.com",
      },
    },
  ],

  technology: [
    {
      name: "Virtual Consultations",
      description:
        "Remote meeting capabilities for clients who cannot travel due to weather or distance.",
      features: ["Zoom meetings", "Google Meets", "Digital document management"],
    },
  ],

  awards: [
    "Super Lawyers Rising Star - Real Estate (Dan Reynolds, 2010)",
    "Colorado Supreme Court Pro Bono Award (T.J. Voboril)",
    "Martindale-Hubbell Client Distinction Award",
  ],

  serviceArea: ["Vail Valley", "Aspen", "Colorado Mountain Communities"],

  sourceDocument: "/docs/ALPENGLOW-OVERVIEW.md",
  lastUpdated: "2026-01-22",
};

// Additional data for the dispute resolution methodology
export const DISPUTE_RESOLUTION_METHODOLOGY = {
  name: "Trailhead to Summit",
  description:
    "A conceptual framework using mountaineering metaphors to help clients visualize the trajectory of legal conflicts and manage expectations regarding cost, duration, and emotional energy.",
  strategies: [
    {
      metaphor: "Going Home",
      legalAction: "Withdrawal",
      description:
        "A strategic decision to abandon the dispute due to unfavorable 'weather' (legal merits) or resource constraints. Emphasizes that not every battle is worth fighting.",
    },
    {
      metaphor: "Having a Pow-wow",
      legalAction: "Mediation/Negotiation",
      description:
        "Early intervention through dialogue. Seeks to understand the adversary's position and find a compromise before resources are depleted.",
    },
    {
      metaphor: "Taking a Short Walk",
      legalAction: "Limited Engagement",
      description:
        "Sending a demand letter or initiating preliminary contact. Tests the opponent's resolve without committing the client to a full 'expedition'.",
    },
    {
      metaphor: "Embarking on an Expedition",
      legalAction: "Litigation",
      description:
        "The filing of a lawsuit. Framed as a 'difficult climb' requiring significant 'provisions' (financial capital) and psychological stamina.",
    },
  ],
};

// Notable case for reference
export const NOTABLE_CASES = [
  {
    name: "Sifton v. Stewart Title Guaranty Company",
    description:
      "Successfully defended a national title insurance company before the Colorado Court of Appeals.",
    outcome: "Successful defense",
    court: "Colorado Court of Appeals",
  },
];
