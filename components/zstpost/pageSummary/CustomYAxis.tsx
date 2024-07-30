// components/CustomYAxis.tsx
import React from "react";
import { YAxis as RechartsYAxis, YAxisProps } from "recharts";

interface CustomYAxisProps extends YAxisProps {
  dataKey?: string;
  orientation?: "left" | "right";
}

const CustomYAxis: React.FC<CustomYAxisProps> = ({
  type = "number",
  dataKey = "",
  orientation = "left",
  ...rest
}) => {
  return (
    <RechartsYAxis
      type={type}
      dataKey={dataKey}
      orientation={orientation}
      {...rest}
    />
  );
};

export default CustomYAxis;
