import { useEffect, useState } from 'react';
import StoreCard from './StoreCard'
import toast from 'react-hot-toast';
import api from '../../../configs/api';
import { setLoading } from '../../../app/features/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../user/components/Loader'

function TrendingStores() {
    const [count, setCount] = useState(0)
    const IMAGES = {
        cafe: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8NBVlbr-bqBgMMoWuPa4okt2TBNyaGRxUsX0SYDaTclnYuLfBnaxtDSYXbJTDYSITkFFYH_NSu6v7uyI9bwi6xhj2vNt0asmutun9KZNf7NPXX4opjJVTl1ASjgkZpMERcSrW8I7nkZQsDb6HfRvhgIPvBWJ4lmtoGBZucErqzUI6hcZt57ohOdPCk7z67aBbnJjOiRh5RMkY36W26vAauPXnhdNJLBJ7hb0n0KmIFJRjHxrJ9XLb6Imt_DMmoDNoklZBAlRSAK4",
        market: "https://lh3.googleusercontent.com/aida-public/AB6AXuDembC8WhSE9reMlkmtkSc239_gax8DEnQnoDqg5G77NVgW8duufyPYQQ_yVGPzvgNwGEDtAZ_OuNd8F0ONHwREHa5P_3YnP9p-7GcQL2HJxdF2y7j0PhMmDyAVhNd8iCu9y9mN_nclBKPstSMGuoYcyF3ldcdaYUSnfn6MBLvTBpPgU9MS_oitl0l5Zh-wTOzMupEPeJSAGrvPMz2tnmyjSx6vvzlTRyk8I67Sk5VQcEt5psM9lfRC39_xzHuhAjvcsUQyjc_2xVM",
        studio: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw3KrNaGB09xt1IvAACdWOsrXXrXtakAm7L75pddirpKiO_uyUPNBNtPswB70ur9Eo0qaiBYDQ60dD30L98LC6yoboSXJ2vcrA7yawJGP14LtY1uhycK0wT31VhKaDdYvuXxwLUH9BqJgA3Nypa5cUd8MoVVQL00zD8wlUbnXTrCzLasSfRzDF7QSnEtJ0uITyoGXfvo8QZ4ePZonj7xeyTs100LxE1yVuhH1mQ_B4L8NRq5M4zFPhyJ3flu3AqyfSVqLR6SyyppY",
    };
    const [stores, setStores] = useState([])
    const { loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            dispatch(setLoading(true))
            try {
                const res = await api.get(`/api/public/trending-stores`);
                setStores(res.data.data)
            } catch (error) {
                toast.error(error?.response?.data?.message || error.message);
            } finally {
                dispatch(setLoading(false))
            }
        }
        fetchData()
    }, [])

    if (loading) return <Loader />

    return (
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-14 lg:mb-16 gap-4 sm:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                        <span className="text-sky-600 font-extrabold tracking-widest uppercase text-[11px]">
                            Featured Exhibits
                        </span>
                        <h2
                            className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Trending Stores
                        </h2>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setCount(prev => Math.max(prev - 1, 0))}
                            disabled={count === 0}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all border border-slate-300 text-slate-500 hover:border-sky-500 hover:text-sky-600 disabled:opacity-40"
                        >
                            <span className="material-symbols-outlined">west</span>
                        </button>

                        <button
                            onClick={() =>
                                setCount(prev => Math.min(prev + 1, stores.length - 3))
                            }
                            disabled={count >= stores.length - 3}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all bg-sky-600 text-white shadow-lg shadow-sky-200 disabled:opacity-40"
                        >
                            <span className="material-symbols-outlined">east</span>
                        </button>
                    </div>
                </div>

                <div className="relative overflow-hidden">

                    {/* SLIDER TRACK */}
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${count * (100 / 3)}%)`,
                        }}
                    >
                        {stores.map((store) => (
                            <div
                                key={store.name}
                                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                            >
                                <div className="transition-transform duration-300 hover:scale-105">
                                    <StoreCard {...store} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* LEFT FADE (premium look) */}
                    <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent z-10" />

                    {/* RIGHT FADE */}
                    <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10" />

                </div>
            </div>
        </section>
    );
}

export default TrendingStores