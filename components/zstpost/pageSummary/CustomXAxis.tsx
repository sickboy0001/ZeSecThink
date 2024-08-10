import React from "react";
import { XAxis as RechartsXAxis, XAxisProps } from "recharts";

// デフォルトのプロパティを設定するカスタムコンポーネント
const CustomXAxis: React.FC<XAxisProps> = (props) => {
  return <RechartsXAxis {...props} width={30} />;
};

export default CustomXAxis;
