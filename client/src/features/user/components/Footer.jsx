import React from 'react'

function Footer() {
    const exploreLinks = ["Featured Stores", "New Openings", "Neighborhoods", "Categories"];
    const resourceLinks = ["Review Guidelines", "Help Center", "Contact Support", "Privacy Policy"];

    return (
        <footer className="mt-16 sm:mt-24 py-12 sm:py-16 bg-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                {/* Brand */}
                <div className="sm:col-span-2">
                    <span
                        className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 block mb-3 sm:mb-4"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        RateMyStore
                    </span>
                    <p className="text-slate-500 max-w-sm mb-5 sm:mb-6 text-sm sm:text-base leading-relaxed">
                        Elevating retail through community-driven quality assessments. Because every
                        store visit should be an experience worth sharing.
                    </p>
                    <div className="flex gap-3">
                        {["share", "alternate_email"].map((icon) => (
                            <a
                                key={icon}
                                href="#"
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-sky-400 hover:bg-sky-600 hover:text-white transition-all shadow-sm"
                            >
                                <span
                                    className={`material-symbols-outlined select-none leading-none text-lg`}
                                    style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
                                >
                                    {icon}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Explore */}
                <div>
                    <h4
                        className="font-extrabold text-slate-900 mb-4 sm:mb-6 text-sm sm:text-base"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Explore
                    </h4>
                    <ul className="space-y-3 sm:space-y-4">
                        {exploreLinks.map((link) => (
                            <li key={link}>
                                <a
                                    href="#"
                                    className="text-slate-500 hover:text-sky-600 transition-colors text-xs sm:text-sm"
                                >
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h4
                        className="font-extrabold text-slate-900 mb-4 sm:mb-6 text-sm sm:text-base"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Resources
                    </h4>
                    <ul className="space-y-3 sm:space-y-4">
                        {resourceLinks.map((link) => (
                            <li key={link}>
                                <a
                                    href="#"
                                    className="text-slate-500 hover:text-sky-600 transition-colors text-xs sm:text-sm"
                                >
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                <span className="text-xs text-slate-400">© 2026 RateMyStore Inc. All rights reserved.</span>
                <div className="flex gap-4 sm:gap-6 text-xs text-slate-400">
                    <a href="#" className="hover:text-sky-600 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-sky-600 transition-colors">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer