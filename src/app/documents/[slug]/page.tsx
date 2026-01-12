import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Download, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DOCUMENT_TYPES, DISCLAIMERS } from "@/lib/constants";
import { getDocumentBySlug } from "@/lib/data/documents";
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

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{document.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={typeInfo?.color} variant="secondary">
                      {typeInfo?.label || document.type}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {document.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Document Meta */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                {document.published_at && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Published {formatDate(document.published_at)}</span>
                  </div>
                )}
                {document.type && (
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <span>{typeInfo?.label || document.type}</span>
                  </div>
                )}
              </div>

              {/* Summary */}
              {document.summary && (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p>{document.summary}</p>
                </div>
              )}

              {/* Download Button */}
              {document.file_url && (
                <div className="mt-6">
                  <Button asChild>
                    <a
                      href={document.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Document Content */}
          {document.content && (
            <Card>
              <CardHeader>
                <CardTitle>Document Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {document.content}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Disclaimer */}
          <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="py-4">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                {DISCLAIMERS.documents}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - AI Chat */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ask About This Document</CardTitle>
                <CardDescription>
                  Get help understanding this document with AI assistance
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
      </div>
    </div>
  );
}
