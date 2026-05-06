import React, { useState } from 'react';
import { useWorkouts } from '../context/WorkoutContext';
//CRUD
const Workouts = () => {
  const { workouts, loading, deleteWorkout, addWorkout } = useWorkouts();
  
  const [newTitle, setNewTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
  
    addWorkout({
      title: newTitle,
      duration: '45 мин',
      difficulty: 'Средне'
    });
    setNewTitle('');
  };

  if (loading) return <div className="timer-display">Загрузка...</div>;

  return (
    <div className="home-page">
      <section className="card">
        <h3>Добавить новую тренировку</h3>
        <form onSubmit={handleSubmit} className="form">
          <input 
            type="text" 
            placeholder="Название тренировки" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit" className="btn-primary">Добавить</button>
        </form>
      </section>

      <div className="dashboard-grid">
        {workouts.map((workout) => (
          <div key={workout.id} className="workout-card">
            <h3>{workout.title}</h3>
            <p>Длительность: {workout.duration}</p>
            <p>Сложность: {workout.difficulty}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-primary">Изменить</button>
              <button 
                onClick={() => deleteWorkout(workout.id)} 
                style={{ background: '#ef4444' }}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;