import React from 'react';
import { useWorkouts } from '../context/WorkoutContext';

const Home = () => {
  const { user, login, logout } = useWorkouts();

  return (
    <div className="home-page">
      <h1>Welcome to Smart Fitness Tracker</h1>
      <p>Track your workouts and monitor your progress easily.</p>
      <div className="card">
        <h3>Today's Goal</h3>
        <p>30 minutes cardio</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        {!user ? (
          <>
            <p style={{ marginBottom: '15px', color: '#64748b' }}>
              Чтобы получить доступ к Личному кабинету и Профилю, нужно войти.
            </p>
            <button onClick={login} className="btn-quick-start">
              Начать быструю тренировку (Войти)
            </button>
          </>
        ) : (
          <>
            <p style={{ marginBottom: '15px', color: '#1e293b', fontWeight: 'bold' }}>
              Вы авторизованы как: {user.name}
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => window.location.href='/workouts'} className="btn-primary">
                Мои тренировки
              </button>
              <button onClick={logout} className="btn-primary" style={{ background: '#ef4444' }}>
                Выйти
              </button>
            </div>
          </>
        )}
      </div>

      <p style={{ marginTop: '40px', color: '#94a3b8', fontSize: '0.9rem' }}>
        Добро пожаловать в Smart Fitness Tracker!<br />
        Отслеживай свои тренировки, прогресс и достигай целей быстрее.
      </p>
    </div>
  );
};

export default Home;