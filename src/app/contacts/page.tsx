import { Metadata } from "next";
import { Users, AlertCircle, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactCard } from "@/components/contact-card";
import { AddressDisplay } from "@/components/address-display";
import {
  CONTACTS,
  HOA_MAILING_ADDRESS,
  HOA_PRIMARY_ADDRESS,
  HISTORICAL_MANAGEMENT,
  KNOWLEDGE_BASE_METADATA,
} from "@/lib/data/institutional-knowledge";
import { DISCLAIMERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Key Contacts",
  description:
    "Contact information for Westlake Village HOA property management, legal counsel, and insurance broker.",
};

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Users className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Key Contacts</h1>
            <p className="text-muted-foreground">
              Find the right contact for your HOA needs
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <Alert className="mb-8 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-200">
          Unofficial Resource
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300">
          {DISCLAIMERS.site}
        </AlertDescription>
      </Alert>

      {/* Contact Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {CONTACTS.map((contact) => (
          <ContactCard
            key={contact.name}
            contact={contact}
            showResponsibilities={contact.type === "management"}
            showNotes={true}
          />
        ))}

        {/* HOA Mailing Address Card */}
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <CardTitle className="text-lg">HOA Mailing Address</CardTitle>
                <CardDescription>
                  Primary address for correspondence
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Primary Address
              </h4>
              <AddressDisplay address={HOA_PRIMARY_ADDRESS} />
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Mailing Address
              </h4>
              <AddressDisplay address={HOA_MAILING_ADDRESS} />
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Historical Address
              </h4>
              <p className="text-xs text-muted-foreground mb-1">
                ({HISTORICAL_MANAGEMENT.note})
              </p>
              <p className="text-sm">{HISTORICAL_MANAGEMENT.name}</p>
              {HISTORICAL_MANAGEMENT.address && (
                <AddressDisplay
                  address={HISTORICAL_MANAGEMENT.address}
                  className="text-muted-foreground"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Reference Guide */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Who to Contact</CardTitle>
          <CardDescription>
            Quick guide for common questions and issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">
                Contact Property Management for:
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Maintenance requests</li>
                <li>• Unit access coordination</li>
                <li>• Assessment questions</li>
                <li>• Noise or violation reports</li>
                <li>• General HOA questions</li>
                <li>• Records requests</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">
                Contact Insurance Broker for:
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Filing insurance claims</li>
                <li>• Coverage questions</li>
                <li>• Certificate requests</li>
                <li>• Emergency damage reporting</li>
              </ul>
            </div>

            <div className="space-y-3 sm:col-span-2">
              <h4 className="font-medium text-sm">About Legal Counsel:</h4>
              <p className="text-sm text-muted-foreground">
                Legal counsel handles escalated matters only. Homeowners are
                typically instructed to communicate through counsel once disputes
                or legal matters are escalated by the Board. Initial contact
                should go through property management.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Last updated: {KNOWLEDGE_BASE_METADATA.lastUpdated}</p>
        <p className="mt-1">
          Source: Westlake HOA Knowledge Base
        </p>
      </div>
    </div>
  );
}
