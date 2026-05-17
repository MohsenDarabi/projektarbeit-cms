# Projekt-Dokumentation: Hansa Homerenovierung

Dieses Dokument dient als Referenz für das Deployment und die technische Konfiguration der Website **hansa-homerenovierung.com**.

## 1. Server-Infrastruktur (Oracle Cloud)

Die Website läuft auf einer **Oracle Cloud "Always Free"** Instanz (VPS).

- **IP-Adresse:** `92.5.179.170`
- **Betriebssystem:** Ubuntu 22.04 LTS
- **SSH-Zugriff:** 
  - User: `ubuntu`
  - Key-Pfad (Lokal): `Desktop/workspace/trader-bot-hourly/ssh-key-2025-07-27.key`
  - Befehl: `ssh -i [KEY-PFAD] ubuntu@92.5.179.170`

### Firewall & Ports
Folgende Ports sind sowohl in der Oracle Cloud Console (VCN Security List) als auch auf dem Server (iptables) geöffnet:
- **Port 80 (HTTP):** Für Nginx (wird automatisch auf HTTPS umgeleitet).
- **Port 443 (HTTPS):** Für verschlüsselten Web-Traffic (SSL).
- **Port 22 (SSH):** Für den Fernzugriff.
- **Port 3000:** Interner Port der SvelteKit-App (hinter dem Nginx Proxy).

---

## 2. Anwendung & Deployment

Die Website basiert auf **SvelteKit** mit dem **Node-Adapter**.

- **Pfad auf dem Server:** `/home/ubuntu/projektarbeit-cms`
- **Prozess-Management:** Die App wird von **PM2** verwaltet.
  - Befehl zum Status-Check: `pm2 status`
  - Befehl für Logs: `pm2 logs projekt-cms`
  - Automatischer Neustart: PM2 ist so konfiguriert, dass die App bei einem Server-Reboot automatisch mit startet.

### Datenbank
- **Typ:** SQLite
- **Datei:** `projektarbeit-cms/local.db`
- **ORM:** Drizzle ORM
- **Admin-Login:** `https://hansa-homerenovierung.com/login`
  - User: `admin`
  - Passwort: `password123` (Bitte nach dem ersten Login im Dashboard ändern, falls möglich!)

---

## 3. Email-Konfiguration (Kontaktformular)

Das Kontaktformular nutzt Gmail als SMTP-Relay, um sicherzustellen, dass E-Mails zuverlässig ankommen.

- **Mail-Server:** `smtp.gmail.com` (Port 587)
- **Absender-Konto:** `ddddmmmm884@gmail.com`
- **Authentifizierung:** Ein spezielles Google "App-Passwort" (16-stellig) wird verwendet.
- **Empfänger (Inhaber):** `mohsenturkey12@gmail.com`

*Hinweis: Falls sich das Google-Passwort ändert oder das App-Passwort gelöscht wird, muss die `.env` Datei auf dem Server aktualisiert werden.*

---

## 4. SSL & Domain

- **Domain:** `hansa-homerenovierung.com` (verwaltet bei Strato).
- **SSL-Zertifikat:** Kostenloses Zertifikat von **Let's Encrypt**.
- **Erneuerung:** Certbot kümmert sich automatisch um die Verlängerung des Zertifikats.

---

## 5. Wichtige Befehle für Wartung

Falls du Änderungen am Code machst und diese auf den Server spielen willst:

1. Code lokal ändern und committen.
2. Dateien hochladen (via SCP oder Git pull auf dem Server).
3. Auf dem Server im Projektordner:
   ```bash
   npm run build
   pm2 restart projekt-cms
   ```

---

## 6. Backup & Recovery (Lokales Backup)

Um die Daten der Website (Datenbank und Bilder) vor einem Serververlust zu schützen, gibt es ein automatisches Skript für den Mac.

### Nutzung des Backup-Skripts
Das Skript lädt die `local.db`, die Bilder und die `.env` Datei in einen lokalen Ordner herunter.

1.  Öffne das Terminal auf deinem Mac im Projektordner.
2.  Führe das Skript aus:
    ```bash
    bash scripts/backup.sh
    ```
3.  Die Backups werden im Ordner `backups/` mit einem Zeitstempel gespeichert (z.B. `backups/2026-05-13_14-30-00`).

### Wiederherstellung (Recovery)
Sollte der Server neu aufgesetzt werden müssen:
1.  Code via Git klonen.
2.  Die Dateien `local.db`, `.env` und den Inhalt von `static/uploads/` aus dem aktuellsten Backup-Ordner zurück auf den Server kopieren.
3.  Die App wie gewohnt bauen und starten.

---
*Erstellt am 13. Mai 2026 für Hansa Homerenovierung.*
