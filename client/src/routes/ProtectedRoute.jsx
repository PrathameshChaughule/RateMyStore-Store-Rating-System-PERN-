import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ roles }) => {
    const token = localStorage.getItem('token')
    const user = useSelector(state => state.auth.user)
    if (!token) return <Navigate to="/login" />

    if (!roles && !roles.includes(user.role)) return <Navigate to="/login" />

    return (
        <Outlet />
    )
}

export default ProtectedRoute