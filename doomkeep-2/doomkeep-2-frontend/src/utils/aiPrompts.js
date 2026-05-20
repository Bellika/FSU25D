/**
 * AI PROMPTS
 *
 * System prompts and templates for OpenAI API calls.
 * These guide the AI to generate appropriate game content.
 */

export const SYSTEM_PROMPT = `You are the Dungeon Master of Doomkeep, a dark fantasy world.
Generate atmospheric, story-driven scenes with meaningful choices.

CRITICAL RULES:
- ALWAYS advance the story based on the player's action
- Keep descriptions under 150 words
- Generate exactly 3 NEW choices (not repeating previous options)
- Use dark, ominous tone
- Reference player's inventory when relevant
- NEVER loop - the story must progress forward
- Focus on EXPLORATION and STORYTELLING (not combat mechanics)

IMPORTANT - What NOT to include:
- DO NOT mention "health potions" in the story (player has a separate UI button)
- DO NOT describe detailed combat mechanics (no damage numbers, no dice rolls)
- DO NOT create combat scenarios unless absolutely necessary for the story
- Keep action abstract and story-focused

NARRATIVE PERSPECTIVE:
- ALWAYS use second person ("you", "your") when addressing the player
- NEVER use third person with the player's name
- Example: "You explore the corridor" NOT "Markus explores the corridor"

CHOICE VARIETY - Mix these types:
- Exploration (investigate, search, enter)
- Dialogue (speak, negotiate, question)
- Problem-solving (solve puzzle, find clues)
- Moral choices (help/ignore, take/leave)

Respond ONLY in valid JSON format:
{
  "description": "scene description",
  "choices": [
    { "text": "choice text", "type": "explore", "risk": "low" },
    { "text": "choice text", "type": "explore", "risk": "medium" },
    { "text": "choice text", "type": "explore", "risk": "high" }
  ]
}`;

/**
 * Build user prompt from character, story context, and player's choice
 */
export function buildUserPrompt(character, storyLog, playerChoice = null, inventory = [], outcomeContext = '') {
  const recentStory = storyLog
    .slice(-2)
    .map(entry => entry.text)
    .join('\n');

  const inventoryList = inventory && inventory.length > 0
    ? inventory.map(item => item.name).join(', ')
    : 'None';

  // Calculate health status
  const healthPercent = (character.health / character.maxHealth) * 100;
  let healthStatus = 'Healthy';
  if (healthPercent <= 25) healthStatus = 'CRITICAL - Near death!';
  else if (healthPercent <= 50) healthStatus = 'Wounded';
  else if (healthPercent <= 75) healthStatus = 'Injured';

  let prompt = `
Character: ${character.name}, Level ${character.level} ${character.class}
HP: ${character.health}/${character.maxHealth} (${healthStatus})
Souls: ${character.souls}
Weapon: ${character.weapon?.name || 'None'}
Health Potions: ${character.healthPotCharges}/${character.maxHealthPotCharges}
Inventory: ${inventoryList}

Recent story:
${recentStory || 'The adventure begins...'}
`;

  if (playerChoice) {
    prompt += `\n\nPlayer's action: "${playerChoice}"`;

    // Add outcome context if provided (damage/loot that happened)
    if (outcomeContext) {
      prompt += `\n\nOUTCOME: ${outcomeContext}`;
      prompt += `\n\nIMPORTANT: Weave this outcome into your description! Explain WHY and HOW the player took damage or found the item. Make it narrative and engaging.`;
    }

    prompt += `\n\nGenerate the next scene showing what happens as a result.`;
  }

  prompt += `\n\nGenerate 3 NEW choices for what to do next.`;

  // Warn AI if player has low health
  if (healthPercent <= 25) {
    prompt += `\n\n⚠️ WARNING: Player HP is critically low! Consider including a safe/healing option.`;
  }

  return prompt.trim();
}

/**
 * Validate AI response format
 */
export function validateAIResponse(response) {
  if (!response.description || typeof response.description !== 'string') {
    throw new Error('Invalid AI response: missing description');
  }

  if (!Array.isArray(response.choices) || response.choices.length !== 3) {
    throw new Error('Invalid AI response: must have exactly 3 choices');
  }

  response.choices.forEach((choice, index) => {
    if (!choice.text || !choice.type) {
      throw new Error(`Invalid choice at index ${index}: missing text or type`);
    }
  });

  return true;
}
