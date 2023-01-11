import Head from 'next/head'
import {Button, Heading, Text, VStack} from "@chakra-ui/react";
import React from "react";
import {UserContext} from "../src/contexts/userContext";
import {UserContextType} from "../src/types";
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter();
    const {user} = React.useContext(UserContext) as UserContextType;
    return (
        <>
            <Head>
                <title>Item Stocks Management App</title>
                <meta name="description" content="Item Stocks Management Application "/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <VStack>
                    <Heading>
                        Welcome to Item Stocks Management App!
                    </Heading>

                    {user ?
                        <>
                            <Text fontSize='3xl'>{`Hello ${user.username}`}</Text>
                            <Button onClick={() => router.push('/items')}>Items</Button>
                            <Button onClick={() => router.push('/stocks')}> Stocks </Button>
                        </>
                        :
                        <Text fontSize='3xl'>{"You are not logged in !"}</Text>
                    }
                </VStack>
            </main>
        </>
    )
}
