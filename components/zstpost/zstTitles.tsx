"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
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
  const newdate = new Date();

  console.log("const ZstTitles", GetFormatTz(date, "yyyy-MM-dd"));
  const getDatePosts = () => {
    const res = zstPosts.filter(
      (f) =>
        GetFormatTz(f.current_at, "yyyy-MM-dd") ===
        GetFormatTz(date, "yyyy-MM-dd")
    );
    return res;
  };
  const filteredPosts = getDatePosts();

  return (
    <>
      {filteredPosts.length > 0 &&
        filteredPosts.map((zstPost, index) => (
          <div key={index}>
            {isDispDetail ? (
              <ZstTitleAction zstPost={zstPost}></ZstTitleAction>
            ) : (
              <ZstTitle zstPost={zstPost} isDispDetail={false} />
            )}
          </div>
        ))}
    </>
  );
};

export default ZstTitles;
