"use server";

import { createClient } from "@/utils/supabase/server";
import { format as formatTz, toZonedTime } from "date-fns-tz";

export const selectRececntPostTitles = async (
  count: number,
  user_id: number | undefined,
  nowDate: Date = new Date(),
  days: number
) => {
  const timeZone = "Asia/Tokyo";

  const thisToAt = formatTz(
    toZonedTime(nowDate, timeZone),
    "yyyy-MM-dd 00:00:00000",
    {
      timeZone,
    }
  ); // getJpTimeZoneFromUtc(to_at);

  nowDate.setDate(nowDate.getDate() - days); // `days` 日前に設定
  const thisFromAt = formatTz(
    toZonedTime(nowDate, timeZone),
    "yyyy-MM-dd 00:00:00000",
    {
      timeZone,
    }
  );
  if (user_id === undefined) {
    user_id = 0;
  }
  console.log("export const getPosts From-To", thisFromAt + "-" + thisToAt);

  const supabase = createClient();

  const { data, error } = await supabase
    .from("zst_post")
    .select("title, id")
    .eq("user_id", user_id)
    .gte("current_at", thisFromAt)
    .lte("current_at", thisToAt)
    .eq("delete_flg", false);

  if (error) {
    console.error("Error fetching post counts:", error);
    return null;
  }

  // JavaScript で手動 `GROUP BY`
  const groupedData = data.reduce((acc: Record<string, number>, post) => {
    acc[post.title] = (acc[post.title] || 0) + 1;
    return acc;
  }, {});

  const result = Object.entries(groupedData)
    .map(([title, count]) => ({
      title,
      count,
    }))
    .sort((a, b) => b.title.length - a.title.length)
    .sort((a, b) => b.count - a.count)
    .slice(0, count);
  return result;
};
