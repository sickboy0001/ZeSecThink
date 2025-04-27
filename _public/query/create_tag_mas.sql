CREATE TABLE IF NOT EXISTS public.tag_mas (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL,
  tag_name TEXT NULL,
  name TEXT NULL,
  description TEXT NULL,
  visible_flg BOOLEAN NOT NULL DEFAULT FALSE,
  favorite_flg BOOLEAN NOT NULL DEFAULT FALSE,
  public_flg BOOLEAN NOT NULL DEFAULT FALSE,
  create_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  -- constraint tag_mas_id_pkey primary key (id)
);

CREATE INDEX idx_tag_mas_user_id ON public.tag_mas (user_id);

grant usage on schema "public" to anon;
grant usage on schema "public" to authenticated;

GRANT SELECT, INSERT, UPDATE , DELETE  ON ALL TABLES IN SCHEMA "public" TO authenticated;
GRANT SELECT, INSERT, UPDATE , DELETE ON ALL TABLES IN SCHEMA "public" TO anon;

GRANT USAGE ON SEQUENCE tag_mas_id_seq TO anon;
GRANT USAGE ON SEQUENCE tag_mas_id_seq TO authenticated;




