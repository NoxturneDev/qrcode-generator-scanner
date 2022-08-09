import React, { useEffect, useState, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import {

    Button,
    ButtonGroup,
    Flex,
    Box

} from '@chakra-ui/react'
import customToast from './Toast'
import Result from './Result'

function Scan() {

    const [scanned, setScanned] = useState(false)
    const [scanning, setScanning] = useState(false)
    const scannerRef = useRef()

    const [data, setData] = useState({})

    let html5QrCode

    function onScanSuccess(decodedText, decodedResult) {
        console.log(`Code matched = ${decodedText}`, decodedResult);

        setData(JSON.parse(decodedResult.result.text))
        html5QrCode.stop().then(() => {

            setScanning(false)
            setScanned(true)

        })
        // TOAST SUCCESS HERE
        customToast('success', 'Berhasil scan')
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }

    const scanQr = () => {
        // const reader = document.createElement('div')
        // reader.id = "reader"

        // document.getElementById('wrapper').appendChild(reader)

        html5QrCode = new Html5Qrcode("reader")

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        const cameraId = Html5Qrcode.getCameras()

        cameraId.then(devices => {
            if (devices && devices.length) {
                const id = devices[0].id;

                startScan(id, config)
            }

        }).catch(err => {
            // TOAST ERROR HERE
            console.error(err)
        });

    }

    const stopScan = () => {

        // !NOT WORKING BCS UNDEFINED
        html5QrCode.stop()

    }

    const startScan = (id, config) => {
        setScanning(true)

        html5QrCode.start(
            id, config, onScanSuccess, onScanFailure)

            .catch((err) => {
                // Start failed, handle it.
                console.error(err)
            });
    }

    // useEffect(() => {

    //     html5QrCode = new Html5Qrcode(scannerRef.current.id);

    // }, [data])

    return (
        <>

            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                w={'100vw'}
                h={'100vh'}
                bgColor={'gray.700'}
                color={'gray.200'}>

                <Flex
                    flexDir={'column'}
                    w={'full'}
                    h={'xl'}
                    borderRadius={'md'}
                    boxShadow={'md'}
                    p={4}
                    bgColor={'gray.800'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    position={'relative'}>

                    <Flex id="wrapper"
                        zIndex={'sticky'}
                        p={5}
                        // position={{ base: 'absolute', md: 'fixed' }}
                        // w={{ base: '100vw', md: 'md' }}
                        // h={{ base: '100vh', md: 'lg' }}
                        pointerEvents={'none'}
                        justifyContent={'center'}
                        alignItems={'center'}>

                        <Box id="reader"
                            w={{ base: '100vw', md: 'md' }}
                            // h={{ base: '100vh', md: 'md' }}
                            ref={scannerRef} ></Box>

                    </Flex>

                    <ButtonGroup>
                        <Flex gap={4}>
                            <Button colorScheme='purple' onClick={scanQr}>Scan QR</Button>
                            <Button colorScheme='purple' onClick={stopScan}
                                hidden={scanning ? false : true}>STOP SCAN</Button>
                        </Flex>
                    </ButtonGroup>

                    <Result data={data} scanned={scanned}></Result>

                </Flex>

            </Flex>

        </>
    )
}

export default Scan