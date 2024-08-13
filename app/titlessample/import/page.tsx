"use server";
import React from "react";

import { getUtilUser } from "@/app/actions/user/utilUser";
import { UserProvider } from "@/components/user/UserContext";
import { User } from "@/app/types/user";
import PageImport from "@/components/zstpost/pageTitles/PageImport";
const Page = async () => {
  // console.log(searchParams);

  // searchParams.basedateの取得
  const user = await getUtilUser();

  return (
    <>
      <UserProvider user={user as User}>
        <PageImport></PageImport>
      </UserProvider>
    </>
  );
};

export default Page;
