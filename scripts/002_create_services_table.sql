-- Create services table
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text,
  category text not null,
  price_info text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.services enable row level security;

create policy "services_select_all"
  on public.services for select
  using (true);
