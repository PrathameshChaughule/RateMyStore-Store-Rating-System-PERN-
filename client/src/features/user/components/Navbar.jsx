import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../../app/features/authSlice'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const HERO_AVATARS = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC7BlkqXfyaDAuzl_5mbAseZWQPciG_o7mEyXEoTb6lpcrK-mxuXr2V17F4N5PZnICxf8UvNypgYLsmuwwEX0Pr0u4XyawrhYTCS-VmtGc832thY2UAse_X3hnewqMPpKhGNHg2ha589_kzC4Smj7s8qal4tL5vxcb0OQQUIMyu7UWR5Ae4vewbvTLbTqkFyt-Jr4RO9q00ct0U2MOZHgN1bE8hU11H2H0iE2TF3riYIQLqBJInOv1tGs3dxx36zaqfJ1oTNnF_-CI",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuALvL_3S_7Wk-Vn7OQx0t1-i6l3m-xZ6e3R2y1a=s96-c",
    ];
    const dispatch = useDispatch()
    const nav = useNavigate()

    const logoutUser = () => {
        nav('/')
        dispatch(logout())
    }
    return (
        <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-100 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo + Nav */}
                <div className="flex items-center gap-6 lg:gap-8">
                    <span
                        className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        RateMyStore
                    </span>
                    {/* Desktop nav */}
                    <nav className="hidden md:flex gap-5 lg:gap-6 items-center">
                        <NavLink
                            to="/"
                            className={`text-sm font-semibold pb-0.5 transition-colors duration-200 hover:text-sky-600 hover:border-b-2 hover:border-sky-600 text-slate-500 hover:text-slate-900 border-b-2 border-transparent`}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/user/stores"
                            className={`text-sm font-semibold pb-0.5 transition-colors duration-200 text-sky-600 border-b-2 border-sky-600`}
                        >
                            Explore
                        </NavLink>
                    </nav>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Search bar — hidden on xs, visible sm+ */}
                    <div className="relative hidden sm:block">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span
                                className={`material-symbols-outlined select-none leading-none text-slate-400 text-sm`}
                                style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
                            >
                                search
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Search stores..."
                            className="bg-slate-100 border-none rounded-full pl-9 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-sky-500/20 w-44 lg:w-64 outline-none transition-all"
                        />
                    </div>

                    {/* Logout */}
                    <button onClick={logoutUser} className="p-2 rounded-full hover:bg-slate-100 transition-colors active:scale-95">
                        <span
                            className={`material-symbols-outlined select-none leading-none text-slate-500 text-xl`}
                            style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
                        >
                            logout
                        </span>
                    </button>

                    {/* Avatar */}
                    <img
                        src={HERO_AVATARS[0]}
                        alt="Profile"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span
                            className={`material-symbols-outlined select-none leading-none text-slate-600 text-xl`}
                            style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
                        >
                            {menuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile nav drawer */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-3">
                    {/* Mobile search */}
                    <div className="relative mb-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span
                                className={`material-symbols-outlined select-none leading-none text-slate-400 text-sm`}
                                style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
                            >
                                search
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Search stores..."
                            className="w-full bg-slate-100 border-none rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                    </div>
                    {["Home", "Explore"].map((item, i) => (
                        <a
                            key={item}
                            href="#"
                            className={`text-sm font-semibold px-2 py-1.5 rounded-lg transition-colors ${i === 0
                                ? "text-sky-600 bg-sky-50"
                                : "text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}

export default Navbar