const Footer = () => {
    return (
        <div>
            <footer className="block">
                <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
                    <div className="sm:flex-row flex justify-between flex-col">
                </div>
                <div className="mb-14 w-full border-b border-black mt-16"></div>
                <div className="md:flex-row flex justify-between sm:items-center sm:flex-col items-start flex-col-reverse">
                <div className="font-semibold mb-4 sm:mb-0 py-1 text-center sm:text-center">
                    <a href="#" className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"> About </a>
                    <a href="#" className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"> Features </a>
                    <a href="#" className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"> Works </a>
                    <a href="#" className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"> Support </a>
                    <a href="#" className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"> Help </a>
                </div>
                <p className="text-gray-500 text-sm sm:text-base"> © Copyright 2021. All rights reserved. </p>
                </div>
            </div>
            </footer>
        </div>
    )
}
Footer.displayName = "Footer";
export default Footer;