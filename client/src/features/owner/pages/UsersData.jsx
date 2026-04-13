import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../../configs/api';
import toast from 'react-hot-toast';
import Icon from "../components/Icon"
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../app/features/authSlice';
import Loader from '../../user/components/Loader';

const UsersData = () => {
    const token = localStorage.getItem('token')
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [stats, setStats] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setLoading(true))
            try {
                const res = await api.get(
                    `/api/owner/store/ratings?page=${page}&limit=10`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const res1 = await api.get("/api/owner/rating-summary", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const d = res1.data.data;

                setStats([
                    {
                        label: "Total Ratings",
                        value: d.totalUsers,
                        valueColor: "text-sky-600",
                        blob: "bg-sky-500/5",
                    },
                    {
                        label: "Average Rating",
                        value: d.avgRating.toFixed(1),
                        valueColor: "text-amber-500",
                        blob: "bg-amber-500/5",
                    },
                    {
                        label: "5 Star Reviews",
                        value: d.fiveStar,
                        valueColor: "text-green-500",
                        blob: "bg-green-500/5",
                    },
                    {
                        label: "Low Ratings",
                        value: d.lowStar,
                        valueColor: "text-red-500",
                        blob: "bg-red-500/5",
                    },
                ]);

                setUsers(res.data.data);
                setTotalPages(res.data.pagination.totalPages);
            } catch (err) {
                toast.error(err?.response?.data?.message || err.message);
            } finally {
                dispatch(setLoading(false))
            }
        };

        fetchData();
    }, [page]);



    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">

            <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1
                        className="text-2xl sm:text-3xl font-extrabold text-slate-900"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Store Ratings
                    </h1>

                    <p className="text-slate-500 text-sm sm:text-base mt-1">
                        View all users who have rated your store and their feedback
                    </p>
                </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className="bg-white p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] flex flex-col justify-between relative overflow-hidden group border border-slate-100"
                    >
                        <div
                            className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl transition-all ${s.blob}`}
                        />

                        <span className="text-[10px] font-extrabold uppercase text-slate-400">
                            {s.label}
                        </span>

                        <div
                            className={`text-3xl sm:text-4xl font-black mt-2 ${s.valueColor}`}
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            {s.value}
                        </div>
                    </div>
                ))}
            </section>


            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                            <tr>
                                <th className="text-left p-4">Name</th>
                                <th className="text-left p-4">Email</th>
                                <th className="text-left p-4">Address</th>
                                <th className="text-left p-4">Rating</th>
                                <th className="text-left p-4">Rated At</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-t hover:bg-slate-50">

                                    <td className="p-4 font-semibold text-slate-800">{u.name}</td>

                                    <td className="p-4 text-slate-600">{u.email}</td>

                                    <td className="p-4 text-slate-600">{u.address}</td>

                                    <td className="p-4">
                                        <div className="flex items-center gap-1 text-amber-500 font-semibold">
                                            <Icon name="star" fill={1} className="text-sm" />
                                            {u.rating}
                                        </div>
                                    </td>

                                    <td className="p-4 text-slate-500 text-xs">
                                        {new Date(u.created_at).toLocaleDateString()}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-slate-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 rounded ${page === i + 1 ? "bg-sky-600 text-white" : "bg-slate-200"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-slate-200 rounded disabled:opacity-50"
                >
                    Next
                </button>

            </div>

        </div>
    )
}

export default UsersData