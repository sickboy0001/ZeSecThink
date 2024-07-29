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
// var kuromoji = require("kuromoji");

// Token型の定義

interface propType {
  data: TypeZstPost[];
}

interface TypeContentLength {
  date: Date;
  avg_chars: number;
  postcount: number;
}

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

const WeekSummaryChart = (prop: propType) => {
  const data = prop.data;
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [averageContentLength, setAverageContentLength] = useState<
    { date: string; avg_chars: number; postcount: number }[]
  >([]);

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
        return { date, avg_chars, postcount };
      });

      const sortedAverages = averages.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      setAverageContentLength(sortedAverages);
      setEndTime(new Date());
    };
    fetch();
  }, [data]);
  const infostring =
    "[" +
    String((endTime.getTime() - startTime.getTime()) / 1000) +
    "sec]" +
    "start-end:" +
    GetDateTimeFormat(startTime, "HH:mm:ss") +
    " - " +
    GetDateTimeFormat(endTime, "HH:mm:ss");
  return (
    <div>
      {/* <div>{infostring}</div> */}

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart accessibilityLayer data={averageContentLength}>
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => GetDateTimeFormat(value, "MM-dd")}
          />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
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
            yAxisId="right"
            dataKey="postcount"
            type="monotone"
            dot={false}
            stroke="#f87171"
            activeDot={{ r: 8 }}
            isAnimationActive={false} // アニメーションを無効にする
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default WeekSummaryChart;
