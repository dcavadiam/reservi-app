import { Block } from "@/types/block";
import { UserContextType } from "@/types/context";
import { User } from "@/types/user";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Create a context object
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component that will wrap your app and make the context available to any child component
export function UserProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>([]);


    // initialize the users array with the localStorage data if it exists
    useEffect(() => {
        if (typeof window !== "undefined") {
            const users = localStorage.getItem("reservi-users") ? JSON.parse(localStorage.getItem("reservi-users")!) : []
            setUsers(() => users);
        }
    }, []);


    // Add a new user to the users array
    const addUser = (user: User) => {
        const newUsers = [...users, user];
        setUsers(() => newUsers);
        localStorage.setItem("reservi-users", JSON.stringify(newUsers));

    };

    // Edit a user in the users array
    const editUser = (id: string, updatedUser: Partial<User>) => {
        const newUsers = users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user));
        setUsers(() => newUsers);
        localStorage.setItem("reservi-users", JSON.stringify(newUsers));
    };

    // Delete a user from the users array
    const deleteUser = (id: string) => {
        const newUsers = users.filter((user) => user.id !== id);
        setUsers(() => newUsers);
        localStorage.setItem("reservi-users", JSON.stringify(newUsers));
    };

    // Add date to a user
    const addDate = (id: string, date: Block) => {
        const newUsers = users.map((user) => (user.id === id ? { ...user, date: [...user.date, date] } : user));
        setUsers(() => newUsers);
        localStorage.setItem("reservi-users", JSON.stringify(newUsers))
    }
    // Edit date of a user
    // const editDate = (id: string, date: Block) => {
    //     const newUsers = users.map((user) => (user.id === id ? { ...user, date: date } : user));
    //     setUsers(() => newUsers);
    //     localStorage.setItem("reservi-users", JSON.stringify(newUsers));
    // };

    return (
        <UserContext.Provider value={{ users, addUser, editUser, deleteUser, addDate }}>
            {children}
        </UserContext.Provider>
    );
}


// Use the useUserContext hook to access the users array and other functions
export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}