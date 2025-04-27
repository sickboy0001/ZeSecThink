"use client";
import { TypeZstPostWithTags } from "@/app/types/zstTypes";
import React, { useEffect, useState } from "react";
import ZstTitle from "./zstTitle";
import { GetFormatTz } from "@/lib/utilsDate";
import ZstTitleAction from "./zstTitleAction";
import { TypeTagMas } from "@/app/types/tagTypes";

interface propTypes {
  date: Date;
  zstPosts: TypeZstPostWithTags[];
  isDispDetail?: boolean;
  putZstPosts: (posts: TypeZstPostWithTags, actionType: string) => void;
  favoriteTagMass: TypeTagMas[];
  normalTagMass: TypeTagMas[];
}

const ZstTitles = (props: propTypes) => {
  const {
    date,
    zstPosts,
    isDispDetail,
    putZstPosts,
    favoriteTagMass,
    normalTagMass,
  } = props;
  const [filteredPosts, setFilteredPosts] = useState<TypeZstPostWithTags[]>([]);

  useEffect(() => {
    const thisfilteredPosts = zstPosts.filter(
      (f) =>
        GetFormatTz(f.current_at, "yyyy-MM-dd") ===
        GetFormatTz(date, "yyyy-MM-dd"),
    );
    setFilteredPosts(thisfilteredPosts);
  }, [zstPosts, date]);

  if (filteredPosts.length === 0) {
    return <div>この日に投稿はありません。</div>;
  }
  // console.log("ZstTitles:zstPosts", zstPosts);
  // console.log("ZstTitles.filteredPosts", filteredPosts);
  // console.log("ZstTitles.favoriteTagMass", favoriteTagMass);
  return (
    <>
      {filteredPosts.length > 0 &&
        filteredPosts.map((post, index) => (
          <div key={post.id}>
            {isDispDetail ? (
              <ZstTitleAction
                zstPost={post}
                putZstPosts={putZstPosts}
                favoriteTagMass={favoriteTagMass}
                normalTagMass={normalTagMass}
              ></ZstTitleAction>
            ) : (
              <ZstTitle
                zstPost={post}
                isDispDetail={false}
                putZstPosts={putZstPosts}
                favoriteTagMass={favoriteTagMass}
                normalTagMass={normalTagMass}
              />
            )}
          </div>
        ))}
    </>
  );
};

export default ZstTitles;
