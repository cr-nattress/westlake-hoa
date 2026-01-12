import { Metadata } from "next";
import { FileText, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DOCUMENT_TYPES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Document Library",
  description:
    "Browse HOA declarations, bylaws, policies, and meeting minutes with full-text search.",
};

const sampleDocuments = [
  {
    id: "1",
    title: "Responsible Governance Policies",
    type: "policy" as const,
    status: "current",
    summary:
      "Comprehensive policies covering collections, enforcement, meetings, conflicts of interest, and records inspection.",
    publishedAt: "November 2025",
  },
  {
    id: "2",
    title: "Insurance Certificate 2025-2026",
    type: "insurance" as const,
    status: "current",
    summary:
      "Annual insurance certificate showing coverage limits for property, liability, D&O, and umbrella policies.",
    publishedAt: "October 2024",
  },
  {
    id: "3",
    title: "Collections Policy",
    type: "policy" as const,
    status: "current",
    summary:
      "Procedures for assessment collection, late fees, payment plans, and foreclosure protections under CCIOA.",
    publishedAt: "November 2025",
  },
];

export default function DocumentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Document Library</h1>
        <p className="text-muted-foreground">
          Browse and search HOA documents including declarations, bylaws,
          policies, and meeting minutes.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-10"
            disabled
          />
        </div>
        <Button variant="outline" disabled>
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Document Type Badges */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Badge variant="secondary" className="cursor-pointer">
          All Documents
        </Badge>
        {Object.entries(DOCUMENT_TYPES).map(([key, value]) => (
          <Badge
            key={key}
            variant="outline"
            className={`cursor-pointer ${value.color}`}
          >
            {value.label}
          </Badge>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid gap-4">
        {sampleDocuments.map((doc) => {
          const typeInfo = DOCUMENT_TYPES[doc.type];
          return (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={typeInfo.color} variant="secondary">
                          {typeInfo.label}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {doc.publishedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {doc.summary}
                </CardDescription>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" disabled>
                    View Details
                  </Button>
                  <Button size="sm" variant="ghost" disabled>
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Coming Soon Notice */}
      <Card className="mt-8 border-dashed">
        <CardContent className="py-8 text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">More Documents Coming Soon</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We&apos;re working on adding more HOA documents including declarations,
            bylaws, and historical meeting minutes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
