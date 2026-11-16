# Styleguide

Gestaltungsregeln des HR-Portals. Das Mockup liegt unter [portal/00-styleguide](../portal/00-styleguide/).

## Leitprinzipien

1. **Vertraut** – angelehnt an die Logik von SAP Fiori (Farbbedeutungen, Bedienelemente). Wer SAP HCM kennt, findet sich sofort zurecht.
2. **Sachlich und ruhig** – Personaldaten sind sensibel. Zurückhaltende Farben, viel Weißraum, keine dekorativen Effekte auf Arbeitsseiten.
3. **Barrierefrei** – Ziel ist WCAG 2.1 Stufe AA, wie sie die EU-Richtlinie 2016/2102 für Websites öffentlicher Stellen vorgibt.

## Farben

| Rolle | Wert | Kontrast auf Weiß | Verwendung |
|---|---|---|---|
| Primär | `#0A6ED1` | 5,0 : 1 | Buttons, Links auf Weiß |
| Primär dunkel | `#0854A0` | 7,5 : 1 | Hover, Links auf hellblauem Grund |
| Primär hell | `#E5F0FA` | – | Hinweisflächen, Auswahl |
| Überschriften | `#0F2A3D` | – | Überschriften |
| Fließtext | `#14212B` | 16,4 : 1 | Text |
| Sekundärtext | `#4A5B68` | 7,0 : 1 | Hilfetexte, Beschriftungen |
| Feldrahmen | `#8396A8` | 3,1 : 1 | Rahmen von Eingabefeldern |
| Trennlinien | `#D3DFEC` | – | nur dekorativ |
| Seitenhintergrund | `#F5F8FC` | – | Arbeitsseiten |
| Erfolg | `#107E3E` | 5,2 : 1 | |
| Warnung | `#B35400` | 5,0 : 1 | Das hellere Fiori-Orange `#E9730C` erreicht nur 3,0 : 1 und ist für Text nicht zulässig. |
| Fehler | `#BB0000` | 6,8 : 1 | |

Begründung: Das Primärblau entspricht dem Aktionsblau, das SAP-Nutzer aus Fiori kennen. Auf dem hellblauen Hintergrund der Login-Seite erreicht es nur 4,5 : 1, dort wird für Text das dunklere Blau verwendet. Status wird nie allein über Farbe vermittelt, sondern immer zusätzlich über Icon und Text.

## Typografie

IBM Plex Sans für alle Texte, IBM Plex Mono für Kennungen (Personalnummer, Mandant, Uhrzeiten, Beträge).

| Stufe | Größe / Zeilenhöhe | Schnitt |
|---|---|---|
| Seitentitel | 32 / 40 | 600 |
| Überschrift 1 | 26 / 32 | 600 |
| Überschrift 2 | 20 / 28 | 600 |
| Fließtext | 16 / 24 | 400 |
| Feldbeschriftung | 14 / 20 | 500 |
| Hilfetext | 13 / 18 | 400 |

Begründung: Die SAP-Schrift „72“ ist nicht frei lizenziert. IBM Plex steht unter der SIL Open Font License und unterscheidet I, l und 1 klar – wichtig bei Personalnummern. Eingabefelder nutzen mindestens 16 px, damit mobile Browser nicht automatisch hineinzoomen.

## Raster und Formen

- Alle Maße sind Vielfache von 8 px (für feine Abstände 4 px).
- Bedienelemente sind mindestens 44 px hoch, Standard 48 px (WCAG 2.5.5).
- Eckenradius 8 px für Felder und Buttons, 12 px für Karten.
- Schatten nur für schwebende Ebenen (Login-Karte, Dialoge).

## Komponenten

- Genau ein primärer Button pro Ansicht.
- Beschriftungen stehen sichtbar über dem Feld, nie nur als Platzhalter.
- Fehler werden direkt am Feld genannt, mit Ursache und Lösung.
- Sichtbarer Fokusrahmen (2 px, Primärblau) für Tastaturbedienung.

## Hintergrund und Icons

- Der blaue Wellenhintergrund ist Einstiegsseiten vorbehalten (Login, Abmeldung, Fehlerseiten).
- Icons im Linienstil, 2 px Strich, 20 oder 24 px. Icon-Buttons erhalten immer ein `aria-label`.
- SAP-Logo und SAP-Schrift werden nicht verwendet, damit der Prototyp nicht als offizielles SAP-Produkt erscheint.

## Sprache

- Anrede mit „Sie“, kurz und sachlich.
- Buttons benennen die Aktion („Änderung speichern“, nicht „OK“).
- Datum und Zahlen deutsch formatiert: `31.12.2026`, `1.250,00 €`.
