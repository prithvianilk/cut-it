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
                        <Flex>
                            <Text fontSize="md" fontWeight="bold">
                                Name:
                            </Text>
                            <Text fontSize="md" fontWeight="bold">
                                {nutriData.name}
                            </Text>
                        </Flex>
                        <Flex>
                            <Text fontSize="md" fontWeight="bold">
                                Calories:
                            </Text>
                            <Text marginLeft={1} fontSize="md" fontWeight="bold">
                                {nutriData.calories.calorie}
                            </Text>
                        </Flex>
                        <Flex>
                            <Text fontSize="md" fontWeight="bold">
                                Carbs:
                            </Text>
                            <Text fontSize="md" fontWeight="bold">
                                {nutriData.calories.carbCalorie}
                            </Text>
                        </Flex>
                        <Flex>
                            <Text fontSize="md" fontWeight="bold">
                                Proteins:
                            </Text>
                            <Text fontSize="md" fontWeight="bold">
                                {nutriData.calories.protCalorie}
                            </Text>
                        </Flex>
                        <Flex>
                            <Text fontSize="md" fontWeight="bold">
                                Fats:
                            </Text>
                            <Text fontSize="md" fontWeight="bold">
                                {nutriData.calories.fatCalorie}
                            </Text>
                        </Flex>
                        <Flex>
                            <Text fontSize="md" fontWeight="bold">
                                Diet Label:
                            </Text>
                            <Text fontSize="md" fontWeight="bold">
                                {nutriData.dietLabels}
                            </Text>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
};
