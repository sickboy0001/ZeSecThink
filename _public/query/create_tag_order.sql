CREATE TABLE IF NOT EXISTS public.tag_order (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  tag_ids TEXT NULL,
  create_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  -- constraint tag_order_id_pkey primary key (id)
);


grant usage on schema "public" to anon;
grant usage on schema "public" to authenticated;

GRANT SELECT, INSERT, UPDATE , DELETE  ON ALL TABLES IN SCHEMA "public" TO authenticated;
GRANT SELECT, INSERT, UPDATE , DELETE ON ALL TABLES IN SCHEMA "public" TO anon;

-- GRANT USAGE ON SEQUENCE tag_order_id_pkey TO anon;
-- GRANT USAGE ON SEQUENCE tag_order_id_pkey TO authenticated;

GRANT USAGE ON SEQUENCE tag_order_id_seq TO anon;
GRANT USAGE ON SEQUENCE tag_order_id_seq TO authenticated;

