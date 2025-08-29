import { useState } from 'react';
import { registerUser } from '../utils/authApiClient'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", { theme: 'dark' })
    }

    try {
      const res = await registerUser(formData);
      toast.success("Registered successfully", { theme: 'dark' })
      navigate('/login')
    } catch (err) {
      toast.error(err.response.data.message, { theme: 'dark' })
    } finally {
      setFormData({ username: '', email: '', password: '', confirmPassword: '' })
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
      <div className="relative isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
          <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"></div>
        </div>
        <div className="min-h-[84vh] flex items-center justify-center px-4 my-2">
          <div className="w-full max-w-md p-6 rounded-2xl shadow-lg border-0">
            <h2 className="text-3xl font-bold text-center text-white mb-4">Register</h2>
            <p className="text-center text-gray-400 mb-6 ">Create your PassOP account</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block mb-1 font-medium text-gray-500">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-900 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium text-gray-500">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-900 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-1 font-medium text-gray-500">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-900 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-500">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-900 text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-400 transition-all duration-200 cursor-pointer"
              >
                Register
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:underline cursor-pointer">Login</Link>
            </p>
            <button onClick={() => window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`}
              className="w-full py-2 mt-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-400 transition-all duration-200 flex items-center justify-center gap-4 cursor-pointer">
              <span><FaGoogle className='text-2xl' /></span>
              Sign in with Google
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default Register;