import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createSubsciprtion } from "../utils/subscriptionApiClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const plans = [
  {
    name: "Basic",
    price: 0,
    features: ["🔒 Store limited passwords", "❌ No export passwords"],
    tier: "basic",
    highlight: false,
  },
  {
    name: "Premium",
    price: 299,
    features: ["🔒 Store unlimited passwords", "🗂 export passwords", "🛡 Priority support"],
    tier: "premium",
    highlight: false,
  }
];

const Subscription = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async (plan) => {
    if (!isAuthenticated) return navigate("/login");

    if (plan === "basic") {
      navigate("/")
      setTimeout(() => {
        toast.success("You're on the free plan!");
      }, 100);
      return;
    }

    try {
      const res = await createSubsciprtion({ plan });
      window.location.href = res.data.url;
    } catch (err) {
      toast.error(err.response.data.message);
      console.error("Failed to start checkout", err);
    }
  };

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
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]" />
      </div>
      <div className="min-h-screen py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          💼 Choose Your Plan
        </h1>
        <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 shadow-xl border ${plan.highlight ? "bg-green-100 border-green-400 scale-105" : "bg-white"
                } transition-transform duration-300`}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{plan.name}</h2>
              <p className="text-4xl font-semibold text-green-600 mb-6">
                ₹ {plan.price}
                <span className="text-sm font-normal text-gray-500 ml-1">/month</span>
              </p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-700">
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.tier)}
                className={`w-full py-2 px-4 rounded-full font-bold cursor-pointer ${plan.highlight
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-800 text-white hover:bg-gray-900"
                  } transition-all`}
              >
                {plan.price === 0 ? "Start Free" : "Subscribe"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Subscription;