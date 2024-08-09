import React, { useContext } from "react";
import { getPosts } from "@/app/actions/zstPosts/posts";
import {
  GetDateFromyyyyMMdd,
  GetDateFromyyyyMMdd2,
  GetyyyyMMddJpFromDate,
} from "@/lib/utilsDate";
import ZstPageViewDay from "@/components/zstpost/pagePosts/ZstPageViewDay";
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
  // console.log(searchParams);

  // searchParams.basedateの取得
  let datestring = String(searchParams.date || "");
  console.log("const ViewDay datestring", datestring);

  // const now = toZonedTime(new Date(), "Asia/Tokyo"); // UTCを日本時間に変換
  // const nowstring = GetyyyyMMddJpFromDate(new Date());
  if (!datestring) {
    // date = nowstring;
    const nowstring = format(new Date(), "yyyyMMdd");
    console.log("const ViewDay nowstring", nowstring);
    datestring = nowstring;
  }
  // 文字列→Date型
  // const basedate = GetDateFromyyyyMMdd(datestring);
  // console.log("const ViewDay basedate", basedate);
  // const [nowUser, setNowUser] = useState<User | null>(null);
  // const user = await getUtilUser();
  // const user = useContext(UserContext);
  // const user = await getContextUserClient();
  // console.log("const ViewDay = async:", user);

  const starttime = new Date();
  // const zstPosts = await getPosts(user?.userid, basedate, basedate);
  const endtime = new Date();
  var dif = endtime.getTime() - starttime.getTime();

  console.log("getPostsTime msec :", dif);

  return (
    <>
      <ZstPageViewDay
        className={""}
        datestring={datestring}
        // zstPosts={zstPosts}
      ></ZstPageViewDay>
    </>
  );
};

export default ViewDay;
