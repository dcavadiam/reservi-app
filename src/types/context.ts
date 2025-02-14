import { Block } from "./block";
import { Tag } from "./tag";
import { User } from "./user";

export interface UserContextType {
    users: User[];
    todayDate: Date;
    addUser: (user: User) => void;
    editUser: (id:string, updatedUser: Partial<User>) => void;
    deleteUser: (id:string) => void;
    addDate: (id:string, date: Block) => void;
    setTodayDate: React.Dispatch<React.SetStateAction<Date>>;
    // editDate: (id:string, date: object) => void;
}

export interface TagContextType {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}