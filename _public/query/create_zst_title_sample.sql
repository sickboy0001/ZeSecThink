-- drop table zst_title_sample
-- CREATE VIEW random_posts AS SELECT * FROM zst_title_sample ORDER BY random();
CREATE TABLE public.zst_title_sample (
    id SERIAL,
    title TEXT NOT NULL,
    comment TEXT NULL,
    create_at timestamp  without time zone not null default current_timestamp,
    CONSTRAINT zst_title_sample_id_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;



GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon;


GRANT USAGE ON SEQUENCE zst_title_sample_id_seq TO anon;
GRANT USAGE ON SEQUENCE zst_title_sample_id_seq TO authenticated;

CREATE VIEW random_zst_title_sample AS SELECT * FROM zst_title_sample ORDER BY random();


GRANT SELECT ON random_zst_title_sample TO authenticated;
GRANT SELECT ON random_zst_title_sample  TO anon;

/*
SELECT sequence_name
FROM information_schema.sequences
WHERE sequence_schema = 'public';
*/