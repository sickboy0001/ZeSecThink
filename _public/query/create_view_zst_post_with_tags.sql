-- view_zst_post_with_tags
CREATE OR REPLACE VIEW view_zst_post_with_tags AS
SELECT
    zp.*,
    ztl.tag_id as tag_id
FROM
    zst_post zp
LEFT JOIN
    zst_tag_link ztl
    ON zp.id = ztl.post_id

grant usage on schema "public" to anon;
grant usage on schema "public" to authenticated;

GRANT SELECT, INSERT, UPDATE , DELETE  ON ALL TABLES IN SCHEMA "public" TO authenticated;
GRANT SELECT, INSERT, UPDATE , DELETE ON ALL TABLES IN SCHEMA "public" TO anon;
