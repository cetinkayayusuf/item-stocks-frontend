import axios, {AxiosError} from "axios";
import {getAuthorizationHeader} from '../lib/getAuthorizationHeader';
import {Item} from "../types";

export class ItemService {
    protected readonly baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
    }

    getAll = async (): Promise<Item[]> => {
        try {
            return await axios.get(this.baseUrl + "/all", {
                headers: {
                    ...getAuthorizationHeader()
                }
            }).then((res) => {
                console.log({...res.data})
                return res.data;
            });
        } catch (e) {
            const error = e as Error | AxiosError;
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    throw new Error('Api Request Failed', error);
                } else if (error.request) {
                    throw new Error('Cannot connect to api', error);
                } else {
                    throw new Error('Cannot process request');
                }
            } else {
                throw new Error('Cannot process request');
            }
        }
    };

    search = async (searchParam : string) => {
        return await axios.post(this.baseUrl + "/search", {
            name: searchParam,
        }, {
            headers: {
                ...getAuthorizationHeader(),
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log({...res.data})
            return res.data;
        });
    };
}