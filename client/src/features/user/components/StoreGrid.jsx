import React, { useState } from 'react'
import FilterChips from './FilterChips'
import StoreCard from './StoreCard';

function StoreGrid() {
    const [activeFilter, setActiveFilter] = useState("All Boutiques");
    const STORES = [
        {
            id: 1,
            name: "The Urban Archive",
            address: "122 Mercer St, Soho, NY 10012",
            category: "Lifestyle",
            rating: "4.9",
            offsetTop: false,
            description:
                "Experience artisan coffee in a botanical-inspired environment. Known for their cold brew and house-made pastries.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuA8Uc0WapIcBnNS6p_I7WzrsATGKcm2FnNPqx9gBoBNEal5JTQzaZy0kd5-xptk519t_Ca36sXd2lQ-SODLSY2PemBhqF1bPvU-cjqTyXGdQt1Slb7tpZ21sBQ-Dw41tJK7vZwMVXjoyGi4WzRc5gt4jAd-nBzszESynmUg1w-CuYrW9PNw23bFcYlJpnMnD6OJacTWwsFny1Gloo5tlGXVUHWoTNDhFcFcpznkNRqiIzj1ZN5Ouu7Dd3B4A35RSlFmQOv4i_0dCGc",
            imgH: "h-64",
        },
        {
            id: 2,
            name: "Glass & Grain",
            address: "848 Washington Blvd, Venice, CA 90291",
            category: "Homeware",
            rating: "4.7",
            offsetTop: true,
            description:
                "Experience artisan coffee in a botanical-inspired environment. Known for their cold brew and house-made pastries.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBPYZbM7TFJ8wkZ8CeRc8aL0aIFnF-K-OACOYzGUugN3JKmv3jZmJ1QtQki_lMAjy-XlCbDskrXv3S9D3inKTXisvDJPpLyt29haS1yctPQ-qmzC-qDJMEACIMDUCuGuL6uV43CIPcfQz-9v-5IHKdwNZYqwE-8VGwKT4V7rDjMwPHjdB9O8saKHhxAlH7If-w5ESojB-_dmjuMDvLB9mXq78mYZjMRSU2F7-3yPDPHnQ9CuqLDqgkduzQwMKxC-UHu_yYFoaPyzGI",
            imgH: "h-56",
        },
        {
            id: 3,
            name: "The Daily Grind",
            address: "412 Broadway, East Village, NY 10003",
            category: "Coffee",
            rating: "4.8",
            offsetTop: false,
            description:
                "Experience artisan coffee in a botanical-inspired environment. Known for their cold brew and house-made pastries.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuA68ZrAwUYR4vKDCEq__Jt3iDx9eh7eAZfAPHKNLNWC_SnnKeb-zSgaRslePGVQRSEgmLIfF9HV-dWJDm4J_9TGeyv7sqKlkd9UcWepSrAulIJ0OQZDq0yBs85XoiyQSj0nuVV3nA0JVAVoyeWWFgvDI2gDbhLguANeMTkOXW4cVIi2LBZvFknywmHtq3w8KERvXNEiAkiNFlFMf4oQS2QvZnOatDgW1qHzyqGzCSUN3_wlJy_bvV1Gzgp0hGs4onRAUCht9n3uxGo",
            imgH: "h-72",
        },
        {
            id: 4,
            name: "Petals & Pots",
            address: "77 Rose Ave, Venice, CA 90291",
            category: "Floral",
            rating: "4.5",
            offsetTop: false,
            description:
                "Experience artisan coffee in a botanical-inspired environment. Known for their cold brew and house-made pastries.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCDXFqPCQBeQiSegF93Z0mqKOF8scD9AovIW-f_43ijXgmTh-DL7Mxc28fegimU6Enr8j5T8WlE6B2qOmKPjzGYaK1Pfr_v6iKEiyD23KXx1W8WjqvZLzx7whbH2Riw0zhgV8Eiz1UaFyvyIDk2FGT8BE9ak3QmDt7OSaOWkvVaMnEbCrjLmmkl78WES87S8OrdiMN4ZWLzPD-6z9DljgRNh2V3szFy5QIJ42N8Rx-nBZV9mf9E7DouzCC0pLz6YMl416Id_K_dBTQ",
            imgH: "h-60",
        },
        {
            id: 5,
            name: "Old World Deli",
            address: "14 Grand Central Pkwy, Queens, NY",
            category: "Grocer",
            rating: "4.6",
            offsetTop: true,
            negTop: true,
            description:
                "Experience artisan coffee in a botanical-inspired environment. Known for their cold brew and house-made pastries.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuABfn7c5qTbbsn90hREfERMzTJ88y7wWFocIas65JHdFehCS8sD4H1ub9yOlqWyrlVj5VIdLkRsBhafwbV9p5-waB9wOiHD0cahnpxrxReziXTc-sLlzP0nqaGVRNCe4AO3NhJkZg2YaYPmolqYK64EzFdaT53pFAEzVf-fecLstdfTTBfngpNTPMI4YVb1uJvcaBkP8DQJpJE9qxGWvuYm5DGm0RK9lMy6B6-lvO2Tec7uVVa3tAsTePfrB9aJ00NqjMA7j6FtjsA",
            imgH: "h-80",
        },
        {
            id: 6,
            name: "Spin Records",
            address: "22 Vinyl Way, Seattle, WA",
            category: "Music",
            rating: "5.0",
            offsetTop: false,
            description:
                "Experience artisan coffee in a botanical-inspired environment. Known for their cold brew and house-made pastries.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCXamFfxcDhOtiIveMleyxvFa4MUscooyGMTVHachcnx6KHVaaGFqnzXndLyt1cHkk8YN41OnV8eGN7Tgg4rKHiN3n5XEt2Ngh3yjku3HI9dHteR9L7opYFvdFe4b-wqIgBFhWFfFg6cuQ8PpkYKw63M4Uf-m85rvPLBGMBKDWoO_XMvCJ4JIXl97aeHsiPVHUXzmyBDiJv7vdUfRZvoTbCIsYzTWDauCK0GHpRhP6UXOf--e6MKTUIh77MhHOPlChNMIct4drXL6o",
            imgH: "h-64",
        },
    ];
    return (
        <section>
            <FilterChips active={activeFilter} onSelect={setActiveFilter} />

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-start">
                {STORES.map((store) => (
                    <StoreCard key={store.id} store={store} />
                ))}
            </div>

            {/* Load more */}
            <div className="mt-14 sm:mt-20 text-center">
                <button className="bg-sky-600 text-white px-7 sm:px-10 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-sky-500/25 hover:bg-sky-600/90 hover:-translate-y-0.5 active:scale-95 inline-flex items-center gap-2 font-extrabold hover:gap-4 transition-all duration-300 text-sm sm:text-base group">
                    Load more stores
                    <span
                        className={`material-symbols-outlined select-none leading-none text-xl group-hover:translate-x-1 transition-transform duration-300`}
                        style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
                    >
                        arrow_forward
                    </span>
                </button>
            </div>
        </section>
    );
}

export default StoreGrid