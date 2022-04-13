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
    Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useStore } from "../Store/store";
import history from "../history";

interface LoginData {
    phone: string;
    password: string;
}

const Login = () => {
    //   const { phno } = useStoreState((state: any) => state.phno);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    //   const {setPhno}=useStoreActions((actions:any)=>actions.phno);
    const onSubmit = async (data: any) => {
        setPhno(data.ph_num);
        //await axios.post("http://localhost:3530/auth/login", data.ph_num);
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
                    <Heading mb="2" textAlign="center">
                        Ladoo
                    </Heading>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Divider marginBottom="10" />
                        <Stack spacing={4}>
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
                                        mb="8"
                                        w={400}
                                        {...register("password")}
                                        flex={{ lg: "1", base: "none" }}
                                        name="password"
                                        type='password'
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
                                Login
                            </Button>
                            <Button
                                justifySelf="center"
                                borderRadius="lg"
                                size="lg"
                                width="25%"
                                mx='5%'
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
                                onClick={() => {
                                    history.push("/signup");
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

export default Login;
