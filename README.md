# teddschreiner.de

Statische Personal-Brand-Website fuer Tedd Schreiner mit Schwerpunkt auf DevOps, Netzwerkautomatisierung, technischen Projekten und einem zurueckhaltend eingebundenen Mentoring-Nebenprojekt.

## Stack

- Astro
- TypeScript
- Tailwind CSS ueber das Vite-Plugin
- MDX
- Astro Content Collections
- Static Build fuer Cloudflare Pages

## Lokale Entwicklung

```bash
npm ci
npm run dev
npm run check
npm run build
npm run quality
npm run preview
```

`npm run quality` ist das Quality Gate vor PR, Push oder Deployment-relevanten Aenderungen. Der GitHub-Actions-Workflow `.github/workflows/quality.yml` fuehrt denselben Check mit `npm ci` aus.

## Cloudflare Pages

- Production Branch: `main`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: `22.12.0` oder neuer, in Cloudflare Pages bei Bedarf `NODE_VERSION=22.12.0`
- Kein Wrangler erforderlich; die Seite bleibt ein statischer Astro-Build.

`public/CNAME` enthaelt die Custom Domain. `public/_headers` wird in den Build kopiert und setzt Security-Header. `src/pages/404.astro` erzeugt `dist/404.html`.

## Inhalte

- Blogposts: `src/content/blog`
- Projekte: `src/content/projects`
- Experience-Daten: `src/content/experience`
- Site-Daten und Navigation: `src/lib/site.ts` und `src/content/site`

Draft-Blogposts bleiben aus statischen Blog-Routen, RSS und Sitemap heraus. RSS wird ueber `src/pages/rss.xml.ts` erzeugt, die Sitemap ueber `src/pages/sitemap.xml.ts`; `public/robots.txt` verweist auf die Production-Sitemap.

## Production-Checkliste

- `npm run quality` lokal ausfuehren.
- Cloudflare Pages baut `main`.
- Build Command ist `npm run build`, Output Directory ist `dist`.
- Node-Version ist `22.12.0` oder `NODE_VERSION=22.12.0`.
- Custom Domain `teddschreiner.de` ist aktiv.
- Preview-/Staging-Verhalten ausserhalb des Repos in Cloudflare Pages pruefen.

Die lokalen Migrationsquellen `repomix.txt` und `planung_audit.txt` bleiben unveroeffentlicht.
