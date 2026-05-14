# Teleaon AI Website

Production-ready AI company website built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Structure

- `app` - App Router pages and route metadata
- `components/layout` - Header, mega menu, footer
- `components/sections` - Hero, AI visual, CTA, grids, stats, testimonials, FAQ, templates
- `components/ui` - Small reusable primitives
- `data` - Product, solution, use case, and library content
- `public/videos` - Replaceable 3D AI video assets
- `public/images` - Replaceable images and visual assets

The `AIHeroVisual` component includes comments showing where real 3D AI videos from `public/videos` can be connected.
