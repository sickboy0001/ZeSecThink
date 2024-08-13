"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data } from "autoprefixer";
import Papa from "papaparse";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { columns } from "./ListColumnDef";
import { ListDataTable } from "./ListDataTable";
import { columnsImport } from "./ListColumnImport";
import { TypeImportTitle } from "@/app/types/title";
import { Button } from "@/components/ui/button";

const PageImport = () => {
  const [data, setData] = useState<TypeImportTitle[]>([]);
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
            isSelected: false, // 初期状態は未選択
          } as TypeImportTitle;
        }) || [];
      setData(thiszsttitles);
    };
    fetch();
  }, [csvLines]);

  const handleRegisterClick = () => {
    // ここに処理を追加します
    console.log("登録ボタンがクリックされました");
    // 他の処理（例: フォームデータの送信や状態の更新など）
    const selectedData = data.filter((item) => item.isSelected);
    console.log("登録するデータ:", selectedData);
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
          <ListDataTable columns={columnsImport} data={data} />
        ) : null}
      </div>
    </div>
  );
};

export default PageImport;
