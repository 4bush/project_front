import { Outlet, NavLink } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Личный кабинет</h1>
      
      <nav style={{ textAlign: 'center', marginBottom: '40px' }}>
        <NavLink to="/dashboard" style={({ isActive }) => ({ margin: '0 15px', fontWeight: isActive ? 'bold' : 'normal' })}>
          Обзор
        </NavLink>
        <NavLink to="/dashboard/stats" style={({ isActive }) => ({ margin: '0 15px', fontWeight: isActive ? 'bold' : 'normal' })}>
          Статистика
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}