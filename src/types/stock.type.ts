import {Item} from "./item.type";

export type Stock = {
    id?: number;
    name: string,
    description: string,
    amount: number,
    item: Item,
}