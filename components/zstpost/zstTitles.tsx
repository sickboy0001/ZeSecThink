"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
import ZstTitle from "./zstTitle";
import ZstTitleAction from "./zstTitleAction";

interface propTypes {
  date: Date;
  zstPosts: TypeZstPost[];
  isDispDetail?: boolean;
}

const ZstTitles = (props: propTypes) => {
  const { date, zstPosts, isDispDetail } = props;
  const newdate = new Date();
  const filteredPosts = zstPosts.filter(
    (f) => f.current_at.toDateString() === date.toDateString()
  );
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
