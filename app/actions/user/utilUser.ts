"use server";

import { User } from "@/app/types/user";
import { isSuperUser } from "@/lib/user";
import { createClient } from "@/utils/supabase/server";

export const getUtilUser = async (): Promise<User | null> => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }
  // console.log("getUtilUser:", data);

  const user: User = data.user; // Supabase の User オブジェクトを自分の定義した User インターフェースにキャスト
  if (user.email != undefined) {
    user.userid = await getUserId(user.email);
    const parsedUserId = user.userid || 0; //parseInt( || 0);
    [user.username, user.comment] = await getUserNameComment(parsedUserId);
    user.isSuperUser = isSuperUser(user.email);
  }

  return user;
};
const getUserNameComment = async (user_id: number) => {
  console.log(`getUserNameComment:start:${String(user_id)}`);
  const supabase = createClient();
  const { data: res, error } = await supabase
    .from("user_info")
    .select("name , comment")
    .eq("user_id", user_id)
    .eq("delete_flg", false)
    .single();

  if (error) {
  }
  console.log(res);
  return [res?.name, res?.comment];
  // return ["12", "12"];

  // if (email.split("@").length > 0) {
  //   return email.split("@")[0];
  // } else {
  //   return email;
  // }
};

const InsertMailToId = async (email: string) => {
  console.log("updateUserId:start");
  const supabase = createClient();
  const { data: res, error } = await supabase.from("mail_to_id").insert([
    {
      mail: email,
    },
  ]);
  if (error) {
    console.log("■■■■データの登録失敗", error);
  }
};

const getUserIdInserted = async (email: string) => {
  console.log("getUserId:start");
  const supabase = createClient();
  const { data: res, error } = await supabase
    .from("mail_to_id")
    .select("id")
    .eq("mail", email)
    .limit(1);

  if (error) {
    console.log(error);
  }
  if (res == null) {
    return null;
  } else {
    return res[0].id;
  }
};
const getUserId = async (email: string) => {
  let user_id = getUserIdInserted(email);
  if (!user_id) {
    InsertMailToId(email);
    const insertUserId = getUserIdInserted(email);
    if (insertUserId == null) {
      console.log("");
    } else {
      user_id = insertUserId;
    }
  }
  return user_id;
};
