"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { TypeImportTitle } from "@/app/types/title";

import ImportTableRow from "./ImportTableRow";

interface propsType {
  data: TypeImportTitle[];
}
const ImprotTable = (props: propsType) => {
  const { data } = props;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Insert</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">CreateAt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((each, key) => (
          <ImportTableRow data={each} key={key}></ImportTableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ImprotTable;
