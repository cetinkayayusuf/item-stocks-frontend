import { authService } from "../../services";
import Cookies from "js-cookie";
import { User } from "../../types";

export const useRegister = () => {
    const register = async (username: string, email: string, password: string) => {
        const user = await authService.register(username, email, password);
        if (user) {
            Cookies.set("currentUser", JSON.stringify(user));
        }
        return user as User;
    };

    return { register };
};