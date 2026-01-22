"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./theme-toggle";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HEADER_NAV_ITEMS = [
  { href: "/answers", label: "Quick Answers" },
  { href: "/meetings", label: "Meetings" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo & Badge */}
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-lg hover:opacity-80 transition-opacity">
            {SITE_CONFIG.name.split(" ")[0]}
          </Link>
          <Badge variant="outline" className="hidden sm:inline-flex bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">
            Unofficial
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {HEADER_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
