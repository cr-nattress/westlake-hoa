import Link from "next/link";
import { SITE_CONFIG, DISCLAIMERS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
            {DISCLAIMERS.site}
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-3">Documents</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/documents" className="hover:text-foreground transition-colors">All Documents</Link></li>
              <li><Link href="/documents?type=policy" className="hover:text-foreground transition-colors">Policies</Link></li>
              <li><Link href="/documents?type=minutes" className="hover:text-foreground transition-colors">Meeting Minutes</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/insurance" className="hover:text-foreground transition-colors">Insurance Info</Link></li>
              <li><Link href="/records" className="hover:text-foreground transition-colors">Records Request</Link></li>
              <li><Link href="/meetings" className="hover:text-foreground transition-colors">Meetings</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Assistant</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/ask" className="hover:text-foreground transition-colors">Ask a Question</Link></li>
              <li><Link href="/ask#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About This Site</Link></li>
              <li><Link href="/about#disclaimer" className="hover:text-foreground transition-colors">Disclaimers</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            {SITE_CONFIG.name} &middot; Unofficial HOA Information Resource
          </p>
          <p className="text-xs text-muted-foreground italic text-center md:text-right">
            Transparency works best when it is quiet.
          </p>
        </div>
      </div>
    </footer>
  );
}
