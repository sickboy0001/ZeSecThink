
CREATE TABLE public.zst_tag_link (
    id serial PRIMARY KEY,
    post_id INTEGER,
    tag_id INTEGER,
    display_order INTEGER,
    create_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.zst_tag_link
DROP CONSTRAINT fk_zst_tag_link_tag_mas;

grant usage on schema "public" to anon;
grant usage on schema "public" to authenticated;

GRANT SELECT, INSERT, UPDATE , DELETE  ON ALL TABLES IN SCHEMA "public" TO authenticated;
GRANT SELECT, INSERT, UPDATE , DELETE ON ALL TABLES IN SCHEMA "public" TO anon;

GRANT USAGE ON SEQUENCE zst_tag_link_id_seq TO anon;
GRANT USAGE ON SEQUENCE zst_tag_link_id_seq TO authenticated;