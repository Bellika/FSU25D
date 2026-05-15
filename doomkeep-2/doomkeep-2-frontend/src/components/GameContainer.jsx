/**
 * GAME CONTAINER
 *
 * CONCEPTS:
 * - useReducer hook (main focus!)
 * - Component composition
 * - State flow (dispatch actions to reducer)
 * - Conditional rendering (show different components based on gameStatus)
 *
 * This is the "parent component" that holds all game state and
 * distributes it to child components via props.
 */

import { useReducer } from 'react';
import { gameReducer, initialState, ACTIONS } from '../reducers/gameReducer';
import { getSceneById } from '../data/initialData';
import CharacterCreation from './CharacterCreation';
import StoryDisplay from './StoryDisplay';
import CharacterStats from './CharacterStats';
import ChoiceButtons from './ChoiceButtons';
import InventoryDisplay from './InventoryDisplay';
import styles from '../styles/GameContainer.module.css';

function GameContainer() {
  /**
   * useReducer Hook
   *
   * Syntax: const [state, dispatch] = useReducer(reducer, initialState)
   *
   * - state: Current game state
   * - dispatch: Function to send actions to reducer
   * - gameReducer: Reducer function (defined in gameReducer.js)
   * - initialState: Starting state (defined in gameReducer.js)
   */
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // ========================================
  // Event Handlers
  // ========================================

  /**
   * Handle character creation
   * This runs when player submits CharacterCreation form
   */
  const handleCreateCharacter = ({ name, selectedClass }) => {
    // Dispatch CREATE_CHARACTER action
    dispatch({
      type: ACTIONS.CREATE_CHARACTER,
      payload: { name, selectedClass }
    });

    // Dispatch START_GAME action with intro scene
    const introScene = getSceneById('intro');
    dispatch({
      type: ACTIONS.START_GAME,
      payload: { introScene }
    });
  };

  /**
   * Handle when player selects an option
   */
  const handleChoice = (choiceIndex) => {
    const selectedChoice = state.currentScene.choices[choiceIndex];

    // Dispatch MAKE_CHOICE action (logs the choice)
    dispatch({
      type: ACTIONS.MAKE_CHOICE,
      payload: { choiceIndex }
    });

    // Get next scene based on choice
    const nextScene = getSceneById(selectedChoice.nextScene);

    // Handle any rewards (souls, items)
    if (selectedChoice.reward) {
      handleReward(selectedChoice.reward);
    }

    // Update to next scene
    setTimeout(() => {
      dispatch({
        type: ACTIONS.UPDATE_SCENE,
        payload: { scene: nextScene }
      });
    }, 500); // Small delay for better UX
  };

  /**
   * Handle rewards from choices
   */
  const handleReward = (reward) => {
    if (reward.souls) {
      // TODO: Will be fully implemented later
      console.log(`+${reward.souls} souls`);
    }
    if (reward.item) {
      // TODO: Will be fully implemented later
      console.log(`Found item: ${reward.item.name}`);
    }
  };

  // ========================================
  // Render Logic
  // ========================================

  /**
   * Conditional Rendering based on gameStatus
   */
  if (state.gameStatus === 'menu') {
    // Show character creation screen
    return <CharacterCreation onCreateCharacter={handleCreateCharacter} />;
  }

  if (state.gameStatus === 'playing') {
    // Show game UI
    return (
      <div className={styles.gameContainer}>
        {/* Left Panel: Character Stats & Inventory */}
        <aside className={styles.leftPanel}>
          <CharacterStats character={state.character} />
          <InventoryDisplay inventory={state.inventory} />
        </aside>

        {/* Main Panel: Story & Choices */}
        <main className={styles.mainPanel}>
          <StoryDisplay
            currentScene={state.currentScene}
            storyLog={state.storyLog}
          />
          <ChoiceButtons
            choices={state.currentScene.choices}
            onChoice={handleChoice}
          />
        </main>

        {/* Right Panel: Future use (map, quests, etc.) */}
        <aside className={styles.rightPanel}>
          <div className={styles.placeholder}>
            <p>🗺️</p>
            <p>Map (Coming Soon)</p>
          </div>
        </aside>
      </div>
    );
  }

  // Default fallback
  return (
    <div className={styles.loading}>
      <p>Loading Doomkeep...</p>
    </div>
  );
}

export default GameContainer;
