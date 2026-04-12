import { useState } from 'react';
import StoreCard from './StoreCard'

function TrendingStores() {
    const [count, setCount] = useState(0)
    const IMAGES = {
        cafe: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8NBVlbr-bqBgMMoWuPa4okt2TBNyaGRxUsX0SYDaTclnYuLfBnaxtDSYXbJTDYSITkFFYH_NSu6v7uyI9bwi6xhj2vNt0asmutun9KZNf7NPXX4opjJVTl1ASjgkZpMERcSrW8I7nkZQsDb6HfRvhgIPvBWJ4lmtoGBZucErqzUI6hcZt57ohOdPCk7z67aBbnJjOiRh5RMkY36W26vAauPXnhdNJLBJ7hb0n0KmIFJRjHxrJ9XLb6Imt_DMmoDNoklZBAlRSAK4",
        market: "https://lh3.googleusercontent.com/aida-public/AB6AXuDembC8WhSE9reMlkmtkSc239_gax8DEnQnoDqg5G77NVgW8duufyPYQQ_yVGPzvgNwGEDtAZ_OuNd8F0ONHwREHa5P_3YnP9p-7GcQL2HJxdF2y7j0PhMmDyAVhNd8iCu9y9mN_nclBKPstSMGuoYcyF3ldcdaYUSnfn6MBLvTBpPgU9MS_oitl0l5Zh-wTOzMupEPeJSAGrvPMz2tnmyjSx6vvzlTRyk8I67Sk5VQcEt5psM9lfRC39_xzHuhAjvcsUQyjc_2xVM",
        studio: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw3KrNaGB09xt1IvAACdWOsrXXrXtakAm7L75pddirpKiO_uyUPNBNtPswB70ur9Eo0qaiBYDQ60dD30L98LC6yoboSXJ2vcrA7yawJGP14LtY1uhycK0wT31VhKaDdYvuXxwLUH9BqJgA3Nypa5cUd8MoVVQL00zD8wlUbnXTrCzLasSfRzDF7QSnEtJ0uITyoGXfvo8QZ4ePZonj7xeyTs100LxE1yVuhH1mQ_B4L8NRq5M4zFPhyJ3flu3AqyfSVqLR6SyyppY",
    };
    const stores = [
        {
            image: IMAGES.cafe,
            imageHeight: 280,
            rating: "4.9",
            badge: "Premium Coffee",
            badgeClass: "bg-teal-600 text-teal-100",
            name: "The Glass House",
            address: "77 Rose Ave, Venice, CA 90291",
            description:
                "Experience artisan coffee in a botanical-inspired environment. Known for their cold brew and house-made pastries.",
            extra: (
                <div className="flex -space-x-2">
                    {["bg-slate-200", "bg-slate-300", "bg-slate-400"].map((bg, i) => (
                        <div key={i} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white ${bg}`} />
                    ))}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-sky-600 text-[9px] sm:text-[10px] text-white flex items-center justify-center font-bold">
                        +12
                    </div>
                </div>
            ),
        },
        {
            image: IMAGES.market,
            imageHeight: 220,
            rating: "4.7",
            badge: "Organic Market",
            badgeClass: "bg-amber-500 text-amber-950",
            name: "Roots & Shoots",
            address: "14 Grand Central Pkwy, Queens, NY",
            description:
                "Your neighborhood source for locally grown organic produce and sustainable household goods.",
            offsetTop: true,
            extra: (
                <div className="flex -space-x-2">
                    {["bg-slate-200", "bg-slate-300", "bg-slate-400"].map((bg, i) => (
                        <div key={i} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white ${bg}`} />
                    ))}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-sky-600 text-[9px] sm:text-[10px] text-white flex items-center justify-center font-bold">
                        +12
                    </div>
                </div>
            ),
        },
        {
            image: IMAGES.studio,
            imageHeight: 340,
            rating: "4.9",
            badge: "Luxury Apparel",
            badgeClass: "bg-sky-600 text-white",
            name: "Minimalist Studio",
            address: "848 Washington Blvd, Venice, CA 9029",
            description:
                "Curated fashion for the modern professional. Timeless pieces designed for quality and longevity.",
            extra: (
                <div className="flex -space-x-2">
                    {["bg-slate-200", "bg-slate-300", "bg-slate-400"].map((bg, i) => (
                        <div key={i} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white ${bg}`} />
                    ))}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-sky-600 text-[9px] sm:text-[10px] text-white flex items-center justify-center font-bold">
                        +12
                    </div>
                </div>
            ),
        },
        {
            image: IMAGES.cafe,
            imageHeight: 280,
            rating: "4.9",
            badge: "Premium Coffee",
            badgeClass: "bg-teal-600 text-teal-100",
            name: "The Glass House",
            address: "77 Rose Ave, Venice, CA 90291",
            description:
                "Experience artisan coffee in a botanical-inspired environment. Known for their cold brew and house-made pastries.",
            extra: (
                <div className="flex -space-x-2">
                    {["bg-slate-200", "bg-slate-300", "bg-slate-400"].map((bg, i) => (
                        <div key={i} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white ${bg}`} />
                    ))}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-sky-600 text-[9px] sm:text-[10px] text-white flex items-center justify-center font-bold">
                        +12
                    </div>
                </div>
            ),
        },
        {
            image: IMAGES.market,
            imageHeight: 220,
            rating: "4.7",
            badge: "Organic Market",
            badgeClass: "bg-amber-500 text-amber-950",
            name: "Roots & Shoots",
            address: "14 Grand Central Pkwy, Queens, NY",
            description:
                "Your neighborhood source for locally grown organic produce and sustainable household goods.",
            offsetTop: true,
            extra: (
                <div className="flex -space-x-2">
                    {["bg-slate-200", "bg-slate-300", "bg-slate-400"].map((bg, i) => (
                        <div key={i} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white ${bg}`} />
                    ))}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-sky-600 text-[9px] sm:text-[10px] text-white flex items-center justify-center font-bold">
                        +12
                    </div>
                </div>
            ),
        },
        {
            image: IMAGES.studio,
            imageHeight: 340,
            rating: "4.9",
            badge: "Luxury Apparel",
            badgeClass: "bg-sky-600 text-white",
            name: "Minimalist Studio",
            address: "848 Washington Blvd, Venice, CA 9029",
            description:
                "Curated fashion for the modern professional. Timeless pieces designed for quality and longevity.",
            extra: (
                <div className="flex -space-x-2">
                    {["bg-slate-200", "bg-slate-300", "bg-slate-400"].map((bg, i) => (
                        <div key={i} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white ${bg}`} />
                    ))}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-sky-600 text-[9px] sm:text-[10px] text-white flex items-center justify-center font-bold">
                        +12
                    </div>
                </div>
            ),
        },
    ];

    return (
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-14 lg:mb-16 gap-4 sm:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                        <span className="text-sky-600 font-extrabold tracking-widest uppercase text-[11px]">
                            Featured Exhibits
                        </span>
                        <h2
                            className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Trending Stores
                        </h2>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setCount(prev => prev - 3)}
                            disabled={count == 0}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all border border-slate-300 text-slate-500 hover:border-sky-500 hover:text-sky-600`}
                        >
                            <span className="material-symbols-outlined text-lg sm:text-xl">west</span>
                        </button>
                        <button
                            onClick={() => setCount(prev => prev + 3)}
                            disabled={count === stores.length - 3}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all bg-sky-600 text-white shadow-lg shadow-sky-200`}
                        >
                            <span className="material-symbols-outlined text-lg sm:text-xl">east</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
                    {stores.slice(count, count + 3).map((store) => (
                        <StoreCard key={store.name} {...store} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TrendingStores