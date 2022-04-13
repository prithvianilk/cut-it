import axios from "axios";
import { useStore } from "../Store/store";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Goal: React.FC<any> = () => {
    const { handleSubmit, register } = useForm();
    const phno = useStore((state: any) => {
        return state.phoneNumber;
    });
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            await axios.put(`/user/${phno}`, data);
            navigate("/dash");
        } catch (err) {
            console.log(err);
        }
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
				<Heading mb="2" textAlign="center">
					Goals
				</Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <FormLabel fontSize="lg" mb="5px">
                            Monthly budget
                        </FormLabel>
                        <Input
                            mb="2"
                            flex={{ lg: "1", base: "none" }}
                            _focus={{
                                border: "#F06575 solid 2px",
                            }}
                            type="number"
                            {...register("budget")}
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
                    </Flex>
                </form>
            </Box>
        </Flex>
    );
};
