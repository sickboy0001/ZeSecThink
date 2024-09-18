import React from "react";

import { getUtilUser } from "@/app/actions/user/utilUser";
import { UserProvider } from "@/components/user/UserContext";
import { User } from "@/app/types/user";
import PageUserSampleTitle from "@/components/zstpost/UsetTItle/PageUserSampleTitle";
const SummaryDay = async () => {
  // console.log(searchParams);

  // searchParams.basedateの取得
  const user = await getUtilUser();

  return (
    <>
      <UserProvider user={user as User}>
        <PageUserSampleTitle></PageUserSampleTitle>
      </UserProvider>
    </>
  );
};

export default SummaryDay;
