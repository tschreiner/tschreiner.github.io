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

GitHub Actions ist hier bewusst nur ein Qualitaetsgate. Cloudflare Pages baut weiter direkt aus Git und braucht dafuer keine Deployment-Secrets im Repository.

## Cloudflare Pages

- Production Branch: `main`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: `22.12.0` oder neuer, in Cloudflare Pages bei Bedarf `NODE_VERSION=22.12.0`
- Kein Wrangler erforderlich; die Seite bleibt ein statischer Astro-Build.

Das Kontaktformular laeuft ueber eine Cloudflare Pages Function unter `functions/api/contact.ts` und versendet E-Mails per Resend. Dafuer muessen in Cloudflare Pages diese Umgebungsvariablen gesetzt sein:

```text
RESEND_API_KEY=...
CONTACT_FROM_EMAIL=Website Kontakt <kontakt@teddschreiner.de>
CONTACT_TO_EMAIL=info@teddschreiner.de
```

`CONTACT_FROM_EMAIL` muss bei Resend als Absender-Domain verifiziert sein. Ohne diese Variablen zeigt das Formular eine Fehlermeldung und verweist auf die direkte E-Mail.

`public/CNAME` enthaelt die Custom Domain. `public/_headers` wird in den Build kopiert, setzt Security-Header und haelt `*.pages.dev`-URLs per `X-Robots-Tag` auf `noindex`. `src/pages/404.astro` erzeugt `dist/404.html`.

Dieses Repository nutzt ein statisches `public/robots.txt` statt einer `src/pages/robots.txt.ts`-Route. Die Sitemap wird ueber `src/pages/sitemap.xml.ts` erzeugt.

## Inhalte

- Blogposts: `src/content/blog`
- Projekte: `src/content/projects`
- Experience-Daten: `src/content/experience`
- Site-Daten und Navigation: `src/lib/site.ts` und `src/content/site`

## Assets

- Optimierbare UI-Bilder liegen unter `src/assets`, damit Astro sie fuer den Build responsiv verarbeiten kann.
- `public` bleibt fuer unverarbeitete statische Dateien wie `CNAME`, `_headers`, `robots.txt`, Favicons und stabile OG-Bilder.

## Analytics

Google Analytics 4 ist mit der Mess-ID `G-W6T1TJ8W7N` integriert. Der Google-Tag wird erst nach aktiver Zustimmung im Cookie-Hinweis geladen; ohne Zustimmung bleiben Analytics Storage und ad-bezogene Consent-Flags auf `denied`.

Erfasste Website-Events nach Zustimmung:

- `page_view`
- `select_content` fuer Projekt- und Blog-Karten
- `contact_cta_click`
- `view_cv`
- `contact_email_click`
- `email_copy`
- `social_click`
- `contact_form_submit`
- `generate_lead` bei erfolgreichem Kontaktformularversand
- `contact_form_error`

In Google Analytics kann `generate_lead` optional als Key Event markiert werden.

Draft-Blogposts bleiben aus statischen Blog-Routen, RSS und Sitemap heraus. RSS wird ueber `src/pages/rss.xml.ts` erzeugt, die Sitemap ueber `src/pages/sitemap.xml.ts`; `public/robots.txt` verweist auf die Production-Sitemap.

## Production-Checkliste

- `npm run quality` lokal ausfuehren.
- Cloudflare Pages baut `main`.
- Build Command ist `npm run build`, Output Directory ist `dist`.
- Node-Version ist `22.12.0` oder `NODE_VERSION=22.12.0`.
- Custom Domain `teddschreiner.de` ist aktiv.
- `http://teddschreiner.de` sowie `www.teddschreiner.de` sind in Cloudflare Pages/DNS erreichbar und werden per `public/_redirects` dauerhaft auf `https://teddschreiner.de` weitergeleitet.
- Preview- und `pages.dev`-URLs liefern weiter `noindex`; bei zusaetzlichen Branch-Domains ausserhalb des Repos dieselbe Regel mitpruefen.

Die lokalen Migrationsquellen `repomix.txt` und `planung_audit.txt` bleiben unveroeffentlicht.
