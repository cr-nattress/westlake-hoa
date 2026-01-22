import { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, FileText, MessageSquare } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  TOPIC_INDEX,
  getAllCategories,
  getCategoryInfo,
  type TopicCategory,
} from "@/lib/data/topic-index";

const CATEGORY_INFO: Record<
  TopicCategory,
  { title: string; description: string }
> = {
  financial: {
    title: "Financial & Assessments",
    description: "Questions about dues, fees, payment plans, and collections",
  },
  insurance: {
    title: "Insurance Coverage",
    description: "Questions about HOA and owner insurance responsibilities",
  },
  rules: {
    title: "Rules & Regulations",
    description: "Questions about pets, parking, noise, and community rules",
  },
  governance: {
    title: "Governance & Meetings",
    description: "Questions about voting, records, board, and violations",
  },
};

interface FAQPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function FAQPage({ searchParams }: FAQPageProps) {
  const { q } = await searchParams;
  const categories = getAllCategories();

  // Filter topics if search query
  const filteredTopics = q
    ? TOPIC_INDEX.filter(
        (t) =>
          t.question.toLowerCase().includes(q.toLowerCase()) ||
          t.quickAnswer.toLowerCase().includes(q.toLowerCase()) ||
          t.keywords.some((kw) => kw.includes(q.toLowerCase()))
      )
    : TOPIC_INDEX;

  // Group by category
  const topicsByCategory = categories.reduce(
    (acc, cat) => {
      acc[cat] = filteredTopics.filter((t) => t.category === cat);
      return acc;
    },
    {} as Record<TopicCategory, typeof TOPIC_INDEX>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about Westlake Village HOA
        </p>
      </div>

      {/* Search */}
      <form className="mb-8 max-w-md mx-auto">
        <Input
          name="q"
          placeholder="Search FAQs..."
          defaultValue={q}
          className="text-center"
        />
      </form>

      {/* Results indicator */}
      {q && (
        <p className="text-sm text-muted-foreground text-center mb-6">
          {filteredTopics.length} results for &quot;{q}&quot;
          <Link href="/faq" className="ml-2 text-primary hover:underline">
            Clear
          </Link>
        </p>
      )}

      {/* FAQ Categories */}
      <div className="space-y-8">
        {categories.map((category) => {
          const topics = topicsByCategory[category];
          if (topics.length === 0) return null;

          return (
            <section key={category}>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">
                  {CATEGORY_INFO[category].title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {CATEGORY_INFO[category].description}
                </p>
              </div>

              <Accordion type="multiple" className="space-y-2">
                {topics.map((topic) => (
                  <AccordionItem
                    key={topic.slug}
                    value={topic.slug}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-left font-medium">
                        {topic.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pb-4">
                        <p className="text-muted-foreground mb-4">
                          {topic.quickAnswer}
                        </p>

                        <div className="flex flex-wrap items-center gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/documents/${topic.primaryDocument}`}>
                              <FileText className="h-4 w-4 mr-2" />
                              View Full Document
                            </Link>
                          </Button>

                          {topic.sections.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                              Section: {topic.sections.join(", ")}
                            </span>
                          )}
                        </div>

                        {topic.relatedDocuments.length > 0 && (
                          <div className="mt-3 text-xs text-muted-foreground">
                            <span className="font-medium">See also: </span>
                            {topic.relatedDocuments.map((slug, i) => (
                              <span key={slug}>
                                <Link
                                  href={`/documents/${slug}`}
                                  className="text-primary hover:underline"
                                >
                                  {formatSlugAsTitle(slug)}
                                </Link>
                                {i < topic.relatedDocuments.length - 1 && ", "}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          );
        })}
      </div>

      {/* No results */}
      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-medium mb-2">No FAQs found</h2>
          <p className="text-muted-foreground mb-4">
            Try a different search term
          </p>
          <Link href="/faq" className="text-primary hover:underline">
            View all FAQs
          </Link>
        </div>
      )}

      {/* Still have questions */}
      <div className="mt-12 p-6 bg-muted/50 rounded-lg text-center">
        <h2 className="font-semibold mb-2">Still have questions?</h2>
        <p className="text-muted-foreground mb-4">
          Our assistant can help answer specific questions about HOA documents
        </p>
        <Button asChild>
          <Link href="/ask">
            <MessageSquare className="h-4 w-4 mr-2" />
            Ask the Assistant
          </Link>
        </Button>
      </div>
    </div>
  );
}

/**
 * Convert a slug to a readable title
 */
function formatSlugAsTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// SEO: FAQ Schema for rich results
export async function generateMetadata(): Promise<Metadata> {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: TOPIC_INDEX.map((topic) => ({
      "@type": "Question",
      name: topic.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: topic.quickAnswer,
      },
    })),
  };

  return {
    title: "FAQ | Westlake HOA Hub",
    description:
      "Frequently asked questions about Westlake Village HOA fees, insurance, rules, and governance.",
    other: {
      "script:ld+json": JSON.stringify(faqSchema),
    },
  };
}
