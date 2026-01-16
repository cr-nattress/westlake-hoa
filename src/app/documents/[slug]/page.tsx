import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Download,
  Calendar,
  Tag,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnhancedMarkdown } from "@/components/enhanced-markdown";
import { DocumentKeyFacts } from "@/components/document-key-facts";
import { DocumentToc } from "@/components/document-toc";
import { RelatedDocuments } from "@/components/related-documents";
import { DOCUMENT_TYPES, DISCLAIMERS } from "@/lib/constants";
import { getDocumentBySlug, getDocuments } from "@/lib/data/documents";
import { hasDocumentFacts } from "@/lib/data/document-facts";
import { getTopicsForDocument } from "@/lib/data/topic-index";
import { DocumentChat } from "./document-chat";

interface DocumentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: DocumentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = await getDocumentBySlug(slug);

  if (!document) {
    return {
      title: "Document Not Found",
    };
  }

  return {
    title: document.title,
    description: document.summary || `View details for ${document.title}`,
  };
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { slug } = await params;
  const document = await getDocumentBySlug(slug);

  if (!document) {
    notFound();
  }

  const typeInfo = DOCUMENT_TYPES[document.type];
  const hasFacts = hasDocumentFacts(slug);

  // Find related documents (same type or referenced in same topics)
  const allDocs = await getDocuments({ limit: 100 });
  const relatedTopics = getTopicsForDocument(slug);

  // Get document slugs from topics that reference this document
  const topicDocSlugs = new Set<string>();
  relatedTopics.forEach(topic => {
    topicDocSlugs.add(topic.primaryDocument);
    topic.relatedDocuments.forEach(ds => topicDocSlugs.add(ds));
  });

  // Find related documents: same type OR referenced in shared topics
  const relatedDocs = allDocs
    .filter(doc =>
      doc.slug !== slug && // Not the current document
      doc.status === "current" && // Only current documents
      (doc.type === document.type || topicDocSlugs.has(doc.slug))
    )
    .slice(0, 4)
    .map(doc => ({
      id: doc.id,
      slug: doc.slug,
      title: doc.title,
      type: doc.type,
      status: doc.status,
    }));

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/documents">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Documents
          </Link>
        </Button>
      </div>

      {/* Document Header - Full Width */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
              <FileText className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl md:text-3xl mb-3">
                {document.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className={typeInfo?.color} variant="secondary">
                  {typeInfo?.label || document.type}
                </Badge>
                <Badge
                  variant={document.status === "current" ? "default" : "outline"}
                  className={
                    document.status === "current"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : ""
                  }
                >
                  {document.status === "current" ? "Current" : "Superseded"}
                </Badge>
                {document.published_at && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(document.published_at)}
                  </span>
                )}
              </div>

              {/* Summary */}
              {document.summary && (
                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                  {document.summary}
                </p>
              )}

              {/* Quick Facts Inline (for documents with facts) */}
              {hasFacts && (
                <div className="mt-4">
                  <DocumentKeyFacts slug={slug} variant="inline" />
                </div>
              )}
            </div>

            {/* Download Button */}
            {document.file_url && (
              <div className="flex-shrink-0">
                <Button asChild size="lg" className="gap-2">
                  <a
                    href={document.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                    <ExternalLink className="h-3 w-3 ml-1 opacity-50" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar - Left on Desktop */}
        <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
          <div className="lg:sticky lg:top-4 space-y-6">
            {/* Table of Contents */}
            {document.content && (
              <DocumentToc content={document.content} />
            )}

            {/* Key Facts */}
            {hasFacts && <DocumentKeyFacts slug={slug} variant="default" />}

            {/* Related Documents */}
            <RelatedDocuments documents={relatedDocs} />

            {/* AI Chat */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Ask About This Document</CardTitle>
                <CardDescription className="text-xs">
                  AI-powered assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentChat
                  documentTitle={document.title}
                  documentSummary={document.summary}
                  documentType={typeInfo?.label || document.type}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
          {/* Document Content */}
          {document.content && (
            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Full Document</CardTitle>
                    <CardDescription>
                      AI-extracted content from the official PDF
                    </CardDescription>
                  </div>
                  {document.file_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={document.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Original PDF
                      </a>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <EnhancedMarkdown content={document.content} />
              </CardContent>
            </Card>
          )}

          {/* Disclaimer */}
          <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="py-4">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Disclaimer:</strong> {DISCLAIMERS.documents}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
