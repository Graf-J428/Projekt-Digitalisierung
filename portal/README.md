# Portal – Prototyp

Ein Ordner pro Seite. Die Nummern geben die Reihenfolge wieder, in der man das Portal durchläuft.

```
portal/
├── shared/
│   ├── css/          Farben, Schriften, Abstände aus dem Styleguide als CSS-Variablen
│   └── components/   Kopfzeile, Navigation, Buttons, Meldungen
├── 00-styleguide/    nur Mockup
├── 01-login/
│   ├── mockup/
│   ├── src/
│   └── README.md
└── …
```

Seiten, die einander aufrufen:

- Login → Startseite
- Startseite → alle Module (Kacheln und Aufgabenliste)
- Urlaubsplan → Abwesenheiten („Urlaub beantragen“)
- Meine Daten → Assistent („Mit dem Assistenten ausfüllen“)
- Abwesenheiten und Zeiterfassung → Genehmigungen (Antrag landet bei der Führungskraft)
