"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useContext, useEffect, useState } from "react";
import { ListDataTable } from "./ListDataTable";
import { columns } from "./ListColumnDef";

interface propType {
  data: TypeZstPost[];
}
const ZstPageSummaryList = (prop: propType) => {
  const data = prop.data;

  return (
    <div>
      <div></div>
      <ListDataTable columns={columns} data={data} />
    </div>
  );
};

export default ZstPageSummaryList;
