-- drop table zst_user_sample_title
-- CREATE VIEW random_posts AS SELECT * FROM zst_title_sample ORDER BY random();

CREATE TABLE public.zst_title_history (
    id SERIAL PRIMARY KEY, -- 自動増分のID列（プライマリキー）
    title_id INT NOT NULL,   -- ユーザーID（外部キーになることを想定）
    user_id INT NOT NULL,   -- ユーザーID（外部キーになることを想定）
    create_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP -- 作成日時
) TABLESPACE pg_default;


GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon;


GRANT USAGE ON SEQUENCE zst_title_history_id_seq TO anon;
GRANT USAGE ON SEQUENCE zst_title_history_id_seq TO authenticated;


/*
SELECT sequence_name
FROM information_schema.sequences
WHERE sequence_schema = 'public';
*/