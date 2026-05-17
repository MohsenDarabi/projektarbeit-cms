#!/bin/bash

# Hansa Homerenovierung - Lokales Backup-Skript
# ============================================
# Dieses Skript lädt alle kritischen Daten vom Oracle VPS auf diesen Mac herunter.
# Gesichert werden:
# 1. Die SQLite Datenbank (Texte, Leistungen, Projekte)
# 2. Alle hochgeladenen Bilder (Uploads-Ordner)
# 3. Die Konfigurationsdatei (.env)

# --- Konfiguration ---
SERVER_IP="92.5.179.170"
SSH_KEY="/Users/mohsendarabi/Desktop/workspace/trader-bot-hourly/ssh-key-2025-07-27.key"
REMOTE_DIR="/home/ubuntu/projektarbeit-cms"
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_PATH="./backups/$TIMESTAMP"

echo "----------------------------------------------------"
echo "🚀 Starte Backup für Hansa Homerenovierung..."
echo "📅 Zeitstempel: $TIMESTAMP"
echo "----------------------------------------------------"

# 1. Backup-Ordner lokal erstellen
mkdir -p "$BACKUP_PATH"

# 2. Datenbank herunterladen
echo "📥 Lade Datenbank herunter (local.db)..."
scp -i "$SSH_KEY" "ubuntu@$SERVER_IP:$REMOTE_DIR/local.db" "$BACKUP_PATH/"

# 3. .env Datei herunterladen (enthält Mail-Passwörter etc.)
echo "📥 Lade Konfiguration herunter (.env)..."
scp -i "$SSH_KEY" "ubuntu@$SERVER_IP:$REMOTE_DIR/.env" "$BACKUP_PATH/"

# 4. Bilder-Ordner synchronisieren (rsync ist effizienter als scp)
echo "📥 Synchronisiere Bilder (static/uploads/)..."
rsync -avz -e "ssh -i $SSH_KEY" "ubuntu@$SERVER_IP:$REMOTE_DIR/static/uploads" "$BACKUP_PATH/"

# Abschlussmeldung
echo "----------------------------------------------------"
echo "✅ Backup erfolgreich abgeschlossen!"
echo "📂 Gespeichert in: $BACKUP_PATH"
echo "----------------------------------------------------"
