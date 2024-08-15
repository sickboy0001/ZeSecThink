CREATE TABLE public.zst_title_sample (
    id SERIAL,
    title TEXT NOT NULL,
    comment TEXT NULL,
    create_at DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT zst_title_id_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon;

GRANT USAGE ON SEQUENCE zst_title_id_seq TO anon;
GRANT USAGE ON SEQUENCE zst_title_id_seq TO authenticated;