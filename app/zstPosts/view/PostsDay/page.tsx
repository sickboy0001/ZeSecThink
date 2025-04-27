"use client";
import React from "react";
import { format, toZonedTime } from "date-fns-tz";
import PageZstViewDay from "@/components/zstpost/Posts/PageZstViewDay";

interface propsType {
  searchParams:
    | {
        [key: string]: string | string[] | undefined | any;
      }
    | any;
}

const TestPosts = ({ searchParams }: propsType) => {
  let datestring = String(searchParams.date || "");
  if (!datestring) {
    // date = nowstring;
    const now = toZonedTime(new Date(), "Asia/Tokyo"); // UTCを日本時間に変換
    const nowstring = format(now, "yyyyMMdd");
    datestring = nowstring;
  }

  return (
    <>
      <PageZstViewDay datestring={datestring} className={""}></PageZstViewDay>
    </>
  );
};

export default TestPosts;
