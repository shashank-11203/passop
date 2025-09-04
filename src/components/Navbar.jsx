import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LiaUserCircle } from "react-icons/lia";
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const { isAuthenticated, loading, logout, user } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        toast.success("Logged out successfully", { theme: 'dark' });
        navigate('/login');
    };

    if (loading) return null;

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
            <nav className='bg-slate-800 text-white py-1 relative'>
                <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

                    <div className="logo font-bold text-white text-2xl cursor-pointer" onClick={() => navigate('/')}>
                        <span className='text-indigo-500'>&lt;</span>
                        <span>Pass</span><span className='text-indigo-500'>OP/&gt;</span>
                    </div>

                    <div className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <FaTimes className="text-2xl text-white cursor-pointer" />
                        ) : (
                            <FaBars className="text-2xl text-white cursor-pointer" />
                        )}
                    </div>

                    <div className={`md:flex gap-4 justify-center items-center absolute md:static top-full left-0 w-full md:w-auto bg-slate-800 md:bg-transparent px-6 py-4 md:p-0 transition-all duration-300 ease-in-out z-40
                        ${isOpen ? 'flex flex-col' : 'hidden'} md:flex md:flex-row`}>

                        <Link
                            to="/subscription"
                            onClick={() => setIsOpen(false)}
                            className='hover:bg-slate-200 font-medium text-lg bg-slate-300 px-3 text-black rounded-xl py-1 cursor-pointer w-full md:w-auto text-center mb-2 md:mb-0'
                        >
                            Subscription
                        </Link>

                        {isAuthenticated ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="hover:bg-slate-200 font-medium text-lg bg-slate-300 px-3 text-black rounded-xl py-1 cursor-pointer w-full md:w-auto text-center mb-2 md:mb-0"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    navigate('/login');
                                    setIsOpen(false);
                                }}
                                className="hover:bg-slate-200 font-medium text-lg bg-slate-300 px-3 text-black rounded-xl py-1 cursor-pointer w-full md:w-auto text-center mb-2 md:mb-0"
                            >
                                Login
                            </button>
                        )}

                        {isAuthenticated && user.isAdmin && (
                            <button
                                onClick={() => {
                                    navigate('/dashboard');
                                    setIsOpen(false);
                                }}
                                className="hover:bg-slate-200 font-medium text-lg bg-slate-300 px-3 text-black rounded-xl py-1 cursor-pointer w-full md:w-auto text-center mb-2 md:mb-0"
                            >
                                Dashboard
                            </button>
                        )}

                        {isAuthenticated ? (
                            <button
                                className='cursor-pointer w-full md:w-auto flex justify-center md:block mb-2 md:mb-0'
                                onClick={() => {
                                    navigate('/user');
                                    setIsOpen(false);
                                }}
                            >
                                <LiaUserCircle className='p-1 text-5xl text-slate-300 hover:text-slate-400' />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    navigate('/register');
                                    setIsOpen(false);
                                }}
                                className="hover:bg-slate-200 font-medium text-lg bg-slate-300 px-3 text-black rounded-xl py-1 cursor-pointer w-full md:w-auto text-center"
                            >
                                Register
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;