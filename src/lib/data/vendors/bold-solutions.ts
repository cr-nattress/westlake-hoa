// Bold Solutions - Property Management Company
// Source: docs/BOLD-OVERVIEW.md

import type { VendorProfile } from "@/types/institutional";

export const boldSolutions: VendorProfile = {
  id: "bold-solutions",
  slug: "bold-solutions",
  name: "Bold Solutions",
  legalName: "Bold Property Management Solutions",
  type: "property-management",
  tagline: "Full-service property management for mountain communities",

  founded: "1983",
  headquarters: "Avon, CO",

  description:
    "Bold Solutions is a Colorado-based property management firm with roots dating back to 1983. The company manages approximately 50 community associations (HOAs) comprising over 3,000 homeowners, serving resort communities from East Vail to Gypsum. Throughout its history, Bold Solutions has emphasized ethical practices and a community-focused approach.",

  missionStatement:
    "Providing personalized, high-quality property management services with the attention to detail of a boutique firm, while leveraging the resources and technology of a larger company. The company explicitly values trust, ethics, loyalty, and integrity.",

  history:
    "Founded as Bold Real Estate Solutions LLC by Onie Bolduc. The company has grown through strategic mergers and acquisitions: merged with Sanctuary Property Management in 2012, merged with Crossroads Realty in 2013, and acquired Vail Home Rentals in 2021.",

  scale: [
    { metric: "HOAs Managed", value: "~50" },
    { metric: "Homeowners Served", value: "3,000+" },
    { metric: "Total Clients", value: "4,000+" },
    { metric: "Private Homes Managed", value: "75+" },
  ],

  services: [
    {
      name: "Community Association Management",
      description:
        "Full HOA management including financial, administrative, and maintenance oversight for condominium and homeowner associations.",
      details: [
        "Financial management (budgeting, accounting, dues collection)",
        "Administrative management",
        "Rule enforcement",
        "Property maintenance oversight",
        "On-site staffing as needed",
        "Board member access to financials, minutes, and news",
      ],
      icon: "Building2",
    },
    {
      name: "Private Home Care Management",
      description:
        "Comprehensive caretaking services for individual homeowners, including second homes and investment properties.",
      details: [
        "Weekly property inspections",
        "Vendor service coordination",
        "Emergency and non-emergency response",
        "Housekeeping coordination",
        "Security and alarm monitoring",
        "Spa and hot tub maintenance",
        "Trash removal, landscaping, snow removal",
      ],
      icon: "Home",
    },
    {
      name: "Maintenance Services",
      description:
        "In-house maintenance division with trained staff and equipment for property upkeep and repairs.",
      details: [
        "Snow plowing and sidewalk clearing",
        "Landscaping and lawn care",
        "Dryer vent cleaning",
        "Appliance servicing",
        "Small repairs and general upkeep",
      ],
      icon: "Wrench",
    },
    {
      name: "Rental Management",
      description:
        "Professional management for long-term rental properties in the Vail Valley market.",
      details: [
        "Tenant placement and screening",
        "Rent collection and accounting",
        "Maintenance coordination during tenancy",
        "Tenant relations",
      ],
      icon: "Key",
    },
    {
      name: "HOA Document Services",
      description:
        "Facilitation of official community documents needed in real estate transactions through CondoCerts.",
      details: [
        "Resale disclosures",
        "HOA governing documents",
        "Budgets and financial documents",
        "Mortgage questionnaires",
      ],
      icon: "FileText",
    },
  ],

  contact: {
    phone: "(970) 949-6070",
    email: "clientservices@boldsolutions.net",
    website: "https://boldsolutions.net",
    address: "101 Fawcett Road, Suite #220, Avon, CO 81620",
    mailingAddress: "PO Box 5800, Avon, CO 81620",
    portalUrl: "https://boldpropertymanagement.appfolio.com/connect",
    portalName: "AppFolio Owner Portal",
  },

  leadership: [
    {
      name: "Christopher Tanis",
      title: "President",
      background:
        "Over 30 years of experience in real estate development and investments in Colorado. Joined Bold around 2010-2011 and became a partner. Holds a B.S. in International Business from Lehigh University. Transitioned from a career in private aviation to real estate.",
    },
    {
      name: "Adam Savin",
      title: "Partner / Co-Owner",
      background:
        "Co-leads firm operations and strategy. Instrumental in managing company growth.",
    },
    {
      name: "Mike Ball",
      title: "Chief Financial Officer (CFO)",
      background:
        "Oversees financial operations including budgeting, financial reporting for HOAs, and fiscal health of the company.",
    },
    {
      name: "Cealy Fellman",
      title: "Controller",
      background:
        "Responsible for accounting and financial controls, managing bookkeeping and accounts.",
    },
    {
      name: "Munsey Knox",
      title: "Director of Associations",
      background:
        "Leads the community association management division, overseeing the portfolio of HOA communities.",
    },
    {
      name: "Tom Barela",
      title: "Director of Maintenance",
      background:
        "Heads the maintenance department, managing staff and operations including snow removal, landscaping, and work orders.",
    },
  ],

  technology: [
    {
      name: "AppFolio Property Manager",
      description:
        "Secure online portal for homeowners and board members to access account information.",
      url: "https://boldpropertymanagement.appfolio.com/connect",
      features: [
        "View account and financial information",
        "Access HOA financial statements",
        "Pay dues online",
        "Set up automatic payments",
        "Access meeting minutes",
        "View community news and updates",
        "24/7 availability",
      ],
    },
    {
      name: "CondoCerts",
      description:
        "Cloud-based platform for HOA document requests, resale certificates, and disclosure documents.",
      features: [
        "Online document ordering",
        "Resale certificates",
        "Disclosure documents",
        "Mortgage questionnaires",
        "Fast turnaround times",
      ],
    },
  ],

  awards: [
    "Best Property Management Company - Vail Daily Best of Vail Valley 2022-2023",
    "Best Property Management Company - Vail Daily Best of Vail Valley 2025-2026",
  ],

  serviceArea: [
    "East Vail",
    "Vail",
    "Lionshead",
    "Minturn",
    "Avon",
    "Beaver Creek",
    "Edwards",
    "Eagle",
    "Gypsum",
  ],

  sourceDocument: "/docs/BOLD-OVERVIEW.md",
  lastUpdated: "2026-01-22",
};
