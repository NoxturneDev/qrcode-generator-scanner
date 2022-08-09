import {
    createStandaloneToast,
    Box,
    Flex,
    Text,
    HStack,
    Progress
} from "@chakra-ui/react"
import React from "react"
import { CheckIcon, WarningIcon } from '@chakra-ui/icons'


const { toast } = createStandaloneToast()
const successId = 'success'
const errorId = 'error'


function ErrorToast({ msg }) {
    return (
        <>
            <Box
                color='gray.200'
                p={3}
                bg='gray.800'
                boxShadow="lg">
                <Flex
                    justifyContent="start"
                    alignItems="center"
                    gap={4}>
                    <WarningIcon w={6} h={6} color="main.100" />
                    <HStack>
                        <Text color="main.100" fontWeight="semibold">ERROR!</Text>
                        <Text>{msg}</Text>
                    </HStack>
                </Flex>
            </Box>
        </>
    )
}

function SuccessToast({ msg }) {
    return (
        <>
            <Box
                color='gray.200'
                p={3}
                bg='gray.800'
                boxShadow="lg">
                <Flex
                    justifyContent="start"
                    alignItems="center"
                    gap={4}>
                    <CheckIcon w={6} h={6} color="main.500" />
                    <HStack>
                        <Text color="main.500" fontWeight="semibold">BERHASIL!</Text>
                        <Text>{msg}</Text>
                    </HStack>
                </Flex>
            </Box>
            <Progress isIndeterminate bgColor="gray.800" colorScheme="pink" size="sm" />
        </>
    )
}

function customToast(status, msg) {
    if (!toast.isActive(status === "error" ? errorId : successId)) {
        toast({
            id: status === "error" ? errorId : successId,
            position: "top",
            isClosable: true,
            render: () => (
                status === "error" && status !== "" ? <ErrorToast msg={msg} /> : <SuccessToast msg={msg} />
            ),
        })
    }
}



export default customToast