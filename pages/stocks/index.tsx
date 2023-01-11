import Head from 'next/head'
import {
    Box,
    Button, Card, CardBody, CardHeader,
    Center, Divider,
    FormControl,
    FormLabel, Heading,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberInput, NumberInputField,
    Text,
    useColorModeValue,
    useDisclosure, useToast,
    VStack
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {stockService} from "../../src/services";
import StockCard from "../../src/components/StockCard";
import {Stock} from "../../src/types";
import {StockUpdate} from "../../src/types/stockUpdate.type";

export default function Stocks() {
    const toast = useToast();
    const [searchInput, setSearchInput] = useState<string>('')
    const [stocks, setStocks] = useState<Stock[]>([])
    const {isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose} = useDisclosure()
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null)

    useEffect(() => {
        try {
            stockService.getAll().then(stocksList => stocksList && setStocks(stocksList));
        } catch (e) {
            toast({
                title: 'Get All Failed',
                description: (e as Error).message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }, [])

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }
    const handleSearch = () => {
        try {
            stockService.search(searchInput).then(stocksList => stocksList && setStocks(stocksList));
        } catch (e) {
            toast({
                title: 'Search Failed',
                description: (e as Error).message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }

    const handleEdit = (id: number) => {
        const stock = stocks.find(i => i.id === id)
        if (stock) {
            setSelectedStock(stock);
            onEditModalOpen();
        }
    }

    const handleStockNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedStock({...selectedStock, name: e.target.value} as Stock)
    }
    const handleStockDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedStock({...selectedStock, description: e.target.value} as Stock)
    }
    const handleStockAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedStock({...selectedStock, amount: Number(e.target.value)} as Stock)
    }
    const handleStockSave = async () => {
        if (selectedStock) {
            try {
                await stockService.update(selectedStock?.id as number, {
                    name: selectedStock?.name,
                    description: selectedStock?.description,
                    amount: selectedStock?.amount
                } as StockUpdate).then(updatedStock => updatedStock && setStocks([...stocks.map(s => s.id !== updatedStock.id ? s : updatedStock)]));
            } catch (e) {
                toast({
                    title: 'Update Failed',
                    description: (e as Error).message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
        onEditModalClose();
    }

    const handleStockDelete = async () => {
        if (selectedStock) {
            const deleteStockId = selectedStock?.id;
            try {
                await stockService.delete(deleteStockId as number).then(result => {
                    if ((result as Boolean))
                        setStocks([...stocks.filter(s => s.id !== deleteStockId)])
                });
            } catch (e) {
                toast({
                    title: 'Delete Failed',
                    description: (e as Error).message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
        onEditModalClose();
    }
    return (
        <Box bg={useColorModeValue('gray.50', 'gray.800')}>
            <Head>
                <title>Stocks</title>
                <meta name="description" content="Stock List"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <VStack py={10} align={'left'}>
                    <Center>
                        <Box
                            maxW={'330px'}
                            w={'full'}
                            bg={useColorModeValue('white', 'gray.800')}
                            rounded={'lg'}
                            pos={'relative'}
                        >
                            <InputGroup size='lg'>
                                <Input
                                    pr='4.5rem'
                                    type={'text'}
                                    placeholder='Search Stocks ...'
                                    onChange={handleSearchInputChange}
                                />
                                <InputRightElement width='5.5rem' right={1.5}>
                                    <Button h='2.25rem' size='lg' onClick={handleSearch}>
                                        Search
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                    </Center>

                    {stocks.map((stock: Stock) => (
                        <StockCard key={stock.id} {...stock} onEdit={handleEdit}/>
                    ))}
                </VStack>
                <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Stock</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Stock name</FormLabel>
                                <Input placeholder='Stock name' value={selectedStock?.name}
                                       onChange={handleStockNameChange}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Stock description</FormLabel>
                                <Input placeholder='Stock description' value={selectedStock?.description}
                                       onChange={handleStockDescriptionChange}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Stock amount</FormLabel>
                                <NumberInput min={0} value={selectedStock?.amount}>
                                    <NumberInputField placeholder='Stock amount'
                                                      onChange={handleStockAmountChange}/>
                                </NumberInput>
                            </FormControl>
                            <Divider py={2} variant={'ghost'}/>
                            <Card>
                                <CardBody>
                                    <Heading size='sm'>Stock</Heading>
                                    <Text pt={2}>Code : {selectedStock?.item.code}</Text>
                                    <Text pt={2}>Name : {selectedStock?.item.name}</Text>
                                    <Text pt={2}>Description : {selectedStock?.item.description}</Text>
                                </CardBody>
                            </Card>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={handleStockDelete}>
                                Delete
                            </Button>
                            <Button colorScheme='blue' mr={3} onClick={onEditModalClose}>
                                Close
                            </Button>
                            <Button colorScheme='green' onClick={handleStockSave}>Save</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </main>
        </Box>
    )
}
