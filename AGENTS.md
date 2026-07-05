# AGENTS.md

## Projektüberblick

Dieses Repository enthält die statische Personal-Brand-Website `teddschreiner.de`. Die Seite ist ein Astro-Projekt mit TypeScript, MDX, Astro Content Collections und Tailwind CSS über das Vite-Plugin. Der Build erzeugt reine statische Dateien im Verzeichnis `dist` und ist für Cloudflare Pages gedacht. Inhaltlich geht es um DevOps, Netzwerkautomatisierung, Network Source of Truth, technische Projekte, Blog-Entwürfe und ein zurückhaltend eingebundenes Mentoring-Nebenprojekt. Content liegt überwiegend strukturiert unter `src/content`, während wiederverwendbare UI-Bausteine unter `src/components` liegen. Design und Farbwelt werden zentral in `src/styles/global.css` über CSS Custom Properties und Tailwind-Utilities geführt. Die Seite verwendet keine externen Webfonts, kein Tracking und soll leichtgewichtig, wartbar und datensparsam bleiben.

## Stack Und Commands

- Runtime: Node.js `>=22.12.0`, npm `>=10.0.0`; `.nvmrc` ist die lokale Referenz.
- Framework: Astro 7, TypeScript, MDX, Astro Content Collections.
- Styling: Tailwind CSS 4 über `@tailwindcss/vite`; globale Design-Tokens in `src/styles/global.css`.
- Build-Ziel: statischer Astro-Build nach `dist`.

Wichtige Commands:

```bash
npm install
npm run dev
npm run check
npm run build
npm run quality
npm run preview
```

`npm run quality` ist der Standard-Vorflug vor Commit, Push oder Deployment-relevanten Änderungen.

## Repository-Struktur

- `src/pages`: Dateibasiertes Routing für Startseite, Blog, Projekte, Rechtliches, RSS, Sitemap und Robots.
- `src/layouts`: Seitengerüste; `BaseLayout.astro` enthält Header, Footer, SEO und globale Struktur.
- `src/components`: Wiederverwendbare UI-Komponenten. Komponenten sollen klein, explizit und Astro-nativ bleiben.
- `src/content`: Content Collections für Blog, Projekte, Experience und Site-Daten.
- `src/lib`: Sortierung, Site-Konstanten und Content-Helfer.
- `src/styles/global.css`: globale Tailwind-Importe, CSS Tokens, Component-Layer und Basiseffekte.
- `public`: unverarbeitete statische Assets, `CNAME` und Bilder.
- `docs`: Meta-Dokumentation und Arbeitsvorlagen, nicht zwingend Teil der Website-Navigation.

## Content-Regeln

- Blogposts gehören nach `src/content/blog` und müssen zum Schema in `src/content.config.ts` passen.
- Projektseiten gehören nach `src/content/projects`; `slug` muss mit der Route `/projects/{slug}/` funktionieren.
- Experience-Daten gehören als JSON nach `src/content/experience`.
- Draft-Blogposts bleiben über `draft: true` aus Sitemap, RSS und statischen Blog-Routen heraus.
- Vertrauliche Projektdetails dürfen nicht rekonstruiert werden. Nutze anonymisierte, allgemein beschreibende Formulierungen.
- Keine personenbezogenen Daten, Kundennamen, internen Systeme oder privaten Kontaktwege ergänzen, außer sie sind bereits bewusst öffentlich im Repo vorhanden.

## Komponenten Und Styling

- Bevorzuge vorhandene Komponenten wie `Container`, `TechTag`, `ProjectCard`, `BlogCard`, `Callout` und `ContactPanel`.
- Halte Layout-Änderungen Astro-nativ; kein Client-JavaScript einführen, wenn HTML und CSS reichen.
- Nutze die Design-Tokens in `src/styles/global.css`: `--ink`, `--muted`, `--paper`, `--surface`, `--line`, `--accent`, `--accent-dark`, `--sky`, `--graphite`.
- Neue Farben nur ergänzen, wenn sie aus der bestehenden Bild- und Markenwelt begründbar sind.
- Vermeide verschachtelte Karten, dekorative Gradients ohne Zweck und unnötige Wrapper.
- Mobile und Desktop müssen ohne Textüberlauf funktionieren. Besonders Buttons, Tags, Hero und Karten prüfen.

## Assets, Bilder Und Performance

