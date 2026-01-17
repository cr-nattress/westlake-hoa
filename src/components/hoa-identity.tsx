"use client";

import { Building2, MapPin, Scale, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HOA_IDENTITY, KNOWLEDGE_BASE_METADATA } from "@/lib/data/institutional-knowledge";

export function HOAIdentity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          About the Association
        </CardTitle>
        <CardDescription>
          Official legal entity information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Legal Name */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Legal Name
          </h4>
          <p className="font-semibold">{HOA_IDENTITY.legalName}</p>
          <p className="text-sm text-muted-foreground">
            d/b/a {HOA_IDENTITY.dba}
          </p>
        </div>

        {/* Jurisdiction */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1.5">
            <Scale className="h-4 w-4" />
            Jurisdiction
          </h4>
          <ul className="space-y-1">
            {HOA_IDENTITY.jurisdiction.map((item) => (
              <li key={item} className="text-sm flex items-start gap-2">
                <span className="text-primary">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Entity Type */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Entity Type
          </h4>
          <p className="text-sm">{HOA_IDENTITY.entityType}</p>
        </div>

        {/* Property */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            Property
          </h4>
          <p className="text-sm">{HOA_IDENTITY.propertyName}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Approximately {HOA_IDENTITY.totalUnits} units
          </p>
        </div>

        {/* Last Updated */}
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Last updated: {KNOWLEDGE_BASE_METADATA.lastUpdated}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
