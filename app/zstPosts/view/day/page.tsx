import React from "react";
import { getPosts, getPostsDummy } from "@/app/actions/zstPosts/posts";
import {
  GetDateFromyyyyMMdd,
  getJpTimeZoneFromUtc,
  GetyyyyMMddJpFromDate,
} from "@/lib/utilsDate";
import { addDays } from "date-fns";
import ZstPageViewDay from "@/components/zstpost/ZstPageViewDay";
import { getUtilUser } from "@/app/actions/user/utilUser";

export const dynamic = "force-dynamic";

interface propsType {
  searchParams:
    | {
        [key: string]: string | string[] | undefined | any;
      }
    | any;
}

const ViewDay = async ({ searchParams }: propsType) => {
  console.log(searchParams);

  // searchParams.basedateの取得
  let date = String(searchParams.date || "");
  const nowstring = GetyyyyMMddJpFromDate(new Date());
  if (!date) {
    date = nowstring;
  }
  // 文字列→Date型
  const basedate = GetDateFromyyyyMMdd(date);
  console.log(basedate);
  // const [nowUser, setNowUser] = useState<User | null>(null);
  const user = await getUtilUser();
  console.log("const ViewDay = async:", user);

  const zstPosts = await getPosts(user?.userid, basedate, basedate);

  return (
    <>
      <ZstPageViewDay
        className={""}
        date={basedate}
        zstPosts={zstPosts}
      ></ZstPageViewDay>
      <div>
        user.userid:{user?.id}:{user?.userid}:{user?.username}
      </div>
    </>
  );
};

export default ViewDay;
