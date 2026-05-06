import { Navigate, Outlet } from 'react-router-dom';
import { useWorkouts } from '../context/WorkoutContext';

const ProtectedRoute = () => {
  const { user } = useWorkouts();
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;