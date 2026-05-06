import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      background: '#1e40af',
      padding: '1rem 0',
      color: 'white',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        fontSize: '1.1rem'
      }}>
        <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#ffd700' : 'white', textDecoration: 'none', fontWeight: isActive ? '700' : '500' })}>
          Главная
        </NavLink>
        <NavLink to="/workouts" style={({ isActive }) => ({ color: isActive ? '#ffd700' : 'white', textDecoration: 'none', fontWeight: isActive ? '700' : '500' })}>
          Тренировки
        </NavLink>
        <NavLink to="/dashboard" style={({ isActive }) => ({ color: isActive ? '#ffd700' : 'white', textDecoration: 'none', fontWeight: isActive ? '700' : '500' })}>
          Личный кабинет
        </NavLink>
        <NavLink to="/profile" style={({ isActive }) => ({ color: isActive ? '#ffd700' : 'white', textDecoration: 'none', fontWeight: isActive ? '700' : '500' })}>
          Профиль
        </NavLink>
        <NavLink to="/about" style={({ isActive }) => ({ color: isActive ? '#ffd700' : 'white', textDecoration: 'none', fontWeight: isActive ? '700' : '500' })}>
          О платформе
        </NavLink>
      </div>
    </nav>
  );
}