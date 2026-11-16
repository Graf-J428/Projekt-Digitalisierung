# 01 – Login

Anmeldung am HR-Portal mit dem SAP-Benutzerkonto.

![Login (Desktop)@1x](mockup/Login%20%28Desktop%29%401x.png)

## Funktionen

- Benutzername und Passwort (mit „Passwort anzeigen“)
- Optional: Mandant, Single Sign-On
- „Angemeldet bleiben“, „Passwort vergessen?“
- Sprachauswahl in der Kopfzeile
- Hintergrund im Fiori-Stil (nur auf Einstiegsseiten, siehe Styleguide)

## Verknüpfungen

- Nach erfolgreicher Anmeldung → [02 – Startseite](../02-startseite/)

## Klick-Dummy (`src/`)

Reines Frontend ohne Backend: Felder lassen sich ausfüllen und Buttons klicken, es wird aber nichts gesendet oder geprüft.

**Öffnen:** `src/index.html` per Doppelklick im Browser öffnen – keine Installation nötig.

| Datei | Inhalt |
|---|---|
| `index.html` | Aufbau der Seite |
| `login.css` | Seitenspezifische Stile (Farben und Maße aus `shared/css/tokens.css`) |
| `login.js` | Oberflächenverhalten: Passwort anzeigen/verbergen, Absenden ohne Wirkung |

Was funktioniert:

- Benutzername und Passwort eingeben, Passwort anzeigen/verbergen
- „Angemeldet bleiben“ an- und abwählen, Sprache wählen
- „Anmelden“ und „Passwort vergessen?“ klicken – ohne Wirkung (später: Anmeldung gegen SAP HCM)
- Bedienung komplett per Tastatur, sichtbarer Fokusrahmen
- Darstellung auf Desktop und Smartphone

## Stand

- [x] Mockup (`mockup/Login (Desktop)@1x.png`)
- [x] Klick-Dummy (`src/`)
- [ ] Anbindung an SAP HCM
