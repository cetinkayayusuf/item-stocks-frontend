import axios, {AxiosError} from "axios";
import {getAuthorizationHeader} from '../lib/getAuthorizationHeader';
import {Stock} from "../types";
import {StockUpdate} from "../types/stockUpdate.type";

export class StockService {
    protected readonly baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
    }

    getAll = async (): Promise<Stock[]> => {
        try {
            return await axios.get(this.baseUrl + "/all", {
                headers: {
                    ...getAuthorizationHeader()
                }
            }).then((res) => {
                console.log({...res.data})
                return res.data as Stock[];
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

    get = async (id: number): Promise<Stock | null> => {
        try {
            return await axios.get(this.baseUrl + `/${id}`, {
                headers: {
                    ...getAuthorizationHeader()
                }
            }).then((res) => {
                console.log({...res.data})
                return res.data as Stock;
            });
        } catch (e) {
            const error = e as Error | AxiosError;
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.dir(error.response.status)
                    if(error.response.status === 404)
                        return null;
                    else
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

    getByItem = async (itemId: number): Promise<Stock | null> => {
        try {
            return await axios.get(this.baseUrl + `/item/${itemId}`, {
                headers: {
                    ...getAuthorizationHeader()
                }
            }).then((res) => {
                console.log({...res.data})
                return res.data as Stock;
            });
        } catch (e) {
            const error = e as Error | AxiosError;
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.dir(error.response.status)
                    if(error.response.status === 404)
                        return null;
                    else
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

    save = async (stock: Stock): Promise<Stock | Boolean> => {
        try {
            return await axios.post(this.baseUrl + `/`, {
                name: stock.name,
                description: stock.description,
                itemId: stock.item.id,
                amount: stock.amount,
            }, {
                headers: {
                    ...getAuthorizationHeader(),
                    'Content-Type': 'application/json'
                }
            },).then((res) => {
                return res.data as Stock;
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

    update = async (id: number, stock: StockUpdate): Promise<Stock | null> => {
        try {
            console.dir({
                ...stock
            });
            return await axios.patch(this.baseUrl + `/${id}`, {
                ...stock
            }, {
                headers: {
                    ...getAuthorizationHeader(),
                    'Content-Type': 'application/json'
                }
            },).then((res) => {
                return res.data as Stock;
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

    delete = async (id: number): Promise<Boolean> => {
        try {
            return await axios.delete(this.baseUrl + `/${id}`, {
                headers: {
                    ...getAuthorizationHeader()
                }
            }).then((res) => {
                return (res.status === 200);
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
    search = async (searchParam : string) : Promise<Stock[]> => {
        return await axios.post(this.baseUrl + "/search", {
            name: searchParam,
        }, {
            headers: {
                ...getAuthorizationHeader(),
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.data as Stock[];
        });
    };
}