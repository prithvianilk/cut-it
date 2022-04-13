import React from "react";
import Auth from "./Auth";
import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Stack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Controller, useForm } from 'react-hook-form';
import { useStoreActions, useStoreState } from "easy-peasy";

interface LoginData {
  ph_num: string;
  password: string;
}

const Login = () => {
  const { phno } = useStoreState((state: any) => state.phno);
  const { register, handleSubmit, control,formState:{errors} } = useForm();
  const {setPhno}=useStoreActions((actions:any)=>actions.phno);
  const { isOpen: IsOpen, onOpen: OnOpen, onClose: OnClose } = useDisclosure();
  const onSubmit = async (data: any) => {
    // setPhno(data.ph_num);
  };

  return (
    <>
      <Flex justify="center" flexDir="column">
        <Box
          bgColor="#FAFAFA"
          py="26px"
          w="631px"
          border="1px solid rgba(0, 0, 0, 0.05);"
          boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
          borderRadius="20px"
          h="400px"
          mx="auto"
          my="200"
          px="35px"
        >
          <Text textAlign="center" fontSize="3xl" fontWeight="medium">
            Ladoo
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Divider marginBottom="10" />
            <Stack spacing={4}>
              <FormControl id="ph_num" display="flex" isRequired>
                <Flex flexDirection="row">
                  <FormLabel
                    fontSize="18px"
                    display="flex"
                    justifyContent="center"
                  >
                    Phone Number
                  </FormLabel>
                  <Input
                    type="Input"
                    mb="12"
                    {...register("ph_num")}
                    w={350}
                    flex={{ lg: "1", base: "none" }}
                    name="ph_num"
                    _focus={{
                      border: "#F06575 solid 2px",
                    }}
                  />
                </Flex>
              </FormControl>
              <FormControl id="password" display="flex" isRequired>
                <Flex flexDirection="row">
                  <FormLabel
                    fontSize="18px"
                    display="flex"
                    justifyContent="center"
                  >
                    Password
                  </FormLabel>
                  <Input
                    type="Input"
                    mb="12"
                    w={400}
                    {...register("password")}
                    flex={{ lg: "1", base: "none" }}
                    name="password"
                    _focus={{
                      border: "#F06575 solid 2px",
                    }}
                  />
                </Flex>
              </FormControl>
            </Stack>
            <Button
              justifySelf="center"
              borderRadius="lg"
              size="lg"
              width="25%"
              onClick={OnOpen}
              type="submit"
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
              Login
            </Button>
          </form>
        </Box>
        <Auth isOpen={IsOpen} onClose={OnClose} />
      </Flex>
    </>
  );
};

export default Login;
