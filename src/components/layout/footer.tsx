import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Links */}
        <div className="flex justify-center gap-8">
          <Link href="/answers" className="text-sm font-medium hover:text-foreground transition-colors text-muted-foreground">
            Quick Answers
          </Link>
          <Link href="/meetings" className="text-sm font-medium hover:text-foreground transition-colors text-muted-foreground">
            Meetings
          </Link>
        </div>
      </div>
    </footer>
  );
}
