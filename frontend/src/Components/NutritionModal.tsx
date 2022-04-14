import {
    Modal,
    Text,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Divider,
    Input,
    Button,
    Flex,
    Tbody,
    Table,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../Utils/axios";

interface NutrientsProps {
    isOpen: boolean;
    onClose: () => void;
    itemName: string;
}

interface NutritionalData {
    name: string;
    calories: {
        calorie: string;
        carbCalorie: string;
        protCalorie: string;
        fatCalorie: string;
    };
    dietLabels: string;
}

export const NutritionModal: React.FC<NutrientsProps> = ({
    isOpen,
    onClose,
    itemName,
}) => {
    const [nutriData, setNutriData] = useState<NutritionalData | null>(null);

    const closeModal = () => {
        console.log("closed");
        onClose();
    };

    useEffect(() => {
        console.log("here modal");
        if (isOpen === true) {
            const dataBody = {
                name: itemName,
            };
            axios
                .post("/recommendations/nutrition", dataBody)
                .then(({ data }) => {
                    setNutriData(data.nutritions);
                });
        }
    }, [isOpen]);

    if (nutriData === null) return <></>;
    else
        return (
            <Modal isOpen={isOpen} onClose={closeModal} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius="20" px="5" py="5">
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
                    <Divider mb="4"/>
                    <ModalBody mt="-4">
                        <Flex justifyContent="flex-start">
                            <Text fontSize="md" mr="2" fontWeight="semibold">
                                Name:   
                            </Text>
                            <br/>
                            <Text fontSize="md" fontWeight="medium">
                                {nutriData.name}
                            </Text>
                        </Flex>
                        <Flex>
                            <Text fontSize="md" mr="2" fontWeight="bold">
                                Calories:  
                            </Text>
                            <Text marginLeft={1} fontSize="md" fontWeight="medium">
                                {nutriData.calories.calorie} kCal
                            </Text>
                        </Flex>
                        <Flex>
                            <Text fontSize="md" mr="2" fontWeight="bold">
                                Carbs: 
                            </Text>
                            <Text fontSize="md" fontWeight="medium">
                                {nutriData.calories.carbCalorie} kCal
                            </Text>
                        </Flex>
                        <Flex>
                            <Text fontSize="md" mr="2" fontWeight="bold">
                                Proteins:
                            </Text>
                            <Text fontSize="md" fontWeight="medium">
                                {nutriData.calories.protCalorie} kCal
                            </Text>
                        </Flex>
                        <Flex>
                            <Text fontSize="md" mr="2" fontWeight="bold">
                                Fats:
                            </Text>
                            <Text fontSize="md" fontWeight="medium">
                                {nutriData.calories.fatCalorie} kCal
                            </Text>
                        </Flex>
                        <Flex>
                            <Text fontSize="md" mr="2" fontWeight="bold">
                                Diet Label:
                            </Text>
                            <Text fontSize="md" fontWeight="medium">
                                {nutriData.dietLabels}
                            </Text>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
};
