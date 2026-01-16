import { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, Search, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { QuickAnswerCard } from "@/components/quick-answer-card";
import {
  TOPIC_INDEX,
  findTopicsByKeyword,
  getAllCategories,
  getCategoryInfo,
  type TopicCategory,
} from "@/lib/data/topic-index";

export const metadata: Metadata = {
  title: "Quick Answers | Westlake HOA Hub",
  description:
    "Find instant answers to common HOA questions about fees, insurance, rules, and governance.",
};

interface AnswersPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function AnswersPage({ searchParams }: AnswersPageProps) {
  const { category, q } = await searchParams;

  // Filter topics
  let topics = [...TOPIC_INDEX];

  if (q) {
    topics = findTopicsByKeyword(q);
  }

  if (category && category !== "all") {
    topics = topics.filter((t) => t.category === category);
  }

  const categories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Quick Answers</h1>
            <p className="text-muted-foreground">
              Common questions answered instantly
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <form className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            name="q"
            placeholder="Search questions..."
            defaultValue={q}
            className="pl-10"
          />
          {category && category !== "all" && (
            <input type="hidden" name="category" value={category} />
          )}
        </form>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue={category || "all"} className="mb-8">
        <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
          <TabsTrigger
            value="all"
            asChild
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Link href={q ? `/answers?q=${q}` : "/answers"}>All</Link>
          </TabsTrigger>
          {categories.map((cat) => {
            const info = getCategoryInfo(cat);
            return (
              <TabsTrigger
                key={cat}
                value={cat}
                asChild
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Link
                  href={
                    q
                      ? `/answers?category=${cat}&q=${q}`
                      : `/answers?category=${cat}`
                  }
                >
                  {info.label}
                </Link>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-4">
        {topics.length} {topics.length === 1 ? "answer" : "answers"} found
        {q && ` for "${q}"`}
        {category && category !== "all" && ` in ${category}`}
      </p>

      {/* Topic Grid */}
      {topics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <QuickAnswerCard key={topic.slug} topic={topic} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-medium mb-2">No answers found</h2>
          <p className="text-muted-foreground mb-4">
            Try a different search term or category
          </p>
          <Link href="/answers" className="text-primary hover:underline">
            View all answers
          </Link>
        </div>
      )}

      {/* CTA to AI */}
      <div className="mt-12 p-6 bg-muted/50 rounded-lg text-center">
        <h2 className="font-semibold mb-2">Can&apos;t find your answer?</h2>
        <p className="text-muted-foreground mb-4">
          Ask our AI assistant for help with any HOA question
        </p>
        <Button asChild>
          <Link href="/ask">
            <MessageSquare className="h-4 w-4 mr-2" />
            Go to AI Assistant
          </Link>
        </Button>
      </div>
    </div>
  );
}
