# Graph Report - Verdaunt  (2026-10-05)

## Corpus Check
- 21 files · ~5,295 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .toml 1, .css 1)

## Summary
- 128 nodes · 193 edges · 10 communities (8 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `39c160bb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- SiteFooter.tsx
- compilerOptions
- compilerOptions
- react
- Waitlist.tsx
- HomePage.tsx
- devDependencies
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `react` - 14 edges
3. `compilerOptions` - 12 edges
4. `useWaitlist()` - 7 edges
5. `usePrefersReducedMotion()` - 7 edges
6. `homeHref()` - 6 edges
7. `SiteHeader()` - 5 edges
8. `submitWaitlistEmail()` - 5 edges
9. `useInView()` - 5 edges
10. `Ledger()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `go()` --calls--> `homeHref()`  [EXTRACTED]
  src/components/SiteHeader.tsx → src/lib/links.ts
- `onSubmit()` --calls--> `submitWaitlistEmail()`  [EXTRACTED]
  src/pages/HomePage.tsx → src/components/Waitlist.tsx
- `HeroRotator()` --calls--> `usePrefersReducedMotion()`  [EXTRACTED]
  src/pages/HomePage.tsx → src/lib/useInView.ts
- `SiteFooter()` --calls--> `useWaitlist()`  [EXTRACTED]
  src/components/SiteFooter.tsx → src/components/Waitlist.tsx
- `SiteFooter()` --calls--> `homeHref()`  [EXTRACTED]
  src/components/SiteFooter.tsx → src/lib/links.ts

## Import Cycles
- None detected.

## Communities (10 total, 2 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (21): dependencies, react, react-dom, name, private, scripts, build, dev (+13 more)

### Community 1 - "SiteFooter.tsx"
Cohesion: 0.30
Nodes (8): Logo(), SiteFooter(), links, SiteHeader(), go(), useWaitlist(), homeHref(), HomePage()

### Community 2 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, isolatedModules, jsx, lib, module, moduleDetection, moduleResolution, noEmit (+8 more)

### Community 3 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, isolatedModules, lib, module, moduleDetection, moduleResolution, noEmit, noUnusedLocals (+5 more)

### Community 4 - "react"
Cohesion: 0.33
Nodes (6): react, react-dom, AppShell(), src_index, LegalLayout(), LegalSection()

### Community 5 - "Waitlist.tsx"
Cohesion: 0.28
Nodes (8): submitWaitlistEmail(), WaitlistContext, WaitlistContextValue, WaitlistDialog(), onSubmit(), WaitlistProvider(), HeroEmail(), onSubmit()

### Community 6 - "HomePage.tsx"
Cohesion: 0.12
Nodes (14): naira(), useInView(), usePrefersReducedMotion(), ChatInvoice(), faqs, HeroRotator(), pillars, ReceiptQr() (+6 more)

### Community 7 - "devDependencies"
Cohesion: 0.25
Nodes (8): devDependencies, tailwindcss, @tailwindcss/vite, @types/react, @types/react-dom, typescript, vite, @vitejs/plugin-react

## Knowledge Gaps
- **58 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+53 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 72 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `package.json`, `SiteFooter.tsx`, `Waitlist.tsx`, `HomePage.tsx`?**
  _High betweenness centrality (0.278) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _58 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09486166007905138 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `HomePage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._