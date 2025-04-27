"use server";
import React from "react";
import PageTagSummary from "@/components/tags/zst/PageTagSummary";

const Page = async ({ params }: { params: { id: string } }) => {
  // console.log(searchParams);

  return (
    <>
      <PageTagSummary></PageTagSummary>
    </>
  );
};

export default Page;
