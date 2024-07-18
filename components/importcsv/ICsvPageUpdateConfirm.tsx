"use client";
import Papa from "papaparse";
import { ChangeEvent, useMemo, useState } from "react";
import ICsvRawTable from "./ICsvRawTable";
import { Column } from "./TypeTable";
import ICsvFormatTable from "./ICsvFormatTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function ICsvPageUpdateConfirm() {
  //CSVから読み込んだデータ
  const [csvData, setCsvData] = useState<Papa.ParseResult<unknown> | null>(
    null
  );

  //CSVの１行目をヘッダ行とするか
  //   const [headerFirst, setHeaderFirst] = useState<boolean>(true);

  const headerFirst = true;
  //ファイルを選択
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    if (files.length == 0) return;

    //CSVをパース
    Papa.parse(files[0], {
      complete: function (results) {
        // パースが完了したら、結果を表示する
        console.log(results);
        setCsvData(results);
      },
    });
  };

  //テーブルに表示する列の定義（CSVの１行目から作成）
  const columns = useMemo(() => {
    if (csvData == null || csvData.data.length == 0) {
      return [{ Header: "No Data" }];
    }
    //１行目のデータで列の定義を作成
    const row = csvData.data[0] as Array<any>;
    return row.map((cellData, columnIndex) => {
      return {
        Header: headerFirst ? cellData : `Column${columnIndex + 1}`,
        accessor: (row: any, i: number) => row[columnIndex],
      };
    });
  }, [csvData, headerFirst]);

  return (
    <div>
      <div>
        <input type="file" onChange={handleChange} />
      </div>

      <Tabs defaultValue="FormatTable">
        <TabsList>
          <TabsTrigger value="RawTable">RawTable</TabsTrigger>
          <TabsTrigger value="FormatTable">FormatTable</TabsTrigger>
        </TabsList>
        <TabsContent value="RawTable">
          <ICsvRawTable
            columns={columns as Column[]}
            data={csvData?.data.slice(headerFirst ? 1 : 0) ?? []}
          />
        </TabsContent>
        <TabsContent value="FormatTable">
          <ICsvFormatTable
            columns={columns as Column[]}
            data={csvData?.data.slice(headerFirst ? 1 : 0) ?? []}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ICsvPageUpdateConfirm;
