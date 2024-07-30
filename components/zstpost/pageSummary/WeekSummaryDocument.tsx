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
  data: TypeZstPost[];
}

interface TypeContentLength {
  date: Date;
  avg_chars: number;
  avgSec: number;
  postcount: number;
  privatePostCount: number;
}

const CHART_HEIGHT = "250px";
const CHART_WIDTH = "250px";

const chartConfig = {
  length: {
    label: "length",
    color: "#2563eb",
  },
  avg_chars: {
    label: "avg_chars",
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
  const { data, toAt, fromAt } = prop;
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [averageContentLength, setAverageContentLength] = useState<
    { date: string; avg_chars: number; postcount: number }[]
  >([]);
  return (
    <div>
      <div>
        <Label className="px-2 font-extrabold">Display:</Label>
        {GetDateTimeFormat(fromAt, "yyyy/MM/dd")} ～
        {GetDateTimeFormat(toAt, "yyyy/MM/dd")}
      </div>
      <div>
        <Label className="px-2 font-extrabold">Post:</Label>
        75(10/day)
      </div>
      <div>
        <Label className="px-2 font-extrabold">Chars:</Label>
        12000(300/post)
      </div>
      <div>
        <Label className="px-2 font-extrabold">Sec:</Label>
        13000(120sec/post)
      </div>
    </div>
  );
};

export default WeekSummaryDocument;
