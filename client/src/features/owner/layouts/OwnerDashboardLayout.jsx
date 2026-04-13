import React from 'react'
import { useState } from "react";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const OwnerDashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
            <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; font-family: 'Inter', sans-serif; background: #f7f9fb; }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 9999px; }
      `}</style>
            <div className="flex min-h-screen bg-slate-50 overflow-hidden">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

                    <Navbar onMenuClick={() => setSidebarOpen(true)} />

                    <main className="flex-1 overflow-y-auto pb-20 lg:pb-8">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default OwnerDashboardLayout