import { useState } from 'react';
import { forgotPassword } from '../utils/authApiClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            toast.success('Reset link sent to your email', { theme: 'dark' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send reset link', { theme: 'dark' });
        } finally {
            console.log(email)
            setEmail('')
        }
    };

    return (
        <>
            <ToastContainer closeOnClick />
            <div className="relative isolate bg-gray-900 px-6 py-20 sm:py-32 lg:px-8">
                <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
                    <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"></div>
                </div>
                <div className="min-h-screen flex items-center justify-center x-4 my-2">
                    <form onSubmit={handleSubmit} className="max-w-md w-full p-6 rounded shadow-md">
                        <h2 className="text-2xl font-bold mb-4 text-white">Forgot Password?</h2>
                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            className="w-full px-4 py-2 border border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4 bg-gray-900 text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-400 transition-all duration-200 cursor-pointer"
                        >
                            Send Reset Link
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
