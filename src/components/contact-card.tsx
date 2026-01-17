"use client";

import {
  Building,
  Scale,
  Shield,
  Users,
  Mail,
  Phone,
  Globe,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddressDisplay } from "@/components/address-display";
import type { ContactEntity } from "@/types/institutional";

interface ContactCardProps {
  contact: ContactEntity;
  showResponsibilities?: boolean;
  showNotes?: boolean;
}

const contactIcons = {
  management: Building,
  legal: Scale,
  insurance: Shield,
  board: Users,
};

const contactColors = {
  management: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  legal: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  insurance: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  board: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

export function ContactCard({
  contact,
  showResponsibilities = false,
  showNotes = true,
}: ContactCardProps) {
  const Icon = contactIcons[contact.type];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <CardTitle className="text-lg">{contact.name}</CardTitle>
              <CardDescription>{contact.role}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className={contactColors[contact.type]}>
            {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address */}
        {contact.mailingAddress && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Mailing Address
            </h4>
            <AddressDisplay address={contact.mailingAddress} />
          </div>
        )}

        {/* Email */}
        {contact.email && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              Email
            </h4>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-primary hover:underline"
            >
              {contact.email}
            </a>
          </div>
        )}

        {/* Email Domains */}
        {contact.emailDomains && contact.emailDomains.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              Email Domains
            </h4>
            <div className="space-y-1">
              {contact.emailDomains.map((domain) => (
                <code
                  key={domain}
                  className="block text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded"
                >
                  {domain}
                </code>
              ))}
            </div>
          </div>
        )}

        {/* Phone */}
        {contact.phone && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              Phone
            </h4>
            <a
              href={`tel:${contact.phone}`}
              className="text-sm text-primary hover:underline"
            >
              {contact.phone}
            </a>
          </div>
        )}

        {/* Platforms */}
        {contact.platforms && contact.platforms.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              Communication Platform
            </h4>
            <ul className="space-y-1">
              {contact.platforms.map((platform) => (
                <li key={platform} className="text-sm">
                  {platform}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Responsibilities */}
        {showResponsibilities &&
          contact.responsibilities &&
          contact.responsibilities.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Responsibilities
              </h4>
              <ul className="space-y-1">
                {contact.responsibilities.map((responsibility) => (
                  <li
                    key={responsibility}
                    className="text-sm flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">•</span>
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* Notes */}
        {showNotes && contact.notes && contact.notes.length > 0 && (
          <div className="border-l-2 border-amber-500 pl-3 bg-amber-50 dark:bg-amber-950/20 p-3 rounded-r">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5" />
              Good to Know
            </h4>
            <ul className="space-y-1">
              {contact.notes.map((note) => (
                <li key={note} className="text-sm text-muted-foreground">
                  • {note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
