import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CenterSpinner from "../Components/CenterSpinner";
import axios from "../Utils/axios";

const Leaderboard = () => {
  let navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [isDone, setDone] = useState(false);

  useEffect(() => {
    axios.get("/user").then((res) => {
      setData(res.data);
      setDone(true);
    });
  }, []);
  if (!isDone) {
    return <CenterSpinner/>
  }
  else
  return (
    <>
      <Box h="20" bgColor="#FAFAFA">
        <Flex flexDir="row" justifyContent="space-between">
          <Heading textAlign="center" my="4">
            Leaderboard
          </Heading>
          <Heading
            justifySelf="center"
            size="md"
            onClick={() => {
              navigate("/dash");
            }}
            m="2%"
            _hover={{
              bg: "white",
              color: "#F06575",
            }}
          >
            Dashboard
          </Heading>
        </Flex>
      </Box>
      <Box
        bgColor="#FAFAFA"
        py="26px"
        w="631px"
        border="1px solid rgba(0, 0, 0, 0.05);"
        boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
        borderRadius="20px"
        mx="auto"
        my="200"
        px="35px"
      >
        <Heading fontSize="3xl">Leaderboard</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Username</Th>
              <Th>Number of Meals Ordered</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((user: any, i: number) => {
              return (
                <Tr>
                  <Td>{i + 1}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.numberOfOrdersInPastMonth}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default Leaderboard;
