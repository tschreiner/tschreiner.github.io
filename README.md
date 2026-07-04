# teddschreiner.de

Astro-Relaunch der Personal Brand Website von Tedd Schreiner.

## Stack

- Astro
- TypeScript
- Tailwind CSS über `@tailwindcss/vite`
- MDX
- Astro Content Collections
- Cloudflare Pages

## Entwicklung

```bash
npm install
npm run dev
npm run check
npm run build
```

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`

## Inhalte

- Projekte liegen in `src/content/projects`
- Blogartikel liegen in `src/content/blog`
- Drafts werden im Production Build nicht veröffentlicht

## Datenschutz

Die Seite bindet keine Tracking-Skripte, keine externen Webfonts und keine Icon-CDNs ein.
