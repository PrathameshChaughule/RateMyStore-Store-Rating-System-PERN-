import { useDispatch } from "react-redux";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../app/features/authSlice";

function Navbar({ onMenuClick }) {
    const dispatch = useDispatch()
    const nav = useNavigate()

    const logoutUser = () => {
        nav('/')
        dispatch(logout())
    }
    return (
        <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-slate-100 shadow-sm flex-shrink-0">
            <div className="flex justify-between items-center h-14 sm:h-16 px-4 sm:px-6">

                {/* Left — hamburger · brand · search */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Hamburger — mobile only, triggers sidebar open */}
                    <button
                        className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors active:scale-95"
                        onClick={onMenuClick}
                    >
                        <Icon name="menu" className="text-slate-600 text-xl" />
                    </button>

                    <span
                        className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        RateMyStore
                    </span>

                    {/* Search — md and above */}
                    <div className="relative hidden md:block">
                        <Icon
                            name="search"
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Search analytics..."
                            className="bg-slate-100 border-none rounded-full pl-9 pr-4 py-2 text-sm w-48 lg:w-64 outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                        />
                    </div>
                </div>

                {/* Right — actions */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Mobile search icon only */}
                    <button className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors">
                        <Icon name="search" className="text-slate-500 text-xl" />
                    </button>

                    {/* Notifications with badge */}
                    <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors active:scale-95">
                        <Icon name="notifications" className="text-slate-500 text-xl" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
                    </button>

                    {/* Logout */}
                    <button onClick={logoutUser} className="p-2 rounded-xl hover:bg-slate-100 transition-colors active:scale-95">
                        <Icon name="logout" className="text-slate-500 text-xl" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar