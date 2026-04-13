import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../../configs/api";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../app/features/authSlice";
import { useDispatch } from "react-redux";
import { LuLoaderCircle } from "react-icons/lu";

const STEPS = ["Send Email", "Verify OTP", "New Password"];

function StepBar({ current }) {
    return (
        <div className="flex items-center mb-8">
            {STEPS.map((_, i) => {
                const idx = i + 1;
                const done = idx < current;
                const active = idx === current;
                return (
                    <div key={i} className="flex items-center flex-1 last:flex-none">
                        <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0 transition-all duration-300
                ${done ? "bg-sky-400 text-white" : active
                                    ? "text-white"
                                    : "bg-slate-100 text-slate-400 border border-slate-200"
                                }`}
                            style={active ? { background: "linear-gradient(135deg, #006591 0%, #0ea5e9 100%)" } : {}}
                        >
                            {done
                                ? <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}>check</span>
                                : idx}
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-1 transition-all duration-300 ${done ? "bg-sky-400" : "bg-slate-200"}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ─── Screen 1: Send Email ───────────────────────────────────────────────────
function SendEmailScreen({ onNext, email, setEmail }) {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        if (!valid) {
            setErr(true);
            return;
        }
        setLoading(true)
        try {
            const { data } = await api.post('/api/auth/forgot-password', {
                email: email.trim()
            });
            toast.success(data.message);
            sessionStorage.setItem("resetEmail", email.trim());
            onNext();
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <div className="mb-7">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Reset password
                </h1>
                <p className="text-slate-500 text-sm sm:text-base">
                    Enter your email and we'll send a verification code.
                </p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-slate-800 px-1 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErr(false); }}
                        placeholder="name@example.com"
                        className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-sky-500/10 focus:bg-white transition-all outline-none text-sm"
                    />
                    {err && (
                        <p className="text-[10px] text-red-500 px-1 tracking-widest font-bold mt-1">
                            * Please enter a valid email address.
                        </p>
                    )}
                </div>

                <div className="pt-2">
                    <button
                        onClick={handleSubmit}
                        className="w-full text-white font-extrabold py-4 px-8 rounded-full shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                        style={{ background: "linear-gradient(135deg, #006591 0%, #0ea5e9 100%)" }}
                    >

                        {loading ? <LuLoaderCircle className="animate-spin text-2xl" /> :
                            <>
                                <span>Send OTP</span>
                                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}>
                                    arrow_forward
                                </span></>}
                    </button>
                </div>
            </div>
        </>
    );
}

// ─── Screen 2: Verify OTP ───────────────────────────────────────────────────
function VerifyOTPScreen({ onNext }) {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [err, setErr] = useState(false);
    const inputRefs = useRef([]);
    const email = sessionStorage.getItem("resetEmail");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (val, i) => {
        const digit = val.replace(/\D/g, "").slice(-1);
        const updated = [...otp];
        updated[i] = digit;
        setOtp(updated);
        setErr(false);
        if (digit && i < 5) {
            inputRefs.current[i + 1]?.focus();
        }
    };

    const handleKeyDown = (e, i) => {
        if (e.key === "Backspace") {
            if (!otp[i] && i > 0) {
                inputRefs.current[i - 1]?.focus();
            }
        }
    };

    const handleVerify = async () => {
        if (otp.join("").length < 6) {
            setErr(true);
            return;
        }
        setLoading(true)
        try {
            const { data } = await api.post("/api/auth/verify-otp", {
                email,
                otp: otp.join("")
            });
            toast.success(data.message);
            onNext();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <div className="mb-7">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                    Verify your email
                </h1>
                <p className="text-slate-500 text-sm">
                    We sent a 6-digit code to{" "}
                    <span className="text-sky-600 font-bold">{email}</span>
                </p>
            </div>

            <div className="space-y-5">
                {/* OTP Boxes */}
                <div className="flex gap-2 justify-between">
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputRefs.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            className={`w-12 h-14 text-center text-xl font-bold bg-slate-100 rounded-xl outline-none
                            ${err ? "ring-2 ring-red-400" : ""}`}
                        />
                    ))}
                </div>

                {err && (
                    <p className="text-xs text-red-500 text-center">
                        * Enter complete 6-digit OTP
                    </p>
                )}

                <button
                    onClick={handleVerify}
                    className="w-full text-white font-bold py-3 rounded-full bg-sky-600 hover:scale-[1.02]"
                >
                    {loading ? <LuLoaderCircle className="animate-spin text-2xl" /> :
                        <span>Verify Code</span>}
                </button>
            </div>
        </>
    );
}


// ─── Screen 3: New Password ─────────────────────────────────────────────────
function NewPasswordScreen() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showCpw, setShowCpw] = useState(false);
    const [pwErr, setPwErr] = useState(false);
    const [cpwErr, setCpwErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate()
    const dispatch = useDispatch()
    const PW_REGEX = /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

    const handleSubmit = async () => {
        const validPw = PW_REGEX.test(password);
        const validCpw = password === confirm && confirm.length > 0;
        setPwErr(!validPw);
        setCpwErr(!validCpw);
        if (!validPw || !validCpw) return;
        const email = sessionStorage.getItem("resetEmail");

        if (!email) {
            toast.error("Session expired. Please restart.");
            return;
        }

        try {
            setLoading(true);
            const { data } = await api.post("/api/auth/reset-password", {
                email,
                password
            });
            toast.success(data.message);
            nav('/login')
            dispatch(logout())
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="mb-7">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                    New password
                </h1>
                <p className="text-slate-500 text-sm">
                    Create a strong password for your account.
                </p>
            </div>

            <div className="space-y-4">
                {/* PASSWORD */}
                <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1">
                        New Password
                    </label>

                    <div className="relative">
                        <input
                            type={showPw ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPwErr(false);
                            }}
                            placeholder="••••••••"
                            className="w-full bg-slate-100 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none pr-12"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPw(!showPw)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                            <span className="material-symbols-outlined text-lg">
                                {showPw ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>

                    {pwErr && (
                        <p className="text-xs text-red-500 mt-1">
                            8–16 chars, one uppercase & one special character
                        </p>
                    )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1">
                        Confirm Password
                    </label>

                    <div className="relative">
                        <input
                            type={showCpw ? "text" : "password"}
                            value={confirm}
                            onChange={(e) => {
                                setConfirm(e.target.value);
                                setCpwErr(false);
                            }}
                            placeholder="••••••••"
                            className="w-full bg-slate-100 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none pr-12"
                        />

                        <button
                            type="button"
                            onClick={() => setShowCpw(!showCpw)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                            <span className="material-symbols-outlined text-lg">
                                {showCpw ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>

                    {cpwErr && (
                        <p className="text-xs text-red-500 mt-1">
                            Passwords do not match
                        </p>
                    )}
                </div>

                {/* SUBMIT */}
                <div className="pt-2">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full text-white font-bold py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 transition disabled:opacity-50"
                    >
                        {loading ? <LuLoaderCircle className="animate-spin text-2xl" /> : "Update Password"}
                    </button>
                </div>
            </div>
        </>
    );
}


// ─── Main Component ─────────────────────────────────────────────────────────
export default function UpdatePassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");

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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.07)] p-6 sm:p-10 lg:p-12 w-full max-w-md">

                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8">
                        <span
                            className="material-symbols-outlined text-sky-600 text-2xl select-none"
                            style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}
                        >
                            store
                        </span>
                        <span className="text-lg font-extrabold tracking-tight text-slate-900"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            RateMyStore
                        </span>
                    </div>

                    {/* Step bar (hidden on success) */}
                    {step <= 3 && <StepBar current={step} />}

                    {/* Screens */}
                    {step === 1 && (
                        <SendEmailScreen email={email} setEmail={setEmail} onNext={() => setStep(2)} />
                    )}
                    {step === 2 && (
                        <VerifyOTPScreen email={email} onNext={() => setStep(3)} />
                    )}
                    {step === 3 && (
                        <NewPasswordScreen onNext={() => setStep(4)} />
                    )}

                </div>
            </div>
        </>

    );
}
