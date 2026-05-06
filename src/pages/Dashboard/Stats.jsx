import WorkoutStats from "../../components/WorkoutStats";

export default function DashboardStats() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Статистика за неделю</h2>
      <WorkoutStats />
      <p style={{ marginTop: '30px', textAlign: 'center' }}>Здесь можно добавить графики и подробную статистику.</p>
    </div>
  );
}