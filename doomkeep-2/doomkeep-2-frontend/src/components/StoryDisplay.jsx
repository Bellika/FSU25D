/**
 * STORY DISPLAY
 *
 * CONCEPTS:
 * - Lists & Keys (render story log)
 * - Props (currentScene, storyLog)
 * - useRef for auto-scroll (will be added later)
 *
 * Displays:
 * - Current scene description
 * - Story log (history of all events)
 */

import styles from '../styles/StoryDisplay.module.css';

function StoryDisplay({ currentScene, storyLog }) {
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
        </div>
      </div>
    </div>
  );
}

export default StoryDisplay;
