import { Block } from "./block";

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    date: Block[] | [];
}