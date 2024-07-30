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
// import XAxis from "./XAxis";
// import CustomXAxis from "./CustomXAxis"; // カスタム XAxis をインポート
// import CustomYAxis from "./CustomYAxis"; // カスタム YAxis をインポート

// var kuromoji = require("kuromoji");

// Token型の定義

interface propType {
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

const WeekSummaryChart = (prop: propType) => {
  const data = prop.data;
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [averageContentLength, setAverageContentLength] = useState<
    { date: string; avg_chars: number; postcount: number }[]
  >([]);
  useEffect(() => {
    setStartTime(new Date());
  }, []);
  useEffect(() => {
    const fetch = async () => {
      if (data.length == 0) {
        return;
      }
      const result = data.map((each) => {
        return {
          date: GetDateTimeFormat(each.current_at),
          value: each.content.length,
        }; // 日付部分のみを抽出
      });
      // setContentLength(result);

      // 日付ごとにデータをグループ化
      const groupedByDate: { [key: string]: number[] } = result.reduce(
        (acc, curr) => {
          acc[curr.date] = acc[curr.date] || [];
          acc[curr.date].push(curr.value);
          return acc;
        },
        {} as { [key: string]: number[] }
      );

      // 各グループの平均値を計算
      const averages = Object.keys(groupedByDate).map((date) => {
        const values = groupedByDate[date];
        const avg_chars =
          values.reduce((sum, value) => sum + value, 0) / values.length;
        const postcount = values.reduce((sum, value) => sum + 1, 0);
        console.log(values);

        // Generate a random number between -variance and variance
        const privatePostCount = getRandomValue(5, 2);
        const avgSec = getRandomValue(120, 10);
        return { date, avg_chars, postcount, privatePostCount, avgSec };
      });

      const sortedAverages = averages.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      setAverageContentLength(sortedAverages);
      setEndTime(new Date());
      const infostring =
        "[" +
        String((endTime.getTime() - startTime.getTime()) / 1000) +
        "sec]" +
        "start-end:" +
        GetDateTimeFormat(startTime, "HH:mm:ss") +
        " - " +
        GetDateTimeFormat(endTime, "HH:mm:ss");

      console.log("WeekSummaryChart", infostring);
    };
    fetch();
  }, [data]);
  return (
    // <div style={{ width: "500px", height: "500px" }}>
    <div>
      {/* <div>{infostring}</div> */}

      <ChartContainer
        config={chartConfig}
        className={`h-[${CHART_HEIGHT}]  w-[${CHART_WIDTH}]`}
      >
        <LineChart accessibilityLayer data={averageContentLength}>
          {/* <CustomXAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => GetDateTimeFormat(value, "MM-dd")}
          />
          <CustomYAxis yAxisId="left" />
          <CustomYAxis yAxisId="left2" orientation="left" />
          <CustomYAxis yAxisId="left3" orientation="left" />
          <CustomYAxis yAxisId="left4" orientation="left" /> */}
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => GetDateTimeFormat(value, "MM-dd")}
          />
          <YAxis yAxisId="left" width={30} />
          <YAxis yAxisId="left2" width={30} orientation="left" />
          <YAxis yAxisId="left3" width={30} orientation="left" />
          <YAxis yAxisId="left4" width={30} orientation="left" />

          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            yAxisId="left"
            dataKey="avg_chars"
            dot={false}
            type="monotone"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            isAnimationActive={false} // アニメーションを無効にする
          />
          <Line
            yAxisId="left2"
            dataKey="postcount"
            type="monotone"
            dot={false}
            stroke="rgb(23, 190, 207)"
            activeDot={{ r: 8 }}
            isAnimationActive={false} // アニメーションを無効にする
          />
          <Line
            yAxisId="left3"
            dataKey="privatePostCount"
            type="monotone"
            dot={false}
            stroke="rgb(227, 119, 194)"
            activeDot={{ r: 8 }}
            isAnimationActive={false} // アニメーションを無効にする
          />
          <Line
            yAxisId="left4"
            dataKey="avgSec"
            type="monotone"
            dot={false}
            stroke="rgb(255, 127, 14)"
            activeDot={{ r: 8 }}
            isAnimationActive={false} // アニメーションを無効にする
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default WeekSummaryChart;
