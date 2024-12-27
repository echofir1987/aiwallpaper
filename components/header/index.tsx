"use client"

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import { useEffect, useState } from "react";

export default function() {
    const [credits, setCredits] = useState(0);

    const fetchUserInfo = async () => {
        const response = await fetch("/api/get-user-info",{
            method:"POST",
        })
        const {code,message,data} = await response.json();
        console.log("userInfo",data);
        if (data && data.credits) {
            setCredits(data.credits.left_credits)
        };
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <div>
            <section>
                <nav className="font-inter mx-auto h-auto w-full max-w-screen-2xl lg:relative lg:top-0">
                    <div className="flex items-center justify-between px-6 py-6 lg:px-10 lg:py-4 xl:px-20">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center">
                                <img src="/logo.svg" alt="AIwallpaper Logo" className="h-32 w-auto" />
                            </Link>
                        </div>
                        <div className="flex items-center gap-4 z-50">
                            <Link href="/pricing">
                                <Button variant="outline">credits:{credits}</Button>
                            </Link>
                            <SignedOut>
                                <SignInButton>
                                    <Button>登录</Button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton afterSignOutUrl="/"/>
                            </SignedIn>
                        </div>
                    </div>
                </nav>
            </section>
        </div>
    )
}