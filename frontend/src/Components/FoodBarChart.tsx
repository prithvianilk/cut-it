import { Bar, BarConfig } from "@ant-design/plots";

export interface IFrequentOrderData {
  food: string;
  value: number;
}

interface FoodBarChartProps {
  data: IFrequentOrderData[];
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
