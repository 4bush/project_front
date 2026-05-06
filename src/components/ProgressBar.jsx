function ProgressBar({ value = 42, max = 100 }) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="progress-container">
      <div 
        className="progress-fill"
        style={{ width: `${percent}%` }}
      />
      <span>{percent.toFixed(0)}%</span>
    </div>
  );
}

export default ProgressBar;

//UI companent