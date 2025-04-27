"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useEffect, useState } from "react";
import ZstTitle from "./zstTitle";
import ZstTitleAction from "./zstTitleAction";
import { GetFormatTz } from "@/lib/utilsDate";

interface propTypes {
  date: Date;
  zstPosts: TypeZstPost[];
  isDispDetail?: boolean;
}

const ZstTitles = (props: propTypes) => {
  const { date, zstPosts, isDispDetail } = props;
  const [filteredPosts, setFilteredPosts] = useState<TypeZstPost[]>([]);

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
  return (
    <>
      {filteredPosts.length > 0 &&
        filteredPosts.map((post, index) => (
          <div key={index}>
            {isDispDetail ? (
              <ZstTitleAction zstPost={post}></ZstTitleAction>
            ) : (
              <ZstTitle zstPost={post} isDispDetail={false} />
            )}
          </div>
        ))}
    </>
  );
};

export default ZstTitles;
