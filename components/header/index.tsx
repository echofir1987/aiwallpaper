"use client"

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import { useEffect, useState } from "react";
import { PricingModal } from '../pricing/PricingModal';

export default function() {
    const [credits, setCredits] = useState(0);
    const [showPricingModal, setShowPricingModal] = useState(false);

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
                <nav className="mx-auto w-full max-w-7xl">
                    <div className="flex items-center justify-between px-5 py-6 md:px-10 md:py-4">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center gap-2">
                                <img src="/logo.svg" alt="AIwallpaper Logo" className="h-[38px] w-auto" />
                                <span className="text-xl font-bold text-primary">灵言壁境</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-4 z-50">
                            <SignedOut>
                                <SignInButton>
                                    <Button>登录</Button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <Button 
                                    variant="outline" 
                                    onClick={() => setShowPricingModal(true)}
                                    className="flex items-center gap-2"
                                >
                                    <span>积分：{credits}</span>
                                </Button>
                                <UserButton afterSignOutUrl="/"/>
                            </SignedIn>
                        </div>
                    </div>
                </nav>
            </section>
            <PricingModal 
                isOpen={showPricingModal} 
                onClose={() => setShowPricingModal(false)} 
            />
        </div>
    )
}