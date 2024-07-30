"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import { Pencil1Icon } from "@radix-ui/react-icons";
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
    // console.log("ZstTitles useEffect called");
    // console.log("date:", date);
    // console.log("zstPosts:", zstPosts.slice(0, 2));

    const thisfilteredPosts = zstPosts.filter(
      (f) =>
        GetFormatTz(f.current_at, "yyyy-MM-dd") ===
        GetFormatTz(date, "yyyy-MM-dd")
    );
    setFilteredPosts(thisfilteredPosts);
  }, [zstPosts, date]);

  if (filteredPosts.length === 0) {
    return <div>この日に投稿はありません。</div>;
  }
  // console.log("ZstTitles:", zstPosts[0].title);
  // console.log("ZstTitles:", filteredPosts[0].title);

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
