import React, { useEffect, useState, useRef } from 'react'
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode'
import {

    FormControl,
    Input,
    Button,
    ButtonGroup,
    Flex,
    Box,
    Heading

} from '@chakra-ui/react'

function Scan() {

    const [scanned, setScanned] = useState(false)
    const scannerRef = useRef()

    const [data, setData] = useState({})
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [ticket, setTicket] = useState('')
    const [refferal, setRefferal] = useState('')
    let html5QrCode

    function onScanSuccess(decodedText, decodedResult) {
        console.log(`Code matched = ${decodedText}`, decodedResult);

        setData(JSON.parse(decodedResult.result.text))
        setScanned(true)
        html5QrCode.stop()
        // TOAST SUCCESS HERE
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }

    function renderResult() {

        console.log(data)
        setName(data.name)
        setTicket(data.ticket)
        setRefferal(data.refferal)
        setPhone(data.phone)

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

    }, [])

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
                            <Button colorScheme='purple' onClick={renderResult}>SEE RESULT!</Button>
                        </Flex>
                    </ButtonGroup>

                    <Heading>RESULT</Heading>
                    <FormControl mb={4} hidden={scanned ? false : true}>
                        <Flex
                            flexDir={'column'}
                            gap={4}
                            color={'gray.200'}>

                            <label>Nama</label>
                            <Input type="text"
                                placeholder="Nama anda"
                                autoComplete="off"
                                focusBorderColor='purple.500'
                                value={name == '' ? 'nama' : name}
                                readOnly
                                controlled="true"
                                required />

                            <label>No Handphone</label>
                            <Input type="number"
                                placeholder="No Handhpone"
                                autoComplete="off"
                                focusBorderColor='purple.500'
                                value={phone == '' ? 'Phone' : phone}
                                readOnly
                                controlled="true"
                                required />

                            <label>Kode Refferal</label>
                            <Input type="text"
                                placeholder="Code Referral"
                                autoComplete="off"
                                focusBorderColor='purple.500'
                                textTransform={'uppercase'}
                                fontWeight={'medium'}
                                letterSpacing={'1px'}
                                value={refferal == '' ? 'Kode' : refferal}
                                readOnly
                                controlled="true"
                                required />

                            <label>Jenis Tiket</label>
                            <Input type="text"
                                placeholder="Paket"
                                autoComplete="off"
                                focusBorderColor='purple.500'
                                controlled="true"
                                value={ticket == '' ? 'Ticket' : ticket}
                                readOnly
                                required />
                        </Flex>
                    </FormControl>
                </Flex>



            </Flex>

        </>
    )
}

export default Scan