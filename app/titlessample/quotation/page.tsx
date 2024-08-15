"use server";
import React from "react";

import { getUtilUser } from "@/app/actions/user/utilUser";
import { UserProvider } from "@/components/user/UserContext";
import { User } from "@/app/types/user";
import PageQuotation from "@/components/zstpost/pageTitles/PageQuotation";
const Page = async () => {
  // console.log(searchParams);

  // searchParams.basedateの取得
  const user = await getUtilUser();

  return (
    <>
      <UserProvider user={user as User}>
        <PageQuotation></PageQuotation>
      </UserProvider>
    </>
  );
};

export default Page;
