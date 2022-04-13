import { Box, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import FoodBarChart, { IFrequentOrderData } from "../Components/FoodBarChart";
import axios from "../Utils/axios";

interface DashBoardProps {}

const DashBoard: React.FC<DashBoardProps> = () => {
  const mobile = 9113240914;
  const [isDone, setDone] = useState<boolean>(false);
  const [frequentOrders, setFrequentOrders] = useState<IFrequentOrderData[]>(
    []
  );

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get(`/order/${mobile}`);
      const { user, frequencyPerFoodName } = data;
      console.log(user);
      setFrequentOrders(frequencyPerFoodName);
    };
    getUserData();
    setDone(true);
  }, []);

  return (
    <Box w="60vw" h="40vh">
      <FoodBarChart data={frequentOrders} />
      <FoodBarChart data={frequentOrders} />
    </Box>
  );
};

export default DashBoard;
