import hero from '../../../assets/hero.jpg'
import avatar from '../../../assets/hero-avatar.webp'
import { FaStar } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoMdArrowForward } from "react-icons/io";
import { MdOutlineVerifiedUser } from "react-icons/md";


function Hero() {
  return (
    <section className="pt-16 min-h-screen flex items-center overflow-hidden bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-12 sm:py-16 lg:py-20">

        {/* Left — Text */}
        <div className="flex flex-col gap-6 sm:gap-8 z-10 order-2 lg:order-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-extrabold tracking-widest uppercase w-fit">
            <MdOutlineVerifiedUser className="text-2xl" />
            Trusted by 50k+ users
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-slate-900 leading-none"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Discover and rate{" "}
            <span className="text-sky-600">stores</span> around you.
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-500 max-w-lg leading-relaxed">
            Join the community that helps local businesses thrive. Share your
            experiences, find hidden gems, and get rewarded for your feedback.
          </p>

          {/* Search + CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-2xl" />
              <input
                type="text"
                placeholder="Search by store name or location..."
                className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-2xl bg-slate-100 border-none outline-none text-slate-800 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-sky-200 transition-all"
              />
            </div>
            <button
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-white font-extrabold rounded-2xl shadow-xl text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              style={{ background: "linear-gradient(135deg,#006591 0%,#0ea5e9 100%)" }}
            >
              Explore Now
              <IoMdArrowForward className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Right — Image */}
        <div className="relative flex items-center justify-center order-1 lg:order-2 h-72 sm:h-96 lg:h-[580px]">
          <div className="absolute inset-0 bg-sky-50 rounded-[3rem] rotate-3 -z-10" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={hero}
              alt="Store interior"
              className="w-full h-full object-cover"
            />

            {/* Floating Review Card */}
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 bg-white/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/20">
              <div className="flex items-center gap-3 sm:gap-4 mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={avatar}
                    alt="Elena Rodriguez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-slate-900 text-sm truncate"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Elen Rodriguez
                  </p>
                  <p className="text-xs text-slate-500 truncate">Rated 'The Nordic Cafe'</p>
                </div>
                <div className="flex gap-0.5 flex-shrink-0">
                  {[...Array(5)].map(() => (
                    <FaStar className='text-amber-400 h-5 w-5' />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 italic leading-relaxed">
                "Found this place using RateMyStore. The atmosphere is incredible
                and the service was impeccable!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero