/**
 * INITIAL DATA
 *
 * Here we define all starting data for the game:
 * - Character classes (Knight, Wanderer, Sorcerer)
 * - Hardcoded scenes (AI generation will be added later)
 * - Starting items
 */

// ========================================
// CHARACTER CLASSES
// ========================================
export const characterClasses = [
  {
    id: 'knight',
    name: 'Knight',
    description: 'A battle-hardened warrior clad in heavy armor. High vitality but slow to react.',
    startingHealth: 120,
    startingWeapon: {
      id: 'broken_sword',
      name: 'Broken Sword',
      type: 'weapon',
      quality: 1,
      description: 'A sword worn by time and battle. It barely cuts, but it\'s better than nothing.'
    },
    icon: '⚔️',
    stats: {
      strength: 'High',
      dexterity: 'Low',
      intelligence: 'Low'
    }
  },
  {
    id: 'wanderer',
    name: 'Wanderer',
    description: 'A nimble traveler from distant lands. Balanced in all aspects, a jack of all trades.',
    startingHealth: 100,
    startingWeapon: {
      id: 'travelers_dagger',
      name: 'Traveler\'s Dagger',
      type: 'weapon',
      quality: 2,
      description: 'A small but sharp blade. Light and swift, perfect for quick strikes.'
    },
    icon: '🗡️',
    stats: {
      strength: 'Medium',
      dexterity: 'Medium',
      intelligence: 'Medium'
    }
  },
  {
    id: 'sorcerer',
    name: 'Sorcerer',
    description: 'A wielder of ancient magic. Frail body but devastating spells.',
    startingHealth: 80,
    startingWeapon: {
      id: 'sorcerers_catalyst',
      name: 'Sorcerer\'s Catalyst',
      type: 'weapon',
      quality: 3,
      description: 'A gnarled staff humming with arcane energy. Channels the power of souls.'
    },
    icon: '🔮',
    stats: {
      strength: 'Low',
      dexterity: 'Low',
      intelligence: 'High'
    }
  }
];

// ========================================
// HARDCODED SCENES
// ========================================
// These are used before AI generation is implemented
// Each scene has description and choices

export const hardcodedScenes = {
  intro: {
    id: 'intro',
    description: 'You awaken in a cold, damp cell. Stone walls surround you, and a single torch flickers weakly on the wall. The smell of decay fills your nostrils. A rusty iron door stands before you, slightly ajar. Through the gap, you glimpse a dark corridor.',
    choices: [
      {
        text: 'Push the door open and venture into the corridor',
        type: 'explore',
        nextScene: 'corridor'
      },
      {
        text: 'Search the cell for anything useful',
        type: 'explore',
        nextScene: 'searchCell'
      },
      {
        text: 'Rest and gather your strength',
        type: 'rest',
        nextScene: 'restCell'
      }
    ]
  },

  corridor: {
    id: 'corridor',
    description: 'The corridor stretches into darkness. Your footsteps echo on the cold stone. Ahead, you hear the faint sound of dragging metal. A hollow knight emerges from the shadows, its armor rusted and eyes glowing with an unholy light. It raises its sword.',
    choices: [
      {
        text: 'Draw your weapon and attack',
        type: 'combat',
        nextScene: 'combatHollow'
      },
      {
        text: 'Try to sneak past the hollow',
        type: 'stealth',
        nextScene: 'sneakPast'
      },
      {
        text: 'Retreat back to the cell',
        type: 'explore',
        nextScene: 'intro'
      }
    ]
  },

  searchCell: {
    id: 'searchCell',
    description: 'You search the grimy corners of the cell. Behind a loose stone, you find a small pouch containing 10 souls - the currency of the undead. A previous prisoner must have hidden it. You also find a crumpled note: "Beware the depths. The bonfire lies beyond the hollow knight."',
    choices: [
      {
        text: 'Take the souls and leave the cell',
        type: 'explore',
        nextScene: 'corridor',
        reward: { souls: 10 }
      },
      {
        text: 'Rest here before venturing out',
        type: 'rest',
        nextScene: 'restCell'
      }
    ]
  },

  restCell: {
    id: 'restCell',
    description: 'You sit on the cold floor and close your eyes. The darkness feels heavy, but you gather your resolve. You feel slightly refreshed, though this is no proper resting place. You must find a bonfire.',
    choices: [
      {
        text: 'Stand up and leave the cell',
        type: 'explore',
        nextScene: 'corridor'
      }
    ]
  },

  combatHollow: {
    id: 'combatHollow',
    description: 'You clash with the hollow knight. Its movements are slow but powerful. You manage to parry a heavy blow and strike back. The hollow staggers and collapses into dust. Among the remains, you find 40 souls.',
    choices: [
      {
        text: 'Continue down the corridor',
        type: 'explore',
        nextScene: 'bonfireRoom',
        reward: { souls: 40 }
      },
      {
        text: 'Search the hollow\'s remains thoroughly',
        type: 'explore',
        nextScene: 'searchHollow',
        reward: { souls: 40 }
      }
    ]
  },

  sneakPast: {
    id: 'sneakPast',
    description: 'You press yourself against the wall and move slowly. The hollow\'s head turns, but it doesn\'t seem to notice you. You successfully slip past into the darkness beyond.',
    choices: [
      {
        text: 'Continue forward',
        type: 'explore',
        nextScene: 'bonfireRoom'
      }
    ]
  },

  searchHollow: {
    id: 'searchHollow',
    description: 'Among the hollow\'s dusty remains, you find a small crystalline vial - a fragment that can increase your health potion capacity. A valuable find indeed.',
    choices: [
      {
        text: 'Take the vial and move on',
        type: 'explore',
        nextScene: 'bonfireRoom',
        reward: {
          item: {
            id: 'potion_upgrade_1',
            name: 'Crystalline Vial',
            type: 'upgrade',
            description: 'A mystical vial fragment. Increases maximum health potion charges.'
          }
        }
      }
    ]
  },

  bonfireRoom: {
    id: 'bonfireRoom',
    description: 'The corridor opens into a small chamber. In the center, a bonfire burns with warm, orange light. Its flames seem to beckon you. This is a place of respite in the darkness. You feel the warmth on your face.',
    choices: [
      {
        text: 'Rest at the bonfire',
        type: 'bonfire',
        nextScene: 'bonfireRest'
      },
      {
        text: 'Examine the room before resting',
        type: 'explore',
        nextScene: 'examineBonfire'
      }
    ]
  },

  bonfireRest: {
    id: 'bonfireRest',
    description: 'You sit by the bonfire and feel its warmth seep into your bones. Your health potions are replenished. This bonfire is now your respawn point. The journey continues, but at least you have found a sanctuary.',
    choices: [
      {
        text: 'Stand and prepare to venture deeper',
        type: 'explore',
        nextScene: 'deeperDungeon'
      }
    ]
  },

  examineBonfire: {
    id: 'examineBonfire',
    description: 'Around the bonfire, you notice ancient markings on the walls. They seem to tell the story of warriors who came before, all seeking escape from Doomkeep. None succeeded. The thought is not encouraging.',
    choices: [
      {
        text: 'Rest at the bonfire',
        type: 'bonfire',
        nextScene: 'bonfireRest'
      }
    ]
  },

  deeperDungeon: {
    id: 'deeperDungeon',
    description: 'Beyond the bonfire chamber, the dungeon grows darker and more oppressive. The air is thick with malice. You hear distant screams and the sound of chains. This is where your true journey begins...',
    choices: [
      {
        text: 'Press forward into the darkness',
        type: 'explore',
        nextScene: 'toBeImplemented'
      },
      {
        text: 'Return to the bonfire',
        type: 'explore',
        nextScene: 'bonfireRoom'
      }
    ]
  },

  toBeImplemented: {
    id: 'toBeImplemented',
    description: '🔧 This is where AI takes over! For now, this is the end of the hardcoded story. Later, we\'ll implement OpenAI to generate dynamic scenes based on your choices.',
    choices: [
      {
        text: 'Return to bonfire',
        type: 'explore',
        nextScene: 'bonfireRoom'
      }
    ]
  }
};

// Helper function: Get scene by ID
export function getSceneById(sceneId) {
  return hardcodedScenes[sceneId] || hardcodedScenes.intro;
}

// Helper function: Get class by ID
export function getClassById(classId) {
  return characterClasses.find(c => c.id === classId) || characterClasses[0];
}
