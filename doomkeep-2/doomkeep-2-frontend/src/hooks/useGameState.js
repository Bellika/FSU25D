/**
 * USE GAME STATE HOOK
 *
 * Combines useReducer with localStorage for persistent game state.
 *
 * This hook wraps the game reducer and automatically saves/loads
 * the state to/from localStorage.
 */

import { useReducer, } from 'react';
import { gameReducer, initialState } from '../reducers/gameReducer';

const STORAGE_KEY = 'doomkeep2_save';

export function useGameState() {
  // Load saved state from localStorage (if exists)
  const loadSavedState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('💾 Loaded saved game from localStorage');
        return parsed;
      }
    } catch (error) {
      console.error('Error loading saved game:', error);
    }
    return initialState;
  };

  // Initialize reducer with saved state or initial state
  const [state, dispatch] = useReducer(gameReducer, loadSavedState());

  // NOTE: No auto-save! Player must manually click "Save Game"

  // Manual save function
  const saveGame = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      console.log('💾 Manually saved game');
      return true;
    } catch (error) {
      console.error('Error saving game:', error);
      return false;
    }
  };

  // Clear save and start new game
  const startNewGame = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('💾 Cleared saved game');
      window.location.reload(); // Reload to start fresh
      return true;
    } catch (error) {
      console.error('Error clearing save:', error);
      return false;
    }
  };

  return {
    state,
    dispatch,
    saveGame,
    startNewGame
  };
}
