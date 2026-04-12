import React from 'react'

function FilterChips({ active, onSelect }) {
    const FILTERS = ["All Boutiques", "Artisan Coffee", "Home Decor", "Fashion", "Gourmet"];
    return (
        <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mr-1 whitespace-nowrap flex-shrink-0">
                Filter By
            </span>
            {FILTERS.map((f) => (
                <button
                    key={f}
                    onClick={() => onSelect(f)}
                    className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${active === f
                        ? "bg-teal-100 text-teal-700 shadow-sm"
                        : "bg-white text-slate-700 hover:bg-slate-100 shadow-sm border border-slate-100"
                        }`}
                >
                    {f}
                </button>
            ))}
        </div>
    );
}

export default FilterChips