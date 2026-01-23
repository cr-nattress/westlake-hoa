import { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Scale,
  Car,
  AlertCircle,
  Award,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  VENDORS,
  VENDOR_TYPE_LABELS,
  VENDOR_TYPE_COLORS,
} from "@/lib/data/vendors";
import { DISCLAIMERS } from "@/lib/constants";
import type { VendorProfile, VendorType } from "@/types/institutional";

export const metadata: Metadata = {
  title: "Know Your Vendors | Westlake HOA Hub",
  description:
    "Learn about the service providers working with Westlake HOA including property management, legal counsel, and parking enforcement.",
};

const typeIcons: Record<VendorType, typeof Building2> = {
  "property-management": Building2,
  legal: Scale,
  enforcement: Car,
};

function VendorCard({ vendor }: { vendor: VendorProfile }) {
  const Icon = typeIcons[vendor.type];
  const colors = VENDOR_TYPE_COLORS[vendor.type];
  const hasConcerns = vendor.concerns && vendor.concerns.length > 0;
  const hasAwards = vendor.awards && vendor.awards.length > 0;
  const bbbRating = vendor.ratings?.find((r) => r.source === "BBB");

  return (
    <Card
      className={`flex flex-col ${hasConcerns ? "border-amber-500/50" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors.bg}`}
            >
              <Icon className={`h-4 w-4 ${colors.text}`} />
            </div>
            <Badge variant="secondary" className="text-xs">
              {VENDOR_TYPE_LABELS[vendor.type]}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            {bbbRating && bbbRating.rating === "F" && (
              <Badge
                variant="destructive"
                className="flex items-center gap-1 text-xs"
              >
                <AlertTriangle className="h-3 w-3" />
                BBB: F
              </Badge>
            )}
            {hasAwards && !hasConcerns && (
              <Award className="h-5 w-5 text-amber-500" />
            )}
          </div>
        </div>
        <CardTitle className="text-xl mt-3">{vendor.name}</CardTitle>
        <CardDescription>{vendor.tagline}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {vendor.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>Since {vendor.founded}</span>
          <span>-</span>
          <span>{vendor.headquarters}</span>
        </div>

        {vendor.scale && vendor.scale.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {vendor.scale.slice(0, 2).map((s) => (
              <Badge key={s.metric} variant="outline" className="text-xs">
                {s.value} {s.metric}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild className="w-full">
          <Link href={`/vendors/${vendor.slug}`}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function VendorsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Know Your Vendors</h1>
            <p className="text-muted-foreground">
              Understanding the service providers who work with your HOA
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <p className="text-muted-foreground mb-8 max-w-3xl">
        These companies provide services to Westlake HOA. Learn about their
        backgrounds, services, track records, and how to work with them
        effectively. Understanding your vendors helps you navigate HOA matters
        more confidently.
      </p>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-2 mb-8">
        {VENDORS.map((vendor) => {
          const Icon = typeIcons[vendor.type];
          return (
            <Button key={vendor.id} variant="outline" size="sm" asChild>
              <Link href={`/vendors/${vendor.slug}`}>
                <Icon className="mr-2 h-4 w-4" />
                {vendor.name}
              </Link>
            </Button>
          );
        })}
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {VENDORS.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>

      {/* Disclaimer */}
      <Alert className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-200">
          Unofficial Resource
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300">
          {DISCLAIMERS.site} Information compiled from public records and
          official documents for educational purposes. Always verify with
          official sources.
        </AlertDescription>
      </Alert>

      {/* Related Links */}
      <div className="mt-8 pt-8 border-t">
        <h2 className="text-lg font-semibold mb-4">Related Resources</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" asChild>
            <Link href="/contacts">
              Contact Directory <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/management">
              Management Authority <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
