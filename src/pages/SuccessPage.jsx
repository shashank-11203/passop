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
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]" />
            </div>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
                <Spinner />
                <p className="text-gray-700">Upgrading your account... Please wait.</p>
            </div>
        </>
    );
};

export default SuccessPage;