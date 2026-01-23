// Vendor Data Index
// Exports all vendor profiles and related data

import type { VendorProfile, VendorType } from "@/types/institutional";
import { boldSolutions } from "./bold-solutions";
import {
  alpenglowLaw,
  DISPUTE_RESOLUTION_METHODOLOGY,
  NOTABLE_CASES,
} from "./alpenglow-law";
import {
  coloradoBooting,
  COMPLAINT_PATTERNS,
  WRONGFUL_BOOTING_GUIDE,
  MAJOR_CLIENTS,
} from "./colorado-booting";

// =============================================================================
// All Vendors
// =============================================================================

export const VENDORS: VendorProfile[] = [
  boldSolutions,
  alpenglowLaw,
  coloradoBooting,
];

// =============================================================================
// Individual Vendor Exports
// =============================================================================

export { boldSolutions } from "./bold-solutions";
export {
  alpenglowLaw,
  DISPUTE_RESOLUTION_METHODOLOGY,
  NOTABLE_CASES,
} from "./alpenglow-law";
export {
  coloradoBooting,
  COMPLAINT_PATTERNS,
  WRONGFUL_BOOTING_GUIDE,
  MAJOR_CLIENTS,
} from "./colorado-booting";

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Get a vendor by slug
 */
export function getVendorBySlug(slug: string): VendorProfile | undefined {
  return VENDORS.find((v) => v.slug === slug);
}

/**
 * Get a vendor by ID
 */
export function getVendorById(id: string): VendorProfile | undefined {
  return VENDORS.find((v) => v.id === id);
}

/**
 * Get vendors by type
 */
export function getVendorsByType(type: VendorType): VendorProfile[] {
  return VENDORS.filter((v) => v.type === type);
}

/**
 * Get all vendor slugs (for static generation)
 */
export function getAllVendorSlugs(): string[] {
  return VENDORS.map((v) => v.slug);
}

// =============================================================================
// Type Labels and Icons
// =============================================================================

export const VENDOR_TYPE_LABELS: Record<VendorType, string> = {
  "property-management": "Property Management",
  legal: "Legal Counsel",
  enforcement: "Parking Enforcement",
};

export const VENDOR_TYPE_ICONS: Record<VendorType, string> = {
  "property-management": "Building2",
  legal: "Scale",
  enforcement: "Car",
};

export const VENDOR_TYPE_COLORS: Record<
  VendorType,
  { bg: string; text: string; border: string }
> = {
  "property-management": {
    bg: "bg-blue-50 dark:bg-blue-950/50",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
  legal: {
    bg: "bg-purple-50 dark:bg-purple-950/50",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
  },
  enforcement: {
    bg: "bg-orange-50 dark:bg-orange-950/50",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-800",
  },
};
