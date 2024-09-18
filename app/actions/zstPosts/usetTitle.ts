"use server";
import { getJpTimeZoneFromUtc } from "@/lib/utilsDate";
import { createClient } from "@/utils/supabase/server";

export const selectUserTitle = async (user_id: number) => {
  console.log("selectUserTitle", user_id);
  const supabase = createClient();
  const { data: res, error } = await supabase
    .from("zst_user_sample_title")
    .select("*")
    .eq("user_id", user_id)
    .order("create_at", { ascending: false }); // CreateAtで降順にソート
  // .limit(1)
  // .single();

  if (error) {
    console.log(error);
    return [];
  }
  return res;
};

export const registUserTitle = async (
  user_id: number,
  name: string,
  auto_create_flg: number
) => {
  //すでにあるかどうかの確認
  const existUserTile = await isExistUserTitle(user_id, name);
  console.log("registUserTitle:existUserTile:", existUserTile);
  if (existUserTile) {
    //あった場合はカウントを追加
  } else {
    //なかったら追加
    insertUserSampleTitle(user_id, name);
  }
  return;

  const this_atuo_create_flg = auto_create_flg !== 0 ? 0 : 1;
};

export const insertUserSampleTitle = async (user_id: number, name: string) => {
  const supabase = createClient();

  const create_at = getJpTimeZoneFromUtc(new Date());
  try {
    const { data: res, error } = await supabase
      .from("zst_user_sample_title")
      .insert([
        {
          user_id: user_id,
          name: name,
          auto_create_flg: 0,
          create_at: create_at,
        },
      ]);
    if (error) {
      console.log("insertUserSampleTitle:faild", error);
    }
  } catch (error) {
    console.log("insertUserSampleTitle:faild", error);
  }
};

export const isExistUserTitle = async (user_id: number, name: string) => {
  // console.log("updateFlgZstPost start ");

  const supabase = createClient();
  const { data: res, error: putError } = await supabase
    .from("zst_user_sample_title")
    .select("*")
    .eq("user_id", user_id)
    .eq("name", name);
  if (putError) {
    console.log("zst_user_sample_title:update faild", putError);
  }
  return res?.length ? true : false;
};

// interface insertTitleSampleType {
//     title: string;
// }
// export const insertTitleSample = async (props: insertTitleSampleType) => {
// const { title } = props;
// const supabase = createClient();

// const create_at = getJpTimeZoneFromUtc(new Date());
// try {
//     const { data: res, error } = await supabase
//     .from("zst_title_sample")
//     .insert([
//         {
//         title: title,
//         create_at: create_at,
//         },
//     ]);
//     if (error) {
//     console.log("insertTitleSample:faild", error);
//     }
// } catch (error) {
//     console.log("insertTitleSample:faild", error);
// }
// };
