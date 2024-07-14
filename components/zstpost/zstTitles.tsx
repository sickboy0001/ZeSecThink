"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
import ZstTitle from "./zstTitle";

interface propTypes {
  date: Date;
  zstPosts: TypeZstPost[];
}

const ZstTitles = (props: propTypes) => {
  const { date, zstPosts } = props;
  const newdate = new Date();
  // console.log("ZstTitles", newdate.toDateString());
  console.log("ZstTitles:zstPosts:", zstPosts);
  const filteredPosts = zstPosts.filter(
    (f) => f.current_at.toDateString() === date.toDateString()
  );
  return (
    <>
      {filteredPosts.length > 0 && (
        <div>
          {filteredPosts.map((zstPost, key) => (
            <ZstTitle zstPost={zstPost} key={key}></ZstTitle>
          ))}
        </div>
      )}
    </>
  );
};

export default ZstTitles;
