import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../utils/authApiClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match", { theme: 'dark' })
        }

        try {
            await resetPassword(token, password);
            toast.success('Password reset successful!', { theme: 'dark' });
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Reset failed', { theme: 'dark' });
        } finally {
            setPassword('')
            setConfirmPassword('')
        }
    };

    return (
        <>
            <ToastContainer closeOnClick />
            <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 my-2">
                <form onSubmit={handleReset} className="max-w-md w-full bg-white p-6 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
                    <input
                        type="password"
                        placeholder="New password"
                        className="w-full px-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Re-enter your new password"
                        className="w-full px-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 cursor-pointer"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;
