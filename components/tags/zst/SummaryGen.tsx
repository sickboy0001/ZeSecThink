"use client";

import { useContext, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TagAcitveHeatMap from "./TagAcitveHeatMap";
import UserContext from "@/components/user/UserContext";
import { TypeTagMas } from "@/app/types/tagTypes";
import { TypeHeatMapData } from "@/app/types/TypeHeatMap";
import { getHeatMapData } from "../GetHeatMapData";
import AcitveHeatMap from "./AcitveHeatMap";

interface propsAllTagSummary {
  tagMass: TypeTagMas[];
}

const Summary = (props: propsAllTagSummary) => {
  const { tagMass } = props;
  const [selectedTab, setSelectedTab] = useState("summary");
  const [heatMapData, setHeatMapData] = useState<TypeHeatMapData[]>([]);

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
    const nowHeatMapDataRaw = await getHeatMapData({
      user_id: user?.userid ?? 0,
      from_at: from_at,
      to_at: to_at,
    });
    setHeatMapData(nowHeatMapDataRaw);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Summary</h1>

      <div className="mt-4">
        <AcitveHeatMap
          heatMapData={heatMapData}
          from_at_string={from_at.toLocaleDateString()}
          to_at_string={to_at.toLocaleDateString()}
          tooltipId={`heatmapIdSummary`}
          key="summary-heatmap"
          color=""
        ></AcitveHeatMap>

        {tagMass.length > 0 &&
          tagMass.map((each) => (
            <div key={`favorite-tag-item-${each.id}`}>
              <div>{each.name}</div>
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

export default Summary;
