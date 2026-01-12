import { Metadata } from "next";
import Link from "next/link";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DOCUMENT_TYPES } from "@/lib/constants";
import { getDocuments } from "@/lib/data/documents";
import { DocumentSearch } from "./document-search";
import type { DocumentType } from "@/types/database";

export const metadata: Metadata = {
  title: "Document Library",
  description:
    "Browse HOA declarations, bylaws, policies, and meeting minutes with full-text search.",
};

interface DocumentsPageProps {
  searchParams: Promise<{
    type?: string;
    q?: string;
  }>;
}

export default async function DocumentsPage({ searchParams }: DocumentsPageProps) {
  const params = await searchParams;
  const typeFilter = params.type as DocumentType | undefined;
  const searchQuery = params.q;

  const documents = await getDocuments({
    type: typeFilter,
    search: searchQuery,
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

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

      {/* Search and Filter Controls */}
      <DocumentSearch
        currentType={typeFilter}
        currentQuery={searchQuery}
      />

      {/* Document Type Badges */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/documents">
          <Badge
            variant={!typeFilter ? "default" : "outline"}
            className="cursor-pointer"
          >
            All Documents
          </Badge>
        </Link>
        {Object.entries(DOCUMENT_TYPES).map(([key, value]) => (
          <Link key={key} href={`/documents?type=${key}`}>
            <Badge
              variant={typeFilter === key ? "default" : "outline"}
              className={`cursor-pointer ${typeFilter !== key ? value.color : ""}`}
            >
              {value.label}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        {documents.length} document{documents.length !== 1 ? "s" : ""} found
        {searchQuery && ` for "${searchQuery}"`}
        {typeFilter && ` in ${DOCUMENT_TYPES[typeFilter]?.label || typeFilter}`}
      </p>

      {/* Documents Grid */}
      {documents.length > 0 ? (
        <div className="grid gap-4">
          {documents.map((doc) => {
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
                          <Badge className={typeInfo?.color} variant="secondary">
                            {typeInfo?.label || doc.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(doc.published_at)}
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
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/documents/${doc.slug}`}>View Details</Link>
                    </Button>
                    {doc.file_url && (
                      <Button size="sm" variant="ghost" asChild>
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No Documents Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {searchQuery
                ? `No documents match "${searchQuery}". Try a different search term.`
                : "No documents are available in this category yet."}
            </p>
            {(searchQuery || typeFilter) && (
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/documents">Clear Filters</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}

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
