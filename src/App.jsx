import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import UserPage from './pages/UserPage'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import ChangePassword from './pages/ChangePassword'
import { AuthProvider } from './context/AuthContext.jsx'
import 'react-toastify/dist/ReactToastify.css'
import Subscription from './pages/Subscription.jsx'
import SuccessPage from './pages/SuccessPage.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Manager />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/user'
              element={
                <ProtectedRoute>
                  <UserPage />
                </ProtectedRoute>
              } />
            <Route
              path='/user/changepassword'
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              } />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/forgot' element={<ForgotPassword />} />
            <Route path='/subscription' element={<Subscription />} />
            <Route path='/subscription/success' element={<SuccessPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  )
}

export default App