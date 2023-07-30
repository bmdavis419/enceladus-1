create table profile (
    id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(100),
    user_id uuid references auth.users
);

create table image_group (
    id serial primary key,
    inserted_at timestamp default timezone('est' :: text, now()) not null,
    updated_at timestamp default timezone('est' :: text, now()) not null,
    owner_id int references profile
);

create table image (
    id serial primary key,
    inserted_at timestamp default timezone('est' :: text, now()) not null,
    updated_at timestamp default timezone('est' :: text, now()) not null,
    value text,
    query text,
    group_id int references image_group
);

alter table
    profile enable row level security;

alter table
    image_group enable row level security;

alter table
    image enable row level security;

-- CREATE THE STORAGE BUCKET
insert into
    storage.buckets (id, name)
values
    ('generated_images', 'Generated Images');

-- security for storage bucket
create policy "Public Write Access" on storage.objects for
insert
    with check (bucket_id = 'generated_images');

create policy "Individual user Access" on storage.objects for
select
    using (auth.uid() = owner);