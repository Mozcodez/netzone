import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/admin" replace />;
}
