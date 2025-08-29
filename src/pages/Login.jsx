import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password)

    if (res.success) {
      navigate('/')
      setTimeout(() => {
        toast.success("Logged in successfully", { theme: 'dark' });
      }, 50);
    }
    else {
      toast.error(res.message, { theme: 'dark' });
    }
  }


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
            <h2 className="text-3xl font-bold text-center text-white mb-4">Login</h2>
            <p className="text-center text-gray-500 mb-6">Login to your PassOP account</p>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label htmlFor="email" className="block mb-1 font-medium text-gray-500">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-indigo-300 bg-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-400 transition-all duration-200 cursor-pointer"
              >
                Login
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              <Link to="/forgot" className="text-indigo-500 hover:underline text-center font-medium mt-4 cursor-pointer">Forgot password</Link>
            </p>
            <p className="text-center text-sm text-gray-500 mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-500 hover:underline cursor-pointer">Register</Link>
            </p>
            <button onClick={loginWithGoogle}
              className="w-full py-2 mt-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-400 transition-all duration-200 cursor-pointer flex items-center justify-center gap-4">
              <span><FaGoogle className='text-xl' /></span>
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;