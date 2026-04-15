import { useEffect, useState } from 'react'
import StoreCard from './StoreCard';
import toast from 'react-hot-toast';
import api from '../../../configs/api';
import StarRating from './StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../app/features/authSlice';
import Loader from './Loader';

function StoreGrid({ search }) {
    const token = localStorage.getItem('token')
    const [selectedStore, setSelectedStore] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);
    const [stores, setStores] = useState([])
    const [visibleCount, setVisibleCount] = useState(6);
    const { loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setLoading(true))
            try {
                const res = await api.get('/api/user/stores', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStores(res.data.data)
            } catch (error) {
                toast.error(error?.response?.data?.message || error.message);
            } finally {
                dispatch(setLoading(false))
            }
        };

        fetchData();
    }, [selectedStore]);

    useEffect(() => {
        if (selectedStore) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedStore]);

    useEffect(() => {
        setVisibleCount(6);
    }, [stores, search]);

    const saveRating = async (storeId) => {
        try {
            await api.post(
                "/api/user/ratings",
                {
                    store_id: storeId,
                    rating: selectedRating,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Rating saved!");
            setSelectedStore(null);
        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    };

    const filteredStores = stores.filter((store) =>
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.address.toLowerCase().includes(search.toLowerCase()) ||
        store.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section>
            {loading ? <Loader /> :
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-start">
                    {filteredStores.slice(0, visibleCount).map((store) => (
                        <StoreCard key={store.id} store={store} setSelectedStore={setSelectedStore} setSelectedRating={setSelectedRating} />
                    ))}
                </div>}

            {/* Load more */}
            {visibleCount < filteredStores.length && (
                <div className="mt-14 sm:mt-20 text-center">
                    <button
                        onClick={() => setVisibleCount((prev) => prev + 3)}
                        className="bg-sky-600 text-white px-7 sm:px-10 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-sky-500/25 hover:bg-sky-600/90 hover:-translate-y-0.5 active:scale-95 inline-flex items-center gap-2 font-extrabold hover:gap-4 transition-all duration-300 text-sm sm:text-base group"
                    >
                        Load more stores
                        <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform duration-300">
                            arrow_forward
                        </span>
                    </button>
                </div>
            )}


            {selectedStore && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* BACKDROP */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setSelectedStore(null)}
                    />

                    {/* MODAL */}
                    <div className="relative bg-white rounded-2xl w-[92%] max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        {loading ? <Loader /> :
                            <div className="relative bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                                {/* TOP IMAGE SECTION */}
                                <div className="relative h-56 sm:h-64 w-full">
                                    <img
                                        src={selectedStore.image}
                                        alt={selectedStore.name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* DARK OVERLAY */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                                    {/* NAME ON IMAGE */}
                                    <div className="absolute bottom-4 left-6 text-white">
                                        <h2 className="text-2xl font-bold">
                                            {selectedStore.name}
                                        </h2>

                                        <p className="text-sm text-white/80">
                                            📍 {selectedStore.address}
                                        </p>
                                    </div>

                                    {/* AVERAGE RATING BADGE */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-amber-600 font-bold flex items-center gap-1">
                                        ★ {Number(selectedStore.rating || 0).toFixed(2)}
                                    </div>
                                </div>

                                {/* BODY */}
                                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">

                                    {/* LEFT SIDE - DETAILS */}
                                    <div>

                                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                            About Store
                                        </h3>

                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            {selectedStore.description}
                                        </p>

                                        <div className="mt-4 text-sm text-slate-500 space-y-1">
                                            <p><span className="font-medium text-slate-700">Email:</span> {selectedStore.email}</p>
                                            <p><span className="font-medium text-slate-700">Address:</span> {selectedStore.address}</p>
                                        </div>

                                        {/* STAR RATING INPUT */}
                                        <div className="mt-6">
                                            <h4 className="font-semibold mb-2">Rate this store</h4>

                                            <StarRating
                                                selectedRating={selectedRating}
                                                setSelectedRating={setSelectedRating}
                                            />

                                            <button
                                                onClick={() => saveRating(selectedStore.id)}
                                                className="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-lg transition"
                                            >
                                                Save Rating
                                            </button>
                                        </div>

                                    </div>

                                    {/* RIGHT SIDE - REVIEWS */}
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">

                                        <h3 className="font-semibold text-slate-900 mb-3">
                                            User Reviews ({selectedStore.rated_users?.length || 0})
                                        </h3>

                                        <div className="space-y-3 max-h-60 md:max-h-72 overflow-y-auto pr-2">
                                            {selectedStore.rated_users?.length > 0 ? (
                                                selectedStore.rated_users.map((u, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-white p-3 rounded-lg border border-slate-100 flex justify-between items-start"
                                                    >
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-900">
                                                                {u.name}
                                                            </p>
                                                            <p className="text-xs text-slate-400">
                                                                {u.email}
                                                            </p>
                                                        </div>

                                                        <div className="text-amber-500 font-semibold flex items-center gap-1">
                                                            ★ {u.rating}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-slate-400">
                                                    No reviews yet
                                                </p>
                                            )}

                                        </div>
                                    </div>

                                </div>

                                {/* FOOTER */}
                                <div className="p-4 border-t border-slate-100 flex justify-end">
                                    <button
                                        onClick={() => setSelectedStore(null)}
                                        className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
                                    >
                                        Close
                                    </button>
                                </div>

                            </div>}
                    </div>
                </div>
            )}
        </section>
    );
}

export default StoreGrid