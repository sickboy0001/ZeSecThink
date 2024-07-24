"use server";

import { User } from "@/app/types/user";
import { TypeZstPost } from "@/app/types/zstTypes";
import { ImportOrderContent } from "@/constants/importData";
import { GetFormatTz, getJpTimeZoneFromUtc } from "@/lib/utilsDate";
import { createClient } from "@/utils/supabase/server";
import { ja } from "date-fns/locale/ja";
import { parse } from "date-fns/parse";
import { createZstPost } from "../zstPosts/posts";

const getPostIdFromDateTitle = async (
  user_id: number | undefined,
  date: Date,
  title: string
) => {
  console.log("getPostIdFromDateTitle:start", title);
  try {
    const supabase = createClient();
    console.log("getJpTimeZoneFromUtc(date)", getJpTimeZoneFromUtc(date));
    const { data: res, error } = await supabase
      .from("zst_post")
      .select("id")
      .eq("user_id", user_id)
      .eq("title", title)
      .eq("current_at", getJpTimeZoneFromUtc(date))
      .single();
    if (error) {
      return 0;
    }

    // console.log("zstposts/posts/getPosts:", res);
    if (res) {
      const id = res.id;
      console.log("const id = ", res.id);

      return res.id;
    } else {
      console.log("getPostIdFromDateTitle:error", res);
      return 0;
    }
  } catch (error) {
    console.log("error", error);
    return 0;
  }
};
export const convertFormAction = async (
  user: User | null,
  data: Array<Record<string, any>>
) => {
  if (!user) {
    return;
  }

  let log: string[] = [];
  const startDate = new Date();
  log.push(`start:${GetFormatTz(startDate)} row_count:${data.length}件`);
  const dateIndex = ImportOrderContent.findIndex(
    (filterItem) => filterItem[0] === "date"
  );
  // console.log(dateIndex);
  const titleIndex = ImportOrderContent.findIndex(
    (filterItem) => filterItem[0] === "title"
  );
  // console.log(titleIndex);

  const contentIndex = ImportOrderContent.findIndex(
    (filterItem) => filterItem[0] === "content"
  );
  for (const each of data) {
    const datestr = each[dateIndex] as string;
    const thidate = parse(
      datestr,
      "yyyy年M月d日",
      getJpTimeZoneFromUtc(new Date())
    );
    const title = each[titleIndex] as string;
    const content = each[contentIndex] as string;

    log.push("info[sub]:" + datestr + ":" + title);

    if (!isNaN(thidate.getTime())) {
      const id = await getPostIdFromDateTitle(user.userid, thidate, title);
      console.log("await getPostIdFromDateTitle:", id);
      if (id == 0) {
        //insert
        log.push("info[sub]:" + datestr + ":" + title + ":" + "new-data");

        const nowDate = new Date();
        const writeStartAt = new Date();
        const writeEndAt = new Date();

        var diffMilliSec = writeEndAt.getTime() - writeStartAt.getTime();
        var diffsec = Math.floor(diffMilliSec / 1000); // Math.floor を使用して整数に切り捨て

        const second = diffsec;

        const zstPost: TypeZstPost = {
          id: 0, //未使用
          user_id: user?.userid ?? 0,
          current_at: thidate,
          title: title,
          content: content,
          second: second,
          public_flg: true,
          public_content_flg: false,
          delete_flg: false,
          write_start_at: writeStartAt,
          write_end_at: writeEndAt,
          create_at: nowDate,
          update_at: nowDate,
        };
        createZstPost({
          params: {
            ZstPost: zstPost,
          },
        });
      } else {
        log.push("info[sub]:" + datestr + ":" + title + ":" + "no-insert");
      }
    }
  }
  const EndDate = new Date();
  var diff = EndDate.getTime() - startDate.getTime();
  var diffsec = diff / 1000;
  log.push(
    `start:${GetFormatTz(startDate)} end: ${GetFormatTz(EndDate)} [${String(
      diffsec
    )}秒]`
  );
  return log;
};
