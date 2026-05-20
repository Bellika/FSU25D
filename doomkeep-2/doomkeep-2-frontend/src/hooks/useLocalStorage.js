/**
 * USE LOCAL STORAGE HOOK
 *
 * Custom hook for persisting state to localStorage.
 *
 * CONCEPTS:
 * - Lazy initialization with useState
 * - useEffect for side effects (saving)
 * - JSON serialization
 * - Error handling (localStorage can fail)
 */

import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  /**
   * Initialize state from localStorage (lazy initialization)
   *
   * We pass a function to useState so it only runs once on mount.
   * This prevents reading from localStorage on every render.
   */
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Try to load from localStorage
      const item = window.localStorage.getItem(key);

      // Parse if exists, otherwise use initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return initialValue;
    }
  });

  /**
   * Save to localStorage whenever value changes
   */
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
