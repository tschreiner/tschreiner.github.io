# teddschreiner.de

Astro-Relaunch der Personal Brand Website von Tedd Schreiner.

## Zielbild

teddschreiner.de ist eine moderne Personal Brand Website fuer DevOps, Netzwerkautomatisierung, technische Projekte und ein dezentes Mentoring-Nebenprojekt.

## Stack

- Astro
- TypeScript
- Tailwind CSS
- MDX
- Astro Content Collections
- statischer Build fuer Cloudflare Pages

## Entwicklung

```bash
npm install
npm run dev
npm run check
npm run build
npm run quality
```

Cloudflare Pages:

- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: `22.12.0` oder neuer (`NODE_VERSION=22.12.0`)
- `public/_headers` enthaelt Security-Header und Noindex-Regeln fuer Cloudflare-Preview-Domains.
- `src/pages/404.astro` erzeugt die statische Custom-404-Seite.

## Inhalte

- Blog: `src/content/blog`
- Projekte: `src/content/projects`
- Experience: `src/content/experience`
- Site Data: `src/content/site`

Die bereitgestellten Migrationsquellen `repomix.txt` und `planung_audit.txt` bleiben lokal und werden nicht veroeffentlicht.
