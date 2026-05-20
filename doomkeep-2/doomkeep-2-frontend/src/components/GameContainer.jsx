/**
 * GAME CONTAINER
 *
 * CONCEPTS:
 * - useReducer hook (Lesson 1)
 * - Custom hooks: useAI (Lesson 2), useDocumentTitle (Lesson 1.5), useGameState (Lesson 3)
 * - useCallback (Lesson 3): Memoize event handlers
 * - Component composition
 * - State flow (dispatch actions to reducer)
 * - Conditional rendering (show different components based on gameStatus)
 * - Loading and error states
 * - localStorage persistence (Lesson 3)
 *
 * This is the "parent component" that holds all game state and
 * distributes it to child components via props.
 *
 * Note: Auto-scroll is handled inside StoryDisplay component.
 */

import { useCallback } from 'react';
import { ACTIONS } from '../reducers/gameReducer';
import { getSceneById } from '../data/initialData';
import { useAI } from '../hooks/useAI';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGameState } from '../hooks/useGameState';

import CharacterCreation from './CharacterCreation';
import StoryDisplay from './StoryDisplay';
import CharacterStats from './CharacterStats';
import ChoiceButtons from './ChoiceButtons';
import InventoryDisplay from './InventoryDisplay';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import UseHealthPot from './UseHealthPot';

import styles from '../styles/GameContainer.module.css';

function GameContainer() {
  /**
   * useGameState Hook (Lesson 3)
   *
   * Replaces useReducer with a custom hook that combines:
   * - useReducer for state management
   * - localStorage for persistence
   * - Manual save functionality (no auto-save)
   *
   * Returns: { state, dispatch, saveGame, startNewGame }
   */
  const { state, dispatch, saveGame, startNewGame } = useGameState();

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
   * Handle when player selects an option (Lesson 2 + 3: AI Integration + Simple Mechanics)
   *
   * Now includes SIMPLE risk-based damage and loot
   */
  const handleMakeChoice = async (choiceIndex) => {
    const selectedChoice = state.currentScene.choices[choiceIndex];

    // Log the choice to story
    dispatch({
      type: ACTIONS.MAKE_CHOICE,
      payload: { choiceIndex }
    });

    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: ACTIONS.SET_ERROR, payload: null });

      // ========================================
      // LESSON 3: SIMPLE RISK-BASED MECHANICS
      // ========================================
      const risk = selectedChoice.risk || 'low';
      let outcomeContext = ''; // Tell AI what happened
      let foundItem = null;

      console.log('🎲 Choice risk level:', risk); // Debug

      // Apply damage based on risk level (very simple!)
      if (risk === 'high') {
        dispatch({ type: ACTIONS.TAKE_DAMAGE, payload: { damage: 20 } });
        outcomeContext = 'This was dangerous! You took significant damage (20 HP lost).';

        // High risk but 30% chance for rare item as reward
        if (Math.random() < 0.3) {
          const lootItems = [
            { id: `item_${Date.now()}`, name: 'Dark Blade', type: 'weapon', quality: 3, description: 'A powerful cursed sword' },
            { id: `item_${Date.now()}`, name: 'Boss Key', type: 'key', description: 'Opens the throne room' }
          ];
          foundItem = lootItems[Math.floor(Math.random() * lootItems.length)];
          dispatch({ type: ACTIONS.ADD_ITEM, payload: { item: foundItem } });
          outcomeContext += ` However, you discovered a rare item: ${foundItem.name}.`;
          console.log('🎁 Found rare item!', foundItem.name);
        }
      } else if (risk === 'medium') {
        dispatch({ type: ACTIONS.TAKE_DAMAGE, payload: { damage: 10 } });
        outcomeContext = 'That was risky. You took some damage (10 HP lost).';

        // Medium risk = 40% chance for common item
        if (Math.random() < 0.4) {
          const lootItems = [
            { id: `item_${Date.now()}`, name: 'Short Sword', type: 'weapon', quality: 2, description: 'A reliable blade' },
            { id: `item_${Date.now()}`, name: 'Rusty Key', type: 'key', description: 'Opens old doors' }
          ];
          foundItem = lootItems[Math.floor(Math.random() * lootItems.length)];
          dispatch({ type: ACTIONS.ADD_ITEM, payload: { item: foundItem } });
          outcomeContext += ` You also found: ${foundItem.name}.`;
          console.log('🎁 Found item!', foundItem.name);
        }
      } else if (risk === 'low') {
        outcomeContext = 'You proceeded carefully and avoided any harm.';

        // Low risk = NO damage, 60% chance to find an item
        if (Math.random() < 0.6) {
          const lootItems = [
            { id: `item_${Date.now()}`, name: 'Ancient Coin', type: 'lore', description: 'Currency of a lost age' },
            { id: `item_${Date.now()}`, name: 'Faded Letter', type: 'lore', description: 'A cryptic message' },
            { id: `item_${Date.now()}`, name: 'Health Potion Shard', type: 'consumable', description: 'Increases max charges' }
          ];
          foundItem = lootItems[Math.floor(Math.random() * lootItems.length)];
          dispatch({ type: ACTIONS.ADD_ITEM, payload: { item: foundItem } });
          outcomeContext += ` While exploring, you discovered: ${foundItem.name}.`;
          console.log('🎁 Found item!', foundItem.name);
        }
      }

      // Generate new scene with AI (pass outcome context so AI can weave it into story!)
      const newScene = await generateStory(
        state.character,
        state.storyLog,
        selectedChoice.text,
        state.inventory,
        outcomeContext  // NEW: Tell AI what happened
      );

      if (newScene) {
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
      // TODO: Add souls to character
    }
    if (reward.item) {
      console.log(`Found item: ${reward.item.name}`);
      // TODO: Add item to inventory
    }
  };

  /**
   * Handle Save Game (Lesson 3)
   *
   * useCallback ensures this function reference stays the same
   * across renders unless dependencies change.
   */
  const handleSaveGame = useCallback(() => {
    const success = saveGame();
    if (success) {
      dispatch({ type: ACTIONS.SAVE_GAME });
    }
  }, [saveGame, dispatch]);

  /**
   * Handle Use Health Potion (Lesson 3)
   *
   * Simple example of useCallback with game action.
   */
  const handleUseHealthPot = useCallback(() => {
    dispatch({ type: ACTIONS.USE_HEALTH_POT });
  }, [dispatch]);

  /**
   * Handle New Game (Lesson 3)
   *
   * Clear save and reload page to start fresh.
   */
  const handleNewGame = useCallback(() => {
    const confirmed = window.confirm('Start a new game? This will delete your current save!');
    if (confirmed) {
      startNewGame();
    }
  }, [startNewGame]);

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

          {/* Health Potion (Lesson 3 - useCallback example) */}
          <UseHealthPot
            charges={state.character.healthPotCharges}
            maxCharges={state.character.maxHealthPotCharges}
            currentHP={state.character.health}
            maxHP={state.character.maxHealth}
            onUse={handleUseHealthPot}
          />

          {/* Manual Save Button (Lesson 3 - useCallback example) */}
          <button
            className={styles.saveButton}
            onClick={handleSaveGame}
            title="Save your progress"
          >
            💾 Save Game
          </button>

          {/* New Game Button (Lesson 3) */}
          <button
            className={styles.newGameButton}
            onClick={handleNewGame}
            title="Start a new game (deletes current save)"
          >
            🆕 New Game
          </button>

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
