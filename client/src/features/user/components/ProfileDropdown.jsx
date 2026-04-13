import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ decoded }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>

            <div className="relative">

                <div
                    onClick={() => setOpen(!open)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-600 to-sky-400 text-white flex items-center justify-center font-bold uppercase shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                    {decoded?.name?.charAt(0)}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
            </div>

            {/* DROPDOWN */}
            <div
                className={`hidden md:block absolute right-0 mt-3 w-60 rounded-2xl border border-slate-200 
                bg-white backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] 
                overflow-hidden z-50 transform transition-all duration-200 origin-top-right
                ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
            >

                {/* ARROW */}
                <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45 border-l border-t border-slate-200"></div>

                {/* USER INFO */}
                <div className="px-4 py-4 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900">
                        {decoded?.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                        {decoded?.email}
                    </p>
                </div>

                {/* ACTIONS */}
                <div className="p-2 space-y-1">

                    {/* Update Password */}
                    <button
                        onClick={() => {
                            navigate("/updatePassword");
                            setOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-all"
                    >
                        <span className="material-symbols-outlined text-base">
                            lock_reset
                        </span>
                        Update Password
                    </button>

                    {/* Divider */}
                    <div className="h-px bg-slate-100 my-1"></div>

                    {/* Logout */}
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/login");
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
                    >
                        <span className="material-symbols-outlined text-base">
                            logout
                        </span>
                        Logout
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProfileDropdown;