"use client";
import Papa from "papaparse";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { TypeImportTitle } from "@/app/types/title";
import { Button } from "@/components/ui/button";
import ImportTable from "./ImportTable";
import {
  insertTitleSample,
  selectSampleTitle,
} from "@/app/actions/zstPosts/titleSample";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { format } from "date-fns";

const convert = async (data: string[]) => {
  for (const title of data) {
    await insertTitleSample({ title }); // title プロパティを持つオブジェクトを渡す
  }
};

const getDatabaseTitle = async (title: string) => {
  return await selectSampleTitle(title); // title プロパティを持つオブジェクトを渡す
};

const PageImport = () => {
  const [data, setData] = useState<TypeImportTitle[]>([]);
  const [log, setlog] = useState<string[]>([]);
  const [now, setNow] = useState<Date>(new Date());
  const [csvLines, setCsvLines] = useState<Papa.ParseResult<unknown> | null>(
    null
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    if (files.length == 0) return;

    setNow(new Date());
    const thislog = log;
    thislog.push(`csvread read:${format(now, "HH:mm:ss")}`);

    //CSVをパース
    Papa.parse(files[0], {
      complete: function (results) {
        // パースが完了したら、結果を表示する
        // console.log(results);
        setCsvLines(results);
      },
    });
    const endnow = new Date();
    thislog.push(
      `csvread read:${format(now, "HH:mm:ss")}-${format(
        endnow,
        "HH:mm:ss"
      )} - [${String((endnow.getTime() - now.getTime()) / 1000)} sec]`
    );

    setlog(thislog);
  };

  useEffect(() => {
    const fetch = async () => {
      if (!csvLines) return;

      const thislog = log;
      thislog.push(`csvread analyse:${format(now, "HH:mm:ss")}`);
      const thiszsttitles =
        csvLines?.data.map((each, key) => {
          const eachArray = each as string[]; // eachをstringの配列として扱う
          // console.log(each[0]);
          return {
            title: eachArray[0] as string,
            isConvert: true,
          } as TypeImportTitle;
        }) || [];
      for (const each of thiszsttitles) {
        const title = each.title;
        const thisTitle = await getDatabaseTitle(title);
        console.log("insertedzstttile", thisTitle);
        each.create_at = thisTitle ? thisTitle.create_at : "";
        each.isInserted = thisTitle.id ? true : false;
        each.isConvert = each.isInserted ? false : true;
      }
      const endnow = new Date();
      thislog.push(
        `csvread analyse:${format(now, "HH:mm:ss")}-${format(
          endnow,
          "HH:mm:ss"
        )} - [${String((endnow.getTime() - now.getTime()) / 1000)} sec]`
      );
      setlog(thislog);
      setData(thiszsttitles);
    };
    fetch();
  }, [csvLines]);

  const handleRegisterClick = () => {
    const thisdata = data.filter((each) => each.isConvert);
    setNow(new Date());
    const thislog = log;
    thislog.push(`handleRegisterClick:${format(now, "HH:mm:ss")}`);

    console.log("const handleRegisterClick:", thisdata);
    convert(thisdata.map((each) => each.title));
    const endnow = new Date();
    thislog.push(
      `handleRegisterClick:${format(now, "HH:mm:ss")}-${format(
        endnow,
        "HH:mm:ss"
      )} - [${String((endnow.getTime() - now.getTime()) / 1000)} sec]`
    );
    setlog(thislog);
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
        <Collapsible className="border border-black-700 py-2 px-2  rounded my-1">
          <CollapsibleTrigger className="font-extrabold">
            Log
          </CollapsibleTrigger>
          <CollapsibleContent>
            <pre>{log.join("\n")}</pre>
          </CollapsibleContent>
        </Collapsible>
      </div>
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
