import { useMemo } from 'react';
import { useWorkouts } from '../context/WorkoutContext';

function WorkoutStats() {
  const { workouts } = useWorkouts();

  // useMemo — считаем статистику только при изменении workouts
  const stats = useMemo(() => {
    const completed = workouts.filter((w) => w.completed);
    const totalMinutes = workouts.reduce((sum, w) => sum + (Number(w.duration) || 0), 0);
    const completedMinutes = completed.reduce((sum, w) => sum + (Number(w.duration) || 0), 0);
    const hours = Math.floor(completedMinutes / 60);
    const mins = completedMinutes % 60;
    const calories = Math.round(completedMinutes * 7.5); // ~7.5 ккал/мин среднее

    return {
      total: workouts.length,
      completed: completed.length,
      totalMinutes,
      timeStr: hours > 0 ? `${hours} ч ${mins} мин` : `${mins} мин`,
      calories,
    };
  }, [workouts]);

  return (
    <div className="stats-box">
      <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: '#1e40af' }}>📊 Статистика</h4>
      <p>Всего тренировок: <strong>{stats.total}</strong></p>
      <p>Выполнено: <strong style={{ color: '#16a34a' }}>{stats.completed}</strong></p>
      <p>Время выполненных: <strong>{stats.timeStr}</strong></p>
      <p>Сожжено калорий: <strong>~{stats.calories} ккал</strong></p>
      {stats.total > 0 && (
        <div style={{ marginTop: '12px' }}>
          <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
            Прогресс: {Math.round((stats.completed / stats.total) * 100)}%
          </p>
          <div style={{ background: '#e2e8f0', borderRadius: '8px', height: '8px', marginTop: '6px' }}>
            <div
              style={{
                background: '#2563eb',
                height: '8px',
                borderRadius: '8px',
                width: `${(stats.completed / stats.total) * 100}%`,
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutStats;
