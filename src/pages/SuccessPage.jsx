import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { markUserPremium } from "../utils/subscriptionApiClient";
import Spinner from "../components/Spinner";

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const session_id = searchParams.get("session_id");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const markPremium = async () => {
            if (!session_id || isProcessing) return;
            setIsProcessing(true);
            try {
                await markUserPremium(session_id);
                setTimeout(() => navigate("/user"), 3000);
            } catch (err) {
                console.error("Failed to mark premium:", err);
                if (err.response?.data?.message === 'Subscription already exists') {
                    alert("Subscription already processed!");
                    setTimeout(() => navigate("/user"), 3000);
                } else {
                    alert("Something went wrong. Please contact support.");
                }
            } finally {
                setIsProcessing(false);
            }
        };

        markPremium();

    }, [session_id, navigate]);

    return (
        <>
            <div className="relative isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
                <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
                    <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"></div>
                </div>
                <div className="flex flex-col items-center justify-center min-h-[84vh]">
                    <h1 className="text-3xl font-bold text-indigo-600 mb-4">🎉 Payment Successful!</h1>
                    <Spinner />
                    <p className="text-gray-700">Upgrading your account... Please wait.</p>
                </div>
            </div>
        </>
    );
};

export default SuccessPage;