import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React, {useState} from "react";

interface SignInCardProps {
    onSubmit: (input : any) => void,
    onChangeToRegister : () => void
}

export default function SignInCard({onSubmit, onChangeToRegister} : SignInCardProps) {
    const [input, setInput] = useState({
        username: "",
        password: "",
    })
    const handleUsernameChange = (e: any) => {
        setInput({...input, username: e.target.value});
    }
    const handlePasswordChange = (e: any) => {
        setInput({...input, password: e.target.value});
    }
    const handleSubmit = () => {
        onSubmit(input);
    }

    const handleChangeToRegister = () => {
        onChangeToRegister();
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input type="text" onChange={handleUsernameChange}/>
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" onChange={handlePasswordChange}/>
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSubmit}
                            >
                                Sign in
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                New user? <Link color={'blue.400'} onClick={handleChangeToRegister}>Register</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}