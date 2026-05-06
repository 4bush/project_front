import { useState } from "react";

function WorkoutForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !duration || !difficulty) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    onAdd({
      id: Date.now(),
      title,
      duration: Number(duration),
      difficulty,
      completed: false
    });

    setTitle("");
    setDuration("");
    setDifficulty("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Добавить тренировку</h3>

      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Длительность (мин)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <input
        type="text"
        placeholder="Сложность"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      />

      <button type="submit">Добавить</button>
    </form>
  );
}

export default WorkoutForm;