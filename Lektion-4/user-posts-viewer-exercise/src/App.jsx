import React from 'react';
import './App.css';
import UserPostsViewer from './components/UserPostsViewer';

/**
 * Övning för Lektion 4: useEffect och Lifecycle Methods
 *
 * Instruktioner:
 * 1. Implementera UserPostsViewer komponenten i src/components/UserPostsViewer.jsx
 * 2. Följ instruktionerna i kommentarerna i UserPostsViewer.jsx
 * 3. Använd JSONPlaceholder API för att hämta data
 * 4. Testa din kod med npm run dev
 *
 * Se solution-mappen för fullständig lösning om du fastnar!
 */

function App() {
  return (
    <div className="App">
      <h1>User Posts Viewer</h1>
      <UserPostsViewer />
    </div>
  );
}

export default App;
