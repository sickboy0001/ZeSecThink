// components/CustomYAxis.tsx
import React from "react";
import { YAxis as RechartsYAxis, YAxisProps } from "recharts";

// デフォルトのプロパティを設定するカスタムコンポーネント
const CustomYAxis: React.FC<YAxisProps> = (props) => {
  return <RechartsYAxis {...props} width={30} />;
};

export default CustomYAxis;
