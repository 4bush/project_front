import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useWorkouts } from '../context/WorkoutContext';
import TimerDisplay from '../components/TimerDisplay';

function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workouts, toggleWorkout, deleteWorkout } = useWorkouts();

  // useMemo — не пересчитывать при каждом рендере
  const workout = useMemo(
    () => workouts.find((w) => w.id === Number(id)),
    [workouts, id]
  );

  if (!workout) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <h2 style={{ color: '#ef4444' }}>Тренировка не найдена</h2>
        <p style={{ color: '#64748b', marginTop: '12px' }}>Возможно, она была удалена</p>
        <button
          onClick={() => navigate('/workouts')}
          className="btn-primary"
          style={{ marginTop: '24px', padding: '12px 24px' }}
        >
          ← К списку тренировок
        </button>
      </div>
    );
  }

  const difficultyColor = {
    'Лёгкая': '#16a34a',
    'Средняя': '#ea580c',
    'Тяжёлая': '#dc2626',
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 1rem' }}>
      <button
        onClick={() => navigate('/workouts')}
        style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginBottom: '24px' }}
      >
        ← Вернуться к тренировкам
      </button>

      <div className="workout-card" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '1rem' }}>{workout.title}</h1>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '6px 14px', borderRadius: '20px', fontWeight: 600 }}>
            ⏱ {workout.duration} мин
          </span>
          <span style={{
            background: '#f0fdf4',
            color: difficultyColor[workout.difficulty] || '#64748b',
            padding: '6px 14px',
            borderRadius: '20px',
            fontWeight: 600
          }}>
            💪 {workout.difficulty}
          </span>
          {workout.type && (
            <span style={{ background: '#faf5ff', color: '#7c3aed', padding: '6px 14px', borderRadius: '20px', fontWeight: 600 }}>
              🏷 {workout.type}
            </span>
          )}
          <span style={{
            background: workout.completed ? '#dcfce7' : '#f1f5f9',
            color: workout.completed ? '#166534' : '#64748b',
            padding: '6px 14px',
            borderRadius: '20px',
            fontWeight: 600
          }}>
            {workout.completed ? '✅ Выполнено' : '⬜ Не выполнено'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => toggleWorkout(workout.id)}
            className="btn-primary"
            style={{ background: workout.completed ? '#64748b' : '#16a34a' }}
          >
            {workout.completed ? 'Отметить невыполненной' : 'Отметить выполненной'}
          </button>
          <button
            onClick={() => { deleteWorkout(workout.id); navigate('/workouts'); }}
            className="btn-primary"
            style={{ background: '#ef4444' }}
          >
            Удалить тренировку
          </button>
        </div>
      </div>

      {/* Таймер для этой тренировки */}
      <div style={{ maxWidth: '350px', margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#1e40af' }}>
          Таймер тренировки
        </h3>
        <TimerDisplay initial={workout.duration * 60} />
      </div>
    </div>
  );
}

export default WorkoutDetail;
