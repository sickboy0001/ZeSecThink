"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { TypeImportTitle } from "@/app/types/title";

import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns/format";

interface propsType {
  data: TypeImportTitle;
}
const ImportTableRow = (props: propsType) => {
  const { data } = props;
  const [isChecked, setIsChecked] = useState(data.isConvert);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
    data.isConvert = checked;
  };
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          id="terms"
          checked={isChecked}
          defaultChecked={true}
          onCheckedChange={handleCheckboxChange}
          disabled={data.isInserted}
        />
      </TableCell>
      <TableCell>{data.isInserted ? "登録済" : ""} </TableCell>
      <TableCell>{data.title}</TableCell>
      <TableCell>
        {data.create_at ? format(data.create_at, "yyyy-MM-dd HH:mm:ss") : ""}
      </TableCell>
    </TableRow>
  );
};

export default ImportTableRow;
