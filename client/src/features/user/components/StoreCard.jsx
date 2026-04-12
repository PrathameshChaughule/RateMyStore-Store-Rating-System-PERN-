function StoreCard({ store, setSelectedStore, setSelectedRating }) {
    const colors = [
        "#0ea5e9",
        "#10b981",
        "#f59e0b",
        "#ec4899",
        "#6366f1",
        "#ef4444",
        "#a855f7",
        "#14b8a6",
    ];
    const getColor = (name = "") => {
        if (!name) return "bg-slate-400";

        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }

        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };
    return (
        <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
            <div className="relative overflow-hidden h-70">
                <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 sm:px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-amber-600 flex items-center gap-1">
                    <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        star
                    </span>
                    {Number(store.rating || 0).toFixed(2)}
                </div>
            </div>
            <div className="p-5 sm:p-6 lg:p-8">
                {/* <span className={`text-xs font-extrabold px-2 py-0.5 rounded mb-3 sm:mb-4 inline-block uppercase tracking-wider ${badgeClass}`}>
          {badge}
        </span> */}
                <h3
                    className="text-xl sm:text-2xl font-bold mb-2 text-slate-900"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    {store.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5 sm:mb-6">{store.description}</p>
                <p className="text-slate-500 text-xs sm:text-sm mb-4 flex items-start gap-1.5">
                    <span
                        className={`material-symbols-outlined select-none leading-none text-sm flex-shrink-0 text-slate-400`}
                        style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
                    >
                        location_on
                    </span>
                    {store.address}
                </p>

                <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-slate-100">
                    <div className="flex -space-x-2 items-center">

                        {store.rated_users && store.rated_users.length > 0 &&
                            store.rated_users.slice(0, 3).map((user, i) => (
                                <div
                                    key={i}
                                    className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                                    style={{ backgroundColor: getColor(user.name) }}
                                    title={`${user.name} (${user.rating}★)`}
                                >
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                            ))}

                        {store.rated_users?.length > 3 && (
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-600 text-white text-[10px] flex items-center justify-center font-bold">
                                +{store.rated_users.length - 3}
                            </div>
                        )}

                    </div>
                    <button onClick={() => { setSelectedStore(store), setSelectedRating(store.user_rating || store.rating || 0); }} className="text-sky-600 font-bold text-sm hover:underline">View Reviews</button>
                </div>
            </div>


        </div>
    );
}

export default StoreCard