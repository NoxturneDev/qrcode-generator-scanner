import React, { useState } from 'react'
import {

    FormControl,
    Input,
    Button,
    ButtonGroup,
    Flex,
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,

} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

import Qrcode from './Qrcode'
function Forms() {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [ticket, setTicket] = useState('')
    const [refferal, setRefferal] = useState('')
    const [data, setData] = useState({})
    const [disable, setDisabled] = useState(true)

    const generateQr = () => {

        const custInput = {
            name: name,
            ticket: ticket,
            refferal: refferal,
            phone: phone
        }

        if (name == '' || phone == '' || ticket == '' || refferal == '') {

            console.log('isi data dengan benar')

        } else {

            setData(custInput)
            setDisabled(false)

        }

    }

    return (
        <>

            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                w={'100vw'}
                h={'100vh'}
                bgColor={'gray.700'}
                p={[5, 4]}
                overflow={'hidden'}>
                <Flex
                    flexDir={'column'}
                    w={'sm'}
                    h={'md'}
                    borderRadius={'md'}
                    boxShadow={'md'}
                    p={4}
                    bgColor={'gray.800'}
                    justifyContent={'center'}
                    alignItems={'center'}>

                    <FormControl mb={4}>
                        <Flex
                            flexDir={'column'}
                            gap={4}
                            color={'gray.200'}>

                            <Input type="text"
                                placeholder="Nama anda"
                                autoComplete="off"
                                focusBorderColor='purple.500'
                                onChange={e => { setName(e.target.value) }}
                                required />

                            <Input type="number"
                                placeholder="No Handhpone"
                                autoComplete="off"
                                focusBorderColor='purple.500'
                                onChange={e => { setRefferal(e.target.value) }}
                                required />

                            <Input type="text"
                                placeholder="Code Referral"
                                autoComplete="off"
                                focusBorderColor='purple.500'
                                onChange={e => { setPhone(e.target.value) }}
                                textTransform={'uppercase'}
                                fontWeight={'medium'}
                                letterSpacing={'1px'}
                                required />

                            <Input type="text"
                                placeholder="Paket"
                                autoComplete="off"
                                focusBorderColor='purple.500'
                                value={ticket == '' ? 'Pilih paket' : ticket}
                                controlled="true"
                                readOnly
                                required />

                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="purple">
                                    Paket
                                </MenuButton>
                                <MenuList bgColor={'gray.800'}>
                                    <MenuItem
                                        onClick={e => { setTicket(e.target.innerText) }}
                                        _hover={{ bgColor: 'purple.700' }}>Keluarga</MenuItem>
                                    <MenuItem
                                        onClick={e => { setTicket(e.target.innerText) }}
                                        _hover={{ bgColor: 'purple.700' }}>Pelajar</MenuItem>
                                    <MenuItem
                                        onClick={e => { setTicket(e.target.innerText) }}
                                        _hover={{ bgColor: 'purple.700' }}>Individu</MenuItem>
                                </MenuList>
                            </Menu>

                            <ButtonGroup w={'100%'}
                                textAlign={'center'}
                                display={'flex'}
                                justifyContent={'center'}>
                                <Button colorScheme='purple' w={'100%'} onClick={generateQr}>Submit</Button>
                            </ButtonGroup>
                        </Flex>


                    </FormControl>
                    <Box>
                        <Qrcode data={data} hidden={disable ? true : false} />
                    </Box>
                </Flex>


            </Flex>

        </>
    )
}

export default Forms