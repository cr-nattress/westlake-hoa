"use client";

import { Building, Scale, Shield, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CONTACT_GUIDE } from "@/lib/data/contact-directory";

const iconMap = {
  management: Building,
  insurance: Shield,
  legal: Scale,
  board: Users,
};

export function WhenToContact() {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4">When to Contact</h2>
      <Accordion
        type="multiple"
        defaultValue={["management"]}
        className="w-full"
      >
        {CONTACT_GUIDE.map((section) => {
          const Icon = iconMap[section.type];
          return (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span>{section.title}</span>
                  <span className="text-muted-foreground text-sm font-normal">
                    ({section.entity})
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 text-sm ml-8 text-muted-foreground">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                {section.warning && (
                  <p className="text-sm text-amber-600 dark:text-amber-400 mt-3 ml-8 font-medium">
                    {section.warning}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
