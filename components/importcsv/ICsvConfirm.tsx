"use client";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface propType {
  onSubmit: () => void;
  rawcsv: string;
}

// type ParsedData = {
//   // プロパティとその型をここで定義します
//   // 例：
//   column1: string;
//   column2: number;
//   // ... その他の列
// };

const ICsvConfirm = ({ rawcsv, onSubmit }: propType) => {
  const [propsstring, setPropsstring] = useState("");
  const [jsondata, setJsondata] = useState<Papa.ParseResult<any> | null>(null);

  useEffect(() => {
    const data = Papa.parse(rawcsv, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });
    const data2 = JSON.stringify({ data }, null, 2);
    setJsondata(data);
    setPropsstring(data2);
  }, []); // Empty dependency array ensures the effect runs only once

  // const propsstring = JSON.stringify({ results }, null, 2);

  return (
    <>
      <div>ICsvPageInputText</div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {/* jsondata が定義されていて meta プロパティを持っているかどうかを確認する */}
            {jsondata && jsondata.meta && (
              <>
                {/* meta.fields が定義されているかどうかを確認してからマッピングする */}
                {jsondata.meta.fields &&
                  jsondata.meta.fields.map((field) => (
                    <TableHead key={field}>{field}</TableHead>
                  ))}
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {jsondata && jsondata.data && (
            <>
              {jsondata.data.map((datarow) => (
                <TableRow>
                  {jsondata && jsondata.meta && jsondata.meta.fields && (
                    <>
                      {jsondata.meta.fields.map((field) => {
                        const cellValue = datarow[field];
                        // 未定義/null 値をチェック
                        if (cellValue === undefined || cellValue === null) {
                          return <TableCell key={field}>-</TableCell>; // デフォルト値
                        }

                        // cellValue の型に基づいてレンダリング
                        if (typeof cellValue === "string") {
                          return <TableCell key={field}>{cellValue}</TableCell>;
                        } else if (typeof cellValue === "number") {
                          return (
                            <TableCell key={field}>
                              {cellValue.toFixed(2)}
                            </TableCell>
                          ); // 数値をフォーマット
                        } else {
                          // その他のデータ型は必要に応じて処理
                          return <TableCell key={field}>{cellValue}</TableCell>;
                        }
                      })}
                    </>
                  )}
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
      <form onSubmit={onSubmit} className="space-y-8"></form>
      <pre>{propsstring}</pre>
    </>
  );
};

export default ICsvConfirm;

// {
//   "data": {
//     "data": [
//       {
//         "タイトル": "邦楽見直し中",
//         "秒": null,
//         "日付": "2024年7月15日",
//         "メモ": "ラーメン屋のせいで遠い世界と思ってた邦楽ハマってみる\nまあ、悪くはないし納得する\nいつまで続くかは不明だけどこういう時間の過ごし方も悪くない\n地位交換あった一人カラオケ趣味になるも一つのゴールだと思ってる",
//         "タグ": null
//       },
//       {
//         "タイトル": "音の力",
//         "秒": null,
//         "日付": "2024年7月15日",
//         "メモ": "音は味に勝てるか、勝手に戦ってる感はある\nでもテンション上がる。変わらずの店なのはありがたい\n強い思いがあるのかたまたま同じ世代なのか。悩ましい\nコラボするか前面に出したらいいのに。全店でやってるかは不明〜",
//         "タグ": null
//       },
//       {
//         "タイトル": "詩",
//         "秒": null,
//         "日付": "2024年7月15日",
//         "メモ": "いい曲は久しぶり聴いてもいい\nミスチルが久しぶりに聴いてハマりすぎた\nこれをかけてるラーメン屋…ありがたすぎる。最近方向性暴走してるイメジあったけど…\nタイミングあればミスチル聞こうと思う",
//         "タグ": null
//       }
//     ],
//     "errors": [],
//     "meta": {
//       "delimiter": ",",
//       "linebreak": "\n",
//       "aborted": false,
//       "truncated": false,
//       "cursor": 375,
//       "fields": [
//         "タイトル",
//         "秒",
//         "日付",
//         "メモ",
//         "タグ"
//       ]
//     }
//   }
// }