- Öffentliche Assets liegen unter `public`; referenziere sie mit absoluten Pfaden wie `/images/name.jpg`.
- Bilder brauchen aussagekräftige `alt`-Texte, außer sie sind rein dekorativ.
- Above-the-fold-Bilder dürfen `loading="eager"` und `fetchpriority="high"` nutzen; sonst bevorzugt lazy loading.
- Keine großen neuen Assets einchecken, ohne Größe, Format und tatsächlichen Nutzen zu prüfen.
- Das aktuelle Hero- und Social-Preview-Bild ist `/images/tedd-schreiner-hero.jpg`.
- Keine externen Fonts, Tracking-Skripte oder unnötigen CDN-Abhängigkeiten einführen.

## SEO, Feeds Und Accessibility

- SEO Defaults laufen über `src/components/SEOHead.astro` und `src/lib/site.ts`.
- Canonical URLs müssen auf `https://teddschreiner.de` zeigen.
- RSS liegt in `src/pages/rss.xml.ts`; Sitemap in `src/pages/sitemap.xml.ts`; Robots in `public/robots.txt`.
- Drafts dürfen nicht in RSS oder Sitemap erscheinen.
- Seitentitel und Beschreibungen sollen konkret, kurz und deutschsprachig sein.
- Jede Seite braucht klare Landmarks, genau einen sinnvollen Hauptinhalt und nutzbare Fokuszustände.
- Links müssen als Links verständlich sein; keine vagen Linktexte wie "hier", wenn der Kontext nicht eindeutig ist.
- Fokuszustände nicht entfernen; kleine Meta-Texte, Tags und Links dürfen subtil sein, brauchen aber ausreichend Kontrast.
- Neue Navigation darf nicht nur per Hover funktionieren.

## Cloudflare Pages Deployment

- Production Branch: `main`.
- Build Command: `npm run build`.
- Output Directory: `dist`.
- Node.js: `22.12.0` oder neuer; in Cloudflare Pages bei Bedarf `NODE_VERSION=22.12.0` setzen.
- `public/_headers` haelt Security-Header im Repo und soll `*.pages.dev`- bzw. Preview-URLs per `X-Robots-Tag` auf `noindex` halten.
- Es ist kein Wrangler-Projekt. Ein fehlendes `wrangler.toml` ist für Cloudflare Pages hier erwartbar.
- Wenn Cloudflare einen alten Commit baut, nicht einen alten Deploy "retryen"; einen neuen Deploy vom aktuellen `main` starten.

## Qualitäts-Gates

Vor Commit, Push oder PR:

```bash
npm run quality
```

Der GitHub-Actions-Workflow `.github/workflows/quality.yml` fuehrt dasselbe Quality Gate mit `npm ci` aus.

Bei Content-only-Änderungen reicht mindestens:

```bash
npm run check
```

Vor Deployment-relevanten Änderungen immer zusätzlich:

```bash
npm run build
```

Wenn eine Verifikation nicht ausführbar ist, dokumentiere den Grund im Abschluss. Keine grüne Verifikation behaupten, die nicht gelaufen ist.

## Git- Und Änderungsregeln

- Prüfe zu Beginn `git status --short --branch`.
- Revertiere keine fremden oder unklaren Änderungen ohne ausdrückliche Anweisung.
- Halte Änderungen klein und zweckgebunden. Keine großen Refactors nebenbei.
- Committe keine generierten Ordner wie `dist`, `.astro` oder `node_modules`.
- `repomix.txt` und `planung_audit.txt` sind lokale Migrationsquellen und bleiben unveröffentlicht.
- Wenn du neue Produktionsregeln etablierst, aktualisiere auch README oder diese Datei.

## Sicherheit Und Datenschutz

- Keine Secrets, Tokens, API-Keys oder privaten Daten in Code, Content, Git-Historie oder Dokumentation einfügen.
- `.env` und `.env.*` bleiben ignoriert; nur `.env.example` wäre erlaubt.
- Keine Tracking- oder Analytics-Skripte ohne explizite Entscheidung einbauen.
- Rechtliche Seiten (`impressum`, `datenschutz`) nur mit besonderer Vorsicht ändern.
- Kontaktinformationen nur aus `src/lib/site.ts` oder bestehendem öffentlichen Content übernehmen.

## Nicht-Ziele

- Kein Umbau zu SSR, Serverless Functions oder Wrangler, solange Cloudflare Pages static hosting ausreicht.
- Kein Design-System- oder Framework-Wechsel ohne klare Anforderung.
- Keine internationalen Sprachvarianten ohne Content-Strategie.
- Keine künstliche Erweiterung der Navigation oder neue Marketing-Landingpages ohne konkreten Inhalt.
- Keine erfundenen Case-Study-Details, Kundennamen oder Metriken.
