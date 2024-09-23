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
  auto_create_flg: number,
  invalid_flg: number,
  public_flg: number
  //    ? await registUserTitle(userid, name, auto_create_flg,invalid_flg , public_flg)
) => {
  //すでにあるかどうかの確認
  const existUserTile = await isExistUserTitle(user_id, name);
  console.log("registUserTitle:existUserTile:", existUserTile);
  if (existUserTile) {
    //あった場合はカウントを追加
  } else {
    //なかったら追加
    insertUserSampleTitle(
      user_id,
      name,
      auto_create_flg,
      invalid_flg,
      public_flg
    );
  }
  return;

  const this_atuo_create_flg = auto_create_flg !== 0 ? 0 : 1;
};

export const removeUserTitle = async (id: number) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("zst_user_sample_title")
      .delete()
      .eq("id", id); // 指定されたIDで削除

    if (error) {
      console.log("removeUserTitle: failed", error);
    } else {
      console.log("removeUserTitle: success", data);
    }
  } catch (error) {
    console.log("removeUserTitle: failed", error);
  }
};

export const insertUserSampleTitle = async (
  user_id: number,
  name: string,
  auto_create_flg: number,
  invalid_flg: number,
  public_flg: number
) => {
  const supabase = createClient();

  const create_at = getJpTimeZoneFromUtc(new Date());
  try {
    const { data: res, error } = await supabase
      .from("zst_user_sample_title")
      .insert([
        {
          user_id: user_id,
          name: name,
          auto_create_flg: auto_create_flg,
          create_at: create_at,
          invalid_flg: invalid_flg,
          public_flg: public_flg,
        },
      ]);
    if (error) {
      console.log("insertUserSampleTitle:faild", error);
    }
  } catch (error) {
    console.log("insertUserSampleTitle:faild", error);
  }
};

export const updateUserSampleTitle = async (
  id: number,
  columnname: string,
  value: number
) => {
  const supabase = createClient();

  try {
    const { data: res, error } = await supabase
      .from("zst_user_sample_title")
      .update({
        [columnname]: value,
      })
      .eq("id", id.toString())
      .select()
      .single();
    if (error) {
      console.log("updateUserSampleTitle:faild", error);
    }
  } catch (error) {
    console.log("updateUserSampleTitle:faild", error);
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
