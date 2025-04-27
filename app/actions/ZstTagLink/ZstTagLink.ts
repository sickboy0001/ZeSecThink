"use server";
import { TypeTagMas } from "@/app/types/tagTypes";
import { getJpTimeZoneFromUtc } from "@/lib/utilsDate";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

interface DeleteInsertZstTagLinksParams {
  post_id: number;
  tags: TypeTagMas[];
}

export async function deleteInsertZstTagLinks(
  params: DeleteInsertZstTagLinksParams,
) {
  const { post_id, tags } = params;
  console.log("--deleteInsertZstTagLinks start");
  await deletesZstTagLink(post_id);
  await insertsZstTagLink(post_id, tags);
  console.log("--deleteInsertZstTagLinks end");
}

async function deletesZstTagLink(post_id: number) {
  //post_id に結び付くデータの削除
  const { error: deleteError } = await supabase
    .from("zst_tag_link")
    .delete()
    .eq("post_id", post_id);

  if (deleteError) {
    console.error("Error deleting zst_tag_link:", deleteError);
    return { error: "関連するタグの削除に失敗しました" };
  }
  return;
}

async function insertsZstTagLink(post_id: number, tags: TypeTagMas[]) {
  const create_at = getJpTimeZoneFromUtc(new Date());
  const update_at = create_at;
  // post_id に結び付く tags を zst_tag_link に登録する。
  const insertData = tags.map((tag, index) => ({
    post_id: post_id,
    tag_id: tag.id, // TypeTagMas 型のオブジェクトが id プロパティを持っていると仮定
    display_order: 0,
    create_at: create_at,
    update_at: update_at,
  }));

  const { data, error } = await supabase
    .from("zst_tag_link")
    .insert(insertData)
    .select(); // 挿入したデータを取得する場合

  if (error) {
    console.error("Error inserting into zst_tag_link:", error);
    return { error: "タグの登録に失敗しました" };
  }

  return data;
}

export async function readTagsByPostId(
  postId: number,
): Promise<{ data: number[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from("zst_tag_link")
    .select("tag_id") // 取得するカラムを tag_id のみに変更
    .eq("post_id", postId);

  if (error) {
    console.error("Error fetching tag IDs by post ID:", error);
    return { data: null, error: "タグIDの取得に失敗しました" };
  }

  // 取得した tag_id の配列を返す
  const tagIds: number[] = data?.map((item) => item.tag_id) ?? [];

  return { data: tagIds, error: null };
}

// interface ReadTagOrderParams {
//   userId: number;
//   type: string; // 例: "fav"
// }

// export async function readTagOrder(params: ReadTagOrderParams) {
//   const { userId, type } = params;

//   const { data: tagOrderData, error } = await supabase
//     .from("tag_order")
//     .select("*") // 取得したいカラムを指定 (ここでは全て)
//     .eq("user_id", userId)
//     .eq("type", type)
//     .single(); // 該当するレコードが1つであることを想定する場合

//   if (error) {
//     console.error("Error reading tag order:", error);
//     return { error: "タグオーダーの取得に失敗しました" };
//   }
//   if (!tagOrderData) {
//     return "";
//   }

//   return tagOrderData as TypeTagOrder; // 取得したデータ (存在しない場合は null)
// }

// interface CreateUpdateTagOrderParams {
//   userId: number;
//   type: string; //fav
//   tagIds?: string | null;
// }

// export async function createUpdateTagOrder(params: CreateUpdateTagOrderParams) {
//   const { userId, type, tagIds } = params;

//   // まず更新を試みる
//   const updateResult = await updateTagOrder({ userId, type, tagIds });

//   if (!updateResult?.error && updateResult) {
//     // 更新が成功した場合、更新されたデータを返す
//     return updateResult;
//   }

//   // 更新が失敗した場合（レコードが存在しない可能性が高い）、新規作成を行う
//   const createResult = await createTagOrder({ userId, type, tagIds });

//   if (createResult?.error) {
//     // 作成に失敗した場合、そのエラーを上位に伝播させる
//     return { error: createResult.error };
//   }

//   return createResult;
// }

// interface CreateTagOrderParams {
//   userId: number;
//   type: string; //fav
//   tagIds?: string | null;
// }

// export async function createTagOrder(params: CreateTagOrderParams) {
//   const { userId, type, tagIds } = params;

//   const create_at = getJpTimeZoneFromUtc(new Date());
//   const update_at = create_at;

//   const { data: newTagOrder, error } = await supabase
//     .from("tag_order")
//     .insert([
//       {
//         user_id: userId,
//         type,
//         tag_ids: tagIds,
//         create_at: create_at,
//         update_at: update_at,
//       },
//     ])
//     .select();

//   if (error) {
//     console.error("Error creating tag order:", error);
//     return { error: "タグオーダーの作成に失敗しました" };
//   }

//   return newTagOrder?.[0];
// }
