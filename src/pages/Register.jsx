import { useState } from 'react';
import { registerUser } from '../utils/authApiClient'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'

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
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 my-2">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg border border-green-200">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-4">Register</h2>
          <p className="text-center text-gray-500 mb-6">Create your PassOP account</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-1 font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200"
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:underline">Login</Link>
          </p>
          <button onClick={() => window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`}
            className="w-full py-2 mt-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200">
            Sign in with Google
          </button>

        </div>
      </div>
    </>
  );
};

export default Register;