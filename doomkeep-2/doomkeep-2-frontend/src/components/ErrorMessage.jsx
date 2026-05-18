import styles from '../styles/ErrorMessage.module.css';

/**
 * Error message component for displaying API errors.
 *
 * @param {string} error - Error message to display
 * @param {function} onRetry - Optional retry callback
 */
function ErrorMessage({ error, onRetry }) {
  if (!error) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>⚠️ The Dungeon Master has encountered an error</h3>
      <p className={styles.message}>{error}</p>
      {onRetry && (
        <button onClick={onRetry} className={styles.retryButton}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
