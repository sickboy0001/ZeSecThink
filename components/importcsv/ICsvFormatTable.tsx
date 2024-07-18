import React, { useRef } from "react";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Column, TableProp } from "./TypeTable";
import { ImportOrderContent } from "@/constants/importData";

function ICsvFormatTable({ columns, data }: TableProp) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {ImportOrderContent.map((cellrule, key) => (
              <TableHead key={key}>{cellrule[0]}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((datarow) => (
            <TableRow>
              {ImportOrderContent.map((cellrule, key) => (
                <TableCell key={key}>
                  <div className="whitespace-pre-wrap">
                    {datarow[cellrule[1]]}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ICsvFormatTable;
