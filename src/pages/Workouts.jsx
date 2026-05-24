import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkouts } from '../context/WorkoutContext';

const Workouts = () => {
  const { workouts, loading, error, deleteWorkout, addWorkout, toggleWorkout } = useWorkouts();
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('Лёгкая');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('Все');
  const [formErrors, setFormErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  // useMemo — фильтрация без лишних пересчётов (обязательное требование)
  const filteredWorkouts = useMemo(() => {
    return workouts.filter((w) => {
      const matchesSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = filterDifficulty === 'Все' || w.difficulty === filterDifficulty;
      return matchesSearch && matchesDifficulty;
    });
  }, [workouts, searchQuery, filterDifficulty]);

  const validate = () => {
    const errors = {};
    if (!newTitle.trim()) errors.title = 'Введите название тренировки';
    if (!newDuration || Number(newDuration) <= 0) errors.duration = 'Введите корректную длительность';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    addWorkout({
      title: newTitle.trim(),
      duration: Number(newDuration),
      difficulty: newDifficulty,
    });
    setNewTitle('');
    setNewDuration('');
    setNewDifficulty('Лёгкая');
    setFormErrors({});
    setSuccessMsg('Тренировка добавлена!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <div className="timer-display">⏳</div>
        <p style={{ color: '#64748b', marginTop: '16px' }}>Загрузка тренировок...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', color: '#ef4444' }}>
        <h2>Ошибка загрузки</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1e40af' }}>
        Мои тренировки
      </h2>

      {/* Форма добавления */}
      <section className="form" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Добавить тренировку</h3>

        {successMsg && (
          <div style={{ background: '#dcfce7', color: '#166534', padding: '10px 16px', borderRadius: '8px', marginBottom: '12px', fontWeight: 600 }}>
            ✅ {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Название тренировки"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          {formErrors.title && (
            <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '-8px' }}>{formErrors.title}</p>
          )}

          <input
            type="number"
            placeholder="Длительность (мин)"
            value={newDuration}
            onChange={(e) => setNewDuration(e.target.value)}
            min="1"
          />
          {formErrors.duration && (
            <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '-8px' }}>{formErrors.duration}</p>
          )}

          <select
            value={newDifficulty}
            onChange={(e) => setNewDifficulty(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '12px 16px', margin: '12px 0', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem' }}
          >
            <option>Лёгкая</option>
            <option>Средняя</option>
            <option>Тяжёлая</option>
          </select>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', marginTop: '8px' }}>
            Добавить
          </button>
        </form>
      </section>

      {/* Поиск и фильтр */}
      <div style={{ display: 'flex', gap: '1rem', maxWidth: '700px', margin: '0 auto 2rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Поиск по названию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '12px 16px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '1rem', minWidth: '200px' }}
        />
        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          style={{ padding: '12px 16px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '1rem' }}
        >
          <option>Все</option>
          <option>Лёгкая</option>
          <option>Средняя</option>
          <option>Тяжёлая</option>
        </select>
      </div>

      {/* Пустое состояние */}
      {filteredWorkouts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
          <p style={{ fontSize: '1.2rem' }}>Тренировки не найдены</p>
          <p>Попробуйте изменить фильтр или добавьте новую тренировку</p>
        </div>
      )}

      {/* Список тренировок */}
      <div className="dashboard-grid">
        {filteredWorkouts.map((workout) => (
          <div key={workout.id} className="workout-card" style={{ opacity: workout.completed ? 0.7 : 1 }}>
            <h3 style={{ textDecoration: workout.completed ? 'line-through' : 'none' }}>
              {workout.title}
            </h3>
            <p>⏱ Длительность: {workout.duration} мин</p>
            <p>💪 Сложность: {workout.difficulty}</p>
            {workout.completed && (
              <span style={{ color: '#16a34a', fontWeight: 600 }}>✅ Выполнено</span>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate(`/workouts/${workout.id}`)}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                Подробнее
              </button>
              <button
                onClick={() => toggleWorkout(workout.id)}
                style={{
                  flex: 1,
                  padding: '0.85rem',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: workout.completed ? '#64748b' : '#16a34a',
                  color: 'white',
                }}
              >
                {workout.completed ? 'Отменить' : 'Выполнено'}
              </button>
              <button
                onClick={() => deleteWorkout(workout.id)}
                style={{ padding: '0.85rem 1rem', border: 'none', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', background: '#ef4444', color: 'white' }}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;
