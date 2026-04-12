import { jwtDecode } from "jwt-decode";
import Icon from "./Icon";
import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen, onClose }) {
    const NAV_ITEMS = [
        { icon: "dashboard", label: "Dashboard", active: true, path: "/admin/dashboard" },
        { icon: "group", label: "Users", active: false, path: "/admin/dashboard/userData" },
        { icon: "store", label: "Stores", active: false, path: "/admin/dashboard/storedata" },
        // { icon: "settings", label: "Settings", active: false },
    ];
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const content = (
        <div className="flex flex-col h-full">

            {/* ── Logo / heading ── */}
            <div className="px-5 py-6 flex items-center justify-between">
                <div>
                    <h2
                        className="text-base font-extrabold text-slate-900 tracking-tight"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Admin Panel
                    </h2>
                    <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                        Management Console
                    </p>
                </div>
                {/* Close button — mobile drawer only */}
                <button
                    className="lg:hidden p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                    onClick={onClose}
                >
                    <Icon name="close" className="text-slate-500 text-xl" />
                </button>
            </div>

            {/* ── Nav links ── */}
            <nav className="flex flex-col gap-1 px-3 flex-grow">
                {NAV_ITEMS.map(({ icon, label, path }) => (
                    <NavLink
                        key={label}
                        to={path}
                        end={path === "/admin/dashboard"}
                        onClick={onClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
                            ${isActive
                                ? "bg-[#F1F5F9] text-sky-600 shadow-sm"
                                : "text-slate-500 hover:bg-white/60 hover:text-slate-800"
                            }`
                        }
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        {({ isActive }) => (
                            <>
                                <Icon
                                    name={icon}
                                    fill={isActive ? 1 : 0}
                                    className={`text-xl transition-transform duration-200 group-hover:translate-x-0.5
                                    ${isActive ? "text-sky-600" : "text-slate-400"}`}
                                />

                                {label}

                                {isActive && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-500" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* ── Admin profile footer ── */}
            <div className="m-3 p-3 flex items-center gap-3 bg-white/70 rounded-2xl border border-slate-100">
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7BlkqXfyaDAuzl_5mbAseZWQPciG_o7mEyXEoTb6lpcrK-mxuXr2V17F4N5PZnICxf8UvNypgYLsmuwwEX0Pr0u4XyawrhYTCS-VmtGc832thY2UAse_X3hnewqMPpKhGNHg2ha589_kzC4Smj7s8qal4tL5vxcb0OQQUIMyu7UWR5Ae4vewbvTLbTqkFyt-Jr4RO9q00ct0U2MOZHgN1bE8hU11H2H0iE2TF3riYIQLqBJInOv1tGs3dxx36zaqfJ1oTNnF_-CI"
                    alt="Admin"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm flex-shrink-0"
                />
                <div className="overflow-hidden flex-1 min-w-0">
                    <p
                        className="font-extrabold text-xs text-slate-800 truncate"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        {decoded.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold">Super Admin</p>
                </div>
                <button className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
                    <Icon name="more_vert" className="text-slate-400 text-base" />
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* ── Desktop sidebar (always visible lg+) ── */}
            <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-slate-100 flex-shrink-0">
                {content}
            </aside>

            {/* ── Mobile drawer + backdrop ── */}
            {sidebarOpen && (
                <>
                    {/* Dim backdrop — tap to close */}
                    <div
                        className="lg:hidden fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    {/* Slide-in drawer */}
                    <aside className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-slate-50 z-50 flex flex-col shadow-2xl">
                        {content}
                    </aside>
                </>
            )}
        </>
    );
}

export default Sidebar