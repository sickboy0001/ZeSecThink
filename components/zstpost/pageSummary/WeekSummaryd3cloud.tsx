"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useContext, useEffect, useState } from "react";
import WordCloud from "react-d3-cloud";
import { GetDateTimeFormat } from "@/lib/utilsDate";
import { OUTPUTOVERCOUNTER } from "@/constants/d3Cloud";
import {
  getTokenAnalyseKeywordGoo,
  getTokenAnalyseTextGoo,
} from "@/app/actions/gooapi/gooApi";
import { TypeWordCount } from "@/app/types/wordCloud";
import LocalWordCloud from "@/components/localWordCloud/LocalWordCloud";

// Token型の定義

interface propType {
  data: TypeZstPost[];
}
const WeekSummaryd3cloud = (prop: propType) => {
  // const data = prop.data;
  const [d3data, setD3data] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // クライアントサイドでのマウント後にフラグをtrueに設定
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (prop.data.length == 0) {
        return;
      }
      // 効率的な文字列結合
      const text = prop.data.reduce(
        (acc, each) => acc + each.title + "\n" + each.content + "\n",
        ""
      );

      // const newDataD3data = await getTokenAnalyseKuromoji(text);
      // setD3data(newDataD3data);

      const newTextData = await getTokenAnalyseTextGoo(text);
      // setResult(JSON.stringify(newResult, null, 2));
      setD3data(newTextData);

      // const newKeywordData = await getTokenAnalyseKeywordGoo(text);
      // setD3data(newKeywordData);
    };
    fetch();
  }, [prop.data]);

  if (!isClient) {
    // サーバーサイドレンダリング中またはクライアントサイドでのマウント前はnullを返す
    return null;
  }

  return (
    <div className={`w-[500px] min-w-[380px] h-[500px] min-h-[380px]`}>
      <LocalWordCloud data={d3data} />
    </div>
  );
};

export default WeekSummaryd3cloud;
