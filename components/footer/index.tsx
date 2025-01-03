const Footer = () => {
    return (
        <div>
            <footer className="block">
                <div className="mx-auto w-full max-w-7xl px-5 py-8 md:px-10 md:py-10">
                    <div className="sm:flex-row flex justify-between flex-col">
                    </div>
                    <div className="w-full border-b border-gray-500"></div>
                    <div className="md:flex-row flex justify-between sm:items-center sm:flex-col items-start flex-col-reverse">
                        <div className="font-semibold mb-4 sm:mb-0 py-1 text-center sm:text-center">
                            <a href="#" className="inline-block text-sm font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"> Created by AIKE </a>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm"> © Copyright 2024. All rights reserved. </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
Footer.displayName = "Footer";
export default Footer;