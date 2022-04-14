import { Box, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Card: React.FC<any> = () => {
    return (
        <a href='https://www.google.com' target='_blank'>
            <Box
                w="60%"
                h="90%"
                bgColor="#FAFAFA"
                py="1%"
                border="1px solid rgba(0, 0, 0, 0.05);"
                boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
                borderRadius="20px"
                mx="auto"
                my="20"
                px="35px"
            >
                Recom 1
            </Box>
        </a>
    );
};
