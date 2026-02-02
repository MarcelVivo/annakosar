# www.annakosar.com – Next.js + Supabase

Produktionsreife Next.js (App Router, TypeScript) Anwendung für die Online-Psychologische Beratung von Anna Kosar.

## Schnellstart
1. Abhängigkeiten installieren: `npm install`
2. `.env.example` nach `.env.local` kopieren und Werte setzen (Supabase URL/Keys, Meeting-Links).
3. Datenbank anlegen: Inhalt aus `supabase/schema.sql` im Supabase SQL-Editor ausführen (RLS aktiv).
4. Entwicklung: `npm run dev`
5. Lint/Build prüfen: `npm run lint && npm run build`
6. Deployment: Repository auf GitHub, dann in Vercel importieren. Env Vars in Vercel hinterlegen.

## Supabase
- Auth: Supabase Email (Magic Link). Callback-Route: `/api/auth/callback`.
- Tabellen: `users`, `appointments` (siehe `supabase/schema.sql`).
- RLS: Nur eigene Datensätze sichtbar/bearbeitbar.

## Termine & Logik
- Slots: Stundenraster 08:00–18:00, blockiert wenn Termin existiert oder Zeit in der Vergangenheit liegt.
- Keine Überschneidungen: Unique Index auf `(date, time)` (Status ≠ cancelled).
- Kostenloses Kennenlerngespräch: Einmal pro Nutzer: Unique Index + Server-Check.
- Status: Wird beim Anlegen auf `confirmed` gesetzt.

## Pages
- `/` Startseite mit CTA
- `/about` Über mich
- `/services` Leistungen
- `/book` Terminbuchung mit Kalender & Formular
- `/login` E-Mail Login
- `/dashboard` Kundenprofil & Termine
- `/datenschutz`, `/impressum`

## Environment Variablen
siehe `.env.example`
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (nur auf Server, für E-Mail-Funktion)
- `NEXT_PUBLIC_SITE_URL` (z.B. https://www.annakosar.com)
- `ZOOM_ROOM_URL`, `TEAMS_ROOM_URL` (optionale Standard-Links)

## Wichtige Pfade
- API: `app/api/appointments` (Buchen + Liste), `app/api/appointments/slots` (freie Slots)
- Auth Callback: `app/api/auth/callback`
- UI: `components/layout/*`, `components/booking/booking-form.tsx`, `components/ui/email-login.tsx`

## Sicherheit & Datenschutz
- Keine Supabase Keys hardcodiert. Alles über Env Vars.
- RLS erzwingt Datenzugriff nur für eingeloggte Nutzer.
- Meeting-Links werden pro Termin gespeichert und angezeigt.

## Branding
- Farbpalette: Weiß (#FFFFFF), Gold (#C6A15B), Schwarz (#000000).
- Typo: Cormorant Garamond (Heading) & Source Sans 3 (Body) via `next/font`.
