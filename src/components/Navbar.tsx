import React, {ReactNode, useEffect} from 'react';
import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack, Text, Spacer,
} from '@chakra-ui/react';
import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons';
import {NextRouter, useRouter} from "next/router";
import {useLogout} from "../hooks/auth/useLogout";
import {UserContextType} from "../types/userContext.type";
import {UserContext} from '../contexts/userContext';

const Links = ['Items', 'Stocks'];

const NavLink = ({link, router}: { link: string, router:NextRouter}) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        onClick={() => router.push(`/${link.toLowerCase()}`)}
    >
        {link}
    </Link>
);

export default function Navbar() {
    const router = useRouter();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {user, updateUser} = React.useContext(UserContext) as UserContextType;

    const {logout} = useLogout();

    const handleLogin = () => router.push("/login");
    const handleRegister = () => router.push("/register");
    const handleLogout = () => {
        logout();
        router.push("/");
        updateUser(null);
    }
    return (
        <>
            <Box
                px={4}
                bg={useColorModeValue('gray.200', 'gray.800')}
            >
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
                        aria-label={'Open Menu'}
                        display={{md: 'none'}}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{base: 'none', md: 'flex'}}>
                            {Links.map((link) => (
                                <NavLink key={link} link={link} router={router}/>
                            ))}
                        </HStack>
                    </HStack>
                    {user ?
                        <Flex alignItems={'center'}>
                            <Text>{`Hello ${user.username}`}</Text>
                            <Spacer px={4}/>
                            <Button
                                variant={'solid'}
                                colorScheme={'teal'}
                                size={'sm'}
                                mr={4}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Flex>
                        :
                        <Flex alignItems={'center'}>
                            <Button
                                variant={'solid'}
                                colorScheme={'teal'}
                                size={'sm'}
                                mr={4}
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                            <Button
                                variant={'outline'}
                                colorScheme={'teal'}
                                size={'sm'}
                                mr={4}
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                        </Flex>
                    }
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{md: 'none'}}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link} link={link} router={router}/>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}