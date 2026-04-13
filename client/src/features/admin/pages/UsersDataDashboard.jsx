import React, { useEffect, useState } from 'react'
import Icon from '../components/Icon'
import api from '../../../configs/api';
import toast from 'react-hot-toast';
import Loader from '../../user/components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../app/features/authSlice';

const UsersDataDashboard = () => {
  const token = localStorage.getItem('token')
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    email: "",
    address: "",
    role: ""
  });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState([
    {
      label: "Total Users",
      value: "120",
      valueColor: "text-sky-600",
      blob: "bg-sky-500/5 group-hover:bg-sky-500/10",
    },
    {
      label: "Normal Users",
      value: "80",
      valueColor: "text-slate-900",
      blob: "bg-slate-500/5 group-hover:bg-slate-500/10",
    },
    {
      label: "Admin Users",
      value: "10",
      valueColor: "text-purple-600",
      blob: "bg-purple-500/5 group-hover:bg-purple-500/10",
    },
    {
      label: "Store Owners",
      value: "30",
      valueColor: "text-teal-600",
      blob: "bg-teal-500/5 group-hover:bg-teal-500/10",
    },
  ])
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER"
  })
  const [conPassword, setConPassword] = useState("")
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true))
      try {
        const res = await api.get(
          `/api/admin/users?page=${page}&limit=6&search=${search}&role=${role}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const res1 = await api.get('/api/admin/user-counts', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const counts = res1.data.data;

        setStats((prev) =>
          prev.map((item) => {
            if (item.label === "Total Users") return { ...item, value: counts.total_users };
            if (item.label === "Normal Users") return { ...item, value: counts.total_users_role };
            if (item.label === "Admin Users") return { ...item, value: counts.total_admins_role };
            if (item.label === "Store Owners") return { ...item, value: counts.total_owners_role };
            return item;
          })
        );

        setUsers(res.data.data);
        setTotalPages(res.data.pagination.totalPages);

      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        dispatch(setLoading(false))
      }
    };

    fetchData();
  }, [page, search, role, isAddOpen, isEditOpen]);

  useEffect(() => {
    setPage(1);
  }, [search, role]);

  // debouncing
  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);

  if (loading) return <Loader />

  // add user
  const formUpdate = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const formSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/api/admin/user', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success(data.message)
      setIsAddOpen(false)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const handleEdit = (user) => {
    setSelectedUser({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role
    });
    setIsEditOpen(true);
  };


  // delete user
  const deleteUser = async (id) => {
    try {
      const { data } = await api.delete(`/api/admin/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success(data.message)
      setUsers(users.filter(val => val.id !== id))
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }


  // update user
  const updateUser = async (e, id) => {
    e.preventDefault()
    try {
      const { data } = await api.put(`/api/admin/user/${id}`, {
        name: selectedUser.name,
        email: selectedUser.email,
        address: selectedUser.address,
        role: selectedUser.role
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success(data.message)
      setIsEditOpen(false)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const updateSelected = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value })
  }


  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">

      
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Users Management
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-1">
            Manage users, roles and store owners
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2
                      px-4 sm:px-6 py-2.5 sm:py-3 text-white font-extrabold rounded-full
                      shadow-lg hover:opacity-90 transition-all active:scale-95 text-sm"
            style={{ background: "linear-gradient(135deg, #006591 0%, #0ea5e9 100%)" }}
          >
            <Icon name="person_add" className="text-sm" />
            Add User
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]
            flex flex-col justify-between relative overflow-hidden group border border-slate-100"
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

      <section className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-4 py-2 rounded-xl border border-slate-200"
        >
          <option value="ALL">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="OWNER">Store Owner</option>
        </select>
      </section>

      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Address</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Store</th>
                <th className="text-left p-4">Rating</th>
                <th className="text-left p-4 flex items-center justify-center"><span>Actions</span></th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t hover:bg-slate-50">

                  <td className="p-4 font-semibold text-slate-800">{u.name}</td>
                  <td className="p-4 text-slate-600">{u.email}</td>
                  <td className="p-4 text-slate-600">{u.address}</td>

                  <td className="p-4">
                    <span className="text-xs font-bold px-2 py-1 rounded-lg bg-slate-100">
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4 text-slate-600">
                    {u.role === "OWNER" ? u.storename : "-"}
                  </td>

                  <td className="p-4">
                    {u.role === "OWNER" ? (
                      <div className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Icon name="star" fill={1} className="text-sm" />
                        {Number(u.rating || 0).toFixed(2)}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-4 flex gap-2 items-center justify-center">
                    {/* <button className="px-3 py-1.5 text-xs font-bold rounded-lg text-sky-600 bg-sky-50 border border-sky-100 hover:bg-sky-100 hover:scale-105 transition-all duration-200">
                      View
                    </button> */}

                    <button onClick={() => handleEdit(u)} className="px-3 py-1.5 text-xs font-bold rounded-lg text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:scale-105 transition-all duration-200">
                      Edit
                    </button>

                    <button onClick={() => deleteUser(u.id)} className="px-3 py-1.5 text-xs font-bold rounded-lg  text-red-500 bg-red-50 border border-red-100  hover:bg-red-100 hover:scale-105 transition-all duration-200">
                      Delete
                    </button>
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

        {[...Array(totalPages)].map((_, i) => (
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

      {/* Edit Form */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsEditOpen(false)}
          />

          {/* MODAL */}
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 z-10 border border-slate-100">

            {/* HEADER */}
            <div className="mb-6">
              <h2
                className="text-2xl font-black text-slate-900"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Edit User
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Update user details, role and account information
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-5" onSubmit={(e) => updateUser(e, selectedUser.id)}>

              {/* GRID ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* NAME */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider px-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name='name'
                    required
                    onChange={(e) => updateSelected(e)}
                    defaultValue={selectedUser?.name}
                    className="w-full mt-1 bg-slate-100 border-none rounded-xl px-4 py-3
              text-slate-800 placeholder:text-slate-400
              focus:ring-4 focus:ring-sky-500/10 focus:bg-white
              transition-all outline-none text-sm"
                    placeholder="Enter full name"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider px-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name='email'
                    required
                    onChange={(e) => updateSelected(e)}
                    defaultValue={selectedUser?.email}
                    className="w-full mt-1 bg-slate-100 border-none rounded-xl px-4 py-3
              text-slate-800 placeholder:text-slate-400
              focus:ring-4 focus:ring-sky-500/10 focus:bg-white
              transition-all outline-none text-sm"
                    placeholder="Enter email"
                  />
                </div>

              </div>

              {/* ADDRESS */}
              <div>
                <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider px-1">
                  Address
                </label>
                <textarea
                  rows={3}
                  name='address'
                  required
                  onChange={(e) => updateSelected(e)}
                  defaultValue={selectedUser?.address}
                  className="w-full mt-1 bg-slate-100 border-none rounded-xl px-4 py-3
            text-slate-800 placeholder:text-slate-400
            focus:ring-4 focus:ring-sky-500/10 focus:bg-white
            transition-all outline-none resize-none text-sm"
                  placeholder="Enter full address"
                />
              </div>

              {/* ROLE + STATUS STYLE CARD */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">

                <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-2">
                  Account Role
                </label>

                <select
                  defaultValue={selectedUser?.role}
                  name='role'
                  required
                  onChange={(e) => updateSelected(e)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3
            text-slate-800 focus:ring-4 focus:ring-sky-500/10
            transition-all outline-none text-sm"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="OWNER">Store Owner</option>
                </select>

                {/* optional badge */}
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  Current role controls dashboard access
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600
            hover:bg-slate-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white
            bg-gradient-to-r from-sky-600 to-sky-400
            shadow-lg hover:opacity-90 transition active:scale-95"
                >
                  Save Changes
                </button>

              </div>

            </form>
          </div>
        </div>
      )}


      {/* Add User Form */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsAddOpen(false)}
          />

          {/* MODAL */}
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-10">

            {/* HEADER */}
            <div className="mb-6">
              <h2
                className="text-xl font-extrabold text-slate-900"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Add User
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Add user details and role information
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-4 sm:space-y-5" onSubmit={(e) => formSubmit(e)}>

              {/* FULL NAME */}
              <div>
                <label className="block text-sm font-bold text-slate-800 px-1">
                  Full Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={formUpdate}
                  required
                  placeholder="John Doe"
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5
      text-slate-800 placeholder:text-slate-400
      focus:ring-4 focus:ring-sky-500/10 focus:bg-white
      transition-all outline-none text-sm"
                />

                <p
                  hidden={!form.name || (form.name.length >= 20 && form.name.length <= 60)}
                  className="text-[10px] text-red-500 px-1 tracking-widest font-bold mt-1"
                >
                  * Min 20 characters, Max 60 characters.
                </p>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-bold text-slate-800 px-1">
                  Email Address
                </label>

                <input
                  name="email"
                  value={form.email}
                  onChange={formUpdate}
                  required
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5
      text-slate-800 placeholder:text-slate-400
      focus:ring-4 focus:ring-sky-500/10 focus:bg-white
      transition-all outline-none text-sm"
                />
              </div>

              {/* PASSWORD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-bold text-slate-800 px-1">
                    Password
                  </label>

                  <input
                    name="password"
                    value={form.password}
                    onChange={formUpdate}
                    required
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5
        text-slate-800 placeholder:text-slate-400
        focus:ring-4 focus:ring-sky-500/10 focus:bg-white
        transition-all outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 px-1">
                    Confirm Password
                  </label>

                  <input
                    name="confirmPassword"
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                    required
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-sky-500/10 focus:bg-white transition-all outline-none text-sm"
                  />
                </div>

              </div>

              {/* PASSWORD ERRORS */}
              <div>
                <p
                  hidden={
                    !form.password ||
                    /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/.test(form.password)
                  }
                  className="text-[10px] text-red-500 px-1 tracking-widest font-bold"
                >
                  * 8-16 characters, must include uppercase & special character.
                </p>

                <p
                  hidden={!conPassword || form.password === conPassword}
                  className="text-[10px] text-red-500 px-1 tracking-widest font-bold"
                >
                  * Password does not match.
                </p>
              </div>

              {/* ADDRESS */}
              <div>
                <label className="block text-sm font-bold text-slate-800 px-1">
                  Home Address
                </label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={formUpdate}
                  required
                  rows={3}
                  placeholder="123 Street, City"
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-sky-500/10 focus:bg-white transition-all outline-none resize-none text-sm"
                />
                <p
                  hidden={!form.address || form.address.length <= 400}
                  className="text-[10px] text-red-500 px-1 tracking-widest font-bold"
                >
                  * Max 400 characters.
                </p>
              </div>

              {/* ROLE */}
              <div>
                <label className="block text-sm font-bold text-slate-800 px-1">
                  Role
                </label>

                <select
                  name="role"
                  value={form.role}
                  onChange={formUpdate}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5 text-slate-800 focus:ring-4 focus:ring-sky-500/10 focus:bg-white transition-all outline-none text-sm"
                >

                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="OWNER">Store Owner</option>
                </select>
              </div>

              {/* SUBMIT */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full text-white font-extrabold py-3.5 rounded-full  shadow-lg hover:scale-[1.02] active:scale-95 transition-all  bg-gradient-to-r from-sky-600 to-sky-400"
                >
                  Create User
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersDataDashboard