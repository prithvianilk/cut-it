import { Box, Link, useAccordionContext, createStandaloneToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Utils/axios";

export const Card: React.FC<any> = ({
    label,
    nutrients,
    foodContentsLabel,
}: any) => {
    const toast = createStandaloneToast()
    const handleSubmit = (label: any) => {
        const getRecipeData = async () => {
            await axios
                .get(
                    `https://api.edamam.com/api/recipes/v2?type=public&q=${label}&cuisineType=Indian&app_id=d5891ff5&app_key=981db4ee492e3248291050ee56c7f38a`
                )
                .then((res) => {
                    const data = res.data;
                    if (data.hits.length === 0){
                      toast({
                        title: 'An error occurred',
                        description: 'Sorry no recipes found',
                        status: 'warning',
                        duration: 9000,
                        isClosable: true,
                      })
                    }
                    else {
                        const recipeUrl = data.hits[0].recipe.url;
                        window.open(recipeUrl, "_blank");
                    }
                });
        };
        getRecipeData();
    };
    return (
        <Box
            w="60%"
            h="90%"
            bgColor="#FAFAFA"
            display="flex"
            fontSize="lg"
            fontWeight="medium"
            justifyContent="space-evenly"
            flexDir="column"
            // textAlign="center"
            py="1%"
            border="1px solid rgba(0, 0, 0, 0.05);"
            boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
            borderRadius="20px"
            mx="auto"
            my="20"
            px="35px"
            onClick={() => {
                handleSubmit(label);
            }}
        >
            Name: {label}
            <br />
            Calories: {Math.round(nutrients.ENERC_KCAL)} kCal
            <br />
            Protein: {Math.round(nutrients.PROCNT)} g
            <br />
            Fat: {Math.round(nutrients.FAT)} g
        </Box>
    );
};
