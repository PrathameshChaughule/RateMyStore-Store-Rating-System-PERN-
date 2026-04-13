export default function Loader() {
    return (
        <div className="w-full h-full z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">

                {/* Spinner */}
                <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-4 border-sky-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-sky-600 border-t-transparent animate-spin"></div>
                </div>

                {/* Text */}
                <p className="text-sm font-semibold text-slate-600 animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
}