import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />

  console.log("ProtectedRoute user:", user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
