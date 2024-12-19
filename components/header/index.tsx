export default function Header() {
    return (
        <div>
            <section>
            <nav className="font-inter mx-auto h-auto w-full max-w-screen-2xl lg:relative lg:top-0">
                <div className="flex flex-col px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20">
                <a href="#" className="text-2xl font-bold">
                    AIwallpaper
                </a>
                <div className="mt-14 flex flex-col space-y-8 lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0">
                </div>
                <a href="#" className="absolute right-5 lg:hidden">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.75 12H20.25" stroke="#160042" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M3.75 6H20.25" stroke="#160042" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M3.75 18H20.25" stroke="#160042" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </a>
                </div>
            </nav>
            </section>
        </div>
    )
}