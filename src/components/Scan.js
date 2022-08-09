import React, { useEffect, useState, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import {

    Button,
    ButtonGroup,
    Flex,
    Box,
    Text,
    Select

} from '@chakra-ui/react'
import customToast from './Toast'
import Result from './Result'

function Scan() {

    const [scanner, setScanner] = useState()
    const [scanned, setScanned] = useState(false)
    const [scanning, setScanning] = useState(false)
    const [camera, setCamera] = useState([])
    const [data, setData] = useState({})

    const scannerRef = useRef()
    const cameras = []

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

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

    const initScan = () => {

        html5QrCode = new Html5Qrcode("reader")

        setScanner(html5QrCode)

        const cameraId = Html5Qrcode.getCameras()

        cameraId.then(devices => {
            console.log(devices)

            if (devices && devices.length) {
                cameras.push([...devices])
                setCamera(cameras[0])

                const id = devices[0].id;

                startScan(id, config)
            }
        }).catch(err => {

            customToast('error', err)
            console.error(err)
        });

    }

    const stopScan = () => {

        console.log(camera)
        setScanning(false)
        scanner.stop()

    }

    const changeCamera = (id, config, currentScan) => {

        // currentScan.stop()
        scanner.stop()
        scanner.start(id, config, onScanSuccess, onScanFailure)
            .catch(err => {

                console.log(err)

            })

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
                    w={{ sm: '100vw', md: "lg" }}
                    h={'xl'}
                    borderRadius={'md'}
                    boxShadow={'md'}
                    p={4}
                    bgColor={'gray.800'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    position={'relative'}>

                    <Flex id="wrapper"
                        p={5}
                        // position={{ base: 'absolute', md: 'fixed' }}
                        w={{ base: '100%', md: 'md' }}
                        pointerEvents={'none'}
                        justifyContent={'center'}
                        alignItems={'center'}>

                        <Box id="reader"
                            w={{ base: '100vw', md: 'md' }}
                            // h={{ base: '100vh', md: 'md' }}
                            ref={scannerRef}>
                        </Box>

                    </Flex>


                    <Select color={'gray.500'} bgColor={'gray.800'} m={2}
                        onChange={e => {
                            changeCamera(e.target.value, config)
                        }}>
                        {camera.length < 0 ? '' : camera.map(cam => {
                            return <option key={cam.id} id={cam.id} value={cam.id}>{cam.label}</option>
                        })}
                    </Select>



                    <ButtonGroup>
                        <Flex gap={4}>
                            <Button colorScheme='purple' onClick={initScan}>Scan QR</Button>
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