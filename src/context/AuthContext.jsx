import { createContext, useContext, useState, useEffect } from 'react';
import { checkAuth, loginUser } from '../utils/authApiClient';
import { logoutUser } from '../utils/authApiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const res = await checkAuth()

        setIsAuthenticated(res.isAuthenticated)
        if (res.user) {
          setUser(res.user)
        }
      } catch (err) {
        console.log('authContext error ', err)
        setIsAuthenticated(false)
        setUser(null)

      } finally {
        setLoading(false)
      }
    }

    fetchAuthStatus()
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const login = async (email, password) => {
    try {
      const res = await loginUser(email, password)
      setIsAuthenticated(true)
      setUser(res.data.user);
      return { success: true }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      return {
        success: false,
        message: err.response.data.message,
      };
    }
  }

  const logout = async () => {
    try {
      await logoutUser();
      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      console.error("Logout error", err);
    }
  }

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/api/auth/google"
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, setIsAuthenticated, loading, login, loginWithGoogle, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)