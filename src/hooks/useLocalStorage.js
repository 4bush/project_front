import { useState, useEffect } from 'react';

/**
 * useLocalStorage — кастомный хук для синхронизации state с localStorage.
 * Инкапсулирует логику сохранения/чтения, не разбросана по компонентам.
 */
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`useLocalStorage: ошибка чтения "${key}"`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`useLocalStorage: ошибка записи "${key}"`, error);
        }
    };

    const removeValue = () => {
        try {
            setStoredValue(initialValue);
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`useLocalStorage: ошибка удаления "${key}"`, error);
        }
    };

    return [storedValue, setValue, removeValue];
}

export default useLocalStorage;