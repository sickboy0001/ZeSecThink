"use client";

import { useContext, useEffect, useState } from "react";
import UserContext from "@/components/user/UserContext";
import { TypeTagMas } from "@/app/types/tagTypes";
import { TypeHeatMapData } from "@/app/types/TypeHeatMap";
import { getHeatMapData } from "../GetHeatMapData";
import AcitveHeatMap from "./AcitveHeatMap";
import ListDatePosts from "./ListDatePosts";

interface propsSummaryList {
  favoriteTagMass: TypeTagMas[];
  normalTagMass: TypeTagMas[];
  to_at?: Date;
  from_at?: Date;
}

const SummaryList = (props: propsSummaryList) => {
  const {
    to_at: argToAt,
    from_at: argFromAt,
    favoriteTagMass,
    normalTagMass,
  } = props;
  console.log("SummaryList rendered");

  const [heatMapData, setHeatMapData] = useState<TypeHeatMapData[]>([]);

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
    const nowHeatMapDataRaw = await getHeatMapData({
      user_id: user?.userid ?? 0,
      from_at: fromAt,
      to_at: toAt,
    });
    setHeatMapData(nowHeatMapDataRaw);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">list</h2>
      HeatMap:{fromAt.toLocaleDateString()}-{toAt.toLocaleDateString()}
      <div className="mt-2">
        <AcitveHeatMap
          heatMapData={heatMapData}
          from_at_string={from_at.toLocaleDateString()}
          to_at_string={to_at.toLocaleDateString()}
          tooltipId={`heatmapIdSummary`}
          key="summary-heatmap"
          color=""
        ></AcitveHeatMap>
      </div>
      <ListDatePosts
        favoriteTagMass={favoriteTagMass}
        normalTagMass={normalTagMass}
      ></ListDatePosts>{" "}
    </div>
  );
};

export default SummaryList;
