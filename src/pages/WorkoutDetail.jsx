import { useParams, useNavigate } from 'react-router-dom';

function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '2rem', textAlign: 'center' }}>
      <h1>Детали тренировки №{id}</h1>
      <p>Здесь будет подробная информация о тренировке, упражнения, видео и т.д.</p>
      
      <button 
        onClick={() => navigate('/workouts')}
        style={{ marginTop: '30px', padding: '12px 24px', fontSize: '1.1rem' }}
      >
        ← Вернуться к списку тренировок
      </button>
    </div>
  );
}

export default WorkoutDetail;