function Features() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 space-y-3 sm:space-y-4">
          <h2
            className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Everything you need to{" "}
            <span className="text-teal-600">shop smarter</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Our platform bridges the gap between customer feedback and business excellence.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

          {/* Card 1 — Rate Easily (wide) */}
          <div className="md:col-span-2 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-slate-200">
            <div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 mb-5 sm:mb-6">
                <span className="material-symbols-outlined text-2xl sm:text-3xl">rate_review</span>
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Rate stores easily
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
                Submit a review in under 30 seconds. Our intuitive interface makes it simple
                to share photos, rate specific aspects like service and cleanliness, and
                leave detailed feedback.
              </p>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-2">
              {["Quick Star Ratings", "Photo Uploads", "Verified Visits"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-100 text-xs sm:text-sm font-medium text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2 — View Ratings */}
          <div
            className="p-6 sm:p-8 lg:p-10 rounded-2xl text-white flex flex-col"
            style={{ background: "linear-gradient(135deg,#006591 0%,#0ea5e9 100%)" }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">analytics</span>
            </div>
            <h3
              className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              View store ratings
            </h3>
            <p className="text-white/80 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              Access detailed sentiment analysis and historical rating trends for any
              registered store in our database.
            </p>
            <div className="mt-auto space-y-2 sm:space-y-3">
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[85%]" />
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Customer Satisfaction</span>
                <span>4.8 / 5.0</span>
              </div>
            </div>
          </div>

          {/* Card 3 — Admin (full width) */}
          <div className="md:col-span-3 bg-slate-200 p-6 sm:p-8 lg:p-10 rounded-2xl flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
            <div className="flex-1 space-y-4 sm:space-y-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-teal-50 rounded-xl flex items-center justify-center text-teal-700">
                <span className="material-symbols-outlined text-2xl sm:text-3xl">admin_panel_settings</span>
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold text-slate-900"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Admin management system
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
                For business owners, we offer a powerful console to track reviews, respond
                to customers, and gain actionable insights into store performance.
              </p>
              <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2 w-fit">
                Business Dashboard
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>

            {/* Admin UI Mockup */}
            <div className="w-full lg:flex-1 lg:max-w-xl bg-white rounded-xl shadow-xl p-4 border border-slate-200/50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-slate-400">store</span>
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-slate-800">Store Performance</span>
                </div>
                <div className="flex gap-1">
                  {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
                    <div key={c} className={`w-2 h-2 rounded-full ${c}`} />
                  ))}
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex gap-3 sm:gap-4">
                  {[
                    { label: "Daily Reviews", value: "128", color: "text-sky-600" },
                    { label: "Response Rate", value: "94%", color: "text-teal-600" },
                  ].map((s) => (
                    <div key={s.label} className="flex-1 h-16 sm:h-20 bg-slate-50 rounded-lg p-2 sm:p-3">
                      <p className="text-[9px] sm:text-[10px] text-slate-400 font-extrabold uppercase tracking-tight mb-1">
                        {s.label}
                      </p>
                      <p
                        className={`text-lg sm:text-xl font-black ${s.color}`}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="h-24 sm:h-32 bg-slate-50 rounded-lg p-2 sm:p-3">
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-extrabold uppercase tracking-tight mb-2">
                    Trend Analysis
                  </p>
                  <div className="flex items-end justify-between h-12 sm:h-16 px-2 gap-1">
                    {[0.5, 0.75, 0.33, 0.85, 0.67].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                          height: `${h * 100}%`,
                          background: `rgba(0,101,145,${0.2 + i * 0.15})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features