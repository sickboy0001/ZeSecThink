"use client";
import React, { useContext, useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
//@uiw/react-heat-map https://github.com/uiwjs/react-heat-map
import UserContext from "@/components/user/UserContext";
import { readPostsCountByDate } from "@/app/actions/zstPosts/posts";
import { Tooltip } from "react-tooltip";

const formatDate = (date: Date): string => {
  return date.toISOString().slice(0, 10).replace(/-/g, "/");
};

interface getHeatMapDataProp {
  user_id: number;
  from_at: Date;
  to_at: Date;
}

export type HeatMapDataType = {
  date: string;
  count: number;
};

const getRawHeatMapData = async (
  user_id: number,
  from_at: Date,
  to_at: Date,
) => {
  console.log("getRawHeatMapData", user_id, from_at, to_at);
  const result = user_id
    ? await readPostsCountByDate(user_id, from_at, to_at)
    : [];
  return result;
};

export const getHeatMapData = async (
  props: getHeatMapDataProp,
): Promise<HeatMapDataType[]> => {
  console.log("getHeatMapData", props);

  const { user_id, from_at, to_at } = props;

  const rawHeatMapData = await getRawHeatMapData(user_id, from_at, to_at);

  console.log(rawHeatMapData);

  const result: HeatMapDataType[] = [];

  if (rawHeatMapData && Array.isArray(rawHeatMapData)) {
    const heatMapData: HeatMapDataType[] = rawHeatMapData.map((item) => ({
      date: item.current_at, // current_at を date として使用
      count: item.count,
    }));

    // 日付順にソート（任意）
    heatMapData.sort((a, b) => a.date.localeCompare(b.date));
    return heatMapData;
  }
  return [];
};

const HeatMapPost = () => {
  const [heatMapData, setHeatMapData] = useState<any>([]);
  const [tooltipData, setTooltipData] = useState<HeatMapDataType>();
  const user = useContext(UserContext);
  const to_at = new Date();
  const from_at = new Date(to_at);
  from_at.setFullYear(to_at.getFullYear() - 1);

  useEffect(() => {
    const fetchData = async () => {
      const nowHeatMapDataRaw = await getHeatMapData({
        user_id: user?.userid ?? 0,
        from_at: from_at,
        to_at: to_at,
      });
      // console.warn("getHeatMapData is not yet implemented.");
      console.log("nowHeatMapData");
      console.log(nowHeatMapDataRaw.slice(0, 3));

      // データを { date: string, value: number } の形式に変換
      const nowHeatMapDataFormatted = nowHeatMapDataRaw.map((item) => ({
        date: item.date.replace(/\//g, "-"),
        value: item.count,
      }));

      setHeatMapData(nowHeatMapDataRaw);
    };

    fetchData();
  }, []); // 空の依存配列は、コンポーネントのマウント時に一度だけ実行

  // const startDate = new Date('2025-04-01');
  // const endDate = new Date('2025-04-15');

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", overflow: "visible" }}>
      <h2 style={{ fontWeight: "bold", marginBottom: "16px" }}>
        {`${from_at.toLocaleDateString()} - ${to_at.toLocaleDateString()}`}
      </h2>
      <HeatMap
        value={heatMapData}
        width={750}
        weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
        startDate={from_at}
        endDate={to_at}
        rectRender={(props, data) => {
          if (!data.count) return <rect {...props} />;
          return (
            <>
              <rect
                data-tooltip-id={`heatmap`}
                onMouseEnter={() => setTooltipData({ ...data })}
                {...props}
              />
            </>
          );
        }}
      />
      <Tooltip
        id={`heatmap`}
        content={`count: ${tooltipData?.count} date: ${tooltipData?.date}`}
      />
    </div>
  );
};

export default HeatMapPost;
