"use server";

import { createClient } from "@/utils/supabase/server";
import { TypeZstPost, TypeZstPostWithTags } from "@/app/types/zstTypes";
import { GetDateTimeFormat, getJpTimeZoneFromUtc } from "@/lib/utilsDate";
import { format as formatTz, toZonedTime } from "date-fns-tz";

const supabase = createClient();

const getToZonedTime = (argdatetime: Date) => {
  const timeZone = "Asia/Tokyo";
  return formatTz(
    toZonedTime(argdatetime, timeZone),
    "yyyy-MM-dd 00:00:00000",
    {
      timeZone,
    },
  );
};

export async function readPostsWithTags(
  userId: number | undefined,
  fromAt: Date,
  toAt: Date,
): Promise<TypeZstPostWithTags[]> {
  // ... Supabase クエリ ...
  // .select(`*, zst_post_tag_links ( tag_mas (*) )`)
  // ... データ整形 ...
  const thisFromAt = getToZonedTime(fromAt);
  const thisToAt = getToZonedTime(toAt);

  if (userId === undefined) {
    console.warn(
      "readPostsWithTags: userId is undefined. Returning empty array.",
    );
    return [];
  }

  const supabase = createClient(); // 関数内でクライアントを生成
  try {
    // 2. view_zst_post_with_tags からデータを取得 (変更なし)
    const { data: viewData, error: viewError } = await supabase
      .from("view_zst_post_with_tags") // ビュー名を指定
      .select("*")
      .eq("user_id", userId)
      .gte("current_at", thisFromAt)
      .lte("current_at", thisToAt)
      // .eq("delete_flg", false) // 必要に応じて削除フラグを考慮
      .order("current_at", { ascending: false }) // 日付で降順ソート
      .order("id", { ascending: false }); // 同じ日付内での順序安定のためIDでもソート

    if (viewError) {
      console.error(
        "Error fetching from view_zst_post_with_tags:",
        viewError.message,
      );
      throw viewError;
    }

    if (!viewData || viewData.length === 0) {
      console.log(
        "readPostsWithTags: No data found in view for the specified criteria.",
      );
      return [];
    }

    // 3. 投稿IDでグルーピングし、tag_id を収集 (変更なし)
    // Map の value の型から TypeTagMas を削除し、tag_ids の Set のみ保持
    const postsMap = new Map<number, TypeZstPost & { tag_ids: Set<number> }>();

    for (const row of viewData) {
      const postId = row.id;
      if (!postsMap.has(postId)) {
        const { tag_id, ...postData } = row;
        postsMap.set(postId, {
          ...postData,
          // Date 型に変換
          current_at: new Date(postData.current_at),
          write_start_at: new Date(postData.write_start_at),
          write_end_at: new Date(postData.write_end_at),
          create_at: new Date(postData.create_at),
          update_at: new Date(postData.update_at),
          tag_ids: new Set<number>(), // tag_id を格納する Set を初期化
        });
      }
      // tag_id が null でなければ Set に追加
      if (row.tag_id !== null) {
        postsMap.get(postId)?.tag_ids.add(row.tag_id);
      }
    }

    // 4. 最終的なデータ構造に整形 (tag_mas 取得は不要)
    const postsWithTagsResult: TypeZstPostWithTags[] = Array.from(
      postsMap.values(),
    ).map((post) => {
      // post.tag_ids (Set) を配列に変換
      const tagIdArray = Array.from(post.tag_ids);

      // tag_ids プロパティを除去
      const { tag_ids, ...restOfPost } = post;

      return {
        ...restOfPost, // TypeZstPost のプロパティ
        // tagIds プロパティとして配列を追加。空の場合は null
        tagIds: tagIdArray.length > 0 ? tagIdArray : null,
      };
    });

    // 5. 再度日付でソート (変更なし)
    postsWithTagsResult.sort((a, b) => {
      const dateComparison =
        new Date(b.current_at).getTime() - new Date(a.current_at).getTime();
      if (dateComparison !== 0) return dateComparison;
      return b.id - a.id;
    });

    console.log(
      "readPostsWithTags: Successfully processed",
      postsWithTagsResult.length,
      "posts.",
    );
    return postsWithTagsResult; // TypeZstPostWithTags[] を返す
  } catch (error) {
    console.error("Unexpected error in readPostsWithTags:", error);
    return []; // エラー時は空配列を返す
  }

  // return postsWithTags;
}

