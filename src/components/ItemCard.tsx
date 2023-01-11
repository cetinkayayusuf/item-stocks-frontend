import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack, HStack, Button,
} from '@chakra-ui/react';

interface ItemCardProps {
    id: number;
    code: string;
    name: string,
    description: string,
    onAdd?: (id:number) => void

    onEdit?: (id:number) => void
}

export default function ItemCard({id, code, name, description, onAdd, onEdit}: ItemCardProps) {
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
                <HStack>
                    <Stack align={'left'} w={'full'}>
                        {code &&
                            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                {code}
                            </Text>
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
                    </Stack>
                    {onAdd &&
                        <Button colorScheme={'green'} onClick={()=>onAdd(id)}>
                            Add to Stock
                        </Button>
                    }
                    {onEdit &&
                        <Button onClick={()=>onEdit(id)}>
                            Edit
                        </Button>
                    }
                </HStack>
            </Box>
        </Center>
    );
}
