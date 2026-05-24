import React, { createContext, useReducer, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const WorkoutContext = createContext();

// useReducer для управления workouts — advanced hook (требование задания)
const workoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return action.payload;
    case 'ADD_WORKOUT':
      return [...state, action.payload];
    case 'DELETE_WORKOUT':
      return state.filter((w) => w.id !== action.payload);
    case 'TOGGLE_WORKOUT':
      return state.map((w) =>
        w.id === action.payload ? { ...w, completed: !w.completed } : w
      );
    default:
      return state;
  }
};

export const WorkoutProvider = ({ children }) => {
  // useLocalStorage — кастомный хук, инкапсулирует логику хранения
  const [savedWorkouts, setSavedWorkouts] = useLocalStorage('workouts', []);
  const [user, setUser, removeUser] = useLocalStorage('user', null);

  const [workouts, dispatch] = useReducer(workoutReducer, savedWorkouts);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Загрузка данных при старте (симуляция API)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (savedWorkouts.length === 0) {
          const defaultWorkouts = [
            { id: 1, title: 'Morning Yoga', duration: 30, difficulty: 'Лёгкая', type: 'Cardio', completed: false },
            { id: 2, title: 'Силовая тренировка', duration: 45, difficulty: 'Средняя', type: 'Strength', completed: false },
            { id: 3, title: 'Пробежка', duration: 40, difficulty: 'Средняя', type: 'Cardio', completed: true },
          ];
          dispatch({ type: 'SET_WORKOUTS', payload: defaultWorkouts });
          setSavedWorkouts(defaultWorkouts);
        } else {
          dispatch({ type: 'SET_WORKOUTS', payload: savedWorkouts });
        }
      } catch (err) {
        setError('Ошибка загрузки данных. Попробуйте обновить страницу.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Синхронизируем workouts → localStorage при каждом изменении
  useEffect(() => {
    if (!loading) {
      setSavedWorkouts(workouts);
    }
  }, [workouts, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const login = () => {
    const mockUser = { name: 'Абушахман', role: 'admin' };
    setUser(mockUser);
  };

  const logout = () => {
    removeUser();
  };

  const addWorkout = (newWorkout) => {
    const workout = { ...newWorkout, id: Date.now(), completed: false };
    dispatch({ type: 'ADD_WORKOUT', payload: workout });
  };

  const deleteWorkout = (id) => {
    dispatch({ type: 'DELETE_WORKOUT', payload: id });
  };

  const toggleWorkout = (id) => {
    dispatch({ type: 'TOGGLE_WORKOUT', payload: id });
  };

  return (
    <WorkoutContext.Provider
      value={{ user, login, logout, workouts, addWorkout, deleteWorkout, toggleWorkout, loading, error }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkouts = () => useContext(WorkoutContext);
