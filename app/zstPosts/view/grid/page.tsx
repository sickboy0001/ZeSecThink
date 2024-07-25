import React from "react";
import { getPosts, getPostsDummy } from "@/app/actions/zstPosts/posts";
import ZstPageViewGrid from "@/components/zstpost/zstPageViewGrid";
import { GetDateFromyyyyMMdd, GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import { addDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { UserProvider } from "@/components/user/UserContext";
import { getUtilUser } from "@/app/actions/user/utilUser";
import { User } from "@/app/types/user";

export const dynamic = "force-dynamic";

const generateDates = (today: Date, count: number) => {
  const dates = [];
  let thisday = addDays(today, -1);
  for (let i = 0; i < count; i++) {
    thisday = addDays(thisday, 1);
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

const ViewGrid = async ({ searchParams }: propsType) => {
  // console.log(searchParams);

  // searchParams.basedateの取得
  let paramdate = String(searchParams.basedate || "");
  // console.log("paramdate", paramdate);

  let cols = parseInt(String(searchParams.cols || ""));
  if (!cols) {
    cols = 4;
  }
  let rows = parseInt(String(searchParams.rows || ""));
  if (!rows) {
    rows = 3;
  }

  // 今日の日付をyyyyMMdd形式で取得
  const nowstring = GetyyyyMMddJpFromDate(
    toZonedTime(new Date(), "Asia/Tokyo")
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
  // const zstPosts = await getPostsDummy();

  // console.log("ViewGrid", from_at, to_at);

  // const nowdate = new Date();
  // console.log("nowdate", nowdate.toLocaleDateString());
  // const nowdate2 = addDays(basedate, -20);
  // console.log("nowdate2", nowdate2.toLocaleDateString());
  // console.log(String(dates));
  const user = await getUtilUser();
  // console.log(UserContext);

  const from_at = generateDatesbase;
  const to_at = addDays(basedate, 2);
  const zstPosts = await getPosts(user?.userid, from_at, to_at);

  return (
    <>
      <UserProvider user={user as User}>
        <ZstPageViewGrid
          rows={rows}
          cols={cols}
          basedate={basedate}
          dates={dates}
          zstPosts={zstPosts}
        ></ZstPageViewGrid>
      </UserProvider>
    </>
  );
};

export default ViewGrid;
