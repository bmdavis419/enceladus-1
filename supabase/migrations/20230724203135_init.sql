create table profile (
    id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(100),
    user_id uuid references auth.users
);

create table image_group (
    id serial primary key,
    inserted_at timestamp with time zone default timezone('utc' :: text, now()) not null,
    updated_at timestamp with time zone default timezone('utc' :: text, now()) not null,
    owner_id int references profile
);

create table image (
    id serial primary key,
    inserted_at timestamp with time zone default timezone('utc' :: text, now()) not null,
    updated_at timestamp with time zone default timezone('utc' :: text, now()) not null,
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