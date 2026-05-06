import React, { useState, useEffect } from 'react';

function TimerDisplay({ initial = 60 }) {
  const [seconds, setSeconds] = useState(initial);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (running && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, seconds]);

  const toggleTimer = () => setRunning(!running);
  
  const resetTimer = () => {
    setRunning(false);
    setSeconds(initial);
  };

  return (
    <div className="timer-box">
      <h4>Таймер отдыха</h4>
      <div className="timer-display">
        {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
      </div>
      <div className="timer-buttons">
        <button onClick={toggleTimer}>
          {running ? "Пауза" : "Старт"}
        </button>
        <button onClick={resetTimer}>Сброс</button>
      </div>
    </div>
  );
}

export default TimerDisplay;