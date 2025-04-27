"use client";
import React from "react";

import { getUtilUser } from "@/app/actions/user/utilUser";
import PageState from "@/components/tags/zst/PageState";
const Page = async () => {
  // console.log(searchParams);

  // searchParams.basedateの取得
  const user = await getUtilUser();

  return (
    <>
      <PageState></PageState>
    </>
  );
};

export default Page;
