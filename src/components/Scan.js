
import React, { useEffect, useState } from 'react'
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode'
import {

    FormControl,
    Input,
    Button,
    ButtonGroup,
    Flex,
    Box

} from '@chakra-ui/react'

function Scan() {
    const [scanned, setScanned] = useState(false)
    function onScanSuccess(decodedText, decodedResult) {
        // handle the scanned code as you like, for example:
        console.log(`Code matched = ${decodedText}`, decodedResult);
        setScanned(true)
    }

    function onScanFailure(error) {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        console.warn(`Code scan error = ${error}`);
    }

    const scanQr = () => {

        const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: { width: 250, height: 250 } }, false)

        scanner.render(onScanSuccess, onScanFailure)
    }

    // const scanFile = (e) => {
    //     const scan = new Html5Qrcode('reader')

    //     if (e.target.files.length == 0) {
    //         // No file selected, ignore 
    //         return;
    //     }

    //     const imageFile = e.target.files[0];
    //     // Scan QR Code
    //     scan.scanFile(imageFile, true)
    //         .then(decodedText => {
    //             // success, use decodedText
    //             console.log(decodedText);
    //         })
    //         .catch(err => {
    //             // failure, handle it.
    //             console.log(`Error scanning file. Reason: ${err}`)
    //         });
    // }

    return (
        <>
            <div id="reader" w="600px"></div>

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

                            {/* <input type="file" name="file" id="qr-input-file" capture onChange={e => { scanFile(e) }} /> */}

                        </Flex>
                    </FormControl>
                    <ButtonGroup>
                        <Flex gap={4}>
                            <Button colorScheme='green' onClick={scanQr}>Scan QR</Button>
                        </Flex>
                    </ButtonGroup>
                </Flex>


            </Flex>

        </>
    )
}

export default Scan