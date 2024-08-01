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
// var kuromoji = require("kuromoji");

// Token型の定義

interface propType {
  data: TypeZstPost[];
}

interface TypeContentLength {
  date: Date;
  avgChars: number;
  postcount: number;
}

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

const ScoreChart = (prop: propType) => {
  const data = prop.data;
  const analysedata = data;
  const [contentLength, setContentLength] = useState<TypeContentLength[]>([]);
  const [averageContentLength, setAverageContentLength] = useState<
    { date: string; avgChars: number; postcount: number }[]
  >([]);

  async function analyse(event: any) {
    event.preventDefault(); // デフォルトのフォーム送信を阻止

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
      const avgChars =
        values.reduce((sum, value) => sum + value, 0) / values.length;
      const postcount = values.reduce((sum, value) => sum + 1, 0);
      return { date, avgChars, postcount };
    });

    const sortedAverages = averages.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    setAverageContentLength(sortedAverages);
  }

  return (
    <div>
      <div className="App">
        <div className="card p-2 align-items-center">
          <form onSubmit={analyse}>
            <div className="flex w-full">
              <Button type="submit" className="btn btn-primary">
                Analyze
              </Button>
            </div>
          </form>
        </div>
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
              dataKey="avgChars"
              dot={false}
              type="monotone"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              dataKey="postcount"
              type="monotone"
              dot={false}
              stroke="#f87171"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default ScoreChart;
