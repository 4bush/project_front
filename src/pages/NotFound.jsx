import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>🏋️</div>
      <h1 style={{ fontSize: '3rem', color: '#1e40af', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ color: '#1e293b', marginBottom: '1rem' }}>Страница не найдена</h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Кажется, эта тренировка не существует. Вернёмся к основному плану?
      </p>
      <button
        onClick={() => navigate('/')}
        className="btn-primary"
        style={{ padding: '14px 32px', fontSize: '1.1rem' }}
      >
        На главную
      </button>
    </div>
  );
}
