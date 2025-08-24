import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import Spinner from "../components/Spinner";
import { fetchPasswords } from "../utils/passwordApiClient";
import { fetchSubscription } from "../utils/subscriptionApiClient";

const UserPage = () => {
  const { loading, user, setUser } = useAuth()
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    if (!user) return;

    const getPasswords = async () => {
      try {
        const passwords = await fetchPasswords();
        setPasswords(passwords);
      } catch (err) {
        console.error("Failed to fetch passwords", err);
        navigate('/login');
      }
    }

    const loadSubscriptions = async () => {
      try {
        const res = await fetchSubscription();
        setSubscriptions(res.data.transactions);

        const hasPremium = res.data.transactions.some(sub => sub.plan === 'premium' && sub.status === 'active');
        if (hasPremium && user.role !== 'premium') {
          setUser({ ...user, role: 'premium' });
        }
      } catch (err) {
        console.error("Failed to fetch subscriptions", err);
      }
    }

    getPasswords();
    loadSubscriptions();
  }, [user, loading]);

  if (loading) return <Spinner />;

  const calculateDaysAgo = (updatedAt) => {
    const now = new Date();
    const updated = new Date(updatedAt);
    const diffTime = now - updated;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays == 0) return 'Today';
    if (diffDays == 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full- w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]" />
      </div>
      <div className="min-h-screen px-4 py-6">
        <div className="max-w-5xl mx-auto rounded-2xl shadow-lg p-6 md:p-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">👤 User Profile</h1>

          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <img src={'/icons/profile.png'} alt="User Icon" className="w-28 h-28" />
            <div className="text-center md:text-left">
              <p className="text-xl font-semibold text-gray-800">
                Username: <span className="text-blue-600">{user.username}</span>
              </p>
              <p className="text-lg text-gray-600">Email: {user.email}</p>
              <p className="text-lg text-gray-600">
                Subscription:
                <span className={`ml-2 px-3 py-1 text-center rounded-full text-white text-sm ${user.role === 'premium' ? 'bg-green-600' : 'bg-gray-400'}`}>
                  {user.role}
                </span>
              </p>
            </div>
          </div>

          <div className="flex justify-center mb-10">
            <button
              onClick={() => navigate("/user/changepassword")}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300 cursor-pointer"
            >
              🔐 Change Password
            </button>
          </div>

          <div className="mb-10 overflow-x-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">🧾 Recently Updated Passwords</h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="text-left py-3 px-5">Site</th>
                  <th className="text-left py-3 px-5">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {passwords.length === 0 ? (
                  <tr>
                    <td className="py-4 px-5 text-gray-500" colSpan="2">No passwords found.</td>
                  </tr>
                ) : (
                  passwords.map((pwd) => (
                    <tr key={pwd._id} className="border-t border-gray-200">
                      <td className="py-3 px-5">{pwd.site}</td>
                      <td className="py-3 px-5 text-gray-600">{calculateDaysAgo(pwd.updatedAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">💳 Payment History</h2>

            {subscriptions.length === 0 ? (<p>You have not upgraded to any premium subscription. Click here to get <span><Link className="text-green-500 underline" to={'/subscription'}>subsciption</Link></span></p>
            ) : (
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-blue-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-5 text-left">Plan</th>
                    <th className="py-3 px-5 text-left">Price</th>
                    <th className="py-3 px-5 text-left">Status</th>
                    <th className="py-3 px-5 text-left">Purchased On</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub._id} className="border-t border-gray-200">
                      <td className="py-3 px-5">{sub.plan}</td>
                      <td className="py-3 px-5">₹ 299</td>
                      <td className="py-3 px-5">{sub.status}</td>
                      <td className="py-3 px-5">{new Date(sub.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>

              </table>)}
          </div>

        </div>
      </div>
    </>
  );
};

export default UserPage;
