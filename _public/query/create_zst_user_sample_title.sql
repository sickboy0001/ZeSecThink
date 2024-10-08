-- drop table zst_user_sample_title
-- CREATE VIEW random_posts AS SELECT * FROM zst_title_sample ORDER BY random();

CREATE TABLE public.zst_user_sample_title (
    id SERIAL PRIMARY KEY, -- 自動増分のID列（プライマリキー）
    user_id INT NOT NULL,   -- ユーザーID（外部キーになることを想定）
    name TEXT NOT NULL,     -- 名前を保存するためのテキスト列
    auto_create_flg INT NOT NULL , --  0 Manual 1 Auto
    create_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP -- 作成日時
) TABLESPACE pg_default;


GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon;


GRANT USAGE ON SEQUENCE zst_user_sample_title_id_seq TO anon;
GRANT USAGE ON SEQUENCE zst_user_sample_title_id_seq TO authenticated;

 CREATE VIEW random_zst_user_sample_title AS 
 SELECT * FROM zst_user_sample_title ORDER BY random()


GRANT SELECT ON random_zst_user_sample_title TO authenticated;
GRANT SELECT ON random_zst_user_sample_title  TO anon;

/*
select 
  * 
from random_zst_user_sample_title
where 
  user_id = 1  
  and invalid_flg = 0 
  and auto_create_flg = 0 
limit 10
*/