"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GetDateTimeFormat } from "@/lib/utilsDate";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts";
import { Box } from "lucide-react";
import { Label } from "@radix-ui/react-label";
// import XAxis from "./XAxis";
// import CustomXAxis from "./CustomXAxis"; // カスタム XAxis をインポート
// import CustomYAxis from "./CustomYAxis"; // カスタム YAxis をインポート

// var kuromoji = require("kuromoji");

// Token型の定義

interface propType {
  toAt: Date;
  fromAt: Date;
  zstPosts: TypeZstPost[];
}

const CHART_HEIGHT = "250px";
const CHART_WIDTH = "250px";

const chartConfig = {
  length: {
    label: "length",
    color: "#2563eb",
  },
  avgChars: {
    label: "avgChars",
    color: "#34d399",
  },
  postcount: {
    label: "postcount",
    color: "#f87171",
  },
} satisfies ChartConfig;

function getRandomValue(avgSec: number, variance = 10) {
  // -varianceからvarianceまでのランダムな数を生成
  const randomOffset = Math.random() * 2 * variance - variance;
  // avgSecにランダムなオフセットを加算
  return avgSec + randomOffset;
}

const WeekSummaryDocument = (prop: propType) => {
  const { zstPosts, toAt, fromAt } = prop;
  const [postsCount, setPostsCount] = useState<number>(0);
  const [postsCountAvgDay, setPostsCountAvgDay] = useState<number>(0);
  const [charsCount, setCharsCount] = useState<number>(0);
  const [charsCountAvgPost, setCharsCountAvgPost] = useState<number>(0);
  const [secCount, setSecCount] = useState<number>(0);
  const [secCountAvgPost, setSecCountAvgPost] = useState<number>(0);

  useEffect(() => {
    const thisPostsCount = zstPosts.length;
    setPostsCount(thisPostsCount);
    setPostsCountAvgDay(thisPostsCount / 7);

    const thisCharsCount = zstPosts.reduce(
      (sum, value) => sum + value.content.length,
      0
    );
    setCharsCount(thisCharsCount);
    setCharsCountAvgPost(thisCharsCount / thisPostsCount);

    const thisSecCount = zstPosts.reduce((sum, value) => sum + value.second, 0);
    setSecCount(thisSecCount);
    setSecCountAvgPost(thisSecCount / thisPostsCount);
  }, [zstPosts]);

  return (
    <div>
      <div>
        <Label className="px-2 font-extrabold">Display:</Label>
        {GetDateTimeFormat(fromAt, "yyyy/MM/dd")} ～
        {GetDateTimeFormat(toAt, "yyyy/MM/dd")}
      </div>
      <div>
        <Label className="px-2 font-extrabold">Post:</Label>
        {postsCount}posts({postsCountAvgDay.toFixed(1)}posts/day)
        {/* ----ポスト数合計（１日の平均） */}
      </div>
      <div>
        <Label className="px-2 font-extrabold">Chars:</Label>
        {/* 12000chars(300chars/post)---- 文字数（１ポストの平均） */}
        {charsCount}chars({charsCountAvgPost.toFixed(1)}posts/post)
        {/* ----ポスト数合計（１日の平均） */}
      </div>
      <div>
        <Label className="px-2 font-extrabold">Sec:</Label>
        {secCount}sec({secCountAvgPost.toFixed(1)}posts/post)
        {/* ---- ----秒数（１ポストの平均） */}
      </div>
    </div>
  );
};

export default WeekSummaryDocument;
