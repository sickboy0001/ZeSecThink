"use server";
import { TypeTagMas, TypeTagOrder } from "@/app/types/tagTypes";
import { getJpTimeZoneFromUtc } from "@/lib/utilsDate";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

interface ReadTagOrderParams {
  userId: number;
  type: string; // 例: "fav"
}

export async function readTagOrder(params: ReadTagOrderParams) {
  const { userId, type } = params;
  console.error("readTagOrder:", params);

  const { data: tagOrderData, error } = await supabase
    .from("tag_order")
    .select("*") // 取得したいカラムを指定 (ここでは全て)
    .eq("user_id", userId)
    .eq("type", type)
    .single(); // 該当するレコードが1つであることを想定する場合

  if (error) {
    console.error("Error reading tag order:", error);
    return { error: "タグオーダーの取得に失敗しました" };
  }
  if (!tagOrderData) {
    return "";
  }

  return tagOrderData as TypeTagOrder; // 取得したデータ (存在しない場合は null)
}

interface CreateUpdateTagOrderParams {
  userId: number;
  type: string; //fav
  tagIds?: string | null;
}

export async function createUpdateTagOrder(params: CreateUpdateTagOrderParams) {
  console.error("createUpdateTagOrder:", params);

  const { userId, type, tagIds } = params;

  // まず更新を試みる
  const updateResult = await updateTagOrder({ userId, type, tagIds });

  if (!updateResult?.error && updateResult) {
    // 更新が成功した場合、更新されたデータを返す
    return updateResult;
  }

  // 更新が失敗した場合（レコードが存在しない可能性が高い）、新規作成を行う
  const createResult = await createTagOrder({ userId, type, tagIds });

  if (createResult?.error) {
    // 作成に失敗した場合、そのエラーを上位に伝播させる
    return { error: createResult.error };
  }

  return createResult;
}

interface CreateTagOrderParams {
  userId: number;
  type: string; //fav
  tagIds?: string | null;
}

export async function createTagOrder(params: CreateTagOrderParams) {
  const { userId, type, tagIds } = params;

  const create_at = getJpTimeZoneFromUtc(new Date());
  const update_at = create_at;

  const { data: newTagOrder, error } = await supabase
    .from("tag_order")
    .insert([
      {
        user_id: userId,
        type,
        tag_ids: tagIds,
        create_at: create_at,
        update_at: update_at,
      },
    ])
    .select();

  if (error) {
    console.error("Error creating tag order:", error);
    return { error: "タグオーダーの作成に失敗しました" };
  }

  return newTagOrder?.[0];
}

interface UpdateTagOrderParams {
  userId?: number;
  type?: string; //fav
  tagIds?: string | null;
}

export async function updateTagOrder(params: UpdateTagOrderParams) {
  const { userId, type, tagIds } = params;
  // const create_at = getJpTimeZoneFromUtc(new Date());
  const update_at = getJpTimeZoneFromUtc(new Date());

  const { data: updatedTagOrder, error } = await supabase
    .from("tag_order")
    .update({
      ...(userId !== undefined && { user_id: userId }),
      ...(type !== undefined && { type }),
      ...(tagIds !== undefined && { tag_ids: tagIds }),
      update_at: update_at, // 更新日時を更新
    })
    .eq("user_id", userId)
    .eq("type", type)
    .select();

  if (error) {
    console.error("Error updating tag order:", error);
    return { error: "タグオーダーの更新に失敗しました" };
  }

  return updatedTagOrder?.[0];
}
