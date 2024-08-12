create table
  public.start_type (
    id serial,
    disp_name text not null,
    title_name text not null,
    name text not null,
    display_order integer not null,
    constraint start_type_pkey primary key (id)
  ) tablespace pg_default;