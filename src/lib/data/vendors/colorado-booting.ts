// Colorado Booting LLC - Parking Enforcement Company
// Source: docs/COLORADO-BOOTING-OVERVIEW.md

import type { VendorProfile } from "@/types/institutional";

export const coloradoBooting: VendorProfile = {
  id: "colorado-booting",
  slug: "colorado-booting",
  name: "Colorado Booting LLC",
  legalName: "Colorado Booting LLC",
  type: "enforcement",
  tagline: "Vehicle immobilization and parking enforcement services",

  founded: "May 2, 2017",
  headquarters: "Avon, CO",
  entityId: "20171345467",
  status: "Good Standing (Colorado)",

  description:
    "Colorado Booting LLC is a privately held parking enforcement company specializing in vehicle immobilization services across Colorado's mountain resort communities. The company operates approximately 90+ properties spanning the Vail Valley, Summit County, and Roaring Fork Valley regions.",

  history:
    "Formally incorporated on May 2, 2017 in Colorado, though operations may have begun as early as 2016. The company has grown to become the dominant private booting operator in Colorado's ski resort communities.",

  scale: [
    { metric: "Properties Served", value: "90+" },
    { metric: "Years Operating", value: "8+" },
  ],

  services: [
    {
      name: "Vehicle Immobilization",
      description:
        "Wheel clamp ('Denver Boot') installation on vehicles violating parking regulations.",
      details: [
        "24/7 enforcement coverage",
        "Boot removal service",
        "Online payment portal",
      ],
      icon: "Car",
    },
    {
      name: "Towing Services",
      description:
        "Vehicle towing for situations where booting is impractical.",
      icon: "Truck",
    },
    {
      name: "Parking Consultation",
      description:
        "Consultation services for property optimization and parking management.",
      icon: "ClipboardList",
    },
    {
      name: "Online Management Portal",
      description:
        "Real-time enforcement tracking and boot removal payments at parkingcode.com.",
      icon: "Globe",
    },
  ],

  contact: {
    phone: "(970) 306-8687",
    phoneExtensions: [{ ext: "1", purpose: "Boot Removal" }],
    email: "support@parkingcode.com",
    website: "https://parkingcode.com/",
    mailingAddress: "PO Box 1839, Avon, CO 81620-1839",
    address: "6 Galapago Trail, San Luis, CO 81152 (Registered)",
  },

  // Note: Leadership is intentionally sparse as company does not disclose this publicly
  leadership: [
    {
      name: "Ashlie Jarezenski",
      title: "Registered Agent",
      background:
        "Listed as registered agent at San Luis, CO address. No other leadership publicly identified.",
    },
  ],

  ratings: [
    {
      source: "BBB",
      rating: "F",
      description:
        "Better Business Bureau's lowest rating. 13 complaints with 0 responses. File opened October 2, 2020. 1 active alert on file.",
      dateRecorded: "2026-01",
    },
  ],

  concerns: [
    "F rating from Better Business Bureau (lowest possible)",
    "13 BBB complaints with zero responses",
    "No identified CEO, founder, or ownership principals publicly disclosed",
    "No LinkedIn presence or social media accounts",
    "Leadership remains anonymous despite 8 years of operation",
    "Reports of vehicles booted despite having valid parking passes",
    "Reports of charges exceeding $160 regulatory maximum",
    "All payments declared non-refundable per company terms",
    "Disputes require binding arbitration per company terms",
    "50% additional fee for unpaid balances sent to collections",
  ],

  regulatory: {
    governingBody: "Colorado Public Utilities Commission (PUC)",
    permitRequired: true,
    keyRequirements: [
      "Must obtain PUC permit ($150-153 fee)",
      "Criminal background checks required",
      "Minimum insurance requirements",
      "Must disclose principal owners",
      "Maximum boot removal fee: $160",
      "Release time: 90 minutes (business hours), 120 minutes (after hours)",
      "Signage: 1 sq ft minimum with 1-inch lettering at each entrance",
      "Prohibition on booting occupied vehicles",
      "Prohibition on booting solely for expired registration",
      "Required documentation with unique serial numbers",
      "Must provide complaint contact information",
    ],
    consumerRights: [
      {
        title: "Maximum Boot Removal Fee",
        description: "Standard boot removal cannot exceed $160",
        legalBasis: "4 CCR 723-6",
        icon: "DollarSign",
      },
      {
        title: "Payment Option for Release",
        description:
          "Companies must release boots once vehicle owner pays at least 15% of fees, not to exceed $60",
        legalBasis: "HB25-1117",
        icon: "CreditCard",
      },
      {
        title: "Release Time Limits",
        description:
          "90 minutes during business hours, 120 minutes after hours",
        legalBasis: "4 CCR 723-6",
        icon: "Clock",
      },
      {
        title: "24-Hour Written Notice",
        description:
          "Required before immobilization (with some exceptions)",
        legalBasis: "HB25-1117",
        icon: "FileText",
      },
      {
        title: "No Booting of Occupied Vehicles",
        description: "Cannot boot a vehicle while you are inside it",
        legalBasis: "4 CCR 723-6",
        icon: "ShieldCheck",
      },
      {
        title: "No Booting for Expired Registration",
        description: "Cannot boot solely for expired vehicle registration",
        legalBasis: "4 CCR 723-6",
        icon: "FileX",
      },
      {
        title: "Required Signage",
        description:
          "Minimum 1 square foot sign with 1-inch lettering at each parking lot entrance",
        legalBasis: "4 CCR 723-6",
        icon: "AlertTriangle",
      },
      {
        title: "Documentation Required",
        description:
          "Boot must have unique serial number and complaint contact information",
        legalBasis: "4 CCR 723-6",
        icon: "Clipboard",
      },
    ],
    complaintProcess: {
      phone: "(303) 894-2070",
      tollFree: "(800) 456-0858",
      description:
        "File complaints with Colorado Public Utilities Commission. Select option #2 for booting complaints. You can also contact the Town of Avon Police Department (Sgt. Matt Jamison) for local issues.",
    },
    relevantLaws: [
      {
        name: "4 CCR 723-6 (Rules 6800-6899)",
        description:
          "Colorado PUC regulations governing vehicle booting companies",
        effectiveDate: "2019",
      },
      {
        name: "HB25-1117",
        description:
          "2025 legislation strengthening consumer protections. Requires 24-hour written notice before immobilization, prohibits indiscriminate patrolling, mandates $60 maximum payment option for boot release, requires individual permission from property owners within 24 hours before each immobilization.",
        effectiveDate: "2025",
      },
    ],
  },

  serviceArea: [
    "Vail Valley (Vail, Avon, Edwards, Eagle, Minturn, Gypsum)",
    "Summit County (Breckenridge, Silverthorne, Dillon, Keystone)",
    "Roaring Fork Valley (Aspen, Glenwood Springs, Carbondale, New Castle)",
  ],

  sourceDocument: "/docs/COLORADO-BOOTING-OVERVIEW.md",
  lastUpdated: "2026-01-22",
};

