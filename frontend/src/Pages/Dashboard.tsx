import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FoodBarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";
import { IGraphData } from "../Interfaces/GraphData";
import { useStore } from "../Store/store";
import axios from "../Utils/axios";

interface DashBoardProps {}

const DashBoard: React.FC<DashBoardProps> = () => {
  const mobile = Number(useStore((state) => state.phoneNumber));
  const [isDone, setDone] = useState<boolean>(false);
  const [frequentOrders, setFrequentOrders] = useState<IGraphData[]>([]);
  const [monthlyData, setMonthlyData] = useState<IGraphData[]>([]);
  const [restaurantFrequency, setRestaurantFrequency] = useState<IGraphData[]>(
    []
  );
  const [spentValues, setSpentValues] = useState<IGraphData[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get(`/order/${mobile}`);
      const {
        user,
        frequencyPerFoodName,
        monthlyData,
        restaurantFrequency,
        spentValues,
      } = data;
      setFrequentOrders(frequencyPerFoodName);
      setMonthlyData(monthlyData);
      setRestaurantFrequency(restaurantFrequency);
      console.log(spentValues);
      setSpentValues(spentValues);
    };
    getUserData();
    setDone(true);
  }, []);

  return (
    <Box w="60vw" h="40vh">
      <FoodBarChart data={frequentOrders} />
      <FoodBarChart data={restaurantFrequency} />
      <FoodBarChart data={monthlyData} />
      <PieChart data={spentValues} />
    </Box>
  );
};

export default DashBoard;
