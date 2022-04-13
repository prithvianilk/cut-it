import { Pie, PieConfig } from "@ant-design/charts";
import { IGraphData } from "../Interfaces/GraphData";

interface PieChartProps {
  data: IGraphData[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const config: PieConfig = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};

export default PieChart;
