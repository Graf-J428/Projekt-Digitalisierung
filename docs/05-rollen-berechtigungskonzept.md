# Rollen- und Berechtigungskonzept

Ergebnisse zu **KAN-21** · Bearbeiter: Ben Wagner · Stand: 16.11.2026 · Status: KAN-29 in Abstimmung

Druckversion: [05-rollen-berechtigungskonzept.docx](05-rollen-berechtigungskonzept.docx)

---

## KAN-26 · Rollen und Aufgaben

| Rolle | Kürzel | Zielgruppe | Aufgaben im Portal |
|---|---|---|---|
| **Mitarbeiter** | ESS | Alle Beschäftigten mit Personalnummer | Eigene Stammdaten, Anschrift und Bankverbindung ansehen und ändern, Urlaub und Abwesenheiten beantragen, Resturlaub und Zeiten einsehen, Arbeitszeitänderungen erfassen, Mitarbeiterverzeichnis nutzen |
| **Führungskraft** | MSS | Leiter einer Organisationseinheit | Alle ESS-Funktionen, zusätzlich Team-Übersicht, Anträge der direkt unterstellten Mitarbeitenden genehmigen oder ablehnen, Teamkalender |
| **HR/Admin** | HR | Personalabteilung (optional) | Anträge aller Mitarbeitenden einsehen und korrigieren, Stammdatenänderungen prüfen, Rollen verwalten |

### Festgelegte Grundsätze

- **Rollen bauen aufeinander auf:** Eine Führungskraft behält alle ESS-Funktionen.
- **Minimalprinzip:** Jede Rolle erhält nur die Rechte, die sie für ihre Aufgaben braucht.
- **Vier-Augen-Prinzip:** Eigene Anträge genehmigt immer die nächsthöhere Führungskraft.
- **Datensparsamkeit:** Führungskräfte sehen nur ihr Team, private Daten sieht nur der Mitarbeiter selbst und HR.
- **Backend prüft mit:** Das Frontend blendet nur aus, der OData-Service prüft jeden Zugriff.

---

## KAN-27 · Berechtigungsmatrix

**L** Lesen · **B** Bearbeiten / Beantragen · **G** Genehmigen · **–** kein Zugriff (Weiterleitung auf „Keine Berechtigung“)

| Seite / Funktion | Route | Mitarbeiter | Führungskraft | HR/Admin |
|---|---|:---:|:---:|:---:|
| Login | `/login` | öffentlich | öffentlich | öffentlich |
| Startseite Mitarbeiter | `/home` | L | L | L |
| Meine Daten | `/profil` | L, B (eigene) | L, B (eigene) | L, B (alle) |
| Urlaubsantrag / Resturlaub | `/urlaub` | L, B (eigene) | L, B (eigene) | L, B (alle) |
| Zeiterfassung / PDF-Export | `/zeiten` | L, B (eigene) | L, B (eigene) | L (alle) |
| Mitarbeiterverzeichnis | `/verzeichnis` | L | L | L |
| Startseite Führungskraft | `/team` | – | L (Team) | L (alle) |
| Anträge genehmigen | `/genehmigungen` | – | G (Team) | L, G (alle) |
| Teamkalender | `/team/kalender` | – | L (Team) | L (alle) |
| Administration | `/admin` | – | – | L, B |
| Keine Berechtigung | `/kein-zugriff` | L | L | L |
| Logout | Header | ✓ | ✓ | ✓ |

### Technische Umsetzung

Die Matrix liegt zusätzlich als `webapp/model/permissions.json` im Code. Route Guard (KAN-49) und Rollenprüfung (KAN-50) lesen diese Datei aus.

```json
{
  "home":          ["ESS", "MSS", "HR"],
  "profil":        ["ESS", "MSS", "HR"],
  "urlaub":        ["ESS", "MSS", "HR"],
  "zeiten":        ["ESS", "MSS", "HR"],
  "verzeichnis":   ["ESS", "MSS", "HR"],
  "team":          ["MSS", "HR"],
  "genehmigungen": ["MSS", "HR"],
  "teamKalender":  ["MSS", "HR"],
  "admin":         ["HR"]
}
```

---

## KAN-28 · Testbenutzer je Rolle

| Benutzer | Name (fiktiv) | Rolle | Org-Einheit | Testzweck |
|---|---|---|---|---|
| **TEST_MA01** | Max Mustermann | ESS | Vertrieb | Mitarbeiter, unterstellt TEST_FK01 |
| **TEST_MA02** | Erika Beispiel | ESS | Vertrieb | Zweiter Mitarbeiter für Team und Genehmigung |
| **TEST_FK01** | Paul Probe | ESS + MSS | Leitung Vertrieb | Genehmigt Anträge von MA01 und MA02 |
| **TEST_HR01** | Hanna Test | ESS + HR | Personal | HR/Admin-Funktionen |
| **TEST_NOROLE** | Nora Ohne | keine | – | Negativtest: Seite „Keine Berechtigung“ |

> **Nur fiktive Testdaten.** Die DEV-User werden über Infotyp 0105 mit Testpersonalnummern verknüpft (KAN-67). Passwörter werden nicht dokumentiert, sondern im Team separat geteilt.

---

## KAN-29 · Rollenermittlung aus SAP HCM

*Vorschlag – Abstimmung mit Backend offen*

| Rolle | Quelle | Ermittlung |
|---|---|---|
| **ESS** | Infotyp 0105, Subtyp 0001 | SAP-Benutzer ist mit einer Personalnummer verknüpft |
| **MSS** | Organisationsmanagement | Planstelle mit Beziehung A/B 012 „leitet“ zu einer Org-Einheit, Team über Auswertungsweg (z. B. MSSDIREC) |
| **HR** | Z-Tabelle `ZPORTAL_ROLES` | Alle DEV-User haben SAPALL, daher keine Unterscheidung über PFCG-Rollen möglich |

### Übergabe an das Frontend

Nach dem Login liefert der UserInfo-Endpunkt (KAN-63, z. B. `/UserInfoSet('ME')`) Personalnummer, Name und Rollenliste. Das Frontend speichert sie im Session-Modell, beim Logout werden sie gelöscht.

### Offene Punkte mit dem Backend

- [ ] Umsetzung des UserInfo-Endpunkts bestätigen
- [ ] Auswertungsweg für das Team der Führungskraft festlegen
- [ ] Berechtigungsprüfung im OData-Service bei jedem Lese- und Schreibzugriff
- [ ] Testpersonalnummern und Org-Struktur anlegen (KAN-67)

---

## KAN-30 · Ablage des Konzepts

- Konzept als Seite im Confluence-Bereich des Projekts
- Dieses Dokument und die `permissions.json` im Git-Repository, von Confluence aus verlinkt
- Grundlage für die fachliche Administrationsanleitung (KAN-80)
