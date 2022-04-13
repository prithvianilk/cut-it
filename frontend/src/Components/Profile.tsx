import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
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
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="phoneNo">
                    <FormLabel>
						Phone Number
					</FormLabel>
                    <Input id="phoneNo" type="number" {...register("phoneNo")} />
                </FormControl>
                <FormControl id="phoneNo">
                    <FormLabel>
						Password
					</FormLabel>
                    <Input id="password" type="text" {...register("password")} />
                </FormControl>
                <Button type="submit">Edit</Button>
            </form>
        </Box>
    );
};

export default Profile;
