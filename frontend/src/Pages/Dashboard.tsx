import { Box, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import FoodBarChart, { IBarGraphData } from "../Components/FoodBarChart";
import axios from "../Utils/axios";

interface DashBoardProps {}

const DashBoard: React.FC<DashBoardProps> = () => {
  const mobile = 9113240914;
  const [isDone, setDone] = useState<boolean>(false);
  const [frequentOrders, setFrequentOrders] = useState<IBarGraphData[]>([]);
  const [monthlyData, setMonthlyData] = useState<IBarGraphData[]>([]);
  const [restaurantFrequency, setrestaurantFrequency] = useState<
    IBarGraphData[]
  >([]);

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get(`/order/${mobile}`);
      const { user, frequencyPerFoodName, monthlyData, restaurantFrequency } =
        data;
      setFrequentOrders(frequencyPerFoodName);
      setMonthlyData(monthlyData);
      setrestaurantFrequency(restaurantFrequency);
    };
    getUserData();
    setDone(true);
  }, []);

  return (
    <Box w="60vw" h="40vh">
      <FoodBarChart data={frequentOrders} />
      <FoodBarChart data={restaurantFrequency} />
      <FoodBarChart data={monthlyData} />
    </Box>
  );
};

export default DashBoard;
