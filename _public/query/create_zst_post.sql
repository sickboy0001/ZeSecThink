create table
  public.zst_post (
    id serial,
    user_id integer not null,
    current_at timestamp without time zone null default current_timestamp,
    title text not null,
    content text not null,
    second integer not null,
    public_flg boolean not null default true,
    public_content_flg boolean not null default true,
    delete_flg  boolean not null default false,
    write_start_at timestamp without time zone null default current_timestamp,
    write_end_at timestamp without time zone null default current_timestamp,
    create_at timestamp without time zone not null default current_timestamp,
    update_at timestamp without time zone not null default current_timestamp,
    constraint zst_post_pkey primary key (id)
  ) tablespace pg_default;

-- insert template
insert into zst_post (user_id , current_at,title,content,second) 
values (
  1,
  CURRENT_DATE + integer '-1',
  'シンプルから行くか、画面優先から行くか…',
 'メール認証から行くか、プロチューから行くか
シンプルなのは前者なのでそっちから行く予定、一月以内の再挑戦なので問題はない想定です',
  120

)

