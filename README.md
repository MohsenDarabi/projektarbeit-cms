# Unternehmens-Website + CMS (SvelteKit)

Das hier ist mein Projekt für die Prüfung. Es ist eine Website für ein Unternehmen, wo ich meinPraktikum mache inklusive einem kleinen CMS, um Inhalte wie Leistungen und Projekte selbst zu verwalten.

## Was ist drin?

- **Frontend**: Startseite, Leistungen, Projekte und ein Kontaktformular.
- **Admin-Bereich**: Login-geschütztes Dashboard zum Bearbeiten der Inhalte.
- **Bilder**: Werden beim Upload automatisch optimiert (Sharp).
- **DB**: SQLite mit Drizzle ORM.

## Setup & Installation

1.  `npm install`
2.  `.env` Datei anlegen (Vorlage ist `.env.example`).
3.  Datenbank pushen: `npm run db:push`
4.  Admin-User anlegen: `npx tsx seed.ts` (User: `admin`, PW: `password123`)
5.  Starten: `npm run dev`

## Bekannte Probleme / Notizen

- Der Pfad zur `local.db` war am Anfang etwas nervig mit SvelteKit's Dev-Server, hab es jetzt aber stabil im Root liegen.
- Das Kontaktformular schickt aktuell nur Log-Outputs in der Konsole, wenn keine SMTP-Daten in der .env stehen.
- Bilder-Upload klappt gut, aber bei sehr großen Dateien (über 5MB) gibt's aktuell eine Fehlermeldung (Limit ist absichtlich so).
- Responsive Design passt soweit, aber auf ganz alten Tablets sieht der Header manchmal etwas verschoben aus.

## Tests

- `npm run test` für die Unit-Tests.
