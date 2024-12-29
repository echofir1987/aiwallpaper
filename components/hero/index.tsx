export default function Hero() {
    return (
        <div className="mx-auto w-full max-w-7xl px-5 py-5 md:px-10 md:py-10 text-center">
            <h2 className="text-2xl font-bold md:text-5xl text-primary flex flex-col gap-4 md:gap-6">
                <span>用 <span className="text-3xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">你的言语</span> ，</span>
                <span>定制 <span className="text-3xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">独一无二</span> 的视觉魔法！</span>
            </h2>
        </div>
    )
}