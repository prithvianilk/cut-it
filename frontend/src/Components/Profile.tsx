import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "../Utils/axios";
import { useStore } from "../Store/store";
import { useForm } from "react-hook-form";
import Auth from "./Auth";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface profileProps {}

const Profile: React.FC<profileProps> = () => {
  const { handleSubmit } = useForm();
  const phno=useStore((state:any)=>{return state.phoneNumber});
  const pwd=useStore((state:any)=>{return state.password});
  const budget=useStore((state:any)=>{return state.monthlyBudget});
  const calories=useStore((state:any)=>{return state.calories});
  const setPassword=useStore((state:any)=>{return state.setPassword});
  const setBudget=useStore((state:any)=>{return state.setBudget});
  const setCalories=useStore((state:any)=>{return state.setCalories});
  const { isOpen: IsOpen, onOpen: OnOpen, onClose: OnClose } = useDisclosure();
  const navigate = useNavigate();

  const [pwdHook, setPwdHook] = useState<string>(pwd);
  const [budgetHook, setBudgetHook] = useState<number>(budget);
  const [calHook, setCalHook] = useState<number>(calories);

  const onSubmit = async () => {
    try {
      setPassword(pwdHook);
      setBudget(budgetHook);
      setCalories(calHook);
      const dataBody = {
        budget: budgetHook,
        calorieBudget: calHook,
        password: pwdHook
      }
      console.log(dataBody);
      await axios.put(`/user/${phno}`,dataBody);
      navigate('/dash');
    } catch (err) {
      console.log(err);
    }
  };

  const sendReq = async () => {
    console.log(phno);
    await axios.post("/otp/send", {
      phone: Number(phno),
    });
  };

  return (
    <Flex justify="center">
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
        <Heading>Profile</Heading>
        <Divider marginBottom="5" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel fontSize="lg" mb="5px">
              Password
            </FormLabel>
            <Input
              flex={{ lg: "1", base: "none" }}
              _focus={{
                border: "#F06575 solid 2px",
              }}
              mb="2"
              type="password"
              value={pwdHook}
              onChange={(e)=>{setPwdHook(e.target.value)}}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="lg" mb="5px">
              Calories
            </FormLabel>
            <Input
              flex={{ lg: "1", base: "none" }}
              _focus={{
                border: "#F06575 solid 2px",
              }}
              type="number"
              value={calHook}
              onChange={(e)=>{setCalHook(parseInt(e.target.value))}}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="lg" mb="5px">
              Monthly Budget
            </FormLabel>
            <Input
              flex={{ lg: "1", base: "none" }}
              _focus={{
                border: "#F06575 solid 2px",
              }}
              type="number"
              value={budgetHook}
              onChange={(e)=>{setBudgetHook(parseInt(e.target.value))}}
            />
          </FormControl>
          <Flex flexDir="row" justifyContent="space-around">
            <Button
              type="submit"
              justifySelf="center"
              borderRadius="lg"
              size="lg"
              my="2%"
              width="40%"
              backgroundColor="#FAFAFA"
              fontWeight="700"
              boxShadow="4px 4px 24px rgba(0, 0, 0, 0.08);"
              border="3px solid #F07381;"
              transition="all 500ms ease"
              _active={{
                bg: "#F06575",
                color: "white",
              }}
              _hover={{
                bg: "#F06575",
                color: "white",
              }}
              _focus={{
                boxShadow: "transparent",
              }}
            >
              Edit
            </Button>
            <Button
              justifySelf="center"
              borderRadius="lg"
              size="lg"
              my="2%"
              onClick={() => {
                sendReq();
                OnOpen();
              }}
              width="40%"
              backgroundColor="#FAFAFA"
              fontWeight="700"
              boxShadow="4px 4px 24px rgba(0, 0, 0, 0.08);"
              border="3px solid #FC8019;"
              transition="all 500ms ease"
              _active={{
                bg: "#FC8019",
                color: "white",
              }}
              _hover={{
                bg: "#FC8019",
                color: "white",
              }}
              _focus={{
                boxShadow: "transparent",
              }}
            >
              Verify Account
            </Button>
          </Flex>
        </form>
        <Auth isOpen={IsOpen} onClose={OnClose} />
      </Box>
    </Flex>
  );
};

export default Profile;
