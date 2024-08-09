import React, { useContext } from "react";
import { getPosts } from "@/app/actions/zstPosts/posts";
import { GetDateFromyyyyMMdd, GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import ZstPageViewDay from "@/components/zstpost/pagePosts/ZstPageViewDay";
import { getUtilUser } from "@/app/actions/user/utilUser";
import UserContext, { UserProvider } from "@/components/user/UserContext";
import { User } from "@/app/types/user";
import { getContextUserClient } from "@/components/user/UserContextClient";

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
  let date = String(searchParams.date || "");
  const nowstring = GetyyyyMMddJpFromDate(new Date());
  if (!date) {
    date = nowstring;
  }
  // 文字列→Date型
  const basedate = GetDateFromyyyyMMdd(date);
  console.log(basedate);
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
        date={basedate}
        // zstPosts={zstPosts}
      ></ZstPageViewDay>
    </>
  );
};

export default ViewDay;
