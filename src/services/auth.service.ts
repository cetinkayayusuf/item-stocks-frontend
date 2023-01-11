import axios, { AxiosInstance } from "axios";

export class AuthService {
    protected readonly instance: AxiosInstance;
    public constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: "Time out!",
        });
    }

    login = (username: string, password: string) => {
        return this.instance
            .post("/signin", {
                username,
                password,
            })
            .then((res) => {
                return {
                    username: res.data.username,
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                    roles: res.data.roles,
                };
            });
    };

    register = (username: string, email: string, password: string) => {
        return this.instance
            .post("/signup", {
                username,
                email,
                role: ['user'],
                password,
            })
            .then((res) => {
                return {
                    username: res.data.username,
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                    roles: res.data.roles,
                };
            });
    };

    refresh = (username: string, refreshToken: string) => {
        return this.instance
            .post("/refresh", {
                username,
                refreshToken,
            })
            .then((res) => {
                return {
                    username: res.data.username,
                    accessToken: res.data.accessToken,
                };
            });
    };

}