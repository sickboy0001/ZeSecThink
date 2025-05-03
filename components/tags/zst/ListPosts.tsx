"use client";
import { TypeTagMas } from "@/app/types/tagTypes";
import { TypeZstPostWithTags } from "@/app/types/zstTypes";
import UserContext from "@/components/user/UserContext";
import ZstTitleAction from "@/components/zstpost/Posts/zstTitleAction";

import React, { useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Skeletonコンポーネントをインポート

interface propsListPosts {
  favoriteTagMass: TypeTagMas[];
  normalTagMass: TypeTagMas[];
  postWithTags: TypeZstPostWithTags[];
  putZstPosts?: (posts: TypeZstPostWithTags, actionType: string) => void;
  isLoading: boolean;
}

const ListPosts = (props: propsListPosts) => {
  const {
    favoriteTagMass,
    normalTagMass,
    postWithTags,
    putZstPosts,
    isLoading,
  } = props;
  // const [isLoading, setIsLoading] = useState<boolean>(false); // ローディング状態を追加

  const dayCount = 14;
  const nowDate = new Date();
  const before2Week = new Date();
  before2Week.setDate(before2Week.getDate() - dayCount);

  // console.log("ListDatePost rendered", fromAt, toAt); // レンダリング確認

  return (
    <div>
      <div className="h3 font-bold mb-2">List</div>

      {isLoading ? (
        <div className="space-y-4 mt-4">
          {/* Skeleton ローディングを複数表示 */}
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : postWithTags !== undefined && postWithTags.length > 0 ? (
        // 投稿リスト表示
        postWithTags.map((post) => (
          <div key={post.id}>
            <ZstTitleAction
              zstPost={post}
              favoriteTagMass={favoriteTagMass}
              normalTagMass={normalTagMass}
              titlePreYmd={true}
              putZstPosts={putZstPosts}
            />
          </div>
        ))
      ) : (
        // 投稿がない場合の表示
        <div className="mt-4 text-center text-gray-500">
          この期間の投稿はありません。
        </div>
      )}
    </div>
  );
};

export default ListPosts;
