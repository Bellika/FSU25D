import { useState, useRef } from 'react';
import { SYSTEM_PROMPT, buildUserPrompt, validateAIResponse } from '../utils/aiPrompts';

/**
 * Custom hook for OpenAI API integration.
 *
 * Handles:
 * - API calls to OpenAI
 * - Loading and error states
 * - Request abortion (cleanup)
 * - Response validation
 *
 * @returns {Object} { generateStory, loading, error, abort }
 *
 * @example
 * const { generateStory, loading, error } = useAI();
 * const scene = await generateStory(character, storyLog, playerChoice);
 */
export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const generateStory = async (character, storyLog, playerChoice = null, inventory = [], outcomeContext = '') => {
    // Abort previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (!apiKey) {
        throw new Error('OpenAI API key not found. Check your .env.local file.');
      }

      const userPrompt = buildUserPrompt(character, storyLog, playerChoice, inventory, outcomeContext);

      console.log('🤖 AI Prompt:', userPrompt);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.8,
          max_tokens: 500
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      console.log('🤖 AI Response:', content);

      // Parse JSON response
      const sceneData = JSON.parse(content);

      // Validate response format
      validateAIResponse(sceneData);

      return sceneData;
    } catch (err) {
      // Don't set error for aborted requests
      if (err.name === 'AbortError') {
        console.log('Request aborted');
        return null;
      }

      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const abort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return { generateStory, loading, error, abort };
}
