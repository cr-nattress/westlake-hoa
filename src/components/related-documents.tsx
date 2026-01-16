import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DOCUMENT_TYPES } from "@/lib/constants";

interface RelatedDoc {
  id: string;
  slug: string;
  title: string;
  type: string;
  status: string;
}

interface RelatedDocumentsProps {
  documents: RelatedDoc[];
}

export function RelatedDocuments({ documents }: RelatedDocumentsProps) {
  if (!documents || documents.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Related Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        {documents.map((doc) => {
          const typeInfo = DOCUMENT_TYPES[doc.type as keyof typeof DOCUMENT_TYPES];
          return (
            <Link
              key={doc.id}
              href={`/documents/${doc.slug}`}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant="outline"
                    className={`text-xs ${typeInfo?.color || ""}`}
                  >
                    {typeInfo?.label || doc.type}
                  </Badge>
                  {doc.status === "superseded" && (
                    <Badge variant="secondary" className="text-xs">
                      Old
                    </Badge>
                  )}
                </div>
                <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                  {doc.title}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-1 flex-shrink-0" />
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
