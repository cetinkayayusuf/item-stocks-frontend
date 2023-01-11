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
import {itemService, stockService} from "../../src/services";
import {Item} from "../../src/types/item.type";
import ItemCard from "../../src/components/ItemCard";
import {Stock} from "../../src/types";

export default function Items() {
    const toast = useToast();
    const [searchInput, setSearchInput] = useState<string>('')
    const [items, setItems] = useState<Item[]>([])
    const {isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose} = useDisclosure()
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const [stock, setStock] = useState<Stock | null>(null)
    const [newStock, setNewStock] = useState<Boolean>(true);

    useEffect(() => {
        try {
            itemService.getAll().then(itemsList => itemsList && setItems(itemsList));
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

    const handleSearchInputChange = (e: any) => {
        setSearchInput(e.target.value);
    }
    const handleSearch = () => {
        try {
            itemService.search(searchInput).then(itemsList => itemsList && setItems(itemsList));
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

    const handleAdd = async (itemId: number) => {
        const item = items.find(i => i.id === itemId)
        if (item) {
            setSelectedItem(item);
            try {
                await stockService.getByItem(itemId).then(data => {
                    if (data === null) {
                        setStock({
                            name: '',
                            description: '',
                            amount: 0,
                            item: item,
                        })
                        setNewStock(true);
                    } else {
                        setStock(data);
                        console.log('Stock Already Exist')
                        setNewStock(false);
                    }
                    onAddModalOpen();
                });
            } catch (e) {
                toast({
                    title: 'Get Failed',
                    description: (e as Error).message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
    }
    const handleStockNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStock({...stock, name: e.target.value} as Stock)
    }
    const handleStockDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStock({...stock, description: e.target.value} as Stock)
    }
    const handleStockAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStock({...stock, amount: Number(e.target.value)} as Stock)
    }
    const handleStockSave = async () => {
        try {
            if (newStock)
                await stockService.save(stock as Stock)
                    .then(savedStock => savedStock && onAddModalClose());
            else if (stock?.id != null)
                await stockService.update(stock.id, {
                    name: stock?.name,
                    description: stock?.description,
                    amount: stock?.amount,
                }).then(updatedStock => updatedStock && onAddModalClose());
        } catch (e) {
            toast({
                title: 'Save Failed',
                description: (e as Error).message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }
    return (
        <Box bg={useColorModeValue('gray.50', 'gray.800')}>
            <Head>
                <title>Items</title>
                <meta name="description" content="Item List"/>
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
                                    placeholder='Search Items ...'
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

                    {items.map((item: Item) => (
                        <ItemCard key={item.id} {...item} onAdd={handleAdd}/>
                    ))}
                </VStack>
                <Modal isOpen={isAddModalOpen} onClose={onAddModalClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Stock</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Stock name</FormLabel>
                                <Input placeholder='Stock name' value={stock?.name} onChange={handleStockNameChange}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Stock description</FormLabel>
                                <Input placeholder='Stock description' value={stock?.description}
                                       onChange={handleStockDescriptionChange}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Stock amount</FormLabel>
                                <NumberInput min={0}>
                                    <NumberInputField placeholder='Stock amount' value={stock?.amount}
                                                      onChange={handleStockAmountChange}/>
                                </NumberInput>
                            </FormControl>
                            <Divider py={2} variant={'ghost'}/>
                            <Card>
                                <CardBody>
                                    <Heading size='sm'>Item</Heading>
                                    <Text pt={2}>Code : {stock?.item.code}</Text>
                                    <Text pt={2}>Name : {stock?.item.name}</Text>
                                    <Text pt={2}>Description : {stock?.item.description}</Text>
                                </CardBody>
                            </Card>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onAddModalClose}>
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
