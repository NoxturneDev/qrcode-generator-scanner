import React, { useEffect, useState, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import {

    FormControl,
    Input,
    Button,
    ButtonGroup,
    Flex,
    Box,
    Heading

} from '@chakra-ui/react'
import customToast from './Toast'
import Result from './Result'

function Scan() {

    const [scanned, setScanned] = useState(false)
    const scannerRef = useRef()

    const [data, setData] = useState({})

    let html5QrCode

    function onScanSuccess(decodedText, decodedResult) {
        console.log(`Code matched = ${decodedText}`, decodedResult);

        setData(JSON.parse(decodedResult.result.text))
        html5QrCode.stop().then(() => {
            console.log('stop')
            setScanned(true)


        })
        // TOAST SUCCESS HERE
        customToast('success', 'Berhasil scan')
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }

    const scanQr = () => {
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

        html5QrCode.stop()

    }

    const startScan = (id, config) => {
        html5QrCode.start(
            id, config, onScanSuccess, onScanFailure)

            .catch((err) => {
                // Start failed, handle it.
                console.error(err)
            });
    }

    useEffect(() => {

        html5QrCode = new Html5Qrcode(scannerRef.current.id);

    }, [data])

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
                    w={'lg'}
                    h={'xl'}
                    borderRadius={'md'}
                    boxShadow={'md'}
                    p={4}
                    bgColor={'gray.800'}
                    justifyContent={'center'}
                    alignItems={'center'}>

                    <div id="reader" w="600px" ref={scannerRef}></div>

                    <FormControl mb={4}>
                        <Flex
                            flexDir={'column'}
                            gap={4}>

                            {/* <input type="file" name="file" id="qr-input-file" capture onChange={e => { scanFile(e) }} /> */}

                        </Flex>
                    </FormControl>
                    <ButtonGroup>
                        <Flex gap={4}>
                            <Button colorScheme='purple' onClick={scanQr}>Scan QR</Button>
                            <Button colorScheme='purple' onClick={stopScan}>STOP SCAN</Button>
                        </Flex>
                    </ButtonGroup>

                    <Result data={data} scanned={scanned}></Result>

                </Flex>

            </Flex>

        </>
    )
}

export default Scan