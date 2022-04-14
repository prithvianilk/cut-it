import { Box, Flex, Grid, Heading, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card } from "../Components/Card";
import axios from "../Utils/axios";

// interface food {
// 	foodName,
// 	calories,
// 	proteinCal,
// 	fat,
// 	carb,
// 	ing[],
// };

export const Recommendation: React.FC<any> = () => {
    const [data, setData] = useState([1,2,3,4,5,6]);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        // axios.get("/").then((res) => {
        //     setData(res.data);
            setIsDone(true);
        // });
    }, []);

    if (!isDone) return <></>;
    else
        return (
            <>
                <Flex justifyContent="center" my='2%'>
                    <Heading>Recommendation</Heading>
                </Flex>
                <Box height='100%'>
					<Grid templateColumns="repeat(3, 1fr)" gap={6}>
						{
							data.map((value, index)=>{
								return <Card/>;
							})
						}
					</Grid>
				</Box>
            </>
        );
};
