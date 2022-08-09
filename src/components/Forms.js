import React, { useState } from 'react'
import {

    FormControl,
    Input,
    Button,
    ButtonGroup,
    Flex,
    Box

} from '@chakra-ui/react'
import Qrcode from './Qrcode'
function Forms() {

    const [generate, setGenerate] = useState(false)
    const [name, setName] = useState('')
    const [ticket, setTicket] = useState('')
    const [refferal, setRefferal] = useState('')
    const [data, setData] = useState({})

    const generateQr = () => {

        const custInput = {
            name: name,
            ticket: ticket,
            refferal: refferal
        }

        setData(custInput)

    }

    return (
        <>

            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                w={'100vw'}
                h={'100vh'}>

                <Flex
                    flexDir={'column'}
                    w={'sm'}
                    h={'md'}
                    borderRadius={'md'}
                    boxShadow={'md'}
                    p={4}>

                    <FormControl mb={4}>
                        <Flex
                            flexDir={'column'}
                            gap={4}>

                            <Input type="text" placeholder="Nama anda" autoComplete="off"
                                onChange={e => { setName(e.target.value) }} />

                            <Input type="text" placeholder="Code Refferal" autoComplete="off"
                                onChange={e => { setRefferal(e.target.value) }} />

                            <Input type="text" placeholder="Paket" autoComplete="off"
                                onChange={e => { setTicket(e.target.value) }} />

                        </Flex>


                    </FormControl>
                    <ButtonGroup>
                        <Flex gap={4}>
                            <Button colorScheme='green' onClick={generateQr}>Submit</Button>
                        </Flex>
                    </ButtonGroup>

                    <Box>
                        <Qrcode data={data} />
                    </Box>
                </Flex>


            </Flex>



        </>
    )
}

export default Forms