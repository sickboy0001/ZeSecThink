import React, { useContext } from "react";
import PageZstViewDay from "@/components/zstpost/pagePosts/PageZstViewDay";
import { getUtilUser } from "@/app/actions/user/utilUser";
import UserContext, { UserProvider } from "@/components/user/UserContext";
import { User } from "@/app/types/user";
import { getContextUserClient } from "@/components/user/UserContextClient";
import { format, toZonedTime } from "date-fns-tz";

export const dynamic = "force-dynamic";

interface propsType {
  searchParams:
    | {
        [key: string]: string | string[] | undefined | any;
      }
    | any;
}

const ViewDay = async ({ searchParams }: propsType) => {
  let datestring = String(searchParams.date || "");
  if (!datestring) {
    // date = nowstring;
    const now = toZonedTime(new Date(), "Asia/Tokyo"); // UTCを日本時間に変換
    const nowstring = format(now, "yyyyMMdd");
    datestring = nowstring;
  }

  const starttime = new Date();
  const endtime = new Date();
  var dif = endtime.getTime() - starttime.getTime();

  return (
    <>
      <PageZstViewDay
        className={""}
        datestring={datestring}
        // zstPosts={zstPosts}
      ></PageZstViewDay>
    </>
  );
};

export default ViewDay;
