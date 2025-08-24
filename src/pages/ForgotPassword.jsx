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
            <ToastContainer closeOnClick/>
            <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 my-2">
                <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-6 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Forgot Password?</h2>
                    <input
                        type="email"
                        placeholder="Enter your registered email"
                        className="w-full px-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 cursor-pointer"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
