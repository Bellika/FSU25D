/**
 * AI PROMPTS
 *
 * System prompts and templates for OpenAI API calls.
 * These guide the AI to generate appropriate game content.
 */

export const SYSTEM_PROMPT = `You are the Dungeon Master of Doomkeep, a dark fantasy world.
Generate atmospheric, challenging scenes with difficult choices.

CRITICAL RULES:
- ALWAYS advance the story based on the player's action
- If player chose combat: describe the combat outcome (success/failure/partial)
- If player chose explore: reveal new area or discovery
- If player chose rest: describe resting at a bonfire
- Keep descriptions under 150 words
- Generate exactly 3 NEW choices (not repeating previous options)
- Use dark, ominous tone
- Reference player's inventory when relevant
- Include risk indicators (low/medium/high)
- NEVER loop - the story must progress forward

NARRATIVE PERSPECTIVE:
- ALWAYS use second person ("you", "your") when addressing the player
- NEVER use third person with the player's name (not "Markus does..." but "You do...")
- Write as if speaking directly to the player
- Example: "You swing your sword at the skeleton" NOT "Markus swings his sword"
- Example: "Your blade connects with the armor" NOT "His blade connects"

Respond ONLY in valid JSON format:
{
  "description": "scene description showing outcome of player's action",
  "choices": [
    { "text": "choice text", "type": "combat|explore|rest", "risk": "low|medium|high" },
    { "text": "choice text", "type": "combat|explore|rest", "risk": "low|medium|high" },
    { "text": "choice text", "type": "combat|explore|rest", "risk": "low|medium|high" }
  ]
}`;

/**
 * Build user prompt from character, story context, and player's choice
 */
export function buildUserPrompt(character, storyLog, playerChoice = null) {
  const recentStory = storyLog
    .slice(-2)
    .map(entry => entry.text)
    .join('\n');

  const inventoryList = character.inventory
    ? character.inventory.map(item => item.name).join(', ')
    : 'None';

  let prompt = `
Character: ${character.name}, Level ${character.level} ${character.class}
HP: ${character.health}/${character.maxHealth}
Weapon: ${character.weapon.name}
Inventory: ${inventoryList}

Recent story:
${recentStory || 'The adventure begins...'}
`;

  if (playerChoice) {
    prompt += `\n\nPlayer's action: ${playerChoice}

IMPORTANT: Generate the OUTCOME of this action. The story must progress. Show what happens as a result of "${playerChoice}".`;
  }

  prompt += `\n\nGenerate the next scene with 3 NEW choices.`;

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
