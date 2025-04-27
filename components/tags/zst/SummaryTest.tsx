"use client";

import { useContext, useEffect, useState } from "react";
import UserContext from "@/components/user/UserContext";
import { TypeTagMas } from "@/app/types/tagTypes";
import { TypeHeatMapData } from "@/app/types/TypeHeatMap";
import { getHeatMapData } from "../GetHeatMapData";
import AcitveHeatMap from "./AcitveHeatMap";
// import ListDatePostTest from "./ListDatePostTest";

interface propsSummaryList {
  favoriteTagMass: TypeTagMas[];
  normalTagMass: TypeTagMas[];
}

const SummaryTest = (props: propsSummaryList) => {
  const { favoriteTagMass, normalTagMass } = props;
  console.log("SummaryList rendered");

  const [heatMapData, setHeatMapData] = useState<TypeHeatMapData[]>([]);

  const [fromAt, setFromAt] = useState(new Date());
  const [toAt, setToAt] = useState(new Date());

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
          from_at_string={fromAt.toLocaleDateString()}
          to_at_string={toAt.toLocaleDateString()}
          tooltipId={`heatmapIdSummary`}
          key="summary-heatmap"
          color=""
        ></AcitveHeatMap>
      </div>
      {/* <ListDatePostTest
        favoriteTagMass={favoriteTagMass}
        normalTagMass={normalTagMass}
      ></ListDatePostTest>{" "} */}
    </div>
  );
};

export default SummaryTest;
