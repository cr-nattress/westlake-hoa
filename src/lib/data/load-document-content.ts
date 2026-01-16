import fs from "fs";
import path from "path";

const README_DIR = path.join(process.cwd(), "docs/hoa-docs/readme");

// Map PDF filenames to README filenames
const PDF_TO_README_MAP: Record<string, string> = {
  "DeclarationofCondominium.pdf": "DeclarationofCondominium.md",
  "WestlakeBylaws.pdf": "WestlakeBylaws.md",
  "Bylaws amended February 2025.pdf": "Bylaws amended February 2025.md",
  "Articles of Incorporation 1979.pdf": "Articles of Incorporation 1979.md",
  "2018.10 WLV Rules and Regs.pdf": "2018.10 WLV Rules and Regs.md",
  "Rules and Regulations Amended Adopted 2.21.20.pdf":
    "Rules and Regulations Amended Adopted 2.21.20.md",
  "Westlake Village HOA - Responsible Governance Policies - Updated November 2025 - CLEAN - signed.pdf":
    "Westlake Village HOA - Responsible Governance Policies - Updated November 2025 - CLEAN - signed.md",
  "Declaration  recorded April 2025 w 10.16.25 amendment.pdf":
    "Declaration  recorded April 2025 w 10.16.25 amendment.md",
  "Governance Policies as of 10.1.2025.pdf":
    "Governance Policies as of 10.1.2025.md",
  "Village Center Amended Restated Articles of Incorporation filed 4.10.25.pdf":
    "Village Center Amended Restated Articles of Incorporation filed 4.10.25.md",
  "25-26 UO Certificate.pdf": "25-26 UO Certificate.md",
  "25-26 UO Letter - Single Entity.pdf": "25-26 UO Letter - Single Entity.md",
  "25-26 Property Manager Reference Sheet.pdf":
    "25-26 Property Manager Reference Sheet.md",
  "24 -25 UO - Certficate.pdf": "24 -25 UO - Certficate.md",
  "24 -25 UO Letter - Single Entity.pdf": "24 -25 UO Letter - Single Entity.md",
  "24 -25  Property Manager Reference Sheet.pdf":
    "24 -25  Property Manager Reference Sheet.md",
  "24 -25 Umbrella.pdf": "24 -25 Umbrella.md",
  "24-25 Directors & Officers Liab &.Data.pdf":
    "24-25 Directors & Officers Liab &.Data.md",
};

/**
 * Load markdown content from a README file corresponding to a PDF
 * @param fileUrl - The URL path to the PDF (e.g., "/docs/WestlakeBylaws.pdf")
 * @returns The markdown content or null if not found
 */
export function loadDocumentContent(fileUrl: string): string | null {
  // Extract filename from URL (e.g., "/docs/WestlakeBylaws.pdf" -> "WestlakeBylaws.pdf")
  const filename = fileUrl.split("/").pop();
  if (!filename) return null;

  const readmeFilename = PDF_TO_README_MAP[filename];
  if (!readmeFilename) {
    console.warn(`No README mapping found for: ${filename}`);
    return null;
  }

  const readmePath = path.join(README_DIR, readmeFilename);

  try {
    return fs.readFileSync(readmePath, "utf-8");
  } catch (error) {
    console.warn(`Failed to load README: ${readmePath}`, error);
    return null;
  }
}

/**
 * Get all README filenames that have mappings
 */
export function getReadmeFilenames(): string[] {
  return Object.values(PDF_TO_README_MAP);
}

/**
 * Check if a PDF has a corresponding README
 */
export function hasReadmeContent(fileUrl: string): boolean {
  const filename = fileUrl.split("/").pop();
  if (!filename) return false;
  return filename in PDF_TO_README_MAP;
}
