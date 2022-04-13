import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Spacer,
    Stack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store/store";
import axios from "../Utils/axios";

export const Signup: React.FC<any> = () => {
  const { register, handleSubmit } = useForm();
  const setUsername = useStore((state) => state.setUsername);
  const setPhno = useStore((state) => state.setPhoneNumber);
  const setPwd = useStore((state) => state.setPassword);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    console.log(data);
    setUsername(data.username);
    setPhno(data.phone);
    setPwd(data.password);
    await axios.post("/auth/signup", data);
    navigate("/");
  };

    return (
        <>
            <Flex w="100%" position="absolute">
                <Spacer />
                <Heading
                    justifySelf="center"
                    size="md"
                    width="5%"
                    m="2%"
                    onClick={() => {
                        navigate("/");
                    }}
                    _hover={{
                        bg: "white",
                        color: "#F06575"
                    }}
                >
                    Login
                </Heading>
                <Heading
                    justifySelf="center"
                    size="md"
                    onClick={() => {
                        navigate("/signup");
                    }}
                    width="5%"
                    m="2%"
                    _hover={{
                        bg: "white",
                        color: "#F06575"
                    }}
                >
                    Sign Up
                </Heading>
            </Flex>
            <Flex justify="center" flexDir="column">
                <Box
                    bgColor="#FAFAFA"
                    py="26px"
                    w="631px"
                    border="1px solid rgba(0, 0, 0, 0.05);"
                    boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
                    borderRadius="20px"
                    h="500px"
                    mx="auto"
                    my="200"
                    px="35px"
                >
                    <Heading mb="2" textAlign="center">
                        Sign Up
                    </Heading>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Divider marginBottom="10" />
                        <Stack spacing={4}>
                            <FormControl
                                id="username"
                                display="flex"
                                isRequired
                            >
                                <Flex flexDirection="row">
                                    <FormLabel
                                        fontSize="18px"
                                        display="flex"
                                        justifyContent="center"
                                    >
                                        User Name
                                    </FormLabel>
                                    <Input
                                        type="Input"
                                        mb="12"
                                        {...register("username")}
                                        w={350}
                                        flex={{ lg: "1", base: "none" }}
                                        name="username"
                                        _focus={{
                                            border: "#F06575 solid 2px",
                                        }}
                                    />
                                </Flex>
                            </FormControl>
                            <FormControl id="phone" display="flex" isRequired>
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
                                        {...register("phone")}
                                        w={350}
                                        flex={{ lg: "1", base: "none" }}
                                        name="phone"
                                        _focus={{
                                            border: "#F06575 solid 2px",
                                        }}
                                    />
                                </Flex>
                            </FormControl>
                            <FormControl
                                id="password"
                                display="flex"
                                isRequired
                            >
                                <Flex flexDirection="row">
                                    <FormLabel
                                        fontSize="18px"
                                        display="flex"
                                        justifyContent="center"
                                    >
                                        Password
                                    </FormLabel>
                                    <Input
                                        type="password"
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
                            Sign Up
                        </Button>
                    </form>
                </Box>
            </Flex>
        </>
    );
};
