"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useContext, useEffect, useState } from "react";
// import { ListDataTable } from "./ListDataTable";
// import { columns } from "./ListColumnDef";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { TypeToken } from "@/app/types/kuromoji";
import { getTokens, getTokensAnalyse } from "@/lib/token";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import WordCloud from "react-d3-cloud";
// import { data } from "autoprefixer";
import { GetDateTimeFormat } from "@/lib/utilsDate";
// import dynamic from "next/dynamic";
// const WordCloud = dynamic(() => import("react-d3-cloud"), { ssr: false });
// var kuromoji = require("kuromoji");

// Token型の定義

const OUTPUTOVERCOUNTER = 1;

interface TypeWordCount {
  surface_form: string;
  count: number;
}
interface propType {
  data: TypeZstPost[];
}

interface TypeWord {
  text: string;
  value: number;
}

const fontSizeMapper = (word: TypeWord) => Math.pow(word.value, 0.8) * 10;
const fontFamily = "meiryo";
const size = {
  height: 490,
  widht: 600,
};

const WeekSummaryd3cloud = (prop: propType) => {
  // const data = prop.data;
  const [d3data, setD3data] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    //   setStartTime(new Date());
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

      // kuromojiを使ってテキストをトークナイズ;
      const path = await getTokens(text);
      const result = getTokensAnalyse(path);

      const d3data = result
        .filter(([surface_form, count]) => count > OUTPUTOVERCOUNTER)
        .map(([surface_form, count]) => ({
          text: surface_form,
          value: count,
        }));
      // console.log(result.slice(0, 10));
      setD3data(d3data);
      setEndTime(new Date());
    };
    fetch();
  }, [prop.data]);

  async function analyse(event: any) {
    event.preventDefault(); // デフォルトのフォーム送信を阻止
  }
  const infostring =
    "[" +
    String(
      endTime && startTime
        ? (endTime.getTime() - startTime.getTime()) / 1000
        : 0
    ) +
    "sec]" +
    "start-end:" +
    (startTime ? GetDateTimeFormat(startTime, "HH:mm:ss") : "") +
    " - " +
    (endTime ? GetDateTimeFormat(endTime, "HH:mm:ss") : "");
  console.log("WeekSummaryd3cloud", infostring);
  return (
    <div className={`w-[500px] min-w-[380px] h-[500px] min-h-[380px]`}>
      {isClient && (
        <WordCloud data={d3data} fontSize={fontSizeMapper} font={fontFamily} />
      )}
    </div>
  );
};

export default WeekSummaryd3cloud;
