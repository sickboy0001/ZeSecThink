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
import {
  Bar,
  BarChart,
  ComposedChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Box } from "lucide-react";
import {
  GetWeekChartSummary,
  TypeDayChartSummary,
} from "@/service/zstPost/Summary";
import CustomYAxis from "./CustomYAxis";
import CustomXAxis from "./CustomXAxis";
// import XAxis from "./XAxis";
// import CustomXAxis from "./CustomXAxis"; // カスタム XAxis をインポート
// import CustomYAxis from "./CustomYAxis"; // カスタム YAxis をインポート

// var kuromoji = require("kuromoji");

// Token型の定義

interface TypeContentLength {
  date: Date;
  avgchars: number;
  avgSec: number;
  postcount: number;
  privatePostCount: number;
}

const CHART_HEIGHT = "250px";
const CHART_WIDTH = "350px";

const chartConfig = {
  // length: {
  //   label: "length",
  //   color: "#2563eb",
  // },
  // avg_chars: {
  //   label: "avg_chars",
  //   color: "#34d399",
  // },
  // postcount: {
  //   label: "postcount",
  //   color: "#f87171",
  // },
} satisfies ChartConfig;

interface propType {
  dayChartSummarys: TypeDayChartSummary[];
  // data: TypeZstPost[];
}

function getRandomValue(avgSec: number, variance = 10) {
  // -varianceからvarianceまでのランダムな数を生成
  const randomOffset = Math.random() * 2 * variance - variance;
  // avgSecにランダムなオフセットを加算
  return avgSec + randomOffset;
}

const renderCustomBarShape = (props: any) => {
  const { x, y, width, height, stroke, fill } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="none"
      stroke={stroke}
      strokeWidth={1}
    />
  );
};

const renderCustomBarShape2 = (props: any) => {
  const { x, y, width, height, stroke, fill } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="rgb(227, 119, 194)"
      stroke={stroke}
      strokeWidth={1}
    />
  );
};

const WeekSummaryChart = (prop: propType) => {
  const { dayChartSummarys } = prop;

  return (
    <div>
      <ChartContainer
        config={chartConfig}
        style={{ height: CHART_HEIGHT, width: CHART_WIDTH }}
      >
        <ComposedChart accessibilityLayer data={dayChartSummarys}>
          <CustomXAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => GetDateTimeFormat(value, "MM-dd")}
          />
          <CustomYAxis yAxisId="left" width={30} />
          <CustomYAxis yAxisId="postCountLeft" width={30} orientation="left" />
          <CustomYAxis yAxisId="left4" width={30} orientation="left" />

          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            yAxisId="postCountLeft"
            dataKey="privatePostCount"
            stackId="postscount"
            type="monotone"
            fill="none"
            shape={renderCustomBarShape2}
            isAnimationActive={false}
          />
          <Bar
            yAxisId="postCountLeft"
            dataKey="publicPostCount"
            stackId="postscount"
            type="monotone"
            fill="none"
            stroke="rgb(23, 190, 207)"
            shape={renderCustomBarShape}
            isAnimationActive={false}
          />
          <Line
            yAxisId="left"
            dataKey="avgchars"
            dot={false}
            type="monotone"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Line
            yAxisId="left4"
            dataKey="avgSec"
            type="monotone"
            dot={false}
            stroke="rgb(255, 127, 14)"
            activeDot={{ r: 8 }}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
};

export default WeekSummaryChart;
