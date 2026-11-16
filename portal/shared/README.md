# Gemeinsamer Code

Alles, was auf mehreren Seiten gleich ist, liegt hier und wird von den Seiten eingebunden.

- `css/tokens.css` – Design-Tokens aus dem [Styleguide](../../docs/04-styleguide.md) als CSS-Variablen, z. B. `--color-primary: #0A6ED1;`
- `css/base.css` – Grundstile und Bausteine: Buttons (`.btn-primary`, `.btn-secondary`, `.btn-icon`), Felder (`.field`, `.input`, `.select`, `.checkbox`), Karte (`.card`)
- `fonts/` – IBM Plex Sans und Mono, lokal eingebunden statt über Google Fonts (keine Datenübertragung an Dritte, DSGVO-freundlich). Lizenz: `fonts/OFL.txt`
- `components/` – später: Kopfzeile, Seitennavigation, Meldungen

Einbinden in einer Seite unter `portal/<nr>-<seite>/src/`:

```html
<link rel="stylesheet" href="../../shared/css/tokens.css">
<link rel="stylesheet" href="../../shared/css/base.css">
```

Änderungen hier wirken auf alle Seiten.
