import { Block } from "./block";

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    date: Block[] | [];
}