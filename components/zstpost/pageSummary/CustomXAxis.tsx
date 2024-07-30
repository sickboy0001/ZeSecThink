import React from "react";
import { XAxis as RechartsXAxis, XAxisProps } from "recharts";

interface CustomXAxisProps extends XAxisProps {
  dataKey?: string;
  height?: number;
}

const CustomXAxis: React.FC<CustomXAxisProps> = ({
  type = "category",
  dataKey = "",
  height = 30,
  ...rest
}) => {
  return (
    <RechartsXAxis type={type} dataKey={dataKey} height={height} {...rest} />
  );
};
export default CustomXAxis;
