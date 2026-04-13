import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./features/public/pages/Landing"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import { Toaster } from 'react-hot-toast'
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import OwnerDashboard from "./features/owner/pages/OwnerDashboard";
import UserStores from "./features/user/pages/UserStores";
import UserLayout from "./features/user/layout/UserLayout";
import AdminLayout from "./features/admin/layouts/adminLayout";
import OwnerLayout from "./features/owner/layouts/OwnerLayout";
import Unauthorized from "./features/auth/pages/Unauthorized";
import AdminDashboardLayout from "./features/admin/layouts/AdminDashboardLayout";
import UsersDataDashboard from './features/admin/pages/UsersDataDashboard'
import StoresDataDashboard from './features/admin/pages/StoresDataDashboard'
import OwnerDashboardLayout from './features/owner/layouts/OwnerDashboardLayout'
import UpdatePassword from "./features/auth/pages/UpdatePassword";
import UsersData from "./features/owner/pages/UsersData";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />
        <Route path="/unauth" element={<Unauthorized />} />

        <Route path="/admin" element={<AdminLayout roles={["ADMIN"]} />}>
          <Route path="dashboard" element={<AdminDashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="userData" element={<UsersDataDashboard />} />
            <Route path="storedata" element={<StoresDataDashboard />} />
          </Route>
        </Route>

        <Route path="/user" element={<UserLayout roles={["USER", "ADMIN", "OWNER"]} />}>
          <Route path="stores" element={<UserStores />} />
        </Route>

        <Route path="owner" element={<OwnerLayout roles={["OWNER"]} />}>
          <Route path="dashboard" element={<OwnerDashboardLayout />}>
            <Route index element={<OwnerDashboard />} />
            <Route path="userData" element={<UsersData />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
