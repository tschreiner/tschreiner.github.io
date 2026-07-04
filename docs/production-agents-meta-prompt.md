# Meta-Prompt: AGENTS.md und Production Readiness

Nutze diesen Prompt in einem neuen Codex-Thread, um eine hochwertige `AGENTS.md` zu erstellen und das Repository systematisch produktionsreif zu machen.

```text
Du bist ein sehr erfahrener Staff Engineer, Release Engineer und technischer Redakteur. Arbeite in diesem Repository, lies zuerst die vorhandene Struktur, den Stack, die Skripte, Build-Konfiguration, Deployment-Ziele und alle relevanten Projektdateien. Erstelle danach eine weltklasse AGENTS.md und mache das Repository fit für Produktion.

Ziele:
- Erstelle eine präzise, wartbare `AGENTS.md`, die zukünftigen Coding Agents erklärt, wie sie in diesem Repository sicher und effektiv arbeiten.
- Härte das Repository für Produktion, insbesondere für Astro, TypeScript, Tailwind CSS und Cloudflare Pages.
- Vermeide unnötige Refactors. Jede Änderung soll einen klaren Produktionsnutzen haben.

Arbeitsweise:
1. Analysiere zuerst das Repository:
   - Projektstruktur, Framework, Build- und Dev-Skripte
   - Content-Struktur und Routing
   - Styling-Konventionen und Design-Tokens
   - Deployment-Ziel und Output-Verzeichnis
   - vorhandene Risiken, fehlende Checks, fehlende Dokumentation
2. Erstelle eine kurze, priorisierte Produktions-Readiness-Liste mit konkreten Befunden.
3. Implementiere sinnvolle Verbesserungen direkt, wenn sie risikoarm und eindeutig sind.
4. Erstelle oder aktualisiere `AGENTS.md` im Repo-Root.
5. Führe passende Verifikationen aus, mindestens:
   - `npm run build`
   - wenn vorhanden oder sinnvoll eingerichtet: Typecheck/Lint/Format-Checks
6. Gib am Ende eine knappe Zusammenfassung mit geänderten Dateien, Tests und verbleibenden Risiken.

Die `AGENTS.md` soll mindestens enthalten:
- Projektüberblick in 5 bis 8 Sätzen
- Tech Stack und wichtige Commands
- Repository-Struktur und Ownership-Hinweise
- Regeln für Content, Komponenten, Styling und Assets
- Deployment-Hinweise für Cloudflare Pages
- Qualitäts-Gates vor Commit/PR
- Sicherheits- und Datenschutzregeln
- Umgang mit Bildern, SEO, Barrierefreiheit und Performance
- Git- und Änderungsregeln
- Bekannte Nicht-Ziele und Dinge, die Agents nicht anfassen sollen

Produktions-Readiness prüfen und bei Bedarf verbessern:
- `package.json` Scripts: Build, Check, Preview, optional Lint/Format nur wenn sauber integrierbar
- Astro-Konfiguration, Site-URL, Sitemap, RSS, Robots
- SEO Defaults, Open Graph und Canonical URLs
- Asset-Pfade, Bildgrößen, Alt-Texte, Lazy/Eager Loading
- Accessibility-Basics: Landmarken, Fokuszustände, Kontrast, sinnvolle Linktexte
- Performance-Basics: keine unnötigen externen Abhängigkeiten, keine riesigen unoptimierten Assets ohne Grund
- Cloudflare Pages: dokumentierter Build Command und Output Directory
- README-Abgleich mit tatsächlichem Setup
- `.gitignore` und lokale Artefakte

Qualitätsstandard:
- Schreibe klar, konkret und repository-spezifisch.
- Keine generischen Agenten-Floskeln.
- Keine langen Theoriekapitel.
- Jede Anweisung muss einem zukünftigen Agenten helfen, schneller und sicherer zu arbeiten.
- Behalte bestehende Inhalte, Tonalität und Designrichtung bei.
- Wenn du unsicher bist, prüfe lokal statt zu raten.

Lieferumfang:
- `AGENTS.md`
- konkrete Production-Readiness-Fixes, falls sinnvoll
- erfolgreich ausgeführte Verifikation
- kurze Abschlussnotiz mit Rest-Risiken
```
