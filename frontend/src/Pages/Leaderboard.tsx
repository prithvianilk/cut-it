import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import axios from '../Utils/axios';

const Leaderboard=(userData:any)=>{
    const [data,setData]=React.useState([]);

    useEffect(()=>{
        axios.get('/user').then((res)=>{
            setData(res.data);
        })
    },[]);
    return(
        <Box
        bgColor="#FAFAFA"
        py="26px"
        w="631px"
        border="1px solid rgba(0, 0, 0, 0.05);"
        boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
        borderRadius="20px"
        h="400px"
        mx="auto"
        my="200"
        px="35px"
        >
            <Heading>Leaderboard</Heading>
            <Table>
                <Thead>
                    <Th>
                        <Tr>Rank</Tr>
                        <Tr>Username</Tr>
                        <Tr>Number of Meals Ordered</Tr>
                    </Th>
                </Thead>
                <Tbody>
                    {userData.map((user:any)=>{
                        <Tr>
                            <Td>{user.}</Td>

                        </Tr>
                    })}
                </Tbody>
            </Table>
        </Box>
    );
}

export default Leaderboard;