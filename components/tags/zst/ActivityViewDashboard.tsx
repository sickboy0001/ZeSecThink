"use client";

import { useContext, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TagAcitveHeatMap from "./TagAcitveHeatMap";
import UserContext from "@/components/user/UserContext";
import { TypeTagMas } from "@/app/types/tagTypes";
import { TypeHeatMapData } from "@/app/types/TypeHeatMap";
import { getHeatMapData } from "../GetHeatMapData";
import AcitveHeatMap from "./AcitveHeatMap";
import { Skeleton } from "@/components/ui/skeleton";

interface propsActivityViewDashboard {
  tagMass: TypeTagMas[];
  onTagClick: (tag: TypeTagMas) => void; // ★ props に onTagClick を追加
  onPostHeatmapClick: (date: string, count: number) => void;
}

const ActivityViewDashboard = (props: propsActivityViewDashboard) => {
  const { tagMass, onTagClick, onPostHeatmapClick } = props;
  const [selectedTab, setSelectedTab] = useState("summary");
  const [heatMapData, setHeatMapData] = useState<TypeHeatMapData[]>([]);
  const [isReadingHeatMapData, setIsReadingHeatMapData] =
    useState<boolean>(false);

  const to_at = new Date();
  const from_at = new Date();
  from_at.setFullYear(to_at.getFullYear() - 1);

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
      from_at: from_at,
      to_at: to_at,
    });
    setHeatMapData(nowHeatMapDataRaw);
    setIsReadingHeatMapData(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      PostsHeatMap:{from_at.toLocaleDateString()}-{to_at.toLocaleDateString()}
      <div className="mt-4">
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
            onDateClick={onPostHeatmapClick}
            color=""
          ></AcitveHeatMap>
        )}

        {tagMass.length > 0 &&
          tagMass.map((each) => (
            <div key={`favorite-tag-item-${each.id}`}>
              <div
                className="text-lg font-semibold cursor-pointer hover:underline text-blue-600 mb-1" // スタイルを追加
                onClick={() => onTagClick(each)} // ★ クリック時に onTagClick を呼び出す
              >
                {each.name}
              </div>

              <h2 style={{ fontWeight: "bold", marginBottom: "16px" }}>
                {`${from_at.toLocaleDateString()} - ${to_at.toLocaleDateString()}`}
              </h2>
              <TagAcitveHeatMap
                tag_id={Number(each.id)}
                from_at={from_at}
                to_at={to_at}
                tooltipId={`heatmapIdFavorite-${each.id}`}
                key={`favorite-tag-${each.id}`}
                color="blue"
              ></TagAcitveHeatMap>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ActivityViewDashboard;
