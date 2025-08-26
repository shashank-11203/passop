import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from "react-icons/fc";

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
      <div className="min-h-[84vh] flex items-center justify-center bg-green-50 px-4 my-2">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg border border-green-200">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-4">Login</h2>
          <p className="text-center text-gray-500 mb-6">Login to your PassOP account</p>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 cursor-pointer"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            <Link to="/forgot" className="text-green-600 hover:underline text-center font-medium mt-4 cursor-pointer">Forgot password</Link>
          </p>
          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-green-600 hover:underline cursor-pointer">Register</Link>
          </p>
          <button onClick={loginWithGoogle}
            className="w-full py-2 mt-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 cursor-pointer flex items-center justify-center gap-4">
            <span><FcGoogle className='text-2xl'/></span>
            Login with Google
          </button>
        </div>
      </div>
    </>
  );
}
export default Login;