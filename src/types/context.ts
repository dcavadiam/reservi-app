import { User } from "./user";

export interface UserContextType {
    users: User[];
    addUser: (user: User) => void;
    editUser: (id:string, updatedUser: Partial<User>) => void;
    deleteUser: (id:string) => void;
}