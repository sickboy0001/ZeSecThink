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
        />
      </TableCell>
      <TableCell>登録済 </TableCell>
      <TableCell>{data.title}</TableCell>
      <TableCell>{format(new Date(), "yyyy-MM-dd HH:mm:ss")}</TableCell>
    </TableRow>
  );
};

export default ImportTableRow;
