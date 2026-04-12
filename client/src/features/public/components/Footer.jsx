function Footer() {
  const cols = [
    { title: "Product", links: ["Find Stores", "Write a Review", "Business Panel", "API Access"] },
    { title: "Company", links: ["About Us", "Careers", "Press Kit", "Contact"] },
  ];

  return (
    <footer className="bg-slate-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12">

        {/* Brand */}
        <div className="col-span-2 space-y-4 sm:space-y-6">
          <span
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 block"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            RateMyStore
          </span>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            Empowering consumers and businesses through transparent feedback and
            detailed store insights.
          </p>
          <div className="flex gap-3">
            {["language", "public", "rss_feed"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-600 transition-colors"
              >
                <span className="material-symbols-outlined text-lg sm:text-xl">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {cols.map((col) => (
          <div key={col.title} className="space-y-3 sm:space-y-4">
            <h4
              className="font-bold text-slate-900 text-sm sm:text-base"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-500 hover:text-sky-600 transition-colors text-xs sm:text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Subscribe */}
        <div className="col-span-2 space-y-3 sm:space-y-4">
          <h4
            className="font-bold text-slate-900 text-sm sm:text-base"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Subscribe
          </h4>
          <p className="text-slate-500 text-xs sm:text-sm">
            Get the latest local store news directly in your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 min-w-0 px-3 sm:px-4 py-2 rounded-xl bg-slate-200 border-none outline-none text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-200 transition-all"
            />
            <button className="px-3 sm:px-4 py-2 bg-sky-600 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-sky-700 transition-colors whitespace-nowrap">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-10 sm:pt-12 mt-10 sm:mt-12 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-400">© 2026 RateMyStore. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((link) => (
            <a key={link} href="#" className="text-xs text-slate-400 hover:text-sky-600 transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer