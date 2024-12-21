import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Header() {
    return (
        <div>
            <section>
                <nav className="font-inter mx-auto h-auto w-full max-w-screen-2xl lg:relative lg:top-0">
                    <div className="flex items-center justify-between px-6 py-6 lg:px-10 lg:py-4 xl:px-20">
                        <a href="#" className="text-2xl font-bold">
                            AIwallpaper
                        </a>
                        
                        <div className="z-50">
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