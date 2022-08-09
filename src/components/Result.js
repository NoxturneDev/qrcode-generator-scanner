import React from 'react'
import { Heading, Box, Flex } from '@chakra-ui/react'
function Result({ data, scanned }) {

    const { name, phone, refferal, ticket } = data

    if (!scanned) return
    return (
        <>
            <Heading fontSize={'lg'} my={4}>RESULT</Heading>
            <Flex mb={4} hidden={scanned ? false : true}
                flexDir={'column'}
                gap={4}
                color={'gray.200'}>

                <Box px={4} py={2} w={'full'} bgColor={'gray.700'} border={'2px solid #FEFEFE'}>{name}</Box>
                <Box px={4} py={2} w={'full'} bgColor={'gray.700'} border={'2px solid #FEFEFE'}>{phone}</Box>
                <Box px={4} py={2} w={'full'} bgColor={'gray.700'} border={'2px solid #FEFEFE'}>{refferal}</Box>
                <Box px={4} py={2} w={'full'} bgColor={'gray.700'} border={'2px solid #FEFEFE'}>{ticket}</Box>


            </Flex>
        </>
    )
}

export default Result