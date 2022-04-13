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
import axios from "axios";
import {useStore} from '../Store/store';
import { useForm } from "react-hook-form";
import Auth from "./Auth";

interface profileProps {}

const Profile: React.FC<profileProps> = () => {
  const { handleSubmit, register } = useForm();
  const phno=useStore((state:any)=>{return state.phoneNumber});
  const { isOpen: IsOpen, onOpen: OnOpen, onClose: OnClose } = useDisclosure();

  const onSubmit = async (data: any) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const sendReq=async ()=>{
      console.log(phno);
      await axios.post("http://localhost:3530/otp/send",{'mobile':Number(phno)});
  }

  return (
    <Flex justify="center">
      <Box
        bgColor="#FAFAFA"
        py="26px"
        w="631px"
        border="1px solid rgba(0, 0, 0, 0.05);"
        boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
        borderRadius="20px"
        h="500"
        mx="auto"
        my="200"
        px="35px"
      >
        <Heading>Profile</Heading>
        <Divider marginBottom="5" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel fontSize="lg" mb="5px">
              Phone Number
            </FormLabel>
            <Input
              mb="2"
              flex={{ lg: "1", base: "none" }}
              _focus={{
                border: "#F06575 solid 2px",
              }}
              type="number"
              {...register("phoneNo")}
            />
          </FormControl>
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
              {...register("password")}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="lg" mb="5px">
              Weight
            </FormLabel>
            <Input
              flex={{ lg: "1", base: "none" }}
              _focus={{
                border: "#F06575 solid 2px",
              }}
              type="number"
              {...register("weight")}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="lg" mb="5px">
              Height
            </FormLabel>
            <Input
              flex={{ lg: "1", base: "none" }}
              _focus={{
                border: "#F06575 solid 2px",
              }}
              mb="4"
              type="number"
              {...register("height")}
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
              onClick={()=>{sendReq();OnOpen()}}
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
        <Auth isOpen={IsOpen} onClose={OnClose}/>
      </Box>
    </Flex>
  );
};

export default Profile;
