import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import RefDemo from './RefDemo';
import ProtectedPage from './ProtectedPage';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome, {user.username}!</h1>
          <div className={styles.buttonGroup}>
            <button onClick={toggleTheme} className={styles.themeButton}>
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.card}>
            <h2>Your Dashboard</h2>
            <p>You are now logged in and can see this protected content!</p>
          </div>

          {/* JWT Protected Page */}
          <div className={styles.card}>
            <ProtectedPage />
          </div>

          <div className={styles.card}>
            <h3>About Context</h3>
            <p>
              This app uses React Context API to manage both authentication and theme state
              throughout the entire application.
            </p>
            <ul className={styles.list}>
              <li>AuthContext holds information about the logged-in user</li>
              <li>ThemeContext manages the dark/light theme preference</li>
              <li>useAuth and useTheme hooks provide access to context from any component</li>
              <li>App component renders different UI based on isAuthenticated</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>About .env</h3>
            <p>
              Username and password are read from the .env file using{' '}
              <code className={styles.code}>import.meta.env</code>
            </p>
            <p className={styles.warning}>
              NOTE: In a real app, passwords should NEVER be stored in .env files!
              This is for demonstration purposes only.
            </p>
          </div>

          <div className={styles.card}>
            <h3>About localStorage</h3>
            <p>
              The theme preference is saved to localStorage, so your choice persists
              even after you refresh the page or close the browser.
            </p>
            <p>
              localStorage is perfect for non-sensitive user preferences like theme,
              language settings, or UI customizations.
            </p>
          </div>

          <div className={styles.card}>
            <h3>About CSS Custom Properties</h3>
            <p>
              This app uses CSS Custom Properties (CSS Variables) for theming.
              All colors are defined in <code className={styles.code}>index.css</code> and
              automatically update when you change themes.
            </p>
            <p>
              No <code className={styles.code}>:global()</code> selectors needed -
              variables cascade naturally from the body element!
            </p>
          </div>

          {/* useRef Examples Component */}
          <RefDemo />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
