-- job application tracker: jobs table schema
-- run this in the supabase sql editor

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),

  -- core fixed fields shown on the collapsed card / used for sorting
  company_name text not null,
  role_name text not null,
  application_date date not null default current_date,

  -- kanban column / status. constrained to the 5 defined stages
  status text not null default 'Wishlist'
    check (status in ('Wishlist', 'Applied', 'Technical Test', 'Interview', 'Offer/Rejected')),

  -- fixed fields shown in the expanded modal
  source text,
  company_background text,
  role_background text,

  -- date of the next action (e.g. an upcoming interview). only meaningful
  -- while status is applied / technical test / interview - cleared otherwise
  next_step_date date,

  -- optional 1-5 star rating the user gives the job. shown on the card once set
  rating smallint check (rating between 1 and 5),

  -- final outcome, only meaningful while status is 'Offer/Rejected' - cleared otherwise
  outcome text check (outcome in ('Offer', 'Rejected')),

  -- modular/custom fields, stored as a flexible key-value list
  -- e.g. [{"id": "uuid", "label": "Contact Person", "type": "text", "value": "Jane Doe"}, ...]
  -- using jsonb (not json) for indexing/query support and to avoid whitespace bloat
  dynamic_fields jsonb not null default '[]',

  -- manual ordering within a column, so drag-and-drop position can persist
  position integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- speeds up the main kanban query (fetch + order jobs per column)
create index if not exists idx_jobs_status_position on jobs (status, position);

-- keeps updated_at accurate on every edit
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_jobs_updated_at on jobs;
create trigger trg_jobs_updated_at
  before update on jobs
  for each row
  execute function set_updated_at();

-- row level security
-- enabled to clear the supabase warning. no auth in this project yet, so we use
-- a permissive policy allowing full access via the anon/authenticated key.
-- tighten this later if user accounts are added.
alter table jobs enable row level security;

drop policy if exists "allow all access to jobs" on jobs;
create policy "allow all access to jobs"
  on jobs
  for all
  using (true)
  with check (true);
