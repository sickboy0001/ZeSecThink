"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useContext, useEffect, useState } from "react";
import { ListDataTable } from "./ListDataTable";
import { columns } from "./ListColumnDef";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypeToken } from "@/app/types/kuromoji";
import { getTokens, getTokensAnalyse } from "@/lib/token";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import WordCloud from "react-d3-cloud";
import { TypeWordCount } from "@/app/types/wordCloud";
// var kuromoji = require("kuromoji");

// Token型の定義

interface propType {
  data: TypeZstPost[];
}

const fontSizeMapper = (word: TypeWordCount) => Math.pow(word.value, 0.8) * 10;
const fontFamily = "meiryo";

const PostsWakatigaki = (prop: propType) => {
  const data = prop.data;

  const [userInputText, setUserInputText] = useState("");
  const [tokens, setTokens] = useState<TypeToken[]>([]);
  const [wordCount, setWordCount] = useState<TypeWordCount[]>([]);
  const [d3data, setD3data] = useState<any[]>([]);
  const analysedata = data;

  async function analyse(event: any) {
    event.preventDefault(); // デフォルトのフォーム送信を阻止

    const text = analysedata
      .map((each) => {
        return each.title + "\n" + each.content;
      })
      .join("\n");
    // kuromojiを使ってテキストをトークナイズ;
    setUserInputText(text); // 入力されたテキストをステートにセット
    const path = await getTokens(text);
    const result = getTokensAnalyse(path);

    const formattedResult = result.map(([surface_form, count]) => ({
      text: surface_form,
      value: count,
    }));
    setWordCount(formattedResult); // トークナイズ結果をステートにセット

    const d3data = result.map(([surface_form, count]) => ({
      text: surface_form,
      value: count,
    }));
    // console.log(result.slice(0, 10));
    setD3data(d3data);
  }

  return (
    <div>
      <div className="App">
        <div className="card p-2 align-items-center">
          <form onSubmit={analyse}>
            <div className="flex">
              <Button type="submit" className="btn btn-primary">
                Analyze
              </Button>
            </div>
          </form>
          <div>
            {" "}
            バイト数 = {new TextEncoder().encode(userInputText).length}
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                対象文書----{userInputText.slice(1, 20)}
              </AccordionTrigger>
              <AccordionContent>
                <div>{userInputText}</div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                統計----分析対象ポスト数＝{data.length}
              </AccordionTrigger>
              <AccordionContent>
                {/* トークンの情報を表形式で表示 */}
                <table>
                  <thead>
                    <tr>
                      <th>文字列</th>
                      <th>回数</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wordCount.map((each, index) => (
                      <tr key={index}>
                        <td>{each.text}</td>
                        <td>{each.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>一覧</AccordionTrigger>
              <AccordionContent>
                <ListDataTable columns={columns} data={analysedata} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <WordCloud
          data={d3data}
          fontSize={fontSizeMapper}
          // rotate={rotate}
          font={fontFamily}
        />
      </div>
    </div>
  );
};

export default PostsWakatigaki;
