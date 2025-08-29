import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { fetchUserStats, getUsers, deleteUserById } from "../utils/adminApiClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    premiumUsers: 0,
    basicUsers: 0,
    totalSubscriptions: 0,
    users: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          fetchUserStats(),
          getUsers()
        ])
        setUserStats({
          totalUsers: statsRes.data.totalUsers || 0,
          premiumUsers: statsRes.data.premiumUsers || 0,
          basicUsers: statsRes.data.basicUsers || 0,
          totalSubscriptions: statsRes.data.totalSubscriptions || 0,
          users: usersRes.data.users || [],
        })
      } catch (err) {
        console.error("Failed to fetch admin stats or users:", err);
      }
    };

    fetchStats();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure, you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUserById(userId);
      setUserStats((prev) => ({
        ...prev,
        users: prev.users.filter((user) => user._id !== userId),
        totalUsers: prev.totalUsers - 1
      }));
      toast.success("User deleted successfully!")
    } catch (err) {
      console.error("Failed to delete user:");
      toast.error(err.response.data.error || "Failed to delete user", { theme: 'dark' });
    }
  }

  const chartData = [
    { label: "Users", count: userStats.totalUsers },
    { label: "Premium", count: userStats.premiumUsers },
    { label: "Subscriptions", count: userStats.totalSubscriptions },
  ];

  const StatCard = ({ label, value, color }) => (
    <div className={`rounded-xl shadow-md p-5 text-white ${color}`}>
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="relative isolate bg-gray-900 px-6 py-20 sm:py-32 lg:px-8">
        <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
          <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"></div>
        </div>
        <div className="min-h-screen p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <StatCard label="Total Users" value={userStats.totalUsers} color="bg-blue-500" />
              <StatCard label="Premium Users" value={userStats.premiumUsers} color="bg-green-500" />
              <StatCard label="Basic Users" value={userStats.basicUsers} color="bg-gray-500" />
              <StatCard label="Active Subscriptions" value={userStats.totalSubscriptions} color="bg-purple-500" />
            </div>

            <div className="rounded-xl shadow-md p-6 mb-10">
              <h2 className="text-xl font-semibold text-gray-500 mb-4">📊 Users vs Subscriptions</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-500 mb-4">📄 All Users</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-900">
                  <thead className="bg-gray-900 text-gray-500">
                    <tr>
                      <th className="py-3 px-5 text-left">Username</th>
                      <th className="py-3 px-5 text-left">Email</th>
                      <th className="py-3 px-5 text-left">Role</th>
                      <th className="py-3 px-5 text-left">Created</th>
                      <th className="py-3 px-5 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userStats.users.length === 0 ? (
                      <tr>
                        <td className="py-4 px-5 text-gray-300" colSpan="5">No users found.</td>
                      </tr>
                    ) : (
                      userStats.users.map((u) => (
                        <tr key={u._id} className="border-t border-gray-200 text-gray-400">
                          <td className="py-3 px-5">{u.username}</td>
                          <td className="py-3 px-5">{u.email}</td>
                          <td className="py-3 px-5 capitalize">{u.role}</td>
                          <td className="py-3 px-5">{new Date(u.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 px-5">
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;