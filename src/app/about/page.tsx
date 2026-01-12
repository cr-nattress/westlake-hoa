import { Metadata } from "next";
import { Info, AlertCircle, Mail, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DISCLAIMERS, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About This Site",
  description:
    "Learn about the purpose, disclaimers, and how this unofficial HOA transparency hub operates.",
};

const principles = [
  {
    title: "Unofficial + Neutral",
    description:
      "Not affiliated with the HOA, Board, management, or counsel. No opinions, accusations, or speculation.",
  },
  {
    title: "Document-First",
    description:
      "Every claim must trace back to a source document. AI answers cite documents and specific sections.",
  },
  {
    title: "Informational Only",
    description:
      "Explains documents and processes. Does not recommend actions, predict outcomes, or interpret intent.",
  },
  {
    title: "Privacy & Safety",
    description:
      "No personal financial records, medical details, or private correspondence not already distributed.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Info className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">About This Site</h1>
            <p className="text-muted-foreground">{SITE_CONFIG.name}</p>
          </div>
        </div>
      </div>

      {/* Purpose */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Our Purpose</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            <strong>{SITE_CONFIG.name}</strong> is an unofficial, homeowner-run
            website providing clear, lawful, and neutral access to HOA documents,
            meetings, and processes for the Westlake Village Condominium
            Association in Avon, Colorado.
          </p>
          <p>
            Our goal is to provide <strong>open and transparent communication</strong>{" "}
            for all owners and tenants, with an AI-first interface that helps
            residents understand complex governance information without replacing
            legal counsel or official HOA channels.
          </p>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Alert
        id="disclaimer"
        className="mb-8 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50"
      >
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-200">
          Important Disclaimers
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300 space-y-3">
          <p>{DISCLAIMERS.site}</p>
          <p>{DISCLAIMERS.notLegalAdvice}</p>
        </AlertDescription>
      </Alert>

      {/* Core Principles */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Core Principles</CardTitle>
          <CardDescription>
            The non-negotiable guidelines that govern this site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {principles.map((principle) => (
              <div key={principle.title} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{principle.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* What This Site Is NOT */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What This Site Is NOT</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">×</span>
              <span>An official HOA website or communication channel</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">×</span>
              <span>A source of legal advice or recommendations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">×</span>
              <span>An advocacy platform or opinion site</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">×</span>
              <span>A replacement for consulting professionals</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Report Errors */}
      <Card>
        <CardHeader>
          <CardTitle>Report Errors or Issues</CardTitle>
          <CardDescription>
            Help us maintain accuracy and improve this resource
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            If you notice incorrect information, broken links, or have
            suggestions for improvement, please let us know. Include the specific
            page, what appears to be incorrect, and if possible, a reference to
            the correct source document.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Contact information coming soon
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Footer Quote */}
      <div className="mt-12 text-center">
        <p className="text-muted-foreground italic">
          &quot;Transparency works best when it is quiet.&quot;
        </p>
      </div>
    </div>
  );
}
