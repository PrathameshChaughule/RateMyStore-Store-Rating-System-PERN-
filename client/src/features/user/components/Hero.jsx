import React from 'react'

function Hero() {
    const HERO_AVATARS = [
        "https://plus.unsplash.com/premium_photo-1664298528358-790433ba0815?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        "https://img.freepik.com/free-photo/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses-with-straight-blonde-hair-expresses-positiveness-poses_176420-13176.jpg?semt=ais_hybrid&w=740&q=80",
        "https://cdn.getmerlin.in/cms/Screenshot_2024_04_05_130256_473f8428ec.png"
    ];
    return (
        <section className="relative min-h-[480px] sm:min-h-[520px] flex items-center pt-10 sm:pt-14 pb-16 sm:pb-20 overflow-hidden">
            {/* Radial gradient background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 70% 30%, rgba(14,165,233,0.12) 0%, transparent 60%)",
                }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
                {/* Left — text */}
                <div className="max-w-2xl">
                    {/* Live badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-600/10 text-sky-700 text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600" />
                        </span>
                        New Stores Added Today
                    </div>

                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 mb-6 sm:mb-8 leading-[1.08]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Discover the{" "}
                        <span className="bg-gradient-to-tr from-sky-600 via-sky-400 to-teal-400 bg-clip-text text-transparent">
                            Extraordinary
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed mb-8 sm:mb-10 max-w-lg">
                        Uncover the finest local gems curated by our discerning community. From artisan
                        roasters to hidden fashion archives, we rate the experiences that define your
                        neighborhood.
                    </p>

                    {/* CTA row */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <button className="bg-sky-600 text-white px-7 sm:px-10 py-3.5 sm:py-4 rounded-xl font-extrabold shadow-lg shadow-sky-500/25 hover:bg-sky-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-sm sm:text-base">
                            Get Started
                        </button>
                        {/* Avatars + count */}
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2.5">
                                {HERO_AVATARS.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt="user"
                                        className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover"
                                    />
                                ))}
                                <div className="w-9 h-9 rounded-full border-2 border-white shadow-sm bg-slate-200 flex items-center justify-center text-[10px] font-extrabold text-slate-600">
                                    +5k
                                </div>
                            </div>
                            <span className="text-sm font-medium text-slate-500">
                                Over 5,000 ratings submitted
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right — image composition (desktop only) */}
                <div className="relative hidden lg:block">
                    <div className="relative w-full aspect-square max-w-lg ml-auto">
                        {/* Main image */}
                        <div className="absolute top-0 right-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl rotate-2 bg-slate-200">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYNpn-wbvqlXJmPXi4UHuyT9OAQYyetCXscIMUfBZ2VJ4pwqM1zCz7G5XjPrtCn6HsGBL_OGcoMczr8aXCH2AeR3S5aRkMYs5yDcXbdV7N6LiDZVTdIpIMv0J2S2q0x-cHEthQC8fcyP1_Snw7Z59Lma-ex8rZGnyMqbfc0sWtbh_8fzIpDTbXTACDOZIjS-i9aE2bDB77NKPCsKfTODUlpLjFa6GhxQFWxpvy8_ocrOH8umxnvPZcJmZugt6kXImdUAA4huj2fUw"
                                alt="Premium lifestyle store"
                                className="w-full h-full object-cover opacity-90"
                            />
                        </div>

                        {/* Floating card */}
                        <div
                            className="absolute -bottom-8 -left-8 w-56 sm:w-64 p-5 sm:p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20"
                            style={{ animation: "float 4s ease-in-out infinite" }}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 flex-shrink-0">
                                    <span
                                        className={`material-symbols-outlined select-none leading-none text-xl`}
                                        style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
                                    >
                                        trending_up
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                                        Trending Choice
                                    </p>
                                    <h4 className="font-extrabold text-sm text-slate-800">The Urban Archive</h4>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (

                                    <span key={i}
                                        className={`material-symbols-outlined select-none leading-none text-amber-500 text-xs`}
                                        style={{ fontVariationSettings: "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24" }}
                                    >
                                        star
                                    </span>
                                ))}
                                <span className="text-xs font-bold ml-1 text-slate-800">4.9</span>
                            </div>
                        </div>

                        {/* Decorative blobs */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute top-1/2 -left-20 w-40 h-40 bg-teal-200/10 rounded-full blur-3xl pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero