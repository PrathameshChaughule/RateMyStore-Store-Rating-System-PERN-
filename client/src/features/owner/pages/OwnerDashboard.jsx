import React from 'react'
import { NavLink } from 'react-router-dom'
import Icon from "../components/Icon"
import { useEffect } from 'react';
import api from '../../../configs/api';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../app/features/authSlice';
import { useState } from 'react';

const OwnerDashboard = () => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const [store, setStore] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true))
      try {
        const res = await api.get(`/api/owner/store`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(res.data.data)
        setStore(res.data.data)
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        dispatch(setLoading(false))
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-8">
      <section className="flex flex-col sm:flex-row justify-between
        items-start sm:items-center gap-4 sm:gap-6">
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

          <div>
            <h1
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              My Dashboard
            </h1>

            <p className="text-slate-500 text-sm sm:text-base mt-1">
              View your store ratings and feedback from customers.
            </p>
          </div>

        </section>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <NavLink to="/admin/dashboard/storeData">
            <button
              className="flex-1 sm:flex-none flex items-center justify-center gap-2
              px-4 sm:px-6 py-2.5 sm:py-3 text-white font-extrabold rounded-full
              shadow-lg hover:opacity-90 transition-all active:scale-95 text-sm"
              style={{ background: "linear-gradient(135deg, #006591 0%, #0ea5e9 100%)" }}
            >
              <Icon name="add_business" className="text-sm" />
              Update Store
            </button>
          </NavLink>
        </div>
      </section>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-[0_15px_60px_rgba(0,0,0,0.10)] overflow-hidden">


        <div className="relative h-64">

          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover"
          />


          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>


          <div className="absolute bottom-5 left-5 right-5 text-white">

            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              {store.name}
            </h1>

            <p className="text-sm text-white/80 mt-1">
              {store.address}
            </p>

          </div>


          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold text-slate-800 shadow">
            ⭐ {Number(store.average_rating).toFixed(1)}
          </div>

        </div>


        <div className="p-6 sm:p-8 space-y-6">


          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {store.description}
          </p>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="p-4 rounded-2xl bg-slate-50">
              <p className="text-xs text-slate-400">Email</p>
              <p className="text-sm font-semibold text-slate-800 break-all">
                {store.email}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50">
              <p className="text-xs text-slate-400">Address</p>
              <p className="text-sm font-semibold text-slate-800">
                {store.address}
              </p>
            </div>

          </div>


          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

            <div>
              <p className="text-xs text-slate-400">Average Rating</p>
              <p className="text-3xl font-extrabold text-sky-600">
                {Number(store.average_rating).toFixed(1)} ⭐
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Total Reviews</p>
              <p className="text-2xl font-bold text-slate-900">
                {store.total_ratings}
              </p>
            </div>

          </div>

          <NavLink to="/owner/dashboard/userData">
            <button
              className="w-full py-3.5 rounded-2xl text-white font-extrabold shadow-lg
          hover:scale-[1.01] active:scale-95 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #006591 0%, #0ea5e9 100%)"
              }}
            >
              View All Reviews
            </button>
          </NavLink>

        </div>
      </div>

    </div>
  )
}

export default OwnerDashboard 