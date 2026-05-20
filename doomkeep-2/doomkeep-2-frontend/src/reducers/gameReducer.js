/**
 * GAME REDUCER
 *
 * This is an example of how to use useReducer for complex state management.
 * useReducer is better than useState when:
 * - State has many related values
 * - Next state depends on previous state
 * - State logic is complex
 *
 * CONCEPTS:
 * - Reducer: A function that takes (state, action) and returns new state
 * - Actions: Objects that describe what happened (e.g. { type: 'CREATE_CHARACTER', payload: {...} })
 * - Immutability: We always return new state object, never mutate existing
 */

// Action Types - Constants to avoid typos
export const ACTIONS = {
  CREATE_CHARACTER: 'CREATE_CHARACTER',
  START_GAME: 'START_GAME',
  MAKE_CHOICE: 'MAKE_CHOICE',
  UPDATE_SCENE: 'UPDATE_SCENE',
  ADD_TO_STORY_LOG: 'ADD_TO_STORY_LOG',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  // Lesson 3: Persistence & Simple Mechanics
  USE_HEALTH_POT: 'USE_HEALTH_POT',
  TAKE_DAMAGE: 'TAKE_DAMAGE',
  ADD_ITEM: 'ADD_ITEM',
  SAVE_GAME: 'SAVE_GAME',
  LOAD_GAME: 'LOAD_GAME'
};

// Initial State - Default values when game starts
export const initialState = {
  gameStatus: 'menu', // 'menu' | 'playing' | 'dead' | 'won'

  character: {
    name: '',
    class: '',
    level: 1,
    health: 100,
    maxHealth: 100,
    souls: 0,
    healthPotCharges: 3,
    maxHealthPotCharges: 3,
    weapon: null
  },

  inventory: [],

  currentScene: {
    description: '',
    choices: []
  },

  storyLog: [],

  lastBonfire: null,

  // AI-related state
  loading: false,
  error: null
};

/**
 * GAME REDUCER FUNCTION
 *
 * @param {Object} state - Current state
 * @param {Object} action - Action being dispatched (must have 'type' property)
 * @returns {Object} - New state
 */
export function gameReducer(state, action) {
  // console.log for debugging - useful to see what's happening
  console.log('🎮 Reducer Action:', action.type, action.payload);

  switch (action.type) {

    // ========================================
    // CREATE_CHARACTER - When player creates character
    // ========================================
    case ACTIONS.CREATE_CHARACTER: {
      const { name, selectedClass } = action.payload;

      return {
        ...state,
        character: {
          ...state.character,
          name,
          class: selectedClass.name,
          health: selectedClass.startingHealth,
          maxHealth: selectedClass.startingHealth,
          weapon: selectedClass.startingWeapon
        },
        inventory: [selectedClass.startingWeapon]
      };
    }

    // ========================================
    // START_GAME - Starts game after character creation
    // ========================================
    case ACTIONS.START_GAME: {
      const { introScene } = action.payload;

      return {
        ...state,
        gameStatus: 'playing',
        currentScene: introScene,
        storyLog: [
          {
            text: `${state.character.name} the ${state.character.class} awakens in the darkness of Doomkeep...`,
            timestamp: Date.now()
          }
        ]
      };
    }

    // ========================================
    // MAKE_CHOICE - When player selects an option
    // ========================================
    case ACTIONS.MAKE_CHOICE: {
      const { choiceIndex } = action.payload;
      const selectedChoice = state.currentScene.choices[choiceIndex];

      // Add choice to story log
      return {
        ...state,
        storyLog: [
          ...state.storyLog,
          {
            text: `> ${selectedChoice.text}`,
            timestamp: Date.now(),
            type: 'choice'
          }
        ]
      };
    }

    // ========================================
    // UPDATE_SCENE - Update currentScene with new data
    // ========================================
    case ACTIONS.UPDATE_SCENE: {
      const { scene } = action.payload;

      return {
        ...state,
        currentScene: scene,
        storyLog: [
          ...state.storyLog,
          {
            text: scene.description,
            timestamp: Date.now(),
            type: 'description'
          }
        ]
      };
    }

    // ========================================
    // ADD_TO_STORY_LOG - Add entry to story log
    // ========================================
    case ACTIONS.ADD_TO_STORY_LOG: {
      const { text, type = 'description' } = action.payload;

      return {
        ...state,
        storyLog: [
          ...state.storyLog,
          {
            text,
            timestamp: Date.now(),
            type
          }
        ]
      };
    }

    // ========================================
    // SET_LOADING - Set loading state (AI generating)
    // ========================================
    case ACTIONS.SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      };
    }

    // ========================================
    // SET_ERROR - Set error state
    // ========================================
    case ACTIONS.SET_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    // ========================================
    // LESSON 3: USE HEALTH POTION (simple example)
    // ========================================
    case ACTIONS.USE_HEALTH_POT: {
      if (state.character.healthPotCharges <= 0) {
        return state; // No charges left
      }

      const healAmount = 40;
      const newHealth = Math.min(
        state.character.maxHealth,
        state.character.health + healAmount
      );
      const actualHeal = newHealth - state.character.health;

      return {
        ...state,
        character: {
          ...state.character,
          health: newHealth,
          healthPotCharges: state.character.healthPotCharges - 1
        },
        storyLog: [
          ...state.storyLog,
          {
            text: `🧪 Used health potion. Restored ${actualHeal} HP.`,
            timestamp: Date.now(),
            type: 'system'
          }
        ]
      };
    }

    // ========================================
    // LESSON 3: SIMPLE DAMAGE (from risky choices)
    // ========================================
    case ACTIONS.TAKE_DAMAGE: {
      const { damage } = action.payload;
      const newHealth = Math.max(0, state.character.health - damage);

      return {
        ...state,
        character: {
          ...state.character,
          health: newHealth
        },
        storyLog: [
          ...state.storyLog,
          {
            text: `💥 You take ${damage} damage! HP: ${newHealth}/${state.character.maxHealth}`,
            timestamp: Date.now(),
            type: 'damage'
          }
        ]
      };
    }

    // ========================================
    // LESSON 3: ADD ITEM (simple loot)
    // ========================================
    case ACTIONS.ADD_ITEM: {
      const { item } = action.payload;

      return {
        ...state,
        inventory: [...state.inventory, item],
        storyLog: [
          ...state.storyLog,
          {
            text: `📦 Found: ${item.name}`,
            timestamp: Date.now(),
            type: 'item'
          }
        ]
      };
    }

    // ========================================
    // LESSON 3: SAVE/LOAD (localStorage persistence)
    // ========================================

    // SAVE_GAME - Add save notification to log
    case ACTIONS.SAVE_GAME: {
      return {
        ...state,
        storyLog: [
          ...state.storyLog,
          {
            text: '💾 Game saved.',
            timestamp: Date.now(),
            type: 'system'
          }
        ]
      };
    }

    // LOAD_GAME - Replace entire state with loaded state
    case ACTIONS.LOAD_GAME: {
      return action.payload.state;
    }

    // ========================================
    // DEFAULT - If action.type doesn't match any case
    // ========================================
    default:
      console.warn('⚠️ Unknown action type:', action.type);
      return state;
  }
}

/**
 * HELPER FUNCTIONS
 *
 * These are utility functions that can be used with the reducer.
 * More will be added later.
 */

// Check if character is alive
export function isAlive(character) {
  return character.health > 0;
}

// Check if character can use health potion
export function canUseHealthPot(character) {
  return character.healthPotCharges > 0 && character.health < character.maxHealth;
}
