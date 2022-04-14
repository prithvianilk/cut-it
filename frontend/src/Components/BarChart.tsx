import { Bar, BarConfig } from "@ant-design/plots";
import { IGraphData } from "../Interfaces/GraphData";

interface FoodBarChartProps {
  data: IGraphData[];
}

const FoodBarChart: React.FC<FoodBarChartProps> = ({ data }) => {
  const config: BarConfig = {
    data,
    xField: "value",
    yField: "type",
    seriesField: "type",
    legend: {
      position: "top-left",
    },
  };

  return <Bar {...config} />;
};

export default FoodBarChart;
