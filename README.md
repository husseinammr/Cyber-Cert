# CyberCert Hub

A permanent, static, no-login cybersecurity certification and career navigator.
Built with Next.js (App Router) + TypeScript + Tailwind CSS.

## Architecture
- No backend, no database, no CMS, no admin panel, no user accounts.
- All content lives in `/data` as TypeScript files.
- All user state (bookmarks, recently viewed, roadmap progress, compare list,
  language, theme) is stored **only** in the browser's `localStorage` — see `lib/storage.ts`.
- Fully static-friendly: can be deployed to Vercel or Netlify with zero server config.

## Run locally
```bash
npm install
npm run dev
```
Then open http://localhost:3000

## Build for production
```bash
npm run build
npm start
```
Or deploy directly to Vercel/Netlify (framework: Next.js, no env vars needed).

## Project structure
```
app/                 Routes (App Router)
  certifications/     List + [slug] detail
  career-paths/        List + [slug] detail
  roadmaps/             List + [slug] interactive branching framework
  specializations/       List + [slug] detail (Stage 06 of Start Here)
  start-here/             Foundation Framework overview + [stage] deep-dive pages
  free/                  Free resources hub
  compare/                Side-by-side certification comparison
  find-my-path/            Client-side questionnaire
  whats-next/               "What should I learn next" recommender
  graph/                     Certification relationship graph (SVG, zoom/pan, legend)
  bookmarks/                   Bookmarks + recently viewed (localStorage)
components/          Shared UI (Navbar, Footer, CertCard, Badge, GlobalSearch)
data/                Certification, free-resource, career-path, roadmap, foundation-stage,
                     and specialization datasets — this is the entire content system
lib/                 Types, i18n dictionary, label helpers, localStorage utility, app context (locale/theme)
```

## Start Here: the Foundation Framework
`/start-here` renders six ordered stages (`data/foundation.ts`) as a connected
tree, ending in a "Specialization" branch built from `data/specializations.ts`.
Each stage is clickable and opens `/start-here/[stage]`, a deep page with topic
groups, concept-level "why it matters / cybersecurity relevance" breakdowns,
readiness checklist, free resources, practical exercises, and common mistakes.
Progress is tracked in localStorage under the `foundation-framework` key
(`lib/storage.ts`'s `toggleStep`/`getProgress`, shared with the Roadmaps feature).

Stage 6 links into `/specializations/[slug]`, which shows skills, tools,
beginner/intermediate/advanced certifications, labs, and career progression for
each of the 9 specializations (Red Team, Blue Team, SOC, DFIR, Cloud, Network,
AppSec, GRC, Security Engineering) — each links onward to its full career path
and, where one exists, its interactive roadmap.

## Roadmaps as frameworks, not lists
`lib/types.ts` defines a `RoadmapRow` as either a single step or an array of
steps rendered as parallel branches that merge back into the trunk (see the
Red Team roadmap's Network/Linux/Web branch in `data/roadmaps.ts`). Each
roadmap's `flow` is its own shape — they are not forced into one generic
template. `/roadmaps/[slug]` renders the flow as a connected diagram; clicking
any node opens a detail panel answering "Where am I? / What did I complete? /
What comes next? / Why do I need this?", with progress saved per roadmap slug
in localStorage.

## Certification Map (graph)
`/graph` groups certifications into three columns (beginner → intermediate →
advanced), sorted by primary category within each column to minimize crossing
connectors, and draws orthogonal (stepped) connectors with directional
arrowheads instead of curves. It supports pointer-based pan and +/− zoom
controls, includes a category-color legend, and clicking a node highlights it
and its direct relationships while dimming the rest of the graph.

## Content policy
- Certification data distinguishes Certification / Course / Training / Lab / Badge and
  never mislabels paid content as fully free (see `data/free-resources.ts` and the
  `costCategory` field in `data/certifications.ts`).
- Prices are intentionally **not** hardcoded since they change; each certification page
  links to the official provider and shows a "prices may change" warning.
- To add or correct a certification, edit `data/certifications.ts` — no other code
  changes are required for the site to pick it up (list, filters, search, compare,
  graph, and recommendations all read from this file).

## i18n
English and Arabic are supported with full LTR/RTL switching (`lib/i18n.ts`,
toggled via the language switcher in the navbar). Dark/light mode is toggled the
same way and both preferences persist in localStorage.
