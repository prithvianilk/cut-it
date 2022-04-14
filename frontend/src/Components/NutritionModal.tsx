import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Divider, Input, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "../Utils/axios";

interface NutrientsProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NutritionModal: React.FC<NutrientsProps> = ({isOpen, onClose}) => {
    const closeModal = () => {
        onClose();
    };

	useEffect(()=>{
		axios.get('/recommendations/nutrition');
	},[]);

    return (
        <Modal isOpen={isOpen} onClose={closeModal} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius="20">
                    <ModalHeader>
                        <Text fontSize="md" fontWeight="bold">
                            Nutritional Facts
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
						Nutrition data
                    </ModalBody>
            </ModalContent>
        </Modal>
    );
};
