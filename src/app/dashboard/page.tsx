"use client"
import { Footer } from "@/containers/dashboard/footer";
import { Header } from "@/containers/dashboard/header";
import { Main } from "@/containers/dashboard/main";
import { TagsProvider } from "@/context/tagsContext";
import { UserProvider } from "@/context/userContext";

export default function Dashboard() {
    return (
        <>
            <UserProvider>
                <Header />
                <TagsProvider>
                    <Main />
                </TagsProvider>
                <Footer />
            </UserProvider>
        </>
    );
}