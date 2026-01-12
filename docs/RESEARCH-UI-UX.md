# UI/UX Research: Westlake Transparency Hub

This document consolidates research on best practices for building a modern, accessible, mobile-first transparency website using Next.js, React, and TypeScript.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [UI Component Libraries](#ui-component-libraries)
3. [Responsive Design](#responsive-design)
4. [Accessibility & Compliance](#accessibility--compliance)
5. [AI Chatbot UX](#ai-chatbot-ux)
6. [Information Architecture](#information-architecture)
7. [Visual Design Guidelines](#visual-design-guidelines)
8. [Sources](#sources)

---

## Design Philosophy

### Core Principles for Transparency Sites

1. **Trust Through Simplicity** - Clean, uncluttered interfaces build credibility
2. **Document-First Design** - Content hierarchy emphasizes source documents
3. **Neutral Tone** - No persuasive or editorial visual elements
4. **Accessibility is Usability** - Design for all abilities from the start
5. **Mobile-First** - Most users will access on phones

### Key UX Goals

| Goal | Implementation |
|------|----------------|
| Answers in < 30 seconds | Prominent search, AI assistant, clear navigation |
| Source transparency | Every claim links to documents |
| Trust & credibility | Professional design, clear disclaimers |
| Inclusivity | WCAG 2.1 AA compliance, plain language |

---

## UI Component Libraries

### Recommended: shadcn/ui + Radix UI + Tailwind CSS

Based on 2025-2026 research, this combination offers the best balance of:
- **Customizability** - Own your component code
- **Accessibility** - Built on accessible Radix primitives
- **Performance** - No runtime overhead, tree-shakeable
- **TypeScript** - First-class support
- **Next.js Compatibility** - Works seamlessly with App Router

### Why shadcn/ui?

> "shadcn/ui isn't installed like a normal library. Instead, you copy and paste component code directly into your project. This gives you complete ownership and control over every line of code."

**Advantages:**
- Components copied into your project (not a dependency)
- Built on Radix UI primitives with Tailwind styling
- 66k+ GitHub stars - fastest growing UI library
- Perfect for custom design systems
- Full control over styling and behavior

**Key Components for This Project:**
- `Dialog` - For document previews, AI responses
- `Accordion` - For FAQ, policy sections
- `Card` - For document cards, meeting summaries
- `Command` - For search/AI command palette
- `Navigation Menu` - For site navigation
- `Sheet` - For mobile navigation drawer
- `Tabs` - For document sections
- `Toast` - For notifications

### Alternative Options Evaluated

| Library | Pros | Cons | Verdict |
|---------|------|------|---------|
| **Mantine** | 123+ components, great hooks | Heavier bundle, opinionated | Good alternative |
| **NextUI (Hero UI)** | Beautiful defaults, SSR-friendly | Less customizable | Consider for faster MVP |
| **Headless UI** | Tailwind team, lightweight | Fewer components | Use alongside shadcn |
| **Base UI** | From MUI/Radix creators, accessible | Newer, less ecosystem | Watch for future |

### Important Note on Radix

> "Recently, the creators of Radix UI announced that this library isn't being actively maintained, so projects built on Radix UI may face future compatibility issues."

**Mitigation:** shadcn/ui is exploring Base UI as an alternative foundation. The component-ownership model means migration would be manageable.

---

## Responsive Design

### Mobile-First Approach

Start with mobile (320px) and progressively enhance for larger screens.

```
Mobile:    320px - 639px   (single column, bottom nav)
Tablet:    640px - 1023px  (two columns, side nav option)
Desktop:   1024px+         (multi-column, full nav)
```

### Tailwind CSS Breakpoints

```css
/* Mobile-first: base styles apply to mobile */
/* Then add responsive prefixes for larger screens */

sm: 640px   /* Tablet portrait */
md: 768px   /* Tablet landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Layout Techniques

| Technique | Use Case |
|-----------|----------|
| **CSS Grid** | Page layouts, document grids |
| **Flexbox** | Component layouts, navigation |
| **Container Queries** | Component-level responsiveness |
| **clamp()** | Fluid typography and spacing |

### Touch Target Guidelines

| Platform | Minimum Size | Recommended |
|----------|--------------|-------------|
| Apple (iOS) | 44x44px | 44x44px |
| Google (Android) | 48x48px | 48x48px |
| WCAG 2.1 | 44x44px | 44x44px |

**Implementation:**
- Buttons: minimum `h-11` (44px) on mobile
- Links in lists: full-width tap targets
- Adequate spacing between interactive elements

### Mobile Navigation Pattern

For this project, use a **bottom navigation bar** on mobile:

```
┌─────────────────────────────────────┐
│  [Content Area]                     │
│                                     │
│                                     │
├─────────────────────────────────────┤
│  🏠    📄    🤖    📋    ☰         │
│ Home  Docs   AI  Meetings  More    │
└─────────────────────────────────────┘
```

**Rationale:**
- Thumb-friendly (bottom of screen)
- Persistent access to key sections
- Common pattern users understand

### Image Optimization

Use Next.js `<Image>` component:
- Automatic WebP/AVIF conversion
- Responsive sizing with `sizes` prop
- Lazy loading by default
- Blur placeholder for perceived performance

```tsx
<Image
  src="/document-thumbnail.jpg"
  alt="Document preview"
  width={400}
  height={300}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  placeholder="blur"
/>
```

---

## Accessibility & Compliance

### WCAG 2.1 AA Requirements

As of April 2026, WCAG 2.1 Level AA compliance is **mandatory** for government and public websites under Title II of the ADA.

While this is an unofficial site, adhering to these standards:
- Ensures access for all users
- Builds trust and credibility
- Demonstrates commitment to transparency

### Key Requirements

#### 1. Color Contrast
- **Normal text:** 4.5:1 minimum contrast ratio
- **Large text (18px+):** 3:1 minimum
- **UI components:** 3:1 minimum

**Tools:** Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

#### 2. Keyboard Navigation
- All interactive elements focusable via Tab
- Logical focus order (left-to-right, top-to-bottom)
- Visible focus indicators
- Enter activates links, Space/Enter activates buttons
- Escape closes modals/dialogs

#### 3. Screen Reader Support
- Semantic HTML (`<nav>`, `<main>`, `<article>`, `<aside>`)
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for images
- ARIA labels where needed
- Live regions for dynamic content (AI responses)

#### 4. Content Structure
- Clear, descriptive page titles
- Consistent navigation across pages
- Skip links to main content
- Descriptive link text (not "click here")

### Testing Tools

| Tool | Purpose |
|------|---------|
| **axe DevTools** | Automated accessibility testing |
| **WAVE** | Visual accessibility evaluation |
| **Lighthouse** | Performance + accessibility audit |
| **VoiceOver/NVDA** | Manual screen reader testing |
| **Keyboard only** | Manual keyboard navigation test |

### Implementation Checklist

```markdown
[ ] All images have alt text
[ ] Color contrast meets 4.5:1 for text
[ ] Focus indicators visible on all interactive elements
[ ] Heading hierarchy is logical (no skipped levels)
[ ] Forms have associated labels
[ ] Error messages are announced to screen readers
[ ] Skip link to main content exists
[ ] Page titles are unique and descriptive
[ ] ARIA live regions for dynamic AI responses
[ ] Touch targets minimum 44x44px
```

---

## AI Chatbot UX

### Design Principles for AI Assistant

1. **Purpose Clarity** - Users understand what the AI can/cannot do
2. **Source Transparency** - Every response cites documents
3. **Graceful Limitations** - Clear messaging when AI can't help
4. **Conversational Flow** - Natural, not robotic
5. **Trust Building** - Visual distinction between AI-generated and sourced content

### UI Patterns

#### Welcome Message
```
┌─────────────────────────────────────────────────┐
│  🤖 HOA Document Assistant                      │
│                                                 │
│  I can help you understand HOA documents,       │
│  policies, and procedures. I'll always cite     │
│  my sources.                                    │
│                                                 │
│  Try asking:                                    │
│  • "What does the insurance cover?"             │
│  • "How do I request records?"                  │
│  • "What are the late fee policies?"            │
│                                                 │
│  [Ask a question...]                       🔍   │
└─────────────────────────────────────────────────┘
```

#### Response with Citations
```
┌─────────────────────────────────────────────────┐
│  You: What is the late fee policy?              │
├─────────────────────────────────────────────────┤
│  🤖 Assistant:                                  │
│                                                 │
│  Late fees escalate based on the duration of    │
│  delinquency:                                   │
│                                                 │
│  • Initial late fee: $50                        │
│  • Escalating monthly: up to $250/month         │
│  • Interest rate: 8% annually                   │
│                                                 │
│  📄 Source: Responsible Governance Policies     │
│     Section 2: Collections Policies             │
│     [View Document →]                           │
│                                                 │
│  ⚠️ This is informational only, not legal      │
│     advice. Consult the official documents.     │
└─────────────────────────────────────────────────┘
```

### Key UI Elements

| Element | Purpose |
|---------|---------|
| **Quick reply buttons** | Suggest common questions |
| **Source badges** | Visual indicator of cited documents |
| **Deep links** | Jump to specific document sections |
| **Disclaimer footer** | Persistent legal disclaimer |
| **Typing indicator** | Show AI is processing |
| **Error states** | Clear messaging when AI fails |

### RAG Citation Best Practices

> "Chatbot responses should be formatted to make the user aware of the bot's source of knowledge. You can enhance a user's trust by offering a straightforward visual or textual indication of when the assistant pulls factual information from a known source."

**Implementation:**
- Every factual claim links to source document
- Visual distinction for citations (badge, icon, color)
- "View source" expands to show relevant excerpt
- "No source found" displayed when appropriate

### Hybrid Interface Approach

Not every query needs a chat interface. Provide multiple paths:

| Query Type | Best Interface |
|------------|----------------|
| "Find insurance documents" | Search/Browse |
| "What does X policy mean?" | AI Chat |
| "Download meeting minutes" | Document Library |
| "How do I file a claim?" | AI Chat + Guide |

---

## Information Architecture

### Site Structure

```
Home
├── Documents
│   ├── Declarations & Bylaws
│   ├── Rules & Regulations
│   ├── Governance Policies
│   ├── Meeting Minutes
│   └── Insurance Documents
├── Ask AI
├── Meetings & Decisions
│   ├── Upcoming Meetings
│   ├── Past Meetings
│   └── Decision Log
├── Records Request
│   ├── What You Can Request
│   ├── How to Request
│   └── Request Templates
├── Insurance
│   ├── HOA Coverage
│   ├── Owner Responsibilities
│   └── Claims & Contacts
└── About This Site
    ├── Purpose & Disclaimers
    └── How to Report Errors
```

### Navigation Design

**Primary Navigation (Desktop):**
- Horizontal top navigation
- Logo + "Unofficial HOA Site" badge
- Main sections: Documents, Ask AI, Meetings, Insurance, Records
- Search icon/bar

**Primary Navigation (Mobile):**
- Bottom tab bar (5 items max)
- Hamburger menu for secondary items
- Sticky search bar option

### Document Organization

Each document should display:
1. **Title** - Clear, descriptive name
2. **Type badge** - Policy, Minutes, Notice, etc.
3. **Date** - When adopted/updated
4. **Status** - Current, Superseded, Draft
5. **AI Summary** - Plain-English overview
6. **Key Sections** - Quick navigation
7. **Download** - Original PDF
8. **Related Documents** - Cross-references

---

## Visual Design Guidelines

### Typography

**Recommended Font Stack:**
```css
/* System font stack for performance */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, sans-serif;

/* Or use Inter for more control */
font-family: 'Inter', sans-serif;
```

**Scale (Mobile-First):**
| Element | Mobile | Desktop |
|---------|--------|---------|
| H1 | 24px (1.5rem) | 36px (2.25rem) |
| H2 | 20px (1.25rem) | 28px (1.75rem) |
| H3 | 18px (1.125rem) | 22px (1.375rem) |
| Body | 16px (1rem) | 16px (1rem) |
| Small | 14px (0.875rem) | 14px (0.875rem) |

### Color Palette

For a **trustworthy, neutral, government-style** site:

```css
/* Primary - Professional blue (trust, stability) */
--primary: 220 70% 45%;      /* #2563EB */
--primary-foreground: 0 0% 100%;

/* Neutral grays */
--background: 0 0% 100%;
--foreground: 222 47% 11%;   /* Near black */
--muted: 210 40% 96%;
--muted-foreground: 215 16% 47%;

/* Semantic colors */
--success: 142 71% 45%;      /* Green for confirmations */
--warning: 38 92% 50%;       /* Amber for cautions */
--error: 0 84% 60%;          /* Red for errors */
--info: 199 89% 48%;         /* Cyan for information */

/* Document type badges */
--badge-policy: 262 83% 58%; /* Purple */
--badge-minutes: 142 71% 45%;/* Green */
--badge-notice: 38 92% 50%;  /* Amber */
--badge-insurance: 199 89% 48%;/* Cyan */
```

### Dark Mode

Support dark mode for:
- User preference (prefers-color-scheme)
- Manual toggle
- Reduced eye strain

Use shadcn/ui's built-in dark mode with next-themes.

### Spacing System

Use Tailwind's spacing scale consistently:
- `space-1` (4px) - Tight spacing
- `space-2` (8px) - Component internal
- `space-4` (16px) - Between related elements
- `space-6` (24px) - Section padding
- `space-8` (32px) - Between sections

### Iconography

Use **Lucide React** (recommended with shadcn/ui):
- Consistent stroke width
- MIT licensed
- Tree-shakeable
- Accessible

---

## Sources

### UI Component Libraries
- [Untitled UI: 14 Best React UI Component Libraries in 2026](https://www.untitledui.com/blog/react-component-libraries)
- [Makers' Den: React UI Libraries in 2025](https://makersden.io/blog/react-ui-libs-2025-comparing-shadcn-radix-mantine-mui-chakra)
- [Builder.io: 15 Best React UI Libraries for 2026](https://www.builder.io/blog/react-component-libraries-2026)
- [VarbinTech: UI Component Libraries for Next.js 2025](https://varbintech.com/blog/ui-component-libraries-5-must-try-picks-for-next-js-in-2025)

### Responsive Design
- [NextNative: 9 Responsive Design Best Practices for 2025](https://nextnative.dev/blog/responsive-design-best-practices)
- [DEV.to: Mobile-First Development with Next.js](https://dev.to/muzammilrawjani/mobile-first-development-best-practices-with-nextjs-and-mobile-first-css-1526)
- [Strapi: React & Next.js in 2025 - Modern Best Practices](https://strapi.io/blog/react-and-nextjs-in-2025-modern-best-practices)

### Accessibility
- [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/documentation/accessibility/)
- [ADA.gov: Web Accessibility Guidance](https://www.ada.gov/resources/web-guidance/)
- [A11Y Project Checklist](https://www.a11yproject.com/checklist/)
- [Digital.gov: Accessibility for UX Designers](https://digital.gov/guides/accessibility-for-teams/ux-design)

### AI Chatbot UX
- [Netguru: Top Chatbot UX Tips for 2025](https://www.netguru.com/blog/chatbot-ux-tips)
- [Mind the Product: UX Best Practices for AI Chatbots](https://www.mindtheproduct.com/deep-dive-ux-best-practices-for-ai-chatbots/)
- [WillowTree: 7 UX/UI Rules for Conversational AI](https://www.willowtreeapps.com/insights/willowtrees-7-ux-ui-rules-for-designing-a-conversational-ai-assistant)
- [Groto: AI Chatbot UX Design Best Practices 2026](https://www.letsgroto.com/blog/ux-best-practices-for-ai-chatbots)

### shadcn/ui & Next.js
- [shadcn/ui Official Docs: Next.js Installation](https://ui.shadcn.com/docs/installation/next)
- [DEV.to: Setting Up Next.js 15 with ShadCN & Tailwind CSS v4](https://dev.to/darshan_bajgain/setting-up-2025-nextjs-15-with-shadcn-tailwind-css-v4-no-config-needed-dark-mode-5kl)
- [Medium: Complete Guide for Next.js 15, Tailwind v4, shadcn](https://medium.com/@dilit/building-a-modern-application-2025-a-complete-guide-for-next-js-1b9f278df10c)
