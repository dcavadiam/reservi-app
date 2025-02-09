"use client"
import { Footer } from "@/containers/dashboard/footer";
import { Header } from "@/containers/dashboard/header";
import { Main } from "@/containers/dashboard/main/index";
import { UserProvider } from "@/context/userContext";

export default function Dashboard() {
    return (
        <>
            <UserProvider>
                <Header />
                <Main />
                <Footer />
            </UserProvider>
        </>
    );
}