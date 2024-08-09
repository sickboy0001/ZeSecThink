"use server";

import React from "react";

import { getUtilUser } from "@/app/actions/user/utilUser";
import { UserProvider } from "@/components/user/UserContext";
import { User } from "@/app/types/user";
import ZstPageSummaryWeekPage from "@/components/zstpost/pageSummary/pageWeek";
import { GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import { subDays } from "date-fns";
interface propsType {
  searchParams:
    | {
        [key: string]: string | string[] | undefined | any;
      }
    | any;
}

const SummaryWeek = async ({ searchParams }: propsType) => {
  // console.log(searchParams);
  let date = String(searchParams.date || "");
  const nowstring = GetyyyyMMddJpFromDate(new Date());
  if (!date) {
    let nowDate = new Date();
    // console.log("ZstPageSummaryWeekPage:", nowDate);
    nowDate.setHours(0, 0, 0, 0);
    const newStartDate = subDays(nowDate, nowDate.getDay() + 7);
    date = GetyyyyMMddJpFromDate(newStartDate);
  }
  console.log("const SummaryWeek :", date);
  // searchParams.basedateの取得

  return (
    <>
      <ZstPageSummaryWeekPage datestring={date}></ZstPageSummaryWeekPage>
    </>
  );
};

export default SummaryWeek;
