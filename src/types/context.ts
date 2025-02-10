import { Block } from "./block";
import { User } from "./user";

export interface UserContextType {
    users: User[];
    addUser: (user: User) => void;
    editUser: (id:string, updatedUser: Partial<User>) => void;
    deleteUser: (id:string) => void;
    addDate: (id:string, date: Block) => void;
    // editDate: (id:string, date: object) => void;
}