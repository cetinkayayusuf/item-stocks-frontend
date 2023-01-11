import React, {createContext, useEffect} from "react";
import {User} from "../types";
import {UserContextType} from "../types/userContext.type";
import Cookies from "js-cookie";


export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
    children: React.ReactNode
}

const UserContextProvider = ({children}: UserProviderProps) => {
    const [user, setUser] = React.useState<User | null>(null);

    useEffect(() => {
        const currentUser = Cookies.get("currentUser");
        if (currentUser) {
            setUser(JSON.parse(currentUser));
        }
    }, []);

    const updateUser = (newUser: User | null): void => {
        if(newUser) {
            setUser({...newUser})
        } else {
            const currentUser = Cookies.get("currentUser");
            if (currentUser) {
                setUser(JSON.parse(currentUser));
            } else {
                setUser(null);
            }
        }
    }
    return (
        <UserContext.Provider value={{user, updateUser}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;