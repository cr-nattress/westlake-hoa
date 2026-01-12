import Link from "next/link";
import {
  FileText,
  MessageSquare,
  Calendar,
  Shield,
  FolderOpen,
  Search,
  ArrowRight,
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
import { DISCLAIMERS } from "@/lib/constants";

const features = [
  {
    icon: MessageSquare,
    title: "Ask AI",
    description:
      "Get instant answers about HOA policies, rules, and procedures with source citations.",
    href: "/ask",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    icon: FileText,
    title: "Document Library",
    description:
      "Browse declarations, bylaws, policies, and meeting minutes with full-text search.",
    href: "/documents",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    icon: Calendar,
    title: "Meetings",
    description:
      "View agendas, minutes, and decisions from Board and community meetings.",
    href: "/meetings",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    icon: Shield,
    title: "Insurance Guide",
    description:
      "Understand HOA coverage, owner responsibilities, and how to file claims.",
    href: "/insurance",
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-50 dark:bg-cyan-950",
  },
  {
    icon: FolderOpen,
    title: "Records Request",
    description:
      "Learn what records you can request and download templates under CCIOA.",
    href: "/records",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
  {
    icon: Search,
    title: "Search Everything",
    description:
      "Find documents, policies, and answers across all HOA materials instantly.",
    href: "/documents",
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-slate-50 dark:bg-slate-900",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Unofficial Badge */}
            <Badge
              variant="outline"
              className="mb-6 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
            >
              Unofficial HOA Information Hub
            </Badge>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Westlake Village HOA
              <span className="block text-muted-foreground font-normal text-2xl md:text-3xl lg:text-4xl mt-2">
                HOA Hub
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Clear, lawful, and neutral access to HOA documents, meetings, and
              processes. Ask questions and get AI-powered answers with source
              citations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href="/ask">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Ask the HOA AI
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/documents">
                  <FileText className="mr-2 h-5 w-5" />
                  Browse Documents
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Everything You Need to Know
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access HOA information quickly with our AI-first interface. Every
              answer cites official documents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="group hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-3`}
                    >
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={feature.href}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              How It Works
            </h2>

            <div className="grid gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Ask a Question
                  </h3>
                  <p className="text-muted-foreground">
                    Type your question in plain English. For example: &quot;What
                    does the insurance cover?&quot; or &quot;How do I request
                    records?&quot;
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    AI Searches Documents
                  </h3>
                  <p className="text-muted-foreground">
                    Our AI searches through official HOA documents to find
                    relevant information from declarations, bylaws, policies,
                    and meeting minutes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Get Cited Answers
                  </h3>
                  <p className="text-muted-foreground">
                    Receive clear answers with direct links to source documents.
                    Every claim is backed by official HOA materials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
              <CardHeader>
                <CardTitle className="text-amber-800 dark:text-amber-200 text-lg">
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                  {DISCLAIMERS.site}
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {DISCLAIMERS.notLegalAdvice}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
