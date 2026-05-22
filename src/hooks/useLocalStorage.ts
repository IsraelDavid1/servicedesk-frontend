import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Erro ao ler localStorage "${key}":`, error);
      return initialValue;
    }
  });

  // Sincroniza com storage quando key muda
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch (error) {
      console.warn(`Erro ao sincronizar localStorage "${key}":`, error);
    }
  }, [key]);

  // Setter com callback support
  const setValue = useCallback((value: T | ((prev: T) => T)): void => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Erro ao salvar localStorage "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remover item
  const remove = useCallback((): void => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Erro ao remover localStorage "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, remove];
}
