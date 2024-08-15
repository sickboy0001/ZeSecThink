"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data } from "autoprefixer";
import Papa from "papaparse";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { columns } from "./ListColumnDef";
import { ListDataTable } from "./ListDataTable";
import { TypeImportTitle } from "@/app/types/title";
import { Button } from "@/components/ui/button";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns/format";
import ImportTable from "./ImportTable";

const PageImport = () => {
  const [data, setData] = useState<TypeImportTitle[]>([]);
  const [selectedItems, setSelectedItems] = useState<TypeImportTitle[]>([]);
  const [csvLines, setCsvLines] = useState<Papa.ParseResult<unknown> | null>(
    null
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    if (files.length == 0) return;

    //CSVをパース
    Papa.parse(files[0], {
      complete: function (results) {
        // パースが完了したら、結果を表示する
        console.log(results);
        setCsvLines(results);
      },
    });
  };

  useEffect(() => {
    const fetch = async () => {
      const thiszsttitles =
        csvLines?.data.map((each, key) => {
          const eachArray = each as string[]; // eachをstringの配列として扱う
          // console.log(each[0]);
          return {
            title: eachArray[0] as string,
            isConvert: true,
          } as TypeImportTitle;
        }) || [];
      setData(thiszsttitles);
    };
    fetch();
  }, [csvLines]);

  const handleRegisterClick = () => {
    const thisdata = data.filter((each) => each.isConvert);
    console.log("const handleRegisterClick:", thisdata);
  };

  return (
    <div>
      <div>ImportPage</div>
      <div>
        fileinput
        <div>
          <input type="file" onChange={handleChange} />
        </div>
      </div>

      <div>touroku</div>
      <Button className="w-full" onClick={handleRegisterClick}>
        登録
      </Button>
      <div>
        list
        {data.length > 0 ? (
          <>
            <ImportTable data={data}></ImportTable>
            {/* <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Convert</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>CreateAt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((each, key) => (
                  <TableRow key={key}>
                    <TableCell>
                      <Checkbox id="terms" />
                    </TableCell>
                    <TableCell>登録済 </TableCell>
                    <TableCell>{each.title}</TableCell>
                    <TableCell>
                      {format(new Date(), "yyyy-MM-dd HH:mm:ss")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> */}
          </>
        ) : // <ListDataTable columns={columnsImport} data={data} />
        null}
      </div>
    </div>
  );
};

export default PageImport;
