"use server";
import React, { StrictMode } from "react";

import { getUtilUser } from "@/app/actions/user/utilUser";
import PageTagSummary from "@/components/tags/zst/PageTagSummary";
const Page = async () => {
  // console.log(searchParams);

  // searchParams.basedateの取得
  return (
    <>
      <StrictMode>
        <PageTagSummary></PageTagSummary>
      </StrictMode>
    </>
  );
};

export default Page;
