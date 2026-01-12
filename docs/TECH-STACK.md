# Technology Stack Recommendations

This document provides specific technology recommendations and setup guidance for the Westlake HOA Hub.

---

## Recommended Stack Summary

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Next.js 15 (App Router) | SSR, RSC, excellent DX |
| **Language** | TypeScript 5.x | Type safety, better tooling |
| **Styling** | Tailwind CSS v4 | Utility-first, great with shadcn |
| **UI Components** | shadcn/ui + Radix | Accessible, customizable, owned |
| **Icons** | Lucide React | Consistent, tree-shakeable |
| **AI/RAG** | Vercel AI SDK + Anthropic Claude | Streaming, citations, best reasoning |
| **Database** | Supabase (PostgreSQL) | Managed PostgreSQL, real-time, auth |
| **Vector Store** | Supabase pgvector | Document embeddings for RAG |
| **File Storage** | Supabase Storage | PDF document storage |
| **Hosting** | Netlify | Great Next.js support, edge functions |
| **Analytics** | Netlify Analytics | Privacy-focused, simple |

---

## Core Framework: Next.js 15

### Why Next.js 15?

- **App Router** - Modern file-based routing with layouts
- **React Server Components** - Better performance, smaller bundles
- **Streaming** - Progressive rendering for AI responses
- **Image Optimization** - Built-in responsive images
- **Middleware** - Device detection, redirects
- **Netlify Support** - Excellent deployment support via @netlify/plugin-nextjs

### Project Setup

```bash
# Create new project with TypeScript and Tailwind
npx create-next-app@latest westlake-hub --ts --tailwind --eslint --app --src-dir

# Navigate to project
cd westlake-hub
```

### Recommended Project Structure

```
westlake-hub/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── (main)/             # Main layout group
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── documents/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── ask/
│   │   │   │   └── page.tsx
│   │   │   ├── meetings/
│   │   │   │   └── page.tsx
│   │   │   ├── insurance/
│   │   │   │   └── page.tsx
│   │   │   └── records/
│   │   │       └── page.tsx
│   │   ├── api/                # API routes
│   │   │   ├── chat/
│   │   │   │   └── route.ts
│   │   │   └── documents/
│   │   │       └── route.ts
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Header, Footer, Nav
│   │   ├── documents/          # Document-specific components
│   │   ├── chat/               # AI chat components
│   │   └── shared/             # Shared components
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       # Browser client
│   │   │   ├── server.ts       # Server client
│   │   │   └── middleware.ts   # Auth middleware
│   │   ├── ai.ts               # AI/RAG utilities
│   │   ├── utils.ts            # Utility functions
│   │   └── constants.ts        # App constants
│   ├── types/
│   │   ├── database.ts         # Supabase generated types
│   │   └── index.ts            # App types
│   └── hooks/
│       └── index.ts            # Custom React hooks
├── supabase/
│   ├── migrations/             # Database migrations
│   └── seed.sql                # Seed data
├── public/
│   └── documents/              # Static document files (fallback)
├── .env.local                  # Environment variables
├── netlify.toml                # Netlify configuration
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## UI Layer: shadcn/ui + Tailwind CSS v4

### Setup shadcn/ui

```bash
# Initialize shadcn/ui
npx shadcn@latest init

# When prompted:
# - Style: Default
# - Base color: Slate (or Neutral for government feel)
# - CSS variables: Yes
# - Tailwind config location: tailwind.config.ts
# - Components location: src/components/ui
# - Utils location: src/lib/utils
```

### Essential Components to Install

```bash
# Core layout & navigation
npx shadcn@latest add navigation-menu
npx shadcn@latest add sheet          # Mobile drawer
npx shadcn@latest add tabs
npx shadcn@latest add breadcrumb

# Content display
npx shadcn@latest add card
npx shadcn@latest add accordion
npx shadcn@latest add badge
npx shadcn@latest add table

# Forms & input
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add command       # Search/command palette

# Feedback & overlay
npx shadcn@latest add dialog
npx shadcn@latest add toast
npx shadcn@latest add alert
npx shadcn@latest add skeleton      # Loading states

# Utility
npx shadcn@latest add scroll-area
npx shadcn@latest add separator
npx shadcn@latest add tooltip
```

### Tailwind CSS v4 Configuration

With Tailwind v4, configuration is simpler:

```css
/* src/app/globals.css */
@import "tailwindcss";

/* Custom theme variables */
@theme {
  --color-primary: #2563eb;
  --color-primary-foreground: #ffffff;

  /* Document type colors */
  --color-policy: #9333ea;
  --color-minutes: #16a34a;
  --color-notice: #f59e0b;
  --color-insurance: #0891b2;
}

/* Dark mode support */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

### Icons: Lucide React

```bash
npm install lucide-react
```

Usage:
```tsx
import { FileText, Search, MessageSquare, Shield } from 'lucide-react';

<FileText className="h-5 w-5" />
```

---

## Dark Mode Setup

### Install next-themes

