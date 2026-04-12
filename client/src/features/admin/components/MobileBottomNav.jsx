import React, { useState } from 'react'
import Icon from '../components/Icon'

function MobileBottomNav() {
    const [active, setActive] = useState("Home");
    const items = [
        { icon: "dashboard", label: "Home" },
        { icon: "group", label: "Users" },
        { icon: "store", label: "Stores" },
        { icon: "settings", label: "Settings" },
    ];

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg
      border-t border-slate-100 flex justify-around items-center h-16 z-30">
            {items.map(({ icon, label }) => {
                const isActive = active === label;
                return (
                    <button
                        key={label}
                        onClick={() => setActive(label)}
                        className="flex flex-col items-center gap-0.5 px-3 py-1 transition-all"
                    >
                        <Icon
                            name={icon}
                            fill={isActive ? 1 : 0}
                            className={`text-xl transition-colors ${isActive ? "text-sky-600" : "text-slate-400"}`}
                        />
                        <span
                            className={`text-[9px] font-extrabold tracking-wide ${isActive ? "text-sky-600" : "text-slate-400"
                                }`}
                        >
                            {label}
                        </span>
                        {isActive && <span className="w-1 h-1 rounded-full bg-sky-500 mt-0.5" />}
                    </button>
                );
            })}
        </nav>
    );
}

export default MobileBottomNav