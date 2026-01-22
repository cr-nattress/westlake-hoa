"use client";

import {
  Building,
  Scale,
  Shield,
  Users,
  Mail,
  Phone,
  MapPin,
  Globe,
  User,
  AlertTriangle,
  Printer,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ContactEntityFull } from "@/types/institutional";

interface ContactCardFullProps {
  contact: ContactEntityFull;
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

export function ContactCardFull({ contact }: ContactCardFullProps) {
  const {
    name,
    role,
    type,
    emails,
    phones,
    faxes,
    address,
    website,
    keyContacts,
    notes,
  } = contact;

  const Icon = contactIcons[type];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription>{role}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className={contactColors[type]}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Emails */}
        {emails && emails.length > 0 && (
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Email
            </h4>
            <ul className="space-y-1.5 text-sm">
              {emails.map((email) => (
                <li
                  key={email.address}
                  className="flex flex-col sm:flex-row sm:items-center gap-1"
                >
                  <a
                    href={`mailto:${email.address}`}
                    className="text-primary hover:underline break-all"
                  >
                    {email.address}
                  </a>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    ({email.purpose})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Phones */}
        {phones && phones.length > 0 && (
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Phone
            </h4>
            <ul className="space-y-1.5 text-sm">
              {phones.map((phone) => (
                <li
                  key={phone.number}
                  className="flex flex-col sm:flex-row sm:items-center gap-1"
                >
                  <a
                    href={`tel:${phone.number.replace(/[^\d+]/g, "")}`}
                    className="text-primary hover:underline min-h-[44px] sm:min-h-0 flex items-center"
                  >
                    {phone.number}
                  </a>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    ({phone.purpose})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Faxes */}
        {faxes && faxes.length > 0 && (
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-2 text-sm">
              <Printer className="h-4 w-4 text-muted-foreground" />
              Fax
            </h4>
            <ul className="space-y-1.5 text-sm">
              {faxes.map((fax) => (
                <li
                  key={fax.number}
                  className="flex flex-col sm:flex-row sm:items-center gap-1"
                >
                  <span>{fax.number}</span>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    ({fax.purpose})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Website */}
        {website && (
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-2 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground" />
              Online Portal
            </h4>
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {website.label}
            </a>
          </div>
        )}

        {/* Address */}
        {address && (
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Mailing Address
            </h4>
            <address className="text-sm not-italic text-muted-foreground">
              {address.line1}
              <br />
              {address.line2 && (
                <>
                  {address.line2}
                  <br />
                </>
              )}
              {address.city}, {address.state} {address.zip}
            </address>
          </div>
        )}

        {/* Key Contacts */}
        {keyContacts && keyContacts.length > 0 && (
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              Key Contacts
            </h4>
            <ul className="space-y-2 text-sm">
              {keyContacts.map((kc) => (
                <li key={kc.name}>
                  <span className="font-medium">{kc.name}</span>
                  <span className="text-muted-foreground block text-xs">
                    {kc.title}
                    {kc.asOf && ` (as of ${kc.asOf})`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        {notes && notes.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-3 rounded-md">
            <h4 className="font-medium flex items-center gap-2 mb-2 text-sm text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4" />
              Notes
            </h4>
            <ul className="text-sm space-y-1 text-amber-800 dark:text-amber-300">
              {notes.map((note, i) => (
                <li key={i}>&bull; {note}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
