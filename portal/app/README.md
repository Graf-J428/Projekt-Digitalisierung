# Personal-Portal – Frontend (SAPUI5)

Projekt Digitalisierung, Hochschule RheinMain (WiSe 2026/27).
Prototyp eines Personal-Portals mit Anbindung an SAP HCM.

## Stand

Eine SAPUI5-App für alle Seiten des Portals (01-login, 02-startseite, ...).
Die Seiten liegen als Views unter `webapp/view/`.

- Login mit fiktiven Testbenutzern und Fehlermeldungen (KAN-18) – `webapp/model/users.json`
- Startseite mit Kacheln je nach Rolle (KAN-16)
- Berechtigungsmatrix aus KAN-27 – `webapp/model/permissions.json`
- Seite „Keine Berechtigung“ für Benutzer ohne Rolle (KAN-51)
- Schutz der Startseite ohne Login bzw. ohne Rolle (KAN-49, KAN-50)
- Logout (KAN-25) und automatischer Logout nach 5 Minuten ohne Aktivität

## Testbenutzer

Siehe `docs/05-rollen-berechtigungskonzept.md` (KAN-28): TEST_MA01, TEST_MA02, TEST_FK01, TEST_HR01, TEST_NOROLE.
Das Prototyp-Passwort wird im Team separat geteilt.

Session-Timeout lokal testen: `index.html?timeout=15` (Sekunden).

## Starten

Voraussetzung: Node.js 20.11 oder neuer.

```bash
npm install
npm start
```

Die App öffnet sich unter http://localhost:8080/index.html.

## Aufbau

```
webapp/
  index.html            Einstieg, lädt UI5 (Theme sap_horizon)
  manifest.json         App-Konfiguration, Modelle, Routing
  Component.js          Root-Component, startet den Router
  i18n/i18n.properties  Alle Texte der Oberfläche
  css/style.css         Eigene Styles
  view/                 XML-Views (App, Login, Home)
  controller/           Controller zu den Views
```

## Hinweise

- UI5-Framework: OpenUI5 1.120 (LTS), konfiguriert in `ui5.yaml`. Die UI5 CLI lädt die Bibliotheken beim ersten Start automatisch.
- Branches mit Ticketnummer benennen (z. B. `KAN-41-login-view`) und die Ticketnummer in Commits verwenden, damit sie in Jira erscheinen.
