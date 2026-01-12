import { Metadata } from "next";
import { Shield, Phone, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "Insurance",
  description:
    "Understand HOA insurance coverage, owner responsibilities, and how to file claims.",
};

const coverageData = [
  { type: "General Liability", limit: "$1,000,000 per occurrence", carrier: "—" },
  { type: "Umbrella Liability", limit: "$10,000,000", carrier: "Greenwich Insurance" },
  { type: "Property (Building)", limit: "$22,460,000 (Guaranteed Replacement)", carrier: "American Alternative" },
  { type: "Directors & Officers", limit: "$1,000,000", carrier: "Philadelphia Indemnity" },
  { type: "Fidelity Bond", limit: "$400,000", carrier: "—" },
  { type: "Workers Compensation", limit: "$1,000,000 per accident", carrier: "—" },
];

const ownerResponsibilities = [
  { item: "Interior Improvements", description: "Any upgrades beyond original build-out" },
  { item: "Personal Property", description: "Furniture, electronics, belongings" },
  { item: "Loss of Use", description: "Alternative housing if unit is uninhabitable" },
  { item: "Loss of Rental Income", description: "If you rent your unit" },
  { item: "Loss Assessments", description: "Special assessments from HOA claims" },
  { item: "Personal Liability", description: "Consider umbrella policy extension" },
];

export default function InsurancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
            <Shield className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Insurance Information</h1>
            <p className="text-muted-foreground">2025-2026 Coverage Year</p>
          </div>
        </div>
      </div>

      {/* Coverage Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>HOA Coverage Overview</CardTitle>
          <CardDescription>
            Current insurance policies maintained by the Association
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coverage Type</TableHead>
                <TableHead>Limit</TableHead>
                <TableHead className="hidden sm:table-cell">Carrier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coverageData.map((row) => (
                <TableRow key={row.type}>
                  <TableCell className="font-medium">{row.type}</TableCell>
                  <TableCell>{row.limit}</TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {row.carrier}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Property Policy Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">Deductible</p>
              <p className="font-semibold">$15,000</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">Ordinance & Law Coverage B/C</p>
              <p className="font-semibold">$750,000 each</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">Sewer/Drain Backup</p>
              <p className="font-semibold">Included</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">Equipment Breakdown</p>
              <p className="font-semibold">Included</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Owner Responsibilities */}
      <Alert className="mb-8 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-200">
          Important: Owner Insurance Responsibilities
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300">
          The HOA&apos;s master policy does NOT cover everything. Individual unit
          owners are responsible for insuring the items below.
        </AlertDescription>
      </Alert>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What Owners Must Insure</CardTitle>
          <CardDescription>
            Items not covered by the HOA master policy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {ownerResponsibilities.map((item) => (
              <div key={item.item} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{item.item}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Claims Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Filing a Claim</CardTitle>
          <CardDescription>
            Contact information for claims and certificates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3">Claims</h3>
              <div className="space-y-2 text-sm">
                <a
                  href="mailto:claims@mtnwst.com"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  claims@mtnwst.com
                </a>
                <a
                  href="tel:970-945-9111"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  970-945-9111
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Certificate Requests</h3>
              <div className="space-y-2 text-sm">
                <a
                  href="mailto:assncert@mtnwst.com"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  assncert@mtnwst.com
                </a>
                <p className="text-muted-foreground">
                  Must include full mortgagee clause. No blank certificates.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              <strong>Broker:</strong> Mountain West Insurance & Financial Services, LLC
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
