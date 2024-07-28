import React from "react";

import { getUtilUser } from "@/app/actions/user/utilUser";
import { UserProvider } from "@/components/user/UserContext";
import { User } from "@/app/types/user";
import ZstPageSummaryPageWeek from "@/components/zstpost/pageSummary/page";
const SummaryWeek = async () => {
  // console.log(searchParams);

  // searchParams.basedateの取得
  const user = await getUtilUser();

  return (
    <>
      <UserProvider user={user as User}>
        <ZstPageSummaryPageWeek></ZstPageSummaryPageWeek>
      </UserProvider>
    </>
  );
};

export default SummaryWeek;
