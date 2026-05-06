import TimerDisplay from "../../components/TimerDisplay";
import ProgressBar from "../../components/ProgressBar";
import QuickStartButton from "../../components/QuickStartButton";

export default function DashboardOverview() {
  return (
    <div>
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto 40px' }}>
        <h3>Цель на сегодня</h3>
        <p>Сделать 45 минут кардио + 3 силовых упражнения</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <ProgressBar value={68} max={100} />
        <TimerDisplay initial={90} />
      </div>

      <div style={{ textAlign: "center", marginTop: '50px' }}>
        <QuickStartButton />
      </div>
    </div>
  );
}