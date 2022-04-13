import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import axios from "../Utils/axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store/store";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Auth: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm();
  const closeModal = () => {
    onClose();
  };
  const navigate = useNavigate();
  const phno = useStore((state: any) => {
    return state.phoneNumber;
  });

  const setPhno = useStore((state: any) => state.setPhoneNumber);

  const onSubmit = async (data: any) => {
    await axios
      .post("/otp/verify", {
        otp: Number(data.otp),
        phone: Number(phno),
      })
      .then(async (res) => {
        await axios.post("/order", { phone: Number(phno) }).then(() => {
          navigate("/dash");
        });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <Text fontSize="md" fontWeight="bold">
              Verify Phone Number
            </Text>
          </ModalHeader>
          <ModalCloseButton
            fontSize="md"
            mt="4"
            mr="4"
            color="#F06575"
            border="none"
            _active={{ border: "none" }}
            _focus={{ border: "none" }}
          />
          <ModalBody mt="-4">
            <FormControl id="otp" my="5" isRequired>
              <FormLabel fontWeight="medium" fontSize="lg">
                Enter OTP
              </FormLabel>
              <Divider my="3" />
              <Input
                type="Input"
                {...register("otp")}
                w={400}
                flex={{ lg: "1", base: "none" }}
                name="otp"
                _focus={{
                  border: "#F06575 solid 2px",
                }}
              ></Input>
            </FormControl>
            <Button
              justifySelf="center"
              borderRadius="md"
              size="lg"
              width="25%"
              mb="4"
              type="submit"
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
              Verify
            </Button>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Auth;
