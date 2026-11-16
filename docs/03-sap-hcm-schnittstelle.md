# Schnittstelle zu SAP HCM

## Benötigte Daten (Infotypen)

| Infotyp | Bezeichnung | Verwendet in | Lesen | Schreiben |
|---|---|---|---|---|
| 0001 | Organisatorische Zuordnung | Verzeichnis, Genehmigungen (Führungskraft) | ja | nein |
| 0002 | Daten zur Person | Meine Daten | ja | über Prüfung |
| 0006 | Anschriften | Meine Daten | ja | über Prüfung |
| 0009 | Bankverbindung | Meine Daten | ja | ja |
| 0105 | Kommunikation | Verzeichnis | ja | nein |
| 2001 | Abwesenheiten | Urlaubsplan, Abwesenheiten, Genehmigungen | ja | nach Genehmigung |
| 2002 | Anwesenheiten | Abwesenheiten (z. B. Dienstreise, Fortbildung) | ja | nach Genehmigung |
| 2006 | Abwesenheitskontingente | Urlaubsplan (Resturlaub) | ja | nein |
| 2011 | Zeitereignisse | Zeiterfassung | ja | nach Genehmigung |

Reisekosten und Leistungsbeurteilungen liegen in SAP in eigenen Komponenten
(Reisemanagement bzw. Zielvereinbarung und Beurteilung). Ob der Prototyp sie anbindet, ist noch offen.

## Technischer Zugang – offene Entscheidung

- [ ] Zugriffsweg festlegen (z. B. OData-Services über SAP Gateway oder RFC/BAPI)
- [ ] Testmandant und Testbenutzer beim UCC anfragen
- [ ] Berechtigungen für den Portal-Benutzer klären
