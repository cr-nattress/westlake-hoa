import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  FolderOpen,
  Info,
  FileText,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "More",
  description: "Additional resources and information about the Westlake HOA Hub.",
};

const links = [
  {
    title: "Insurance Guide",
    description: "Understand HOA coverage and owner responsibilities",
    href: "/insurance",
    icon: Shield,
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-100 dark:bg-cyan-900",
  },
  {
    title: "Records Request",
    description: "Learn how to request HOA records under CCIOA",
    href: "/records",
    icon: FolderOpen,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900",
  },
  {
    title: "About This Site",
    description: "Purpose, disclaimers, and how to report errors",
    href: "/about",
    icon: Info,
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-slate-100 dark:bg-slate-800",
  },
];

const externalLinks = [
  {
    title: "Colorado CCIOA",
    description: "Colorado Common Interest Ownership Act",
    href: "https://leg.colorado.gov/",
  },
  {
    title: "HOA Resources",
    description: "Colorado DORA HOA Information Office",
    href: "https://dora.colorado.gov/",
  },
];

export default function MorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">More Resources</h1>
        <p className="text-muted-foreground">
          Additional tools and information for homeowners.
        </p>
      </div>

      {/* Internal Links */}
      <div className="grid gap-4 mb-8">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${link.bgColor} flex items-center justify-center`}
                    >
                      <Icon className={`h-6 w-6 ${link.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* External Links */}
      <Card>
        <CardHeader>
          <CardTitle>External Resources</CardTitle>
          <CardDescription>
            Helpful links to official Colorado resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{link.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
