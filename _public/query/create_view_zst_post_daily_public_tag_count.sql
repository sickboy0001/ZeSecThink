-- -- create_view_zst_post_daily_public_tag_count

CREATE OR REPLACE VIEW view_zst_post_daily_public_tag_count AS
SELECT
    zp.user_id ,
    DATE(zp.current_at) AS current_at, -- 日付のみにする場合は DATE 関数を使用
    zp.public_flg,
    ztl.tag_id as tag_id,
    COUNT(zp.id)  -- エイリアスを post_count から count に変更
FROM
    zst_post zp
LEFT JOIN
    zst_tag_link ztl
    ON zp.id = ztl.post_id
-- WHERE
--     zp.user_id = 1
--     and current_at between '2025-01-17 00:00:00' and '2025-04-17 00:00:00'
GROUP BY
    zp.user_id,
    DATE(zp.current_at), -- 日付のみでグループ化
    zp.public_flg,
    ztl.tag_id
ORDER BY
    zp.user_id,
    DATE(zp.current_at) desc,
    zp.public_flg,
    ztl.tag_id;


grant usage on schema "public" to anon;
grant usage on schema "public" to authenticated;

GRANT SELECT, INSERT, UPDATE , DELETE  ON ALL TABLES IN SCHEMA "public" TO authenticated;
GRANT SELECT, INSERT, UPDATE , DELETE ON ALL TABLES IN SCHEMA "public" TO anon;


-- readViewDailyPublicCounts
// pages/api/view-daily-public-counts.js
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate parameters are required.' });
    }

    try {
      const { data, error } = await supabase
        .from('view_zst_post_daily_public_count') // <-- View名を更新
        .select('*')
        .gte('current_at', startDate)
        .lte('current_at', endDate);

      if (error) {
        console.error('Supabase query error:', error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}