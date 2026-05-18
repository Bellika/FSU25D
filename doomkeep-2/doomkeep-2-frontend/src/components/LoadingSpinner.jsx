import styles from '../styles/LoadingSpinner.module.css';

/**
 * Loading spinner component shown while AI generates content.
 *
 * @param {string} message - Optional message to display
 */
function LoadingSpinner({ message = "The Dungeon Master is thinking..." }) {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default LoadingSpinner;
