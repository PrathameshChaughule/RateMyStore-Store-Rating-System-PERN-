import Icon from '../components/Icon'
import toast from 'react-hot-toast';
import api from '../../../configs/api';
import { useEffect, useState } from 'react';

const storesDataDashboard = () => {
    const token = localStorage.getItem('token')
    const [search, setSearch] = useState("");
    const [storeForm, setStoreForm] = useState({
        image: "",
        name: "",
        email: "",
        address: "",
        description: "",
        owner_id: ""
    });
    const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);
    const [users, setUsers] = useState([])
    const [stores, setStores] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/api/admin/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(res.data.data);
            } catch (error) {
                toast.error(error?.response?.data?.message || error.message);
            }
        };

        fetchData();
    }, [isAddStoreOpen]);

    const filteredstores = stores.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleStoreChange = (e) => {
        setStoreForm({
            ...storeForm,
            [e.target.name]: e.target.value,
        });
    };



    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">

            {/* HEADER */}
            <section className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        stores Management
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Manage all registered stores and their ratings
                    </p>
                </div>
                <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => setIsAddStoreOpen(true)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2
                                      px-4 sm:px-6 py-2.5 sm:py-3 text-white font-extrabold rounded-full
                                      shadow-lg hover:opacity-90 transition-all active:scale-95 text-sm"
                        style={{ background: "linear-gradient(135deg, #006591 0%, #0ea5e9 100%)" }}
                    >
                        <Icon name="person_add" className="text-sm" />
                        Add Store
                    </button>
                </div>
            </section>

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Search store by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-1/3 px-4 py-2 rounded-xl border border-slate-200
        focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            {/* STORE CARDS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredstores.map((store) => (
                    <div
                        key={store.id}
                        className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]
            border border-slate-100 overflow-hidden group hover:shadow-lg transition"
                    >

                        {/* IMAGE */}
                        <div className="h-40 w-full overflow-hidden">
                            <img
                                src={store.image}
                                alt={store.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="p-5 space-y-3">

                            {/* NAME */}
                            <h2 className="text-lg font-extrabold text-slate-900">
                                {store.name}
                            </h2>

                            {/* EMAIL */}
                            <p className="text-sm text-slate-500">
                                {store.email}
                            </p>

                            {/* ADDRESS */}
                            <p className="text-sm text-slate-500">
                                📍 {store.address}
                            </p>

                            {/* DESCRIPTION */}
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                {store.description}
                            </p>

                            {/* RATING */}
                            <div className="flex items-center gap-1 text-amber-500 font-semibold">
                                <Icon name="star" fill={1} className="text-sm" />
                                {store.rating}
                            </div>

                            {/* ACTIONS */}
                            <div className="flex justify-between pt-3 border-t">

                                {/* <button className="text-sky-600 text-sm font-bold">
                                    View
                                </button> */}

                                <button className="px-3 py-1.5 text-xs font-bold rounded-lg text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:scale-105 transition-all duration-200">
                                    Edit
                                </button>

                                <button className="px-3 py-1.5 text-xs font-bold rounded-lg  text-red-500 bg-red-50 border border-red-100  hover:bg-red-100 hover:scale-105 transition-all duration-200">
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>
                ))}

            </section>


            {isAddStoreOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">

                    {/* BACKDROP */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsAddStoreOpen(false)}
                    />

                    {/* MODAL */}
                    <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto">

                        {/* HEADER */}
                        <div className="mb-6">
                            <h2 className="text-xl font-extrabold text-slate-900"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Create Store
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Add new store with owner details
                            </p>
                        </div>

                        {/* FORM */}
                        <form className="space-y-4 sm:space-y-5">

                            {/* IMAGE */}
                            <div>
                                <label className="block text-sm font-bold text-slate-800 px-1">
                                    Store Image URL
                                </label>

                                <input
                                    name="image"
                                    value={storeForm.image}
                                    onChange={handleStoreChange}
                                    placeholder="https://image-url.com"
                                    className="w-full bg-slate-100 rounded-xl px-4 py-3.5 text-sm focus:ring-4 focus:ring-sky-500/10 focus:bg-white outline-none"
                                />
                            </div>

                            {/* NAME */}
                            <div>
                                <label className="block text-sm font-bold text-slate-800 px-1">
                                    Store Name
                                </label>

                                <input
                                    name="name"
                                    value={storeForm.name}
                                    onChange={handleStoreChange}
                                    placeholder="Cafe Mocha"
                                    className="w-full bg-slate-100 rounded-xl px-4 py-3.5 text-sm focus:ring-4 focus:ring-sky-500/10 focus:bg-white outline-none"
                                />
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="block text-sm font-bold text-slate-800 px-1">
                                    Store Email
                                </label>

                                <input
                                    name="email"
                                    type="email"
                                    value={storeForm.email}
                                    onChange={handleStoreChange}
                                    placeholder="store@mail.com"
                                    className="w-full bg-slate-100 rounded-xl px-4 py-3.5 text-sm focus:ring-4 focus:ring-sky-500/10 focus:bg-white outline-none"
                                />
                            </div>

                            {/* ADDRESS */}
                            <div>
                                <label className="block text-sm font-bold text-slate-800 px-1">
                                    Address
                                </label>

                                <input
                                    name="address"
                                    value={storeForm.address}
                                    onChange={handleStoreChange}
                                    placeholder="Pune, Maharashtra"
                                    className="w-full bg-slate-100 rounded-xl px-4 py-3.5 text-sm focus:ring-4 focus:ring-sky-500/10 focus:bg-white outline-none"
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="block text-sm font-bold text-slate-800 px-1">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={storeForm.description}
                                    onChange={handleStoreChange}
                                    rows={3}
                                    placeholder="Write store details..."
                                    className="w-full bg-slate-100 rounded-xl px-4 py-3.5 text-sm resize-none focus:ring-4 focus:ring-sky-500/10 focus:bg-white outline-none"
                                />
                            </div>

                            {/* OWNER SELECT (SEARCH STYLE) */}
                            <div>
                                <label className="block text-sm font-bold text-slate-800 px-1">
                                    Select Owner
                                </label>

                                <select
                                    name="owner_id"
                                    value={storeForm.owner_id}
                                    onChange={handleStoreChange}
                                    className="w-full bg-slate-100 rounded-xl px-4 py-3.5 text-sm focus:ring-4 focus:ring-sky-500/10 focus:bg-white outline-none"
                                >
                                    <option value="">Select Owner</option>

                                    {users
                                        .filter((u) => u.role === "OWNER")
                                        .map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u.name} (ID: {u.id})
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {/* BUTTON */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full text-white font-extrabold py-3.5 rounded-full
            bg-gradient-to-r from-sky-600 to-sky-400
            hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                                >
                                    Create Store
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default storesDataDashboard