import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../configs/api.js";

export default function Register() {
    const features = [
        { icon: "verified_user", color: "text-sky-600", title: "Verified Reviews", desc: "Trusted feedback from real local shoppers." },
        { icon: "stars", color: "text-teal-600", title: "Curated Gems", desc: "Find hidden spots based on community data." },
    ];

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        address: ""
    })
    const [conPassword, setConPassword] = useState("")
    const nav = useNavigate()

    const formUpdate = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post('/api/auth/register', form)
            toast.success(data.message)
            nav('/login')
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
            <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; font-family: 'Inter', sans-serif; }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          line-height: 1;
        }
      `}</style>
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-8 px-4 sm:px-6">
                {/* Ambient blobs */}
                <div className="fixed -top-32 -left-32 w-96 h-96 rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
                <div className="fixed -bottom-32 -right-32 w-80 h-80 rounded-full bg-teal-500/5 blur-[100px] pointer-events-none" />

                <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 relative z-10">

                    {/* ── Left editorial panel (desktop only) ── */}
                    <div className="hidden lg:flex flex-col justify-center p-12 relative overflow-hidden bg-slate-100 rounded-2xl">
                        {/* Blobs inside panel */}
                        <div className="absolute -top-24 -left-24 w-72 h-72 bg-sky-600/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-teal-600/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            {/* Logo */}
                            <div className="flex items-center gap-2 mb-8">
                                <span
                                    className={`material-symbols-outlined select-none text-sky-600 text-3xl`}
                                    style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
                                >
                                    store
                                </span>
                                <span className="text-xl font-extrabold tracking-tight text-slate-900"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    RateMyStore
                                </span>
                            </div>

                            {/* Badge */}
                            <span className="inline-block px-3 py-1 rounded-lg bg-teal-100 text-teal-700 text-xs font-extrabold tracking-widest uppercase mb-5">
                                Member Access
                            </span>

                            {/* Headline */}
                            <h2 className="text-5xl font-black leading-tight tracking-tight text-slate-900 mb-6"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Join the<br />
                                <span className="bg-gradient-to-r from-sky-600 to-teal-500 bg-clip-text text-transparent">
                                    Critic's Circle.
                                </span>
                            </h2>
                            <p className="text-slate-500 text-lg leading-relaxed max-w-sm mb-10">
                                Your voice shapes the neighborhood. Rate, review, and discover the
                                finest local experiences.
                            </p>

                            {/* Feature list */}
                            <div className="space-y-5">
                                {features.map((f) => (
                                    <div key={f.title} className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                                            <span
                                                className={`material-symbols-outlined select-none ${f.color} text-xl`}
                                                style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
                                            >
                                                {f.icon}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm"
                                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                                {f.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right form panel ── */}
                    <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.07)] p-6 sm:p-10 lg:p-12 flex flex-col justify-center">

                        {/* Mobile logo */}
                        <div className="lg:hidden flex items-center gap-2 mb-8">

                            <span
                                className={`material-symbols-outlined select-none text-sky-600 text-2xl`}
                                style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
                            >
                                store
                            </span>
                            <span className="text-lg font-extrabold tracking-tight text-slate-900"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                RateMyStore
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="mb-7">
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Create your account
                            </h1>
                            <p className="text-slate-500 text-sm sm:text-base">
                                Already have an account?{" "}
                                <Link to="/login">
                                    <button
                                        className="text-sky-600 font-bold hover:underline underline-offset-4 transition-all">
                                        Log in
                                    </button>
                                </Link>
                            </p>
                        </div>

                        {/* Form */}
                        <form className="space-y-4 sm:space-y-5" onSubmit={(e) => formSubmit(e)}>
                            <div>
                                {/* Full name */}
                                <label className="block text-sm font-bold text-slate-800 px-1">
                                    Full Name
                                </label>
                                <input name="name" value={form.name} onChange={(e) => formUpdate(e)} required placeholder="John Doe" className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-sky-500/10 focus:bg-white transition-all outline-none text-sm pr-12"
                                />
                                <p hidden={form.name.length >= 20 && form.name.length <= 60 || !form.name} className="text-[10px] text-red-500 px-1 tracking-widest font-bold mt-1">
                                    * Min 20 characters, Max 60 characters.
                                </p>
                            </div>

                            <div>
                                {/* Email */}
                                <label className="block text-sm font-bold text-slate-800 px-1">
                                    Email Address
                                </label>
                                <input name="email" value={form.email} onChange={(e) => formUpdate(e)} required id="reg-email" type="email" placeholder="name@example.com" className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-sky-500/10 focus:bg-white transition-all outline-none text-sm pr-12" />
                            </div>

                            {/* Password row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-800 px-1">
                                        Password
                                    </label>
                                    <input name="password" value={form.password} onChange={(e) => formUpdate(e)} required id="password" type="password" placeholder="••••••••" className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-sky-500/10 focus:bg-white transition-all outline-none text-sm pr-12" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-800 px-1">
                                        Confirm Password
                                    </label>
                                    <input required id="confirm_password" onChange={(e) => setConPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-sky-500/10 focus:bg-white transition-all outline-none text-sm pr-12" />
                                </div>

                            </div>
                            <div>
                                <p hidden={!form.password || /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/.test(form.password)} className="text-[10px] text-red-500 px-1 tracking-widest font-bold -mt-3">
                                    * 8-16 characters, must include at least one uppercase letter and one special character.
                                </p>
                                <p hidden={!conPassword || form.password === conPassword} className="text-[10px] text-red-500 px-1 tracking-widest font-bold -mt-3">
                                    * Password does not match.
                                </p>
                            </div>
                            {/* Address */}
                            <div className="space-y-1.5">
                                <label htmlFor="address" className="block text-sm font-bold text-slate-800 px-1">
                                    Home Address
                                </label>
                                <textarea value={form.address} onChange={(e) => formUpdate(e)} required id="address" name="address" rows={3}
                                    placeholder="123 Gallery St, Arts District, City"
                                    className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-sky-500/10 focus:bg-white transition-all outline-none resize-none text-sm" />
                                <p hidden={form.address.length <= 400} className="text-[10px] text-red-500 px-1 tracking-widest font-bold -mt-1">
                                    * Max 400 characters.
                                </p>
                                <p className="text-[10px] text-slate-400 px-1 uppercase tracking-widest font-bold">
                                    Privacy: Your address is used only for localized store results.
                                </p>
                            </div>
                            {/* Terms */}
                            <div className="flex items-start gap-3 px-1 py-1">
                                <input id="terms" type="checkbox" required className="mt-0.5 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500/20 bg-slate-100 flex-shrink-0" />
                                <label htmlFor="terms" className="text-sm text-slate-500 leading-snug">
                                    I agree to the{" "}
                                    <a href="#" className="text-sky-600 font-semibold hover:underline">Terms of Service</a>
                                    {" "}and{" "}
                                    <a href="#" className="text-sky-600 font-semibold hover:underline">Privacy Policy</a>.
                                </label>
                            </div>

                            {/* Submit */}
                            <div className="pt-2">
                                <button type="submit"
                                    className="w-full text-white font-extrabold py-4 px-8 rounded-full shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                                    style={{ background: "linear-gradient(135deg, #006591 0%, #0ea5e9 100%)" }}>
                                    Create Account
                                    <span
                                        className={`material-symbols-outlined select-none text-sm`}
                                        style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
                                    >
                                        arrow_forward
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}