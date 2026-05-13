create extension if not exists pgcrypto;

create table if not exists public.interactions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  archetype text not null,
  campaign_id text not null,
  vendor_id text,
  qr_id text,
  visitor_name text,
  visitor_phone text,
  visitor_email text,
  business_name text,
  action_label text,
  metadata jsonb not null default '{}'::jsonb,

  constraint interactions_archetype_allowed
    check (archetype in ('claim', 'handshake', 'remember')),
  constraint interactions_archetype_length
    check (char_length(archetype) <= 32),
  constraint interactions_campaign_id_length
    check (char_length(campaign_id) <= 120),
  constraint interactions_vendor_id_length
    check (vendor_id is null or char_length(vendor_id) <= 120),
  constraint interactions_qr_id_length
    check (qr_id is null or char_length(qr_id) <= 160),
  constraint interactions_visitor_name_length
    check (visitor_name is null or char_length(visitor_name) <= 160),
  constraint interactions_visitor_phone_length
    check (visitor_phone is null or char_length(visitor_phone) <= 64),
  constraint interactions_visitor_email_length
    check (visitor_email is null or char_length(visitor_email) <= 254),
  constraint interactions_business_name_length
    check (business_name is null or char_length(business_name) <= 180),
  constraint interactions_action_label_length
    check (action_label is null or char_length(action_label) <= 120)
);

alter table public.interactions enable row level security;

revoke all on public.interactions from anon;
revoke all on public.interactions from authenticated;

grant insert on public.interactions to anon;
grant all on public.interactions to service_role;

drop policy if exists "anon can insert interactions" on public.interactions;

create policy "anon can insert interactions"
  on public.interactions
  for insert
  to anon
  with check (true);
