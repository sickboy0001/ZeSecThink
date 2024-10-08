grant usage on schema "public" to anon;
grant usage on schema "public" to authenticated;

GRANT SELECT, INSERT, UPDATE , DELETE  ON ALL TABLES IN SCHEMA "public" TO authenticated;
GRANT SELECT, INSERT, UPDATE , DELETE ON ALL TABLES IN SCHEMA "public" TO anon;


GRANT ALL ON TABLE public.zst_post TO postgres;
GRANT ALL ON TABLE public.zst_post TO anon;
GRANT ALL ON TABLE public.zst_post TO authenticated;
GRANT ALL ON TABLE public.zst_post TO service_role;



code: '42501',  message: 'permission denied for sequence user_info_id_seq'

supabase 
採番用サロゲートキー用の権限
-- 構文
GRANT USAGE ON SEQUENCE [tablename]_[columnname] TO anon;
GRANT USAGE ON SEQUENCE [tablename]_[columnname] TO authenticated;

-- 例
GRANT USAGE ON SEQUENCE zst_post_id_seq TO anon;
GRANT USAGE ON SEQUENCE zst_post_id_seq TO authenticated;


GRANT USAGE ON SEQUENCE user_info_id_seq TO anon;
GRANT USAGE ON SEQUENCE user_info_id_seq TO authenticated;

GRANT USAGE ON SEQUENCE mail_to_id_id_seq TO anon;
GRANT USAGE ON SEQUENCE mail_to_id_id_seq TO authenticated;

