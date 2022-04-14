import { Box, Flex, Grid, Heading, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card } from "../Components/Card";
import { useStore } from "../Store/store";
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
    const [data, setData] = useState([]);
    const [isDone, setIsDone] = useState(false);
    const phno=useStore((state)=>state.phoneNumber);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(`/recommendations/${phno}`);
            setData(data[0].slice(0,6));
            setIsDone(true);
        };
        getData();
    }, [isDone]);
    if(isDone){
        console.log(data);
    }
        return (
            <>
                <Flex justifyContent="center" my='2%'>
                    <Heading>Recommendation</Heading>
                </Flex>
                <Box height='100%'>
					<Grid templateColumns="repeat(3, 1fr)" gap={6}>
						{
							data.map((value, index)=>{
								return <Card {...value}/>;
							})
						}
					</Grid>
				</Box>
            </>
        );
};
