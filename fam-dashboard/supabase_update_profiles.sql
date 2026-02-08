-- PROFILES TABLE (For Auth & Telegram Mapping)
create table public.profiles (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  pin text not null, -- Simple PIN for frontend login
  telegram_chat_id text, -- For n8n notifications
  created_at timestamp with time zone default now()
);

-- UPDATE TASKS TABLE
alter table public.tasks 
add column created_by text; -- Will store 'Junior' or 'Tamara'

-- RLS for Profiles
alter table public.profiles enable row level security;
create policy "Allow generic access" on public.profiles for all using (true) with check (true);

-- SEED DATA (Initial Users)
insert into public.profiles (name, pin) values 
('Junior', '754585'),
('Tamara', '754585');
