create table
  public.start_post (
    id serial,
    user_id integer not null,
    title text not null,
    content text not null,
    public_flg boolean not null default true,
    delete_flg boolean not null default false,
    type_id integer not null,
    create_at timestamp without time zone not null default current_timestamp,
    update_at timestamp without time zone not null default current_timestamp,
    constraint start_post_pkey primary key (id),
--    constraint start_post_type_id_fkey foreign key (type_id) references start_type (id) on update cascade on delete restrict
  ) tablespace pg_default;