import React from 'react'
import Icon from './Icon';

function StatsSection() {
    const STATS = [
        {
            label: "Total Users",
            value: "120",
            valueColor: "text-sky-600",
            blob: "bg-sky-500/5 group-hover:bg-sky-500/10",
            footer: { icon: "trending_up", text: "12% from last month", color: "text-teal-600" },
        },
        {
            label: "Total Stores",
            value: "45",
            valueColor: "text-slate-900",
            blob: "bg-teal-500/5 group-hover:bg-teal-500/10",
            footer: { icon: "check_circle", text: "4 new pending approval", color: "text-teal-600" },
        },
        {
            label: "Total Ratings",
            value: "320",
            valueColor: "text-slate-900",
            blob: "bg-amber-500/5 group-hover:bg-amber-500/10",
            footer: null,
        },
    ];
    return (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {STATS.map((s) => (
                <div
                    key={s.label}
                    className="bg-white p-6 sm:p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]
            flex flex-col justify-between min-h-[160px] sm:min-h-[180px]
            relative overflow-hidden group border border-slate-100"
                >
                    {/* Decorative blob */}
                    <div
                        className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl
              transition-all duration-500 pointer-events-none ${s.blob}`}
                    />

                    <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                            {s.label}
                        </span>
                        <div
                            className={`text-4xl sm:text-5xl font-black mt-2 ${s.valueColor}`}
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            {s.value}
                        </div>
                    </div>

                    {/* Footer row */}
                    {s.footer ? (
                        <div className={`flex items-center gap-2 text-sm font-semibold ${s.footer.color}`}>
                            <Icon name={s.footer.icon} className="text-sm" />
                            <span>{s.footer.text}</span>
                        </div>
                    ) : (
                        /* Stars for ratings card */
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(4)].map((_, i) => (
                                    <Icon key={i} name="star" fill={1} className="text-amber-500 text-base" />
                                ))}
                                <Icon name="star_half" fill={1} className="text-amber-500 text-base" />
                            </div>
                            <span className="text-xs text-slate-400 font-semibold">Avg 4.4 platform rating</span>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
}

export default StatsSection