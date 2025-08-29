import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
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
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]" />
      </div>
      <div className="min-h-[84vh] py-12 px-4">
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
      </div> */}

      <div className="relative isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
          <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"></div>
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-400">Pricing</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl">Choose Your Subscription</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          <div className="rounded-3xl rounded-t-3xl bg-white/2.5 p-8 ring-1 ring-white/10 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-tr-none lg:rounded-bl-3xl">
            <h3 id="tier-hobby" className="text-base/7 font-semibold text-indigo-400">Basic</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold tracking-tight text-white">₹ 0</span>
              <span className="text-base text-gray-400">/month</span>
            </p>
            <p className="mt-6 text-base/7 text-gray-300">The perfect plan if you&#039;re just getting started with our product.</p>
            <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10">
              <li className="flex gap-x-3">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
                  <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                limited password storage
              </li>
              <li className="flex gap-x-3">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
                  <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                store up to 5 passwords
              </li>
              <li className="flex gap-x-3">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
                  <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                No export passwords
              </li>
              <li className="flex gap-x-3">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
                  <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                24-hour support response time
              </li>
            </ul>
            <button aria-describedby="tier-hobby" className="mt-8 block rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/75 sm:mt-10 bg-indi w-full cursor-pointer" onClick={() => { handleSubscribe("basic") }}>Get started today</button>
          </div>
          <div className="relative rounded-3xl bg-gray-800 p-8 ring-1 ring-white/10 sm:p-10">
            <h3 id="tier-enterprise" className="text-base/7 font-semibold text-indigo-400 h-16">Premium</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold tracking-tight text-white">₹ 299</span>
              <span className="text-base text-gray-400">/month</span>
            </p>
            <p className="mt-6 text-base/7 text-gray-300">Dedicated features for you</p>
            <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10">
              <li className="flex gap-x-3">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
                  <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                No password storage limits
              </li>
              <li className="flex gap-x-3">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
                  <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                Store unlimited passwords
              </li>
              <li className="flex gap-x-3">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
                  <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                Export passwords as PDF
              </li>
              <li className="flex gap-x-3">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
                  <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                Dedicated support representative
              </li>
              <li className="flex gap-x-3">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
                  <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                24-hours support response time
              </li>
            </ul>
            <button aria-describedby="tier-hobby" className="mt-8 block rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/75 sm:mt-10 bg-indi w-full cursor-pointer" onClick={() => { handleSubscribe("premium") }}>Get started today</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;