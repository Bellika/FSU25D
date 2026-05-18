/**
 * STORY DISPLAY
 *
 * CONCEPTS:
 * - Lists & Keys (render story log)
 * - Props (currentScene, storyLog)
 * - useRef for auto-scroll (Lesson 2)
 *
 * Displays:
 * - Current scene description
 * - Story log (history of all events)
 */

import { useRef, useEffect } from 'react';
import styles from '../styles/StoryDisplay.module.css';

function StoryDisplay({ currentScene, storyLog }) {
  const logEndRef = useRef(null);

  // Auto-scroll to bottom when storyLog updates
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [storyLog]);

  return (
    <div className={styles.container}>
      {/* Current Scene - Prominently displayed */}
      <div className={styles.currentScene}>
        <p className={styles.sceneText}>{currentScene.description}</p>
      </div>

      {/* Story Log - Scrollable history */}
      <div className={styles.storyLog}>
        <h3 className={styles.logTitle}>Story Log</h3>
        <div className={styles.logContent}>
          {storyLog.length === 0 ? (
            <p className={styles.emptyLog}>Your journey begins...</p>
          ) : (
            storyLog.map((entry) => (
              <div
                key={entry.timestamp}
                className={`${styles.logEntry} ${styles[entry.type] || ''}`}
              >
                {entry.text}
              </div>
            ))
          )}
          {/* Scroll anchor - placed inside scrollable area */}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}

export default StoryDisplay;
