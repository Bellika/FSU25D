/**
 * GAME CONTAINER
 *
 * CONCEPTS:
 * - useReducer hook (Lesson 1)
 * - Custom hooks: useAI (Lesson 2), useDocumentTitle (Lesson 1.5)
 * - Component composition
 * - State flow (dispatch actions to reducer)
 * - Conditional rendering (show different components based on gameStatus)
 * - Loading and error states
 *
 * This is the "parent component" that holds all game state and
 * distributes it to child components via props.
 *
 * Note: Auto-scroll is handled inside StoryDisplay component.
 */

import { useReducer } from 'react';
import { gameReducer, initialState, ACTIONS } from '../reducers/gameReducer';
import { getSceneById } from '../data/initialData';
import { useAI } from '../hooks/useAI';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import CharacterCreation from './CharacterCreation';
import StoryDisplay from './StoryDisplay';
import CharacterStats from './CharacterStats';
import ChoiceButtons from './ChoiceButtons';
import InventoryDisplay from './InventoryDisplay';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

import styles from '../styles/GameContainer.module.css';

function GameContainer() {
  /**
   * useReducer Hook (Lesson 1)
   *
   * Syntax: const [state, dispatch] = useReducer(reducer, initialState)
   *
   * - state: Current game state
   * - dispatch: Function to send actions to reducer
   * - gameReducer: Reducer function (defined in gameReducer.js)
   * - initialState: Starting state (defined in gameReducer.js)
   */
  const [state, dispatch] = useReducer(gameReducer, initialState);

  /**
   * useAI Hook (Lesson 2)
   *
   * Custom hook that handles OpenAI API calls
   * Returns: { generateStory, loading, error, abort }
   */
  const { generateStory, loading, error } = useAI();

  /**
   * Note: Auto-scroll is now handled inside StoryDisplay component
   * (Moved to keep scroll logic close to the scrollable element)
   */

  /**
   * useDocumentTitle Hook (Lesson 1.5)
   *
   * Updates browser tab title dynamically
   */
  const title = state.character.name
    ? `Doomkeep - ${state.character.name} (Lvl ${state.character.level})`
    : "Doomkeep";
  useDocumentTitle(title);

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
   * Handle when player selects an option (Lesson 2: AI Integration)
   *
   * Now uses AI to generate next scene instead of hardcoded scenes
   */
  const handleMakeChoice = async (choiceIndex) => {
    const selectedChoice = state.currentScene.choices[choiceIndex];

    // Log the choice to story
    dispatch({
      type: ACTIONS.MAKE_CHOICE,
      payload: { choiceIndex }
    });

    try {
      // Set loading state while AI generates
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: ACTIONS.SET_ERROR, payload: null });

      // Generate new scene with AI (pass the player's choice!)
      const newScene = await generateStory(
        state.character,
        state.storyLog,
        selectedChoice.text  // Tell AI what the player chose
      );

      if (newScene) {
        // Handle any rewards from the choice
        if (selectedChoice.reward) {
          handleReward(selectedChoice.reward);
        }

        // Update to AI-generated scene
        dispatch({
          type: ACTIONS.UPDATE_SCENE,
          payload: { scene: newScene }
        });
      }
    } catch (err) {
      console.error('AI Error:', err);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.message
      });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  /**
   * Handle rewards from choices
   */
  const handleReward = (reward) => {
    if (reward.souls) {
      console.log(`+${reward.souls} souls`);
      // TODO: Add souls to character (Lesson 3)
    }
    if (reward.item) {
      console.log(`Found item: ${reward.item.name}`);
      // TODO: Add item to inventory (Lesson 3)
    }
  };

  /**
   * Retry handler for error state
   */
  const handleRetry = () => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });
    // Retry with first choice (or could track last choice)
    if (state.currentScene.choices && state.currentScene.choices.length > 0) {
      handleMakeChoice(0);
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

          {/* Loading State (Lesson 2) */}
          {loading && <LoadingSpinner />}

          {/* Error State (Lesson 2) */}
          {error && (
            <ErrorMessage
              error={error}
              onRetry={handleRetry}
            />
          )}

          {/* Choice Buttons (only show when not loading) */}
          {!loading && state.currentScene.choices && (
            <ChoiceButtons
              choices={state.currentScene.choices}
              onChoice={handleMakeChoice}
            />
          )}
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
