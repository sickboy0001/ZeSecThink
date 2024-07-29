import React from "react";

import { getUtilUser } from "@/app/actions/user/utilUser";
import { UserProvider } from "@/components/user/UserContext";
import { User } from "@/app/types/user";
import ZstPageSummaryWeekPage from "@/components/zstpost/pageSummary/pageWeek";
const SummaryWeek = async () => {
  // console.log(searchParams);

  // searchParams.basedateの取得
  const user = await getUtilUser();

  return (
    <>
      <UserProvider user={user as User}>
        <ZstPageSummaryWeekPage></ZstPageSummaryWeekPage>
      </UserProvider>
    </>
  );
};

export default SummaryWeek;
