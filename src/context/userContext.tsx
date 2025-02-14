'use client';
import { isToday } from "@/helpers/isToday";
import { fetchRandomUsers } from "@/lib/api";
import { Block } from "@/types/block";
import { UserContextType } from "@/types/context";
import { Result } from "@/types/randomUsers";
import { User } from "@/types/user";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [todayDate, setTodayDate] = useState<Date>(new Date());

    // Load users from localStorage on mount
    useEffect(() => {
        const loadUsers = async () => {
            if (typeof window !== "undefined") {
                // If the localStorage has users, set them
                const storedUsers = localStorage.getItem("reservi-users");
                if (storedUsers) {
                    try {
                        const parsedUsers: User[] = JSON.parse(storedUsers);
                        setUsers(parsedUsers);
                    } catch (error) {
                        console.error("Error al parsear los usuarios desde localStorage", error);
                    }
                } else {
                    // If don't have users in localStorage, fetch them from the API
                    try {
                        const randomUsers = await fetchRandomUsers();
                        // Map the randomUsers to User type
                        const newUsers: User[] = randomUsers.map((user: Result) => ({
                            id: user.login.uuid,
                            name: `${user.name.first} ${user.name.last}`,
                            email: user.email,
                            phone: user.cell,
                            address: `${user.location.street.number} ${user.location.street.name}`,
                            date: []
                        }));
                        setUsers(newUsers);
                        localStorage.setItem("reservi-users", JSON.stringify(newUsers));
                    } catch (error) {
                        console.error("Error al obtener usuarios random:", error);
                    }
                }
            }
        };
        loadUsers();
    }, []);


    // update filteredUsers when users or todayDate change
    useEffect(() => {
        const userByDay = users.map((user: User) => {
            return {
                ...user,
                // Verify that user.date exists and is an array, if not, return an empty array
                date: Array.isArray(user.date)
                    ? user.date.filter((date: Block) => isToday(new Date(date.initialDate), todayDate))
                    : []
            };
        });
        setFilteredUsers(userByDay);
    }, [users, todayDate]);

    const addUser = (user: User) => {
        const newUsers = [...users, user];
        setUsers(newUsers);
        localStorage.setItem("reservi-users", JSON.stringify(newUsers));
    };

    const editUser = (id: string, updatedUser: Partial<User>) => {
        const newUsers = users.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user
        );
        setUsers(newUsers);
        localStorage.setItem("reservi-users", JSON.stringify(newUsers));
    };

    const deleteUser = (id: string) => {
        const newUsers = users.filter((user) => user.id !== id);
        setUsers(newUsers);
        localStorage.setItem("reservi-users", JSON.stringify(newUsers));
    };

    const addDate = (id: string, date: Block) => {
        const newUsers = users.map((user) =>
            user.id === id
                ? {
                    ...user,
                    date: Array.isArray(user.date) ? [...user.date, date] : [date]
                }
                : user
        );
        setUsers(newUsers);
        localStorage.setItem("reservi-users", JSON.stringify(newUsers));
    };

    return (
        <UserContext.Provider
            value={{
                users: filteredUsers,
                todayDate,
                addUser,
                editUser,
                deleteUser,
                addDate,
                setTodayDate,
            }}
        >
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
