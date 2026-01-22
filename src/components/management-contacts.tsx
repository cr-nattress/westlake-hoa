"use client";

import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ManagementContact, Address } from "@/types/institutional";
import { AddressDisplay } from "@/components/address-display";

interface ManagementContactsProps {
  contacts: ManagementContact[];
  mailingAddress?: Address;
  className?: string;
}

export function ManagementContacts({
  contacts,
  mailingAddress,
  className,
}: ManagementContactsProps) {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Contact Bold Property Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contacts.map((contact, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{contact.purpose}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => copyEmail(contact.email)}
                title="Copy email"
              >
                {copiedEmail === contact.email ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="text-primary hover:underline text-sm break-all block"
            >
              {contact.email}
            </a>
            {contact.notes && (
              <p className="text-xs text-muted-foreground">{contact.notes}</p>
            )}
            {index < contacts.length - 1 && (
              <div className="pt-3 border-b" />
            )}
          </div>
        ))}

        {mailingAddress && (
          <div className="pt-4 border-t">
            <h4 className="font-medium text-sm mb-2">Mailing Address</h4>
            <AddressDisplay address={mailingAddress} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
