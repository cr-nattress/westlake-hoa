"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, MessageSquare, Calendar, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/documents", icon: FileText, label: "Docs" },
  { href: "/ask", icon: MessageSquare, label: "Assistant" },
  { href: "/meetings", icon: Calendar, label: "Meetings" },
  { href: "/more", icon: Menu, label: "More" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t lg:hidden safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full min-h-[44px]",
                "text-muted-foreground hover:text-foreground transition-colors",
                isActive && "text-primary"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
