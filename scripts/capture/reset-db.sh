#!/bin/sh
# Recrée la base de capture (jeu fictif « restaurant pilote », samedi soir de service) dans le dépôt de l'app.
#   scripts/capture/reset-db.sh [chemin du dépôt de l'app]
# L'instance de capture doit être arrêtée (le serveur garde ses états en mémoire). Plan vierge
# (VENUE_TEMPLATE=blank), comme sur le serveur du pilote : le jeu y pose sa salle, sa terrasse et son bar.
set -eu
APPREPO="${1:-$HOME/Documents/EasyClub/EasyClub New}"
NOW="${CAPTURE_NOW:-2026-10-31T21:45:00}"
cd "$APPREPO/apps/backend"
export DATABASE_URL="file:$PWD/site-capture.db"
rm -f site-capture.db site-capture.db-journal
npx -y pnpm@9.12.0 exec prisma migrate deploy >/dev/null
TMP=src/enrich/_site-capture.ts
cat > "$TMP" <<TS
import { prisma } from '../db.js';
import { applyEnrichment } from './apply.js';
import { STAFF } from './dataset.js';
const PINS = ['3101', '3202', '3303', '3404', '3505', '3606'];
const now = new Date('$NOW');
const r = await applyEnrichment({ now, staffPins: Object.fromEntries(STAFF.map((op, i) => [op.id, PINS[i] ?? '3999'])) });
console.info('base de capture :', now.toString(), '·', r.tickets, 'tickets · journal', r.ledger.ok ? 'vérifié' : 'CASSÉ');
await prisma.\$disconnect();
TS
VENUE_TEMPLATE=blank NODE_ENV=development PORT=4100 npx -y pnpm@9.12.0 exec tsx "$TMP" 2>/dev/null || { rm -f "$TMP"; exit 1; }
rm -f "$TMP"
