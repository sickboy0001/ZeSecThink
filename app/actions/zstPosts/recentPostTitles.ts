"use server";

import { createClient } from "@/utils/supabase/server";
import { format as formatTz, toZonedTime } from "date-fns-tz";

export const getRececntPostTitles = async (
  user_id: number | undefined,
  now: Date,
  days: number
) => {
  const startTime = new Date();
  const timeZone = "Asia/Tokyo";
  const thisFromAt = formatTz(
    toZonedTime(now.setDate(now.getDate() - days), timeZone),
    "yyyy-MM-dd 00:00:00000",
    {
      timeZone,
    }
  );
  const thisToAt = formatTz(
    toZonedTime(now, timeZone),
    "yyyy-MM-dd 00:00:00000",
    {
      timeZone,
    }
  ); // getJpTimeZoneFromUtc(to_at);

  console.log("export const getPosts ", thisFromAt + "-" + thisToAt);
  if (user_id === undefined) {
    user_id = 0;
  }
  return null;

  //Todo:group NG GAIにきくべし。
  const supabase = createClient();
  //   const { data: res, error } = await supabase
  //     .from("zst_post")
  //     .select("title, count:id")
  //     .eq("user_id", user_id)
  //     .gte("current_at", "2025-02-28 00:00:00")
  //     .lte("current_at", "2025-03-22 00:00:00")
  //     .eq("delete_flg", false)
  //     .group("title")
  //     .order("count", { ascending: false });
  //   if (error) {
  //     console.log(error);
  //     return [];
  //   }

  //   // 日時フィールドをDateオブジェクトに変換
  //   const posts = res.map((item: any) => ({
  //     ...item,
  //     current_at: item.current_at,
  //     write_start_at: item.write_start_at,
  //     write_end_at: item.write_end_at,
  //     create_at: item.create_at,
  //     update_at: item.update_at,
  //   }));

  //   const endTime = new Date();

  //   // console.log("zstposts/posts/getPosts infostring:", infostring);

  //   return posts;
};