// Common complaint patterns for reference
export const COMPLAINT_PATTERNS = [
  {
    issue: "Booted with valid parking pass",
    description:
      "Vehicles booted despite having valid parking passes visible on rearview mirror",
  },
  {
    issue: "Excessive charges",
    description:
      "Charges exceeding $160 regulatory maximum, including $200 for dual boots",
  },
  {
    issue: "Legitimate resident booting",
    description:
      "Residents booted at their own apartment complexes where they have legitimate parking rights",
  },
  {
    issue: "Unresponsive to complaints",
    description: "Complete lack of response to consumer complaints filed with BBB",
  },
  {
    issue: "Quick enforcement",
    description:
      "Vehicles booted within hours of parking, even for legitimate short-term visits",
  },
];

// Step-by-step guide for wrongful booting
export const WRONGFUL_BOOTING_GUIDE = [
  {
    step: 1,
    title: "Document Everything",
    description:
      "Take photos of your vehicle, the boot, signage (or lack thereof), your location in the parking lot, and the time you discovered the boot.",
  },
  {
    step: 2,
    title: "Check for Valid Authorization",
    description:
      "Verify if you had a valid guest pass, were in a designated visitor spot, or had permission from a resident.",
  },
  {
    step: 3,
    title: "Request Release",
    description:
      "Call (970) 306-8687 ext. 1 for boot removal. Under HB25-1117, you may request release by paying no more than $60 upfront. Note the time you called and arrival time of technician.",
  },
  {
    step: 4,
    title: "File a Complaint",
    description:
      "Contact Colorado PUC at (303) 894-2070 (option #2) or toll-free (800) 456-0858. You can also contact Town of Avon Police (Sgt. Matt Jamison) for local issues, or file a BBB complaint.",
  },
  {
    step: 5,
    title: "Know the Limitations",
    description:
      "Company terms state all payments are non-refundable. Disputes require binding arbitration through the American Arbitration Association. Collections add 50% additional fee.",
  },
];

// Major clients for reference
export const MAJOR_CLIENTS = {
  retail: ["Home Depot (Avon)", "Walmart (Avon)", "Safeway Vail"],
  shoppingCenters: [
    "Traer Creek Plaza",
    "Westgate Plaza",
    "Design & Craft Center (Edwards)",
  ],
  residential: [
    "6 West Apartments",
    "Alta Verde",
    "Altitude Apartments",
    "Blue River Apartments",
    "Machebeuf Apartments",
    "Beaver Bench",
    "Brooktree",
    "Cornerstone",
    "SunRiver",
  ],
  hospitality: ["Beaver Creek Resort", "Aspen Country Inn", "ComfortInn Avon"],
};
