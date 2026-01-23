import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  Scale,
  Car,
  ChevronRight,
  Home,
  Phone,
  Mail,
  Globe,
  MapPin,
  ExternalLink,
  Award,
  AlertTriangle,
  Shield,
  Clock,
  DollarSign,
  FileText,
  Users,
  Wrench,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Briefcase,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  VENDORS,
  getVendorBySlug,
  VENDOR_TYPE_LABELS,
  VENDOR_TYPE_COLORS,
  DISPUTE_RESOLUTION_METHODOLOGY,
  WRONGFUL_BOOTING_GUIDE,
} from "@/lib/data/vendors";
import { DISCLAIMERS } from "@/lib/constants";
import type { VendorProfile, VendorType } from "@/types/institutional";

// Generate static params for all vendors
export async function generateStaticParams() {
  return VENDORS.map((vendor) => ({
    slug: vendor.slug,
  }));
}

// Generate metadata for each vendor page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);

  if (!vendor) {
    return {
      title: "Vendor Not Found | Westlake HOA Hub",
    };
  }

  return {
    title: `${vendor.name} | Westlake HOA Vendors`,
    description: vendor.tagline,
  };
}

const typeIcons: Record<VendorType, typeof Building2> = {
  "property-management": Building2,
  legal: Scale,
  enforcement: Car,
};

// Breadcrumb Component
function Breadcrumb({ vendorName }: { vendorName: string }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <Link href="/" className="hover:text-foreground transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/vendors" className="hover:text-foreground transition-colors">
        Vendors
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground">{vendorName}</span>
    </nav>
  );
}

