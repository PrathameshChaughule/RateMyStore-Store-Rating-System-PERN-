import { useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import api from "../../../configs/api.js";
import { useDispatch } from 'react-redux'
import { login } from '../../../app/features/authSlice.js'

function Icon({ name, className = "" }) {
    return (
        <span
            className={`material-symbols-outlined select-none ${className}`}
            style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
        >
            {name}
        </span>
    );
}

export default function Login() {
    const [showPass, setShowPass] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const nav = useNavigate()
    const dispatch = useDispatch()
    const avatars = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDEXBAFUl4okrFNoijtOPAZ1p3TgZUvQAakIdFQ_RJcXUz4Fn9MQSPqThkGZNQojQPVGHs45cx7pIWZoNIsxSM4wMwB4o8ZjNOb4rUIZe1nyx3OAV2TyIDK2YOxCAK8Ks-JVVMPmqPQaxgDMz6CjIZRMhsm_uYUXnRsy7dNdvAuNlMVOCLnAuaQUbbmuSC9DTW_vCXP1zUKhIHJNKCFKAHU8QZq-3tv0tkQqw56rMs-VAHojOTs5fqdlsAIDwRoFHyhbclvNzGYBlw",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD4IxtGdCibOC8ZtZbWTitxWxXrcUMU7Kszv3Q55wGX0G8zUhqsYH1hCiRMzVxQtGdibqNmicY9IkG76aHuIeMQI9An5WZG4VGgAhBZhg07DyqIMebYD4dKh88R1n-bwifjlwyQ3_hNgn76GCyk5DqqEh5JzyZxctS9YnNR4JN5WtZD9-PVkwS-OU45ixrrQvE2DEGmOTcrAJh5Ycy9z9KyMkWyTG0x-yuWFfKe3RswHpOqNc-TWZTbun4FVfRQm2kBHs3MKCB4Op0",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB2MF2SfOliqyVg1Y5_R4DYmkqeJYVbTK6qC5kMlKCVCfQa8UpXyJFxnirXqIHUD_xdt61gJHIIHEKoWCoNa8gLsr2V_Voh3XHMJwiDfJoswe-4Pg5zbbg5O1gDGM4jJKbLj437OjQYM5SB8TDL83h0PbxTT2hn64KbsxMeDzdP2NM5htnTuy93BAVQpVOk6rqO5Fi3hoiej2xj-SAtaOcE09CDibdiZ8AkeLZyZnk8T5ZT1g1-KCQlVeUUreE9kWtAYg1nlb3zTKI",
    ];

    const formUpdate = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post('/api/auth/login', form)
            localStorage.setItem('token', data.token)
            dispatch(login(data))
            toast.success(data.message)
            if (data.user.role === "ADMIN") {
                nav("/admin/dashboard");
            } else if (data.user.role === "USER") {
                nav("/user/stores");
            } else if (data.user.role === "OWNER") {
                nav("/owner/dashboard");
            }
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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
                {/* Ambient blobs */}
                <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-teal-500/5 blur-[100px] pointer-events-none" />

                {/* Watermark background */}
                <div className="fixed inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none select-none overflow-hidden z-0">
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-16 -rotate-12">
                        {["verified", "shield", "lock", "encrypted", "key", "fingerprint"].map((ic) => (
                            <Icon key={ic} name={ic} className="text-9xl text-slate-900" />
                        ))}
                    </div>
                </div>

                {/* Card */}
                <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.07)] overflow-hidden relative z-10">

                    {/* ── Left brand panel (desktop only) ── */}
                    <section className="hidden lg:flex flex-col justify-between p-14 bg-slate-50 relative overflow-hidden">
                        <div className="relative z-10">
                            {/* Logo */}
                            <div className="flex items-center gap-2 mb-12">
                                <Icon name="store" className="text-sky-600 text-3xl" />
                                <span className="text-xl font-extrabold tracking-tight text-slate-900"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    RateMyStore
                                </span>
                            </div>

                            {/* Headline */}
                            <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tight mb-6"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Elevating the<br />
                                <span className="bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
                                    Retail Standard.
                                </span>
                            </h2>
                            <p className="text-slate-500 text-lg max-w-sm leading-relaxed">
                                Join our community of critics and retailers dedicated to perfection
                                in the shopping experience.
                            </p>
                        </div>

                        {/* Social proof */}
                        <div className="relative z-10">
                            <div className="flex -space-x-3 mb-3">
                                {avatars.map((src, i) => (
                                    <img key={i} src={src} alt="User"
                                        className="w-11 h-11 rounded-full border-4 border-white object-cover shadow-sm" />
                                ))}
                                <div className="w-11 h-11 rounded-full border-4 border-white bg-amber-100 flex items-center justify-center text-amber-800 text-xs font-bold shadow-sm">
                                    +12k
                                </div>
                            </div>
                            <p className="text-sm font-semibold text-slate-700">
                                Trusted by over 12,000 store managers globally.
                            </p>
                        </div>

                        {/* Decorative icon */}
                        <div className="absolute bottom-[-60px] right-[-60px] opacity-[0.06] rotate-12 pointer-events-none">
                            <Icon name="reviews" className="text-[280px] text-slate-900" />
                        </div>
                    </section>

                    {/* ── Right form panel ── */}
                    <section className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
                        <div className="w-full max-w-md mx-auto">

                            {/* Mobile logo */}
                            <div className="lg:hidden flex items-center gap-2 mb-8">
                                <Icon name="store" className="text-sky-600 text-2xl" />
                                <span className="text-lg font-extrabold tracking-tight text-slate-900"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    RateMyStore
                                </span>
                            </div>

                            {/* Heading */}
                            <div className="mb-8">
                                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    Login to your account
                                </h1>
                                <p className="text-slate-500 text-sm sm:text-base">
                                    Please enter your credentials to access your store insights.
                                </p>
                            </div>

                            {/* Form */}
                            <form className="space-y-5" onSubmit={(e) => formSubmit(e)}>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label htmlFor="login-email" className="block text-sm font-bold text-slate-800 px-1">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Icon name="mail" className="text-slate-400 text-xl" />
                                        </div>
                                        <input id="login-email" type="email" name="email" onChange={(e) => formUpdate(e)} placeholder="name@company.com"
                                            className="w-full pl-12 pr-4 py-3.5 bg-slate-100 border-none rounded-xl text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-sky-500/10 focus:bg-white transition-all outline-none text-sm" />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between px-1">
                                        <label htmlFor="login-password" className="block text-sm font-bold text-slate-800">
                                            Password
                                        </label>
                                        <NavLink to="/updatePassword" className="text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors">
                                            Forgot Password?
                                        </NavLink>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Icon name="lock" className="text-slate-400 text-xl" />
                                        </div>
                                        <input id="login-password" name="password" onChange={(e) => formUpdate(e)} type={showPass ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-12 py-3.5 bg-slate-100 border-none rounded-xl text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-sky-500/10 focus:bg-white transition-all outline-none text-sm" />
                                        <button type="button" onClick={() => setShowPass(!showPass)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors">
                                            <Icon name={showPass ? "visibility_off" : "visibility"} className="text-xl" />
                                        </button>
                                    </div>
                                </div>

                                {/* Remember me
                                <div className="flex items-center gap-3 px-1">
                                    <input id="remember" type="checkbox"
                                        className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500/20 bg-slate-100" />
                                    <label htmlFor="remember" className="text-sm text-slate-500 font-medium">
                                        Keep me logged in for 30 days
                                    </label>
                                </div> */}

                                {/* Submit */}
                                <button type="submit"
                                    className="w-full py-4 px-6 text-white font-extrabold rounded-full shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                                    style={{ background: "linear-gradient(135deg, #006591 0%, #0ea5e9 100%)" }}>
                                    Sign in to Dashboard
                                    <Icon name="arrow_forward" className="text-lg" />
                                </button>
                            </form>

                            {/* Security notice */}
                            <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3 items-start">
                                <Icon name="info" className="text-amber-600 text-xl mt-0.5 flex-shrink-0" />
                                <p className="text-xs leading-relaxed text-slate-500">
                                    <span className="font-bold text-slate-700">Security Notice:</span> Access will be
                                    provided based on your role. Unauthorized attempts are logged and monitored.
                                </p>
                            </div>

                            {/* Register link */}
                            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                                <p className="text-sm text-slate-500">
                                    Don't have an account?{" "}
                                    <Link to="/register">
                                        <button
                                            className="text-sky-600 font-bold hover:underline underline-offset-4 transition-all">
                                            Request access
                                        </button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}