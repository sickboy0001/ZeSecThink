import React from "react";
import { getPosts } from "@/app/actions/zstPosts/posts";
import { GetDateFromyyyyMMdd, GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import ZstPageViewDay from "@/components/zstpost/pagePosts/ZstPageViewDay";
import { getUtilUser } from "@/app/actions/user/utilUser";
import { UserProvider } from "@/components/user/UserContext";
import { User } from "@/app/types/user";

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
  const user = await getUtilUser();
  // console.log("const ViewDay = async:", user);
  const starttime = new Date();

  const zstPosts = await getPosts(user?.userid, basedate, basedate);

  const endtime = new Date();

  console.log(
    "const ViewDay getPostsTime msec :",
    endtime.getTime() - starttime.getTime()
  );

  return (
    <>
      <UserProvider user={user as User}>
        <ZstPageViewDay
          className={""}
          date={basedate}
          zstPosts={zstPosts}
        ></ZstPageViewDay>
      </UserProvider>
    </>
  );
};

export default ViewDay;