export const readPostsWithTagConditionTagId = async (
  user_id: number | undefined,
  tag_id: number,
  from_at: Date,
  to_at: Date,
): Promise<TypeZstPostWithTags[]> => {
  // ★ 戻り値の型を変更
  console.log(
    "readPostsWithTagConditionTagId: Fetching posts for userId:",
    user_id,
    "tagId:",
    tag_id,
  );
  const supabase = createClient(); // 関数内でクライアント生成

  const thisFromAt = getToZonedTime(from_at);
  const toAtEndOfDay = new Date(to_at);
  toAtEndOfDay.setHours(23, 59, 59, 999);
  const thisToAt = formatTz(
    toZonedTime(toAtEndOfDay, "Asia/Tokyo"),
    "yyyy-MM-dd HH:mm:ss.SSSXXX",
    { timeZone: "Asia/Tokyo" },
  );

  if (user_id === undefined) {
    console.warn(
      "readPostsWithTagConditionTagId: userId is undefined. Returning empty array.",
    );
    return [];
  }

  try {
    // ★ try...catch を追加
    const { data: res, error: supabaseError } = await supabase
      .from("view_zst_post_with_tags") // ビューを使用
      .select("*")
      .eq("user_id", user_id)
      .eq("tag_id", tag_id) // 特定の tag_id でフィルタ
      .gte("current_at", thisFromAt)
      .lte("current_at", thisToAt)
      .order("current_at", { ascending: false }) // 日付で降順ソート
      .order("id", { ascending: false }); // IDでもソート

    if (supabaseError) {
      console.error("Error fetching posts with tag:", supabaseError.message);
      throw supabaseError; // エラーをスローして catch で捕捉
    }

    if (!res || res.length === 0) {
      console.log(
        "readPostsWithTagConditionTagId: No posts found for the specified tag and criteria.",
      );
      return [];
    }

    // ★ データ整形: TypeZstPostWithTags[] に変換
    // このビューとフィルタ条件では、各行がユニークな投稿に対応するはず
    const postsWithTagsResult: TypeZstPostWithTags[] = res.map((row: any) => {
      // tag_id カラムを除いた投稿データを取得
      const { tag_id: rowTagId, ...postData } = row;
      return {
        ...postData,
        // Date 型に変換
        current_at: new Date(postData.current_at),
        write_start_at: new Date(postData.write_start_at),
        write_end_at: new Date(postData.write_end_at),
        create_at: new Date(postData.create_at),
        update_at: new Date(postData.update_at),
        // tagIds プロパティにはフィルタに使った tag_id のみを含む配列を設定
        tagIds: [tag_id], // rowTagId ではなく、引数の tag_id を使う
      };
    });

    // ★ ソート処理 (readPostsWithTags と同じロジック)
    postsWithTagsResult.sort((a, b) => {
      const dateComparison =
        new Date(b.current_at).getTime() - new Date(a.current_at).getTime();
      if (dateComparison !== 0) return dateComparison;
      return b.id - a.id;
    });

    console.log(
      "readPostsWithTagConditionTagId: Successfully processed",
      postsWithTagsResult.length,
      "posts.",
    );
    return postsWithTagsResult; // ★ TypeZstPostWithTags[] を返す
  } catch (error) {
    // ★ エラーハンドリング
    console.error("Unexpected error in readPostsWithTagConditionTagId:", error);
    return []; // エラー時は空配列を返す
  }
};

// export const readPostsWithTagConditionTagId = async (
//   user_id: number | undefined,
//   tag_id: number,
//   from_at: Date,
//   to_at: Date,
// ) => {
//   console.log("getPosts", user_id);
//   const startTime = new Date();

//   const thisFromAt = getToZonedTime(from_at);
//   const thisToAt = getToZonedTime(to_at);

//   if (user_id === undefined) {
//     user_id = 0;
//   }

//   const { data: res, error: supabaseError } = await supabase
//     .from("view_zst_post_with_tags")
//     .select("*")
//     .eq("user_id", user_id)
//     .eq("tag_id", tag_id)
//     .gte("current_at", thisFromAt)
//     // .gte("current_at", GetDateTimeFormat(from_at))
//     .lte("current_at", thisToAt)
//     // .lte("current_at", GetDateTimeFormat(to_at))
//     .order("current_at", { ascending: false }) // 最初のソート条件: true 昇順
//     .order("write_start_at", { ascending: false }) // 次のソート条件: false 降順;
//     .order("update_at", { ascending: false }); // 次のソート条件: 降順;

//   if (supabaseError) {
//     console.error("Error fetching posts with tag:", supabaseError);
//     return { data: null, error: supabaseError };
//   }
//   // 日時フィールドをDateオブジェクトに変換
//   const posts: TypeZstPost[] = (res as TypeZstPost[]).map((item: any) => ({
//     ...item,
//   }));

//   return { data: posts, error: null };

//   // return posts;
// };
