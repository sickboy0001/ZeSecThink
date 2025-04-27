"use client";
import React from "react";

import { GetDateFromyyyyMMdd, GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import { addDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { getUtilUser } from "@/app/actions/user/utilUser";
import PageZstViewGrid from "@/components/zstpost/Posts/PageZstViewGrid";

const generateDates = (today: Date, count: number) => {
  const dates = [];
  let thisday = addDays(today, -1);
  for (let i = 0; i < count; i++) {
    thisday = addDays(thisday, 1);
    thisday.setHours(0, 0, 0);
    dates.push(thisday);
  }
  return dates;
};

interface propsType {
  searchParams:
    | {
        [key: string]: string | string[] | undefined | any;
      }
    | any;
}

const TestPostsGrid = ({ searchParams }: propsType) => {
  // searchParams.basedateの取得
  let paramdate = String(searchParams.basedate || "");
  // console.log("paramdate", paramdate);

  let cols = parseInt(String(searchParams.cols || "")) || 1;
  let rows = parseInt(String(searchParams.rows || "")) || 3;

  // 今日の日付をyyyyMMdd形式で取得
  const nowstring = GetyyyyMMddJpFromDate(
    toZonedTime(new Date(), "Asia/Tokyo"),
  );

  // paramdateがundefinedまたはnullまたは空文字列の場合にnowstringを代入
  if (!paramdate) {
    paramdate = nowstring;
  }
  // console.log("paramdate", paramdate);

  const datecount = rows * cols;

  // 文字列→Date型
  const basedate = GetDateFromyyyyMMdd(paramdate);
  // console.log("basedate", basedate.toLocaleDateString());
  const generateDatesbase = addDays(basedate, -datecount + 2);
  // console.log("generateDatesbase", generateDatesbase.toLocaleDateString());

  const dates = generateDates(generateDatesbase, rows * cols);
  const from_at = generateDatesbase;
  const to_at = addDays(basedate, 2);

  // const user = await getUtilUser();
  // const zstPosts = await getPosts(user?.userid, from_at, to_at);

  return (
    <>
      <PageZstViewGrid
        rows={rows}
        cols={cols}
        basedate={basedate}
        dates={dates}
        // zstPosts={zstPosts}
        fromAt={from_at}
        toAt={to_at}
      ></PageZstViewGrid>
    </>
  );
};

export default TestPostsGrid;
