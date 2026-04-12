import React from 'react'
import StatsSection from '../components/StatsSection'
import Icon from '../components/Icon'

const AdminDashboard = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">

      {/* Page header + action buttons */}
      <section className="flex flex-col sm:flex-row justify-between
        items-start sm:items-center gap-4 sm:gap-6">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Platform Overview
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-1">
            Real-time health and engagement metrics for RateMyStore.
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2
            px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-sky-600 font-extrabold rounded-full
            shadow-sm border border-slate-200 hover:bg-slate-50 transition-all
            active:scale-95 text-sm">
            <Icon name="person_add" className="text-sm" />
            Add User
          </button>
          <button
            className="flex-1 sm:flex-none flex items-center justify-center gap-2
              px-4 sm:px-6 py-2.5 sm:py-3 text-white font-extrabold rounded-full
              shadow-lg hover:opacity-90 transition-all active:scale-95 text-sm"
            style={{ background: "linear-gradient(135deg, #006591 0%, #0ea5e9 100%)" }}
          >
            <Icon name="add_business" className="text-sm" />
            Add Store
          </button>
        </div>
      </section>

      {/* Stat cards */}
      <StatsSection />

      {/* Activity feed + insights */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        <ActivityFeed />
        <InsightsSidebar />
      </div> */}
    </div>
  )
}

export default AdminDashboard