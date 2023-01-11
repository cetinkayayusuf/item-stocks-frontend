import { useRouter } from "next/router";
import { useRegister } from "../src/hooks/auth/useRegister";
import SignUpCard from "../src/components/SignUpCard";
import React from "react";
import {UserContextType} from "../src/types/userContext.type";
import {UserContext} from "../src/contexts/userContext";

export default function Login() {
    const { register } = useRegister();
    const router = useRouter();
    const {updateUser } = React.useContext(UserContext) as UserContextType;

    const onSubmit = (input: {username: string, email: string, password:string}) => {
        if (!input.username || !input.password) {
            alert("Please enter information");
        } else {
            register(input.username, input.email, input.password)
                .then((res) => {router.push("/"); updateUser(null)})
                .catch((e) => alert(e));
        }
    };
    const handleChangeToLogin = () => router.push("/login");

    return (
        <SignUpCard onSubmit={onSubmit} onChangeToLogin={handleChangeToLogin}></SignUpCard>
    );
}