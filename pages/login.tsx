import { useRouter } from "next/router";
import { useLogin } from "../src/hooks/auth/useLogin";
import SignInCard from "../src/components/SignInCard";
import React from "react";
import {UserContextType} from "../src/types/userContext.type";
import {UserContext} from "../src/contexts/userContext";

export default function Login() {
    const { login } = useLogin();
    const router = useRouter();
    const {updateUser } = React.useContext(UserContext) as UserContextType;

    const handleSubmit = (input: {username: string, password:string}) => {
        if (!input.username || !input.password) {
            alert("Please enter information");
        } else {
            login(input.username, input.password)
                .then((res) => {router.push("/"); updateUser(null);})
                .catch((e) => alert(e));
        }
    };
    const handleChangeToRegister = () => router.push("/register");
    return (
        <SignInCard onSubmit={handleSubmit} onChangeToRegister={handleChangeToRegister}></SignInCard>
    );
}