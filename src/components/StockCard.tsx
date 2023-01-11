import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack, HStack, Button, CardBody, Card, VStack,
} from '@chakra-ui/react';
import {Item} from "../types";
import React from "react";

interface StockCardProps {
    id?: number;
    name: string,
    description: string,

    amount: number,
    item: Item,
    onEdit?: (id: number) => void
}

export default function StockCard({id, name, description, amount, item, onEdit}: StockCardProps) {
    return (
        <Center>
            <Box
                role={'group'}
                px={4}
                py={2}
                maxW={'500px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'md'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <VStack align={'left'} w={'full'}>
                    {item &&
                        <Card>
                            <CardBody>
                                <Heading size='sm'>Item</Heading>
                                <Text pt={2}>Code : {item?.code}</Text>
                                <Text pt={2}>Name : {item?.name}</Text>
                                <Text pt={2}>Description : {item?.description}</Text>
                            </CardBody>
                        </Card>
                    }
                    {name &&
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            {name}
                        </Heading>
                    }
                    {description && description !== '' &&
                        <Text color={'gray.600'}>
                            {description}
                        </Text>
                    }
                    {amount &&
                        <Text color={'gray.600'}>
                            {amount}
                        </Text>
                    }

                    {onEdit &&
                        <Button onClick={() => onEdit(id as number)}>
                            Edit
                        </Button>
                    }
                </VStack>
            </Box>
        </Center>
    );
}
