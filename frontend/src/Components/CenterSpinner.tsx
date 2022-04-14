import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const CenterSpinner = () => (
    <Flex
        width="100vw"
        height="100vh"
        justifyContent="center"
		align='center'
        flexDir="column"
    >
        <Spinner />
    </Flex>
);

export default CenterSpinner;
