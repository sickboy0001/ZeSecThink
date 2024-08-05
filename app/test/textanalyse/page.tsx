import React from "react";

import { getUtilUser } from "@/app/actions/user/utilUser";
import { UserProvider } from "@/components/user/UserContext";
import { User } from "@/app/types/user";
import ZstPageSummaryWeekPage from "@/components/zstpost/pageSummary/pageWeek";
import { GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import { subDays } from "date-fns";
import TextAnalysePage from "@/components/textAnalyse/textAnalysePage";
interface propsType {
  searchParams:
    | {
        [key: string]: string | string[] | undefined | any;
      }
    | any;
}

const TextAnalyse = async ({ searchParams }: propsType) => {
  const user = await getUtilUser();

  return (
    <>
      <UserProvider user={user as User}>
        <TextAnalysePage></TextAnalysePage>
      </UserProvider>
    </>
  );
};

export default TextAnalyse;
