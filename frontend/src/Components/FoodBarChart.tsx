import { Bar, BarConfig } from "@ant-design/plots";

export interface IBarGraphData {
  food: string;
  value: number;
}

interface FoodBarChartProps {
  data: IBarGraphData[];
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