```bash
npm install next-themes
```

### Configure Provider

```tsx
// src/app/layout.tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Theme Toggle Component

```tsx
// src/components/theme-toggle.tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

---

## AI/RAG Implementation with Anthropic Claude

### Vercel AI SDK + Anthropic Setup

```bash
npm install ai @ai-sdk/anthropic
```

### Chat API Route

```tsx
// src/app/api/chat/route.ts
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages, documentContext } = await req.json();

  const systemPrompt = `You are an informational assistant for the Westlake Village HOA.

RULES:
- Only answer based on the provided documents
- Always cite your sources with document names and sections
- Never give legal advice
- If you don't know, say so
- Be neutral and factual

CONTEXT DOCUMENTS:
${documentContext}

Always end responses with: "This is informational only, not legal advice."`;

  const result = await streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
```

### Chat Component

```tsx
// src/components/chat/ai-chat.tsx
'use client';

import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User } from 'lucide-react';

export function AIChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <Card className="flex flex-col h-[600px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            {message.role === 'assistant' && (
              <Bot className="h-6 w-6 text-primary" />
            )}
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === 'assistant'
                  ? 'bg-muted'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {message.content}
            </div>
            {message.role === 'user' && (
              <User className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about HOA documents..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}
```

### Anthropic Model Options

| Model | Use Case | Cost |
|-------|----------|------|
| `claude-sonnet-4-20250514` | Best balance of speed/quality | Medium |
| `claude-opus-4-20250514` | Complex reasoning, highest quality | Higher |
| `claude-3-5-haiku-20241022` | Fast responses, simple queries | Lower |

**Recommendation:** Use `claude-sonnet-4-20250514` for the chat interface - excellent reasoning with good speed.

---

## Database: Supabase

### Why Supabase?

- **Managed PostgreSQL** - No server management
- **pgvector Built-in** - Vector embeddings for RAG
- **Row Level Security** - Secure by default
- **Real-time** - Live updates if needed
- **Storage** - Built-in file storage for PDFs
- **Auth** - Ready if you need user accounts later
- **TypeScript Generation** - Auto-generated types

### Setup Supabase

```bash
# Install Supabase packages
npm install @supabase/supabase-js @supabase/ssr

# Install CLI for local development (optional)
npm install -D supabase
```

### Initialize Supabase Client

```tsx
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```tsx
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component - ignore
          }
        },
      },
    }
  );
}
```

### Database Schema (SQL)

Create a dedicated schema for the HOA app:

```sql
-- Create dedicated schema
CREATE SCHEMA IF NOT EXISTS westlake;

-- Set search path for this session
SET search_path TO westlake, public;

-- Enable pgvector extension (run once in public schema)
CREATE EXTENSION IF NOT EXISTS vector;

-- Document types enum
CREATE TYPE westlake.document_type AS ENUM (
  'declaration',
  'bylaw',
  'rule',
  'policy',
  'minutes',
  'notice',
  'insurance'
);

-- Document status enum
CREATE TYPE westlake.document_status AS ENUM (
  'current',
  'superseded',
  'draft'
);

-- Meeting types enum
CREATE TYPE westlake.meeting_type AS ENUM (
  'board',
  'annual',
  'special'
);

-- Decision status enum
CREATE TYPE westlake.decision_status AS ENUM (
  'approved',
  'rejected',
  'tabled'
);

-- Documents table
CREATE TABLE westlake.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type westlake.document_type NOT NULL,
  status westlake.document_status DEFAULT 'current',
  content TEXT,
  summary TEXT,
  file_url TEXT,
  file_path TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Document versions for history
CREATE TABLE westlake.document_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES westlake.documents(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  content TEXT,
  changes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tags for categorization
CREATE TABLE westlake.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL
);

-- Document-tag junction
CREATE TABLE westlake.document_tags (
  document_id UUID REFERENCES westlake.documents(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES westlake.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (document_id, tag_id)
);

-- Meetings table
CREATE TABLE westlake.meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type westlake.meeting_type NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  agenda TEXT,
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Meeting-document junction
CREATE TABLE westlake.meeting_documents (
  meeting_id UUID REFERENCES westlake.meetings(id) ON DELETE CASCADE,
  document_id UUID REFERENCES westlake.documents(id) ON DELETE CASCADE,
  PRIMARY KEY (meeting_id, document_id)
);

-- Decisions from meetings
CREATE TABLE westlake.decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID REFERENCES westlake.meetings(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT,
  votes_for INTEGER,
  votes_against INTEGER,
  status westlake.decision_status NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Document embeddings for RAG (using pgvector)
CREATE TABLE westlake.document_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES westlake.documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  chunk_text TEXT NOT NULL,
  embedding vector(1536), -- OpenAI ada-002 dimensions (or adjust for your model)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for vector similarity search
CREATE INDEX ON westlake.document_embeddings
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Full-text search index on documents
CREATE INDEX documents_content_search ON westlake.documents
USING gin(to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, '')));

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION westlake.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to documents
CREATE TRIGGER documents_updated_at
  BEFORE UPDATE ON westlake.documents
  FOR EACH ROW
  EXECUTE FUNCTION westlake.update_updated_at();

