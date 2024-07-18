import { FolderSearch } from "lucide-react";
import React, { useRef } from "react";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { TableProp } from "./TypeTable";

function ICsvRawTable({ columns, data }: TableProp) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((field, key) => (
              <TableHead key={key}>{field.Header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((datarow) => (
            <TableRow>
              {datarow.map((element: any) => (
                <TableCell key={element}>
                  <div className="whitespace-pre-wrap">{element}</div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ICsvRawTable;
