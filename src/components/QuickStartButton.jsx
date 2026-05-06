function QuickStartButton() {
  const handleQuickStart = () => {
    alert("Быстрый старт: 20-минутная круговая тренировка запущена!");
  };

  return (
    <button 
      className="btn-quick-start"
      onClick={handleQuickStart}
    >
      Начать быструю тренировку (20 мин)
    </button>
  );
}

export default QuickStartButton;