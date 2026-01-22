"use client";

import { useState } from "react";
import { Users, AlertCircle, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactCardFull } from "@/components/contact-card-full";
import { ContactSearch } from "@/components/contact-search";
import { WhenToContact } from "@/components/when-to-contact";
import { AddressDisplay } from "@/components/address-display";
import {
  ALL_CONTACTS,
  searchContacts,
  filterContactsByType,
} from "@/lib/data/contact-directory";
import {
  HOA_MAILING_ADDRESS,
  HOA_PRIMARY_ADDRESS,
  HISTORICAL_MANAGEMENT,
  KNOWLEDGE_BASE_METADATA,
} from "@/lib/data/institutional-knowledge";
import { DISCLAIMERS } from "@/lib/constants";

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Apply search and filter
  let filteredContacts = ALL_CONTACTS;
  if (searchQuery) {
    filteredContacts = searchContacts(filteredContacts, searchQuery);
  }
  if (filterType !== "all") {
    filteredContacts = filterContactsByType(filteredContacts, filterType);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Users className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Contact Directory</h1>
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

      {/* When to Contact Guide */}
      <WhenToContact />

      {/* Search and Filter */}
      <ContactSearch
        onSearchChange={setSearchQuery}
        onFilterChange={setFilterType}
      />

      {/* Contact Cards Grid */}
      {filteredContacts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {filteredContacts.map((contact) => (
            <ContactCardFull key={contact.name} contact={contact} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 mb-8">
          <p className="text-muted-foreground">
            No contacts found matching your search.
          </p>
        </div>
      )}

      {/* HOA Mailing Address Card */}
      {(filterType === "all" || filterType === "board") && !searchQuery && (
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <CardTitle className="text-lg">HOA Mailing Addresses</CardTitle>
                <CardDescription>
                  Official addresses for correspondence
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Primary Address
                </h4>
                <AddressDisplay address={HOA_PRIMARY_ADDRESS} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Mailing Address
                </h4>
                <AddressDisplay address={HOA_MAILING_ADDRESS} />
              </div>

              <div className="sm:col-span-2 pt-4 border-t">
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
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Last updated: {KNOWLEDGE_BASE_METADATA.lastUpdated}</p>
        <p className="mt-1">
          Contact information compiled from official HOA documents.
        </p>
      </div>
    </div>
  );
}
