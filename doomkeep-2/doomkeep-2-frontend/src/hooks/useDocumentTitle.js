import { useEffect } from 'react';

/**
 * Custom hook to update the browser tab title dynamically.
 *
 * @param {string} title - The title to display in the browser tab
 *
 * @example
 * useDocumentTitle("Doomkeep - Character Creation");
 *
 * @example
 * const title = character ? `Doomkeep - ${character.name}` : "Doomkeep";
 * useDocumentTitle(title);
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    // Restore previous title on cleanup
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
