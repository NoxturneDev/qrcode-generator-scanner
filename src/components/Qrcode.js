import React, { useEffect } from 'react'
import QRcode from 'qrcode'
import { Button, Flex, ButtonGroup } from '@chakra-ui/react'

function Qrcode({ data }) {

    const opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: {
            dark: "#010599FF",
            light: "#FFBF60FF"
        }
    }


    const drawQR = async () => {

        QRcode.toDataURL(JSON.stringify(data), opts, function (err, url) {
            if (err) throw err

            const img = document.getElementById('image')
            img.src = url
        })

        console.log('generate')

    }

    return (
        <>
            <ButtonGroup>
                <Flex gap={4}>
                    <Button colorScheme='green' onClick={drawQR}>Generate Qr Code</Button>
                </Flex>
            </ButtonGroup>

            <img src="#" alt="" id='image' />
        </>
    )
}

export default Qrcode