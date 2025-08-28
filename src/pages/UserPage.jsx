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
      <div className="relative isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
          <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"></div>
        </div>
        <div className="min-h-screen px-4 py-6">
          <div className="max-w-5xl mx-auto rounded-2xl shadow-lg p-6 md:p-10">
            <h1 className="text-3xl font-bold text-center mb-8 text-white">👤 User Profile</h1>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <img src={'/icons/profile.png'} alt="User Icon" className="w-28 h-28" />
              <div className="text-center md:text-left">
                <p className="text-xl font-semibold text-white">
                  Username: <span className="text-blue-600">{user.username}</span>
                </p>
                <p className="text-lg text-white">Email: {user.email}</p>
                <p className="text-lg text-white">
                  Subscription:
                  <span className={`ml-2 px-3 py-1 text-center rounded-full text-white text-sm ${user.role === 'premium' ? 'bg-indigo-600' : 'bg-gray-400'}`}>
                    {user.role}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-center mb-10">
              <button
                onClick={() => navigate("/user/changepassword")}
                className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300 cursor-pointer"
              >
                🔐 Change Password
              </button>
            </div>

            <div className="mb-10 overflow-x-auto">
              <h2 className="text-2xl font-semibold text-white mb-4">🧾 Recently Updated Passwords</h2>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="text-left py-3 px-5 text-white">Site</th>
                    <th className="text-left py-3 px-5 text-white">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {passwords.length === 0 ? (
                    <tr>
                      <td className="py-4 px-5 text-white" colSpan="2">No passwords found.</td>
                    </tr>
                  ) : (
                    passwords.map((pwd) => (
                      <tr key={pwd._id} className="border-t border-gray-200">
                        <td className="py-3 px-5 text-white">{pwd.site}</td>
                        <td className="py-3 px-5 text-white">{calculateDaysAgo(pwd.updatedAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl">
              <h2 className="text-2xl font-semibold text-white mb-4">💳 Payment History</h2>

              {subscriptions.length === 0 ? (<p className="text-white">You have not upgraded to any premium subscription. Click here to get <span><Link className="text-indigo-500 underline" to={'/subscription'}>subsciption</Link></span></p>
              ) : (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                  <thead className="bg-gray-900 text-white">
                    <tr className="text-white">
                      <th className="py-3 px-5 text-left">Plan</th>
                      <th className="py-3 px-5 text-left">Price</th>
                      <th className="py-3 px-5 text-left">Status</th>
                      <th className="py-3 px-5 text-left">Purchased On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((sub) => (
                      <tr key={sub._id} className="border-t border-gray-200 text-white">
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
      </div>
    </>
  );
};

export default UserPage;
