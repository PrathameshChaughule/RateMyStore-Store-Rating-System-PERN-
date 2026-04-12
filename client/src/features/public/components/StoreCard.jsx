function StoreCard({ image, rating, badge, badgeClass, address, name, description, extra, offsetTop }) {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${offsetTop ? "lg:mt-12" : ""
        }`}
    >
      <div className="relative overflow-hidden h-70">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 sm:px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-amber-600 flex items-center gap-1">
          <span
            className="material-symbols-outlined text-xs"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          {rating}
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
          {name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-5 sm:mb-6">{description}</p>
        <p className="text-slate-500 text-xs sm:text-sm mb-4 flex items-start gap-1.5">
          <span
            className={`material-symbols-outlined select-none leading-none text-sm flex-shrink-0 text-slate-400`}
            style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
          >
            location_on
          </span>
          {address}
        </p>
        <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-slate-100">
          {extra}
          <button className="text-sky-600 font-bold text-sm hover:underline">View Reviews</button>
        </div>
      </div>
    </div>
  );
}

export default StoreCard