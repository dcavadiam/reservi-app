import { UserContextType } from "@/types/context";
import { User } from "@/types/user";
import { createContext, useContext, useState, ReactNode } from "react";

// Create a context object
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component that will wrap your app and make the context available to any child component
export function UserProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>(localStorage.getItem("reservi-users") ? JSON.parse(localStorage.getItem("reservi-users")!) : []);

    const addUser = (user: User) => {
        const newUsers = [...users, user];
        setUsers(() => newUsers);
        localStorage.setItem("reservi-users", JSON.stringify(newUsers));

    };

    const editUser = (id: string, updatedUser: Partial<User>) => {
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)));
        localStorage.setItem("reservi-users", JSON.stringify(users));
    };

    const deleteUser = (id: string) => {
        const newUsers = users.filter((user) => user.id !== id);
        setUsers(() => newUsers);
        localStorage.setItem("reservi-users", JSON.stringify(newUsers));
    };
    return (
        <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}