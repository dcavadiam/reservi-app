"use client"
import { Footer } from "@/containers/dashboard/footer";
import { Header } from "@/containers/dashboard/header";
import { Main } from "@/containers/dashboard/main/index";

export default function Dashboard() {
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    );
}