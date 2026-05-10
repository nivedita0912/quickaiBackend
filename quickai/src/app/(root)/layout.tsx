import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
        <NavBar/>
        <main className="root">
            <div className="root-container">
                <div className="wrapper">
                    {children}
                </div>
            </div>
        </main>
        <Footer/>
    </>
    )
}