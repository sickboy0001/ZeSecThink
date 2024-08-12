create table
  public.mail_to_id (
    id serial,
    mail text not null,
    constraint mail_to_id_pkey primary key (id)
  ) tablespace pg_default;

-- insert template
insert into mail_to_id (mail) 
values (
'syunjyu0001@gmail.com'
)

