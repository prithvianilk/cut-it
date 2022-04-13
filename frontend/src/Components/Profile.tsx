import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface profileProps {}

const Profile: React.FC<profileProps> = () => {
    const { handleSubmit, register } = useForm();

    const onSubmit = async (data: any) => {
        console.log("here");
        console.log(data);
        try {
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Flex justify="center">
            <Box w="50%">
				<Heading my="5%">Profile</Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <FormLabel fontSize="lg" mb="5px">
                            Phone Number
                        </FormLabel>
                        <Input
                            type="number"
                            {...register("phoneNo")}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize="lg" mb="5px">
                            Password
                        </FormLabel>
                        <Input
                            type="password"
                            {...register("password")}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize="lg" mb="5px">
                            Weight
                        </FormLabel>
                        <Input
                            type="number"
                            {...register("weight")}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize="lg" mb="5px">
                            Height
                        </FormLabel>
                        <Input
                            type="number"
                            {...register("height")}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        justifySelf="center"
                        borderRadius="lg"
                        size="lg"
						my="2%"
                        width="25%"
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
                </form>
            </Box>
        </Flex>
    );
};

export default Profile;
