import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-5xl mx-auto rounded-3xl sm:rounded-[3rem] bg-slate-900 text-white overflow-hidden relative p-8 sm:p-12 lg:p-20 text-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: "linear-gradient(135deg,#006591 0%,#0ea5e9 100%)" }}
        />
        <div className="relative z-10 space-y-6 sm:space-y-8">
          <h2
            className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Ready to join the{" "}
            <span className="text-sky-400">rating revolution?</span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Create your account today and start discovering the best stores in your
            neighborhood. It's free, fun, and impactful.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
            <Link to="/register">
              <button className="px-8 sm:px-10 py-4 sm:py-5 bg-sky-400 text-slate-900 font-extrabold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-sky-400/20 text-sm sm:text-base">
                Get Started for Free
              </button>
            </Link>
            <button className="px-8 sm:px-10 py-4 sm:py-5 bg-white/10 text-white font-extrabold rounded-2xl hover:bg-white/20 transition-all border border-white/20 text-sm sm:text-base">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CallToAction