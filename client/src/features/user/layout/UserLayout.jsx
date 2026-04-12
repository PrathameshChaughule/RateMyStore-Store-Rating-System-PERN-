import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserLayout = ({ roles }) => {
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    if (!token) return <Navigate to="/login" />
    return (
        roles.includes(decoded.role) ? <Outlet /> : <Navigate to="/unauth" />
    )
}

export default UserLayout