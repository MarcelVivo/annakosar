-- Schema für www.annakosar.com
-- Ausführen in Supabase SQL Editor oder per supabase migration.

create extension if not exists "pgcrypto";

create type if not exists appointment_type as enum ('free_intro', 'session');
create type if not exists appointment_status as enum ('booked', 'confirmed', 'cancelled');

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text,
  created_at timestamptz default now()
);

grant usage on schema public to authenticated;

grant select, insert, update on public.users to authenticated;

enable row level security on public.users;

create policy "Users can view their profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can manage own profile" on public.users
  for all using (auth.uid() = id) with check (auth.uid() = id);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users (id) on delete cascade not null,
  appointment_type appointment_type not null,
  date date not null,
  time time not null,
  meeting_link text,
  status appointment_status not null default 'confirmed',
  created_at timestamptz default now()
);

create unique index if not exists idx_unique_slot on public.appointments (date, time) where status <> 'cancelled';
create unique index if not exists idx_free_intro_once on public.appointments (user_id) where appointment_type = 'free_intro' and status <> 'cancelled';

enable row level security on public.appointments;

create policy "Users read own appointments" on public.appointments
  for select using (auth.uid() = user_id);

create policy "Users manage own appointments" on public.appointments
  for insert with check (auth.uid() = user_id);

create policy "Users update own appointments" on public.appointments
  for update using (auth.uid() = user_id);

create policy "Users delete own appointments" on public.appointments
  for delete using (auth.uid() = user_id);

comment on column public.appointments.meeting_link is 'Zoom oder Microsoft Teams Link.';
