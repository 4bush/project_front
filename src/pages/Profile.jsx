import { useState } from 'react';
import { useWorkouts } from '../context/WorkoutContext';
import { useMemo } from 'react';

export default function Profile() {
  const { user, workouts, logout } = useWorkouts();
  const [editing, setEditing] = useState(false);
  const [goal, setGoal] = useState(localStorage.getItem('userGoal') || 'Набрать мышечную массу');
  const [goalInput, setGoalInput] = useState(goal);

  const stats = useMemo(() => ({
    total: workouts.length,
    completed: workouts.filter((w) => w.completed).length,
    totalMinutes: workouts.reduce((s, w) => s + (Number(w.duration) || 0), 0),
  }), [workouts]);

  const saveGoal = () => {
    setGoal(goalInput);
    localStorage.setItem('userGoal', goalInput);
    setEditing(false);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 1rem' }}>
      <div className="card" style={{ maxWidth: '100%', textAlign: 'left' }}>
        <h1 style={{ color: '#1e40af', marginBottom: '1.5rem' }}>👤 Мой профиль</h1>

        <div style={{ display: 'grid', gap: '12px', marginBottom: '2rem' }}>
          <p><strong>Имя:</strong> {user?.name || 'Гость'}</p>
          <p><strong>Роль:</strong> {user?.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <strong>Цель:</strong>
            {editing ? (
              <>
                <input
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', flex: 1, minWidth: '200px' }}
                />
                <button onClick={saveGoal} className="btn-primary" style={{ padding: '8px 16px' }}>Сохранить</button>
                <button onClick={() => setEditing(false)} style={{ padding: '8px 16px', background: '#64748b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Отмена</button>
              </>
            ) : (
              <>
                <span>{goal}</span>
                <button onClick={() => setEditing(true)} style={{ padding: '6px 14px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>✏️ Изменить</button>
              </>
            )}
          </div>
        </div>

        <hr style={{ borderColor: '#e2e8f0', marginBottom: '1.5rem' }} />

        <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>📊 Моя статистика</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Всего тренировок', value: stats.total, color: '#1d4ed8' },
            { label: 'Выполнено', value: stats.completed, color: '#16a34a' },
            { label: 'Минут активности', value: stats.totalMinutes, color: '#ea580c' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={logout}
          className="btn-primary"
          style={{ background: '#ef4444', width: '100%', padding: '14px' }}
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
