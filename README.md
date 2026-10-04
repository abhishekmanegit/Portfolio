# Abhishek Mane — Portfolio
https://abhishekmane.vercel.app/

A premium engineering portfolio built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Editorial, minimal design system with a restrained warm-paper palette and a single signal accent
- Signature "event flow" hero concept based on the SAGA order system
- Featured + secondary project showcase with distinct visual hierarchy
- Full project detail slide-over with architecture diagrams
- Sticky, compact-on-scroll navigation with a mobile menu
- Engineering mindset, skills, journey timeline, and contact sections
- Fully responsive, accessible (semantic HTML, keyboard nav, reduced-motion support)
- SEO metadata (Open Graph, canonical URL placeholder)

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Customize

Project, skill, timeline, and link data all live in one place:

- `src/data/content.ts` — the single source of truth for all content

To rewire the resume button, update `profile.resume` in `src/data/content.ts`
and place the PDF in the `public/` directory.

SEO defaults (title, meta description, Open Graph, canonical URL) are in
`index.html`. Search for `abhishekmane.dev` to replace the canonical placeholder
with your deployed domain.

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS v4 · Framer Motion