// Contact Card Component
function ContactCard({ vendor }: { vendor: VendorProfile }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {vendor.contact.phone && (
          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
            <div>
              <a
                href={`tel:${vendor.contact.phone.replace(/[^0-9]/g, "")}`}
                className="text-sm font-medium hover:underline"
              >
                {vendor.contact.phone}
              </a>
              {vendor.contact.phoneExtensions?.map((ext) => (
                <p key={ext.ext} className="text-xs text-muted-foreground">
                  Ext. {ext.ext}: {ext.purpose}
                </p>
              ))}
            </div>
          </div>
        )}

        {vendor.contact.email && (
          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
            <a
              href={`mailto:${vendor.contact.email}`}
              className="text-sm font-medium hover:underline break-all"
            >
              {vendor.contact.email}
            </a>
          </div>
        )}

        {vendor.contact.website && (
          <div className="flex items-start gap-3">
            <Globe className="h-4 w-4 mt-1 text-muted-foreground" />
            <a
              href={vendor.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline flex items-center gap-1"
            >
              {vendor.contact.website.replace(/^https?:\/\//, "")}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        {vendor.contact.portalUrl && (
          <div className="flex items-start gap-3">
            <ExternalLink className="h-4 w-4 mt-1 text-muted-foreground" />
            <div>
              <a
                href={vendor.contact.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:underline flex items-center gap-1"
              >
                {vendor.contact.portalName || "Online Portal"}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}

        {(vendor.contact.address || vendor.contact.mailingAddress) && (
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
            <div className="text-sm">
              {vendor.contact.mailingAddress && (
                <p>{vendor.contact.mailingAddress}</p>
              )}
              {vendor.contact.address &&
                vendor.contact.address !== vendor.contact.mailingAddress && (
                  <p className="text-muted-foreground text-xs mt-1">
                    {vendor.contact.address}
                  </p>
                )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Consumer Rights Section for Enforcement Vendors
function ConsumerRightsSection({ vendor }: { vendor: VendorProfile }) {
  if (!vendor.regulatory?.consumerRights) return null;

  return (
    <Card className="border-green-500 bg-green-50/50 dark:bg-green-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
          <Shield className="h-5 w-5" />
          Your Rights Under Colorado Law
        </CardTitle>
        <CardDescription>Know your protections before you pay</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {vendor.regulatory.consumerRights.map((right) => (
            <div key={right.title} className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">{right.title}</p>
                <p className="text-sm text-muted-foreground">
                  {right.description}
                </p>
                {right.legalBasis && (
                  <Badge variant="outline" className="mt-1 text-xs">
                    {right.legalBasis}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Wrongful Booting Guide Section
function WrongfulBootingGuide() {
  return (
    <Card className="border-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <Info className="h-5 w-5" />
          If You Believe You Were Wrongfully Booted
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {WRONGFUL_BOOTING_GUIDE.map((step) => (
            <div key={step.step} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                  {step.step}
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">{step.title}</p>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Complaint Contacts Section
function ComplaintContactsCard({ vendor }: { vendor: VendorProfile }) {
  if (!vendor.regulatory?.complaintProcess) return null;

  return (
    <Card className="border-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-base">
          <AlertCircle className="h-5 w-5" />
          File a Complaint
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {vendor.regulatory.complaintProcess.description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a
              href={`tel:${vendor.regulatory.complaintProcess.phone.replace(/[^0-9]/g, "")}`}
              className="text-sm font-medium hover:underline"
            >
              {vendor.regulatory.complaintProcess.phone}
            </a>
            <span className="text-xs text-muted-foreground">(option #2)</span>
          </div>
          {vendor.regulatory.complaintProcess.tollFree && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a
                href={`tel:${vendor.regulatory.complaintProcess.tollFree.replace(/[^0-9]/g, "")}`}
                className="text-sm font-medium hover:underline"
              >
                {vendor.regulatory.complaintProcess.tollFree}
              </a>
              <span className="text-xs text-muted-foreground">(toll-free)</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Reputation Card for vendors with concerns
function ReputationCard({ vendor }: { vendor: VendorProfile }) {
  const bbbRating = vendor.ratings?.find((r) => r.source === "BBB");

  if (!bbbRating || bbbRating.rating !== "F") {
    // Show awards instead if no concerns
    if (vendor.awards && vendor.awards.length > 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="h-5 w-5 text-amber-500" />
              Awards & Recognition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {vendor.awards.map((award) => (
                <li
                  key={award}
                  className="text-sm text-muted-foreground flex gap-2"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  {award}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      );
    }
    return null;
  }

  return (
    <Card className="border-red-500 bg-red-50/50 dark:bg-red-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400 text-base">
          <AlertTriangle className="h-5 w-5" />
          BBB Rating: {bbbRating.rating}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>Better Business Bureau&apos;s lowest rating.</p>
        {bbbRating.description && (
          <p className="text-muted-foreground">{bbbRating.description}</p>
        )}
        {vendor.concerns && vendor.concerns.length > 0 && (
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="concerns" className="border-none">
              <AccordionTrigger className="text-sm py-2">
                View documented concerns ({vendor.concerns.length})
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  {vendor.concerns.map((concern, i) => (
                    <li
                      key={i}
                      className="text-xs text-muted-foreground flex gap-2"
                    >
                      <XCircle className="h-3 w-3 text-red-500 shrink-0 mt-0.5" />
                      {concern}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}

// Services Section
function ServicesSection({ vendor }: { vendor: VendorProfile }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Wrench className="h-5 w-5" />
        Services Offered
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {vendor.services.map((service) => (
          <Card key={service.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{service.name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            {service.details && service.details.length > 0 && (
              <CardContent>
                <ul className="text-sm space-y-1">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-muted-foreground flex gap-2"
                    >
                      <span className="text-muted-foreground">-</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}

// Leadership Section
function LeadershipSection({ vendor }: { vendor: VendorProfile }) {
  if (!vendor.leadership || vendor.leadership.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Users className="h-5 w-5" />
        Leadership Team
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {vendor.leadership.map((leader) => (
          <Card key={leader.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{leader.name}</CardTitle>
              <CardDescription>{leader.title}</CardDescription>
            </CardHeader>
            <CardContent>
              {leader.background && (
                <p className="text-sm text-muted-foreground mb-2">
                  {leader.background}
                </p>
              )}
              {leader.recognition && leader.recognition.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {leader.recognition.map((rec) => (
                    <Badge key={rec} variant="secondary" className="text-xs">
                      {rec}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// Technology Section
function TechnologySection({ vendor }: { vendor: VendorProfile }) {
  if (!vendor.technology || vendor.technology.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Globe className="h-5 w-5" />
        Technology & Platforms
      </h2>
      <div className="grid gap-4">
        {vendor.technology.map((tech) => (
          <Card key={tech.name}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{tech.name}</CardTitle>
                {tech.url && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={tech.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Access <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
              <CardDescription>{tech.description}</CardDescription>
            </CardHeader>
            {tech.features && tech.features.length > 0 && (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tech.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}

// Dispute Resolution Methodology Section (for Alpenglow Law)
function DisputeMethodologySection() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Scale className="h-5 w-5" />
        Dispute Resolution: &quot;Trailhead to Summit&quot;
      </h2>
      <Card>
        <CardHeader>
          <CardDescription>
            {DISPUTE_RESOLUTION_METHODOLOGY.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {DISPUTE_RESOLUTION_METHODOLOGY.strategies.map((strategy) => (
              <div
                key={strategy.metaphor}
                className="border rounded-lg p-4 bg-muted/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{strategy.metaphor}</Badge>
                  <span className="text-sm font-medium">
                    {strategy.legalAction}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {strategy.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

// Legal Counsel Note
function LegalCounselNote() {
  return (
    <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50">
      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      <AlertTitle className="text-blue-800 dark:text-blue-200">
        When Legal Counsel Gets Involved
      </AlertTitle>
      <AlertDescription className="text-blue-700 dark:text-blue-300">
        Legal counsel typically handles escalated matters, collections, and
        formal legal correspondence. For most day-to-day issues, contact
        property management first. Once matters escalate to legal, homeowners
        may be directed to communicate through the attorney&apos;s office.
      </AlertDescription>
    </Alert>
  );
}

// Regulatory Framework Section
function RegulatorySection({ vendor }: { vendor: VendorProfile }) {
  if (!vendor.regulatory) return null;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5" />
        Regulatory Framework
      </h2>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {vendor.regulatory.governingBody}
          </CardTitle>
          <CardDescription>
            {vendor.regulatory.permitRequired
              ? "PUC permit required to operate"
              : "No permit required"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Key Requirements</h4>
            <ul className="text-sm space-y-1">
              {vendor.regulatory.keyRequirements.map((req) => (
                <li key={req} className="text-muted-foreground flex gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {vendor.regulatory.relevantLaws &&
            vendor.regulatory.relevantLaws.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Relevant Laws</h4>
                <div className="space-y-2">
                  {vendor.regulatory.relevantLaws.map((law) => (
                    <div
                      key={law.name}
                      className="border rounded-lg p-3 bg-muted/30"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {law.name}
                        </Badge>
                        {law.effectiveDate && (
                          <span className="text-xs text-muted-foreground">
                            Effective: {law.effectiveDate}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {law.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </CardContent>
      </Card>
    </section>
  );
}

// Main Page Component
export default async function VendorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);

  if (!vendor) {
    notFound();
  }

  const Icon = typeIcons[vendor.type];
  const colors = VENDOR_TYPE_COLORS[vendor.type];
  const isEnforcement = vendor.type === "enforcement";
  const isLegal = vendor.type === "legal";

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Breadcrumb vendorName={vendor.name} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-14 h-14 rounded-lg flex items-center justify-center ${colors.bg}`}
          >
            <Icon className={`h-7 w-7 ${colors.text}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={`${colors.bg} ${colors.text} ${colors.border}`}>
                {VENDOR_TYPE_LABELS[vendor.type]}
              </Badge>
              {vendor.ratings?.find((r) => r.source === "BBB")?.rating ===
                "F" && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  BBB: F
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{vendor.name}</h1>
            <p className="text-muted-foreground">{vendor.tagline}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>Founded {vendor.founded}</span>
          <span>-</span>
          <span>{vendor.headquarters}</span>
          {vendor.scale && vendor.scale.length > 0 && (
            <>
              <span>-</span>
              {vendor.scale.map((s, i) => (
                <span key={s.metric}>
                  {s.value} {s.metric}
                  {i < vendor.scale!.length - 1 ? ", " : ""}
                </span>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Consumer Rights (prominent for enforcement) */}
      {isEnforcement && <ConsumerRightsSection vendor={vendor} />}

      {/* Wrongful Booting Guide (enforcement only) */}
      {isEnforcement && (
        <div className="mt-6">
          <WrongfulBootingGuide />
        </div>
      )}

      {/* Legal Counsel Note */}
      {isLegal && (
        <div className="mb-8">
          <LegalCounselNote />
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3 mt-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              About {vendor.name}
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground">{vendor.description}</p>
                {vendor.missionStatement && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Mission</h4>
                    <p className="text-sm text-muted-foreground">
                      {vendor.missionStatement}
                    </p>
                  </div>
                )}
                {vendor.history && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">History</h4>
                    <p className="text-sm text-muted-foreground">
                      {vendor.history}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Services */}
          <ServicesSection vendor={vendor} />

          {/* Dispute Methodology (Alpenglow only) */}
          {isLegal && <DisputeMethodologySection />}

          {/* Leadership */}
          <LeadershipSection vendor={vendor} />

          {/* Technology */}
          <TechnologySection vendor={vendor} />

          {/* Regulatory (enforcement) */}
          {isEnforcement && <RegulatorySection vendor={vendor} />}

          {/* Service Area */}
          {vendor.serviceArea && vendor.serviceArea.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Service Area
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2">
                    {vendor.serviceArea.map((area) => (
                      <Badge key={area} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <ContactCard vendor={vendor} />
          <ReputationCard vendor={vendor} />
          {isEnforcement && <ComplaintContactsCard vendor={vendor} />}
        </aside>
      </div>

      <Separator className="my-8" />

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-muted-foreground">
        <div>
          <p>Last updated: {vendor.lastUpdated}</p>
          <p>
            Source:{" "}
            <Link href={vendor.sourceDocument} className="hover:underline">
              {vendor.sourceDocument}
            </Link>
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/vendors">
            <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
            Back to All Vendors
          </Link>
        </Button>
      </div>

      {/* Disclaimer */}
      <Alert className="mt-8 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-200">
          Disclaimer
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300">
          {DISCLAIMERS.site}
        </AlertDescription>
      </Alert>
    </div>
  );
}
