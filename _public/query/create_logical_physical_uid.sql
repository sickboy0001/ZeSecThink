CREATE TABLE public.logical_physical_uid (
    id SERIAL ,
    logical_filename text NOT NULL,
    domain text NOT NULL ,
    dir text NOT NULL ,
    physical_filename text NOT NULL,
    delete_flg integer NOT NULL ,
    create_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT logical_physical_uid_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

GRANT USAGE ON SEQUENCE logical_physical_uid_id_seq TO anon;
GRANT USAGE ON SEQUENCE logical_physical_uid_id_seq TO authenticated;

grant usage on schema "public" to anon;
grant usage on schema "public" to authenticated;

GRANT SELECT, INSERT, UPDATE , DELETE  ON ALL TABLES IN SCHEMA "public" TO authenticated;
GRANT SELECT, INSERT, UPDATE , DELETE ON ALL TABLES IN SCHEMA "public" TO anon;
