create table
  public.user_info (
    id serial,
    user_id integer not null,
    name text null,
    comment text null,
    delete_flg boolean not null default false,
    create_at timestamp without time zone not null default current_timestamp,
    update_at timestamp without time zone not null default current_timestamp,
    constraint user_info_id_pkey primary key (id)

  ) tablespace pg_default;

grant usage on schema "public" to anon;
grant usage on schema "public" to authenticated;

GRANT SELECT, INSERT, UPDATE , DELETE  ON ALL TABLES IN SCHEMA "public" TO authenticated;
GRANT SELECT, INSERT, UPDATE , DELETE ON ALL TABLES IN SCHEMA "public" TO anon;

GRANT USAGE ON SEQUENCE user_info_id_seq TO anon;
GRANT USAGE ON SEQUENCE user_info_id_seq TO authenticated;