-- Row Level Security (public read access for transparency)
ALTER TABLE westlake.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE westlake.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE westlake.decisions ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read access" ON westlake.documents
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON westlake.meetings
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON westlake.decisions
  FOR SELECT USING (true);
```

### Generate TypeScript Types

```bash
# Generate types from Supabase schema
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

### Vector Search Function for RAG

```sql
-- Function to search document embeddings
CREATE OR REPLACE FUNCTION westlake.search_documents(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  document_id UUID,
  chunk_text TEXT,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    de.document_id,
    de.chunk_text,
    1 - (de.embedding <=> query_embedding) AS similarity
  FROM westlake.document_embeddings de
  WHERE 1 - (de.embedding <=> query_embedding) > match_threshold
  ORDER BY de.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

### Supabase Storage for Documents

```tsx
// Upload a document
import { createClient } from '@/lib/supabase/client';

async function uploadDocument(file: File) {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from('documents')
    .upload(`pdfs/${file.name}`, file);

  if (error) throw error;

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('documents')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}
```

---

## Responsive Layout Components

### Mobile Bottom Navigation

```tsx
// src/components/layout/mobile-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, MessageSquare, Calendar, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/documents', icon: FileText, label: 'Docs' },
  { href: '/ask', icon: MessageSquare, label: 'Ask AI' },
  { href: '/meetings', icon: Calendar, label: 'Meetings' },
  { href: '/more', icon: Menu, label: 'More' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full',
                'text-muted-foreground hover:text-foreground transition-colors',
                isActive && 'text-primary'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### Desktop Header

```tsx
// src/components/layout/header.tsx
import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo & Badge */}
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-lg">
            Westlake HOA
          </Link>
          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
            Unofficial
          </span>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/documents">Documents</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/ask">Ask AI</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/meetings">Meetings</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/insurance">Insurance</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/records">Records</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
```

---

## Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."  # Server-side only, never expose

# Anthropic
ANTHROPIC_API_KEY="sk-ant-..."

# Site URL
NEXT_PUBLIC_SITE_URL="https://westlake-hoa.netlify.app"
```

---

## Deployment: Netlify

### Setup

1. Push code to GitHub
2. Connect repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy

### Netlify Configuration

```toml
# netlify.toml

[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"

# Redirects for SPA fallback (if needed)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Role = ["admin"]}

# Headers for security
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Cache static assets
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Install Netlify CLI (Optional)

```bash
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to existing site or create new
netlify init

# Deploy preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Netlify Edge Functions (for Streaming AI)

For optimal AI streaming performance, use Netlify Edge Functions:

```tsx
// netlify/edge-functions/chat.ts
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export default async function handler(req: Request) {
  const { messages, documentContext } = await req.json();

  const result = await streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    system: `You are an informational assistant...`,
    messages,
  });

  return result.toDataStreamResponse();
}

export const config = {
  path: '/api/chat',
};
```

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Supabase local development
npx supabase start          # Start local Supabase
npx supabase db reset       # Reset local database
npx supabase gen types typescript --local > src/types/database.ts

# Netlify local development
netlify dev                 # Run with Netlify functions

# Linting & formatting
npm run lint
npm run lint:fix

# Type checking
npm run type-check
```

---

## Performance Checklist

- [ ] Images use Next.js `<Image>` component
- [ ] Dynamic imports for heavy components
- [ ] Fonts optimized with `next/font`
- [ ] API routes use edge runtime where possible
- [ ] Static pages use ISR where appropriate
- [ ] Bundle analyzer reviewed (`@next/bundle-analyzer`)
- [ ] Lighthouse score > 90 on all metrics
- [ ] Supabase queries use proper indexes
- [ ] Document embeddings cached appropriately

---

## Security Checklist

- [ ] Environment variables not exposed to client
- [ ] Supabase RLS policies configured
- [ ] Input sanitization on all forms
- [ ] Rate limiting on API routes (via Netlify)
- [ ] CORS configured properly
- [ ] CSP headers configured in netlify.toml
- [ ] No sensitive data in git history
- [ ] Dependencies audited (`npm audit`)
- [ ] SUPABASE_SERVICE_ROLE_KEY only used server-side

---

## Supabase vs Alternatives

| Feature | Supabase | Vercel Postgres | PlanetScale |
|---------|----------|-----------------|-------------|
| pgvector | Built-in | Add-on | No |
| Storage | Built-in | Separate (Blob) | No |
| Real-time | Built-in | No | No |
| Auth | Built-in | Separate | No |
| Edge Functions | Yes | N/A | N/A |
| Free Tier | Generous | Limited | Limited |

**Supabase is ideal for this project** because it provides PostgreSQL with pgvector for RAG, built-in storage for PDFs, and optional auth if needed later.
