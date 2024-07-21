"use client";
import Papa from "papaparse";
import {
  ChangeEvent,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ICsvRawTable from "./ICsvRawTable";
import { Column } from "./TypeTable";
import ICsvFormatTable from "./ICsvFormatTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ICsvConverter from "./ICsvConverter";
import { getUtilUser } from "@/app/actions/user/utilUser";
import { User } from "@/app/types/user";
import UserContext from "../user/UserContext";

function ICsvPageUpdateConfirm() {
  //CSVから読み込んだデータ
  const [csvData, setCsvData] = useState<Papa.ParseResult<unknown> | null>(
    null
  );

  const [nowUser, setNowUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUtilUser();
      setNowUser(user);
    };
    fetchUser();
  }, []);

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
    <UserContext.Provider value={nowUser}>
      <div>
        <div>
          <input type="file" onChange={handleChange} />
        </div>

        <Tabs defaultValue="FormatTable">
          <TabsList>
            <TabsTrigger value="RawTable">RawTable</TabsTrigger>
            <TabsTrigger value="FormatTable">FormatTable</TabsTrigger>
            <TabsTrigger value="Converter">Converter</TabsTrigger>
          </TabsList>
          <TabsContent value="RawTable">
            <ICsvRawTable
              columns={columns as Column[]}
              data={csvData?.data.slice(1) ?? []}
            />
          </TabsContent>
          <TabsContent value="FormatTable">
            <ICsvFormatTable
              columns={columns as Column[]}
              data={csvData?.data.slice(1) ?? []}
            />
          </TabsContent>
          <TabsContent value="Converter">
            <ICsvConverter
              columns={columns as Column[]}
              data={csvData?.data.slice(1) ?? []}
            />
          </TabsContent>
        </Tabs>
      </div>
    </UserContext.Provider>
  );
}

export default ICsvPageUpdateConfirm;
