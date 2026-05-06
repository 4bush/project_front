import { Routes, Route, NavLink } from 'react-router-dom';
import { WorkoutProvider } from './context/WorkoutContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/home';
import Workouts from './pages/Workouts';
import WorkoutDetail from './pages/WorkoutDetail';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import DashboardOverview from './pages/Dashboard/Overview';
import DashboardStats from './pages/Dashboard/Stats';
import Profile from './pages/Profile';
import About from './pages/About';

function App() {
  return (
    <WorkoutProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/:id" element={<WorkoutDetail />} />
          <Route path="/about" element={<About />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="stats" element={<DashboardStats />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '80px', color: '#ef4444' }}>404 — Страница не найдена</h2>} />
      </Routes>
    </WorkoutProvider>
  );
}

export default App;