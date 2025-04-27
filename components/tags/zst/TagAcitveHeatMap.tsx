"use client";
import React, { useContext, useEffect, useState } from "react";
import AcitveHeatMap from "./AcitveHeatMap";
import { TypeHeatMapData } from "@/app/types/TypeHeatMap";
import UserContext from "@/components/user/UserContext";
import { getHeatMapData } from "../GetHeatMapData";

interface PropsTagAcitveHeatMap {
  // heatMapData: TypeHeatMapData[];
  tag_id: number;
  from_at: Date;
  to_at: Date;
  tooltipId: string;
  color?: string;
}

const TagAcitveHeatMap = (props: PropsTagAcitveHeatMap) => {
  const { tag_id, from_at, to_at, tooltipId, color } = props;
  const [heatMapData, setHeatMapData] = useState<TypeHeatMapData[]>([]);

  const user = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const nowHeatMapDataRaw = await getHeatMapData({
        user_id: user?.userid ?? 0,
        from_at: from_at,
        to_at: to_at,
        tag_id: tag_id,
      });
      // console.log("TagAcitveHeatMap: Data fetched:", nowHeatMapDataRaw);
      setHeatMapData(nowHeatMapDataRaw);
    };
    fetchData();
  }, [tag_id, user?.userid, from_at, to_at]);
  // console.log(
  //   "TagAcitveHeatMap: heatMapData state updated:",
  //   heatMapData.length,
  // );

  return (
    <div>
      <AcitveHeatMap
        heatMapData={heatMapData}
        from_at_string={from_at.toLocaleDateString()}
        to_at_string={to_at.toLocaleDateString()}
        tooltipId={tooltipId}
        color={color}
      ></AcitveHeatMap>
    </div>
  );
};

export default TagAcitveHeatMap;
