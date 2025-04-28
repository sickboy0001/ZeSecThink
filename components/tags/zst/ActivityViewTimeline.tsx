"use client";

import { useContext, useEffect, useState } from "react";
import UserContext from "@/components/user/UserContext";
import { TypeTagMas } from "@/app/types/tagTypes";
import { TypeHeatMapData } from "@/app/types/TypeHeatMap";
import { getHeatMapData } from "../GetHeatMapData";
import AcitveHeatMap from "./AcitveHeatMap";
import ListDatePosts from "./ListDatePosts";
import { Skeleton } from "@/components/ui/skeleton";

interface propsActivityViewTimeline {
  favoriteTagMass: TypeTagMas[];
  normalTagMass: TypeTagMas[];
  to_at?: Date;
  from_at?: Date;
  selectedPostsDateAt: string;
}

const ActivityViewTimeline = (props: propsActivityViewTimeline) => {
  const {
    to_at: argToAt,
    from_at: argFromAt,
    favoriteTagMass,
    normalTagMass,
    selectedPostsDateAt,
  } = props;
  // console.log("SummaryList rendered");

  const [heatMapData, setHeatMapData] = useState<TypeHeatMapData[]>([]);
  const [isReadingHeatMapData, setIsReadingHeatMapData] =
    useState<boolean>(false);
  const [listDatePostAtString, setListDatePostString] =
    useState<string>(selectedPostsDateAt);

  let to_at = new Date();
  let from_at = new Date();
  if (!argToAt) {
    to_at = new Date();
    from_at = new Date();
    from_at.setFullYear(to_at.getFullYear() - 1);
  }
  const [toAt, setToAt] = useState<Date>(to_at);
  const [fromAt, setFromAt] = useState<Date>(from_at);

  const user = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setAllHeatMapData();
    };
    fetchData();
  }, []); // 空の依存配列は、コンポーネントのマウント時に一度だけ実行

  const setAllHeatMapData = async () => {
    setIsReadingHeatMapData(true);
    const nowHeatMapDataRaw = await getHeatMapData({
      user_id: user?.userid ?? 0,
      from_at: fromAt,
      to_at: toAt,
    });
    setIsReadingHeatMapData(false);
    setHeatMapData(nowHeatMapDataRaw);
  };
  const onDateClick = (date: string, count: number) => {
    setListDatePostString(date);
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">TimeLine</h2>
      PostsHeatMap:{fromAt.toLocaleDateString()}-{toAt.toLocaleDateString()}
      <div className="mt-2">
        {isReadingHeatMapData ? (
          // ★ ローディング中は Skeleton を表示
          <Skeleton className="h-[120px] w-[725px] rounded-md" /> // ヒートマップのサイズに合わせたスケルトン (高さは調整してください)
        ) : (
          // ★ データ読み込み完了後にヒートマップを表示
          <AcitveHeatMap
            heatMapData={heatMapData}
            from_at_string={from_at.toLocaleDateString()}
            to_at_string={to_at.toLocaleDateString()}
            tooltipId={`heatmapIdSummary`}
            key="summary-heatmap"
            color=""
            onDateClick={onDateClick}
          />
        )}
      </div>
      <ListDatePosts
        favoriteTagMass={favoriteTagMass}
        normalTagMass={normalTagMass}
        listDatePostAtString={listDatePostAtString}
      ></ListDatePosts>{" "}
    </div>
  );
};

export default ActivityViewTimeline;
