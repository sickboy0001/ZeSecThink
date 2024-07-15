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

  const user: User = data.user; // Supabase の User オブジェクトを自分の定義した User インターフェースにキャスト
  if (user.email != undefined) {
    user.userid = await getUserId(user.email);
    user.username = await getUserName(user.email);
    user.isSuperUser = isSuperUser(user.email);
  }

  return user;
};
const getUserName = async (email: string) => {
  console.log("getUserName:start");
  if (email.split("@").length > 0) {
    return email.split("@")[0];
  } else {
    return email;
  }
};

const getUserId = async (email: string) => {
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
