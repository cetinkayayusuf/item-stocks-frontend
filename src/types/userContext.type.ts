import {User} from "./user.type";

export type UserContextType = {
    user: User | null;
    updateUser: (newUser: User | null) => void;
};