import { useState } from 'react';
import userService from '../services/userService';
import styles from './ProtectedPage.module.css';

const ProtectedPage = () => {
  const [protectedData, setProtectedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProtectedData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await userService.getProtectedData();
      if (data.success) {
        setProtectedData(data.data);
      } else {
        setError(data.error || 'Failed to fetch protected data');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch protected data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>JWT Protected Data (HTTP-only Cookie)</h2>
      <p className={styles.description}>
        This demonstrates JWT authentication using HTTP-only cookies.
        Your JWT token is stored securely in a cookie that JavaScript cannot access.
        Click the button to fetch protected data from the backend.
      </p>

      <button
        onClick={fetchProtectedData}
        className={styles.button}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Fetch Protected Data'}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {protectedData && (
        <div className={styles.dataBox}>
          <h3>Protected Data:</h3>
          <div className={styles.dataItem}>
            <strong>User ID:</strong> {protectedData.userId}
          </div>
          <div className={styles.dataItem}>
            <strong>Username:</strong> {protectedData.username}
          </div>
          <div className={styles.dataItem}>
            <strong>Secret Info:</strong> {protectedData.secretInfo}
          </div>
          <div className={styles.dataItem}>
            <strong>Timestamp:</strong> {new Date(protectedData.timestamp).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;
