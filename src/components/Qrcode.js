import React, { useEffect, useRef, useState } from 'react'
import QRcode from 'qrcode'
import { gsap } from 'gsap'
import { Button, Flex, ButtonGroup, Box, Heading } from '@chakra-ui/react'

function Qrcode({ data, hidden }) {

    const modalRef = useRef()
    const [generate, setGenerate] = useState(false)
    const [qrUrl, setUrl] = useState('')

    const opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
    }

    const generateQr = () => {

        QRcode.toDataURL(JSON.stringify(data), opts, function (err, url) {
            if (err) throw err

            setUrl(url)
        })

        console.log('generate')
        setGenerate(true)

    }

    const drawQR = () => {

        generateQr()

        gsap.fromTo(modalRef.current, {
            opacity: 0,
            y: -100,
            display: 'none'
        }, {
            opacity: 1,
            y: 0,
            display: 'flex'
        })

    }
    if (hidden) return

    return (
        <>

            <ButtonGroup>
                <Flex gap={4}>
                    <Button colorScheme='purple' onClick={drawQR}>Generate Qr Code</Button>
                </Flex>
            </ButtonGroup>

            <Box ref={modalRef}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                position="absolute"
                top='0'
                bottom='0'
                left='0'
                rigth='0'
                zIndex={'sticky'}
                w={'100vw'}
                h={'100vh'}
                bgColor={'rgba(0,0,0, 0.4)'}
                hidden={generate ? false : true}>

                <Flex px={10} py={14}
                    bgColor="white"
                    borderRadius={'md'}
                    boxShadow={'md'}
                    flexDir={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    gap={4}>

                    <Heading fontSize={'lg'}>THIS IS YOUR QR CODE</Heading>
                    <img src={qrUrl} alt="" id='image' />
                    <a href={qrUrl} download ><Button colorScheme={'purple'}>DOWNLOAD</Button></a>

                </Flex>

            </Box>

        </>
    )
}

export default Qrcode