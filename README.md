# Projekt-Digitalisierung

Konzeption und Implementierung eines Prototyps zur interaktiven Personaldatenverwaltung
mit Schnittstelle zum SAP-HCM-System des UCC Magdeburg.

## Aufbau des Repositorys

```
.
├── docs/                 Projektdokumentation (Ziel, Anforderungen, SAP-Schnittstelle, Styleguide)
│   └── protokolle/       Besprechungsnotizen
├── portal/               Der Prototyp – ein Ordner pro Seite
│   ├── shared/           Gemeinsamer Code aller Seiten (Farben, Kopfzeile, Navigation)
│   ├── 00-styleguide/    Gestaltungsregeln als Mockup
│   ├── 01-login/
│   ├── 02-startseite/
│   ├── …
│   └── 11-reisekosten/
├── website/              Projektwebseite, wird über GitHub Pages veröffentlicht
└── .github/workflows/    Automatisches Veröffentlichen der Webseite
```

Jeder Seitenordner unter `portal/` ist gleich aufgebaut:

| Ordner / Datei | Inhalt |
|---|---|
| `mockup/` | Exportierte Entwürfe der Seite (PNG oder PDF) |
| `src/` | Quellcode der Seite |
| `README.md` | Zweck, Funktionen und benötigte SAP-HCM-Daten der Seite |

## Seitenübersicht

| Nr. | Seite | Mockup | Code |
|---|---|---|---|
| 00 | [Styleguide](portal/00-styleguide/) | vorhanden | – |
| 01 | [Login](portal/01-login/) | vorhanden | Klick-Dummy |
| 02 | [Startseite](portal/02-startseite/) | vorhanden | offen |
| 03 | [Mitarbeiterverzeichnis](portal/03-mitarbeiterverzeichnis/) | vorhanden | offen |
| 04 | [Urlaubsplan](portal/04-urlaubsplan/) | vorhanden | offen |
| 05 | [Abwesenheiten inkl. Genehmigungsablauf](portal/05-abwesenheiten/) | vorhanden | offen |
| 06 | [Zeiterfassung](portal/06-zeiterfassung/) | vorhanden | offen |
| 07 | [Meine Daten (Employee Self Service)](portal/07-meine-daten-ess/) | vorhanden | offen |
| 08 | [Genehmigungen (Manager Self Service)](portal/08-genehmigungen-mss/) | vorhanden | offen |
| 09 | [Assistent (Chatbot)](portal/09-assistent-chatbot/) | vorhanden | offen |
| 10 | [Leistungsbeurteilungen](portal/10-leistungsbeurteilungen/) | vorhanden | offen |
| 11 | [Reisekosten](portal/11-reisekosten/) | vorhanden | offen |

## Konventionen

- Ordner- und Dateinamen klein, mit Bindestrich, ohne Umlaute und Leerzeichen (`meine-daten`, nicht `Meine Daten`).
- Mockups heißen `<Seite> (<Gerät>)@<Skalierung>x.png`, z. B. `Login (Desktop)@1x.png`.
- Farben, Schriften und Abstände nur aus `portal/shared/css/` verwenden, nie direkt in einer Seite festlegen.
- Änderungen auf einem eigenen Branch entwickeln und per Pull Request nach `main` übernehmen.
