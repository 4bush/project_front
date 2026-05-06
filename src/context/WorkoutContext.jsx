import React, { createContext, useState, useContext, useEffect } from 'react';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  
  // гет юсера и связ с локалсторедж
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        //локалстродж на тренировки
        const savedWorkouts = localStorage.getItem('workouts');
        if (savedWorkouts) {
          setWorkouts(JSON.parse(savedWorkouts));
        } else {
          setWorkouts([
            { id: 1, title: 'Morning Yoga', duration: 30, type: 'Cardio' }
          ]);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2.логин
  const login = () => {
    const mockUser = { name: 'Admin', role: 'admin' };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser)); 
  };

  // 3. выход
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addWorkout = (newWorkout) => {
    const updatedWorkouts = [...workouts, { ...newWorkout, id: Date.now() }];
    setWorkouts(updatedWorkouts);
    // сохранение тренки
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
  };
//delete
  const deleteWorkout = (id) => {
  const updatedWorkouts = workouts.filter(workout => workout.id !== id);
  setWorkouts(updatedWorkouts);
  localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
};

  return (
  <WorkoutContext.Provider value={{user,login, workouts, addWorkout, deleteWorkout, loading }}>
    {children}
  </WorkoutContext.Provider>
);
};

export const useWorkouts = () => useContext(WorkoutContext);
