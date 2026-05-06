import { useState } from "react";

function WorkoutCard({ id, title, duration, difficulty, completed, onDelete, onToggle }) {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    alert(`Тренировка «${title}» началась! `);
  };

  return (
    <div className="workout-card">
      <h3>{title}</h3>
      <p>Длительность: {duration} мин</p>
      <p>Сложность: {difficulty}</p>

      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        Выполнено
      </label>

      <button onClick={handleStart} disabled={started}>
        {started ? "Уже начата" : "Начать"}
      </button>

      <button onClick={() => onDelete(id)}>
        Удалить
      </button>
    </div>
  );
}

export default WorkoutCard;