"use server";
import { TypeTagMas } from "@/app/types/tagTypes";
import { getJpTimeZoneFromUtc } from "@/lib/utilsDate";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

interface readTagMasProp {
  user_id: number;
}

export const readTagMas = async (props: readTagMasProp) => {
  console.log("readTagMas", props);
  const { user_id } = props;

  let query = supabase.from("tag_mas").select("*").order("id"); // IDでソートするなど

  if (user_id !== null && !isNaN(user_id)) {
    query = query.eq("user_id", user_id);
  }

  const { data: res, error } = await query;

  if (error) {
    console.error("Error fetching tags:", error);
    return {
      props: {
        res: [],
      },
    };
  }
  // console.log("readTagMasProp");
  // console.log(res);

  return res as TypeTagMas[];
};

export const deleteTagMas = async (id: number): Promise<boolean> => {
  console.log("deleteTagMas", id);

  const { error } = await supabase.from("tag_mas").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting tag with ID ${id}:`, error);
    return false;
  }

  return true; // 削除が成功した場合
};

export const createTagMas = async (
  user_id: number,
  tag_name: string,
  name: string,
  description: string,
  visible_flg: boolean,
  favorite_flg: boolean,
  public_flg: boolean,
): Promise<TypeTagMas[]> => {
  console.log("createTagMas", tag_name);
  const create_at = getJpTimeZoneFromUtc(new Date());
  const update_at = create_at;

  const { data: newTag, error } = await supabase
    .from("tag_mas")
    .insert([
      {
        user_id: user_id,
        tag_name: tag_name,
        name: name,
        description: description,
        visible_flg: visible_flg,
        favorite_flg: favorite_flg,
        public_flg: public_flg,
        create_at: create_at,
        update_at: update_at,
      },
    ])
    .select(); // 登録したデータを取得する場合
  if (error) {
    console.error("Error creating tag:", error);
    return [];
  }
  return newTag || [];
};

export const updateTagMas = async (
  id: number, // 更新対象のレコードの ID
  tag_name?: string,
  name?: string, // 省略可能
  description?: string, // 省略可能
  visible_flg?: boolean, // 省略可能
  favorite_flg?: boolean, // 省略可能
  public_flg?: boolean, // 省略可能
) => {
  const update_at = getJpTimeZoneFromUtc(new Date());
  console.log("updateTagMas", tag_name);
  const updates: {
    tag_name?: string;
    name?: string;
    description?: string;
    visible_flg?: boolean;
    favorite_flg?: boolean;
    public_flg?: boolean;
    update_at: string;
  } = { update_at };

  if (tag_name !== undefined) {
    updates.tag_name = tag_name;
  }
  if (name !== undefined) {
    updates.name = name;
  }
  if (description !== undefined) {
    updates.description = description;
  }
  if (visible_flg !== undefined) {
    updates.visible_flg = visible_flg;
  }
  if (favorite_flg !== undefined) {
    updates.favorite_flg = favorite_flg;
  }
  if (public_flg !== undefined) {
    updates.public_flg = public_flg;
  }

  const { data: updatedTag, error } = await supabase
    .from("tag_mas")
    .update(updates)
    .eq("id", id) // 更新するレコードを ID で指定
    .select(); // 更新したデータを取得する場合

  if (error) {
    console.error("Error updating tag:", error);
    return { error: "タグの更新に失敗しました" };
  }

  return updatedTag?.[0] || null; // 更新されたデータを返す
};
