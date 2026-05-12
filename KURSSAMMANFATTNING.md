## Vad har vi gått igenom i kursen?

### Lektion 1: React Grunder
- Skapa React-projekt med Vite
- JSX (JavaScript XML) - HTML-liknande syntax i JavaScript
- Komponenter (funktionskomponenter)
- Props (skicka data mellan komponenter)

### Lektion 2: State och Event Handlers
- `useState` hook
- Event handlers (onClick, onChange, etc.)
- Kontrollerade formulär
- Conditional rendering (visa/dölj baserat på state)

### Lektion 3: useEffect och Sidoeffekter
- `useEffect` hook
- Lifecycle (komponentens livscykel)
- Cleanup functions
- Dependency array

### Lektion 4: Listor och Keys
- Rendera listor med `.map()`
- Keys (unikt id för varje element)
- Filter och sortering av data

### Lektion 5: React Router
- Navigation mellan sidor
- `<Link>` och `<NavLink>`
- Dynamic routes (`:id` parametrar)
- `useParams`, `useNavigate`

### Lektion 6: Data Fetching
- Fetch API / Axios
- GET, POST, PUT, DELETE (CRUD)
- Async/await
- Loading states och error handling

### Lektion 7: Projekt och Repetition
- Bygga en komplett app
- Struktur och organisation

### Fullstack Auth App (Context API)
- Context API för global state
- JWT autentisering
- Protected routes
- Login/Signup flöde

### Doomkeep 2 (useReducer)
- useReducer för komplex state
- Actions och dispatch
- Reducer-funktioner

---

## React-Specifika Koncept

Dessa är **unika för React** och används inte i vanilla JavaScript:

### Grundläggande (Enkla)

#### JSX
```jsx
// JSX låter oss skriva HTML-liknande kod i JavaScript
const element = <h1>Hello World</h1>;

// Kan bädda in JavaScript med {}
const name = "Anna";
const greeting = <h1>Hello {name}!</h1>;
```

**Vad är det?** En syntax-utökning av JavaScript som ser ut som HTML
**Varför?** Gör det lättare att skapa UI-element

#### Komponenter
```jsx
// En komponent är en funktion som returnerar JSX
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Användning:
<Welcome name="Anna" />
```

**Vad är det?** Återanvändbara UI-byggstenar
**Varför?** Dela upp komplex UI i mindre, hanterbara delar

#### Props
```jsx
function UserCard({ name, age, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

// Användning:
<UserCard name="Anna" age={25} email="anna@example.com" />
```

**Vad är det?** Data som skickas från förälder till barn-komponent
**Varför?** Kommunikation mellan komponenter
**Viktigt:** Props är **read-only** (kan inte ändras av barn-komponenten)

#### useState Hook
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

**Vad är det?** Lägga till lokal state i en komponent
**Varför?** Komponenten behöver "komma ihåg" data (t.ex. formulär-input, öppen/stängd meny)
**När?** När data ändras över tid inom en komponent

#### useEffect Hook
```jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Körs efter render
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]); // Dependency array - körs om när userId ändras

  return <div>{user?.name}</div>;
}
```

**Vad är det?** Hantera sidoeffekter (API-anrop, timers, subscriptions)
**Varför?** Synkronisera komponenten med externa system
**När?** Data-hämtning, event listeners, DOM-manipulation

#### Conditional Rendering
```jsx
function Greeting({ isLoggedIn }) {
  // If-statement
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign in</h1>;

  // Eller ternary operator
  return isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>;

  // Eller && operator (visa bara om true)
  return isLoggedIn && <h1>Welcome back!</h1>;
}
```

**Vad är det?** Visa olika UI baserat på conditions
**Varför?** Dynamiskt UI som ändras baserat på state/props

#### Lists och Keys
```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

**Vad är det?** Rendera arrayer av data
**Varför?** Visa dynamiska listor (produkter, användare, meddelanden)
**Viktigt:** Varje element måste ha en unik `key` (helst ett ID, inte index)

### Avancerade

#### useReducer Hook
```jsx
import { useReducer } from 'react';

// Reducer function: tar (state, action) och returnerar ny state
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: { id: Date.now(), text } });
  };

  return <div>{/* UI here */}</div>;
}
```

**Vad är det?** Alternativ till useState för komplex state-logik
**Varför?** När state har många relaterade värden eller komplexa uppdateringar
**När använda?**
- State har flera sub-värden
- Nästa state beror på tidigare state
- Många olika sätt att uppdatera samma state

#### Context API
```jsx
import { createContext, useContext, useState } from 'react';

// 1. Skapa Context
const UserContext = createContext();

// 2. Provider Component
function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Använd Context i barn-komponenter
function UserProfile() {
  const { user } = useContext(UserContext);
  return <div>{user?.name}</div>;
}

// 4. Wrap app med Provider
function App() {
  return (
    <UserProvider>
      <UserProfile />
    </UserProvider>
  );
}
```

**Vad är det?** Global state som är tillgänglig överallt i appen
**Varför?** Undvika "prop drilling" (skicka props genom många nivåer)
**När?**
- Användare-info (inloggad användare)
- Tema (dark mode / light mode)
- Språk (svenska / engelska)
- Varukorg i e-handel

#### Custom Hooks
```jsx
// Custom hook: måste börja med "use"
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Användning:
function TodoApp() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  // Todos sparas automatiskt i localStorage!

  return <div>{/* UI here */}</div>;
}
```

**Vad är det?** Återanvändbar logik som använder hooks
**Varför?** DRY-princip - skriv inte samma kod flera gånger
**Exempel:**
- `useLocalStorage` - spara state i localStorage
- `useFetch` - hämta data från API
- `useForm` - hantera formulär

#### useRef Hook
```jsx
import { useRef, useEffect } from 'react';

function SearchInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Fokusera input när komponenten renderas
    inputRef.current.focus();
  }, []);

  const scrollToTop = () => {
    inputRef.current.scrollIntoView();
  };

  return <input ref={inputRef} type="text" />;
}
```

**Vad är det?** Referens till DOM-element eller bevara värde mellan renders
**Varför?**
- Fokusera input
- Scrolla till element
- Bevara värde utan att trigga re-render
**När?** DOM-manipulation, animationer, integrera med third-party bibliotek

---

## Relaterade Teknologier (INTE React-specifikt)

Dessa är **inte React** men används ofta tillsammans med React:

### React Router (Bibliotek för React)
```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Vad är det?** Navigation mellan sidor i en Single Page Application (SPA)
**Varför?** React har ingen inbyggd routing
**Begrepp:**
- `<BrowserRouter>`: Wraps hela appen
- `<Routes>`: Container för alla routes
- `<Route>`: Definierar en sida (path + komponent)
- `<Link>`: Navigera utan att ladda om sidan
- `useNavigate()`: Navigera programmatiskt
- `useParams()`: Hämta URL-parametrar (`:id`)

### Fetch API / Axios (Vanilla JavaScript)
```jsx
// Fetch API (inbyggt i JavaScript)
fetch('/api/users')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Axios (bibliotek - enklare syntax)
import axios from 'axios';

axios.get('/api/users')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

// Async/await (modernare)
async function getUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

**Vad är det?** Hämta data från backend/API
**Varför?** React har ingen inbyggd data-fetching
**När?** Hämta användare, produkter, skicka formulär

### CSS Modules (Styling)
```jsx
// Button.module.css
.button {
  background: blue;
  color: white;
}

.button.primary {
  background: green;
}

// Button.jsx
import styles from './Button.module.css';

function Button({ primary }) {
  return (
    <button className={`${styles.button} ${primary ? styles.primary : ''}`}>
      Click me
    </button>
  );
}
```

**Vad är det?** Scoped CSS (klasser är unika per komponent)
**Varför?** Undvika CSS-konflikter, enklare att organisera
**Alternativ:** styled-components, Tailwind CSS, vanlig CSS

### Node.js / Express (Backend)
```javascript
// server.js
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Anna' }]);
});

app.listen(3000);
```

**Vad är det?** Backend-server för att hantera data, autentisering, etc.
**Varför?** React är bara frontend - behöver backend för databas, autentisering
**Inte React:** Detta är helt separat från React (körs på servern, inte i browsern)

---

## Enkel vs Avancerad: Sammanfattning

### Lätta Koncept (Grundläggande)
Dessa är de grundläggande koncepten som alla behöver kunna:

| Koncept | Vad | När använda |
|---------|-----|-------------|
| **JSX** | HTML-liknande syntax | Alltid i React |
| **Komponenter** | UI-byggstenar | Dela upp UI i delar |
| **Props** | Data från förälder till barn | Kommunikation mellan komponenter |
| **useState** | Lokal state | När data ändras över tid |
| **useEffect** | Sidoeffekter | API-anrop, subscriptions |
| **Event Handlers** | onClick, onChange | Hantera användarinteraktion |
| **Conditional Rendering** | if/ternary/&& | Dynamiskt UI |
| **Lists & Keys** | .map() | Rendera arrayer |
| **React Router** | Navigation | Flera sidor i appen |
| **Fetch/Axios** | Data-hämtning | Kommunicera med backend |

### Mer Avancerade Koncept
Dessa koncept är mer komplexa och bygger vidare på grunderna:

| Koncept | Vad | När använda |
|---------|-----|-------------|
| **useReducer** | Komplex state | State med många relaterade värden |
| **Context API** | Global state | Undvika prop drilling |
| **Custom Hooks** | Återanvändbar logik | DRY-princip |
| **useRef** | DOM-referens | Fokus, scroll, bevara värde |
| **Protected Routes** | Kräv autentisering | Vissa sidor bara för inloggade |
| **Full CRUD** | Create, Read, Update, Delete | Komplett datahantering |

---

## Ordlista (Förklaring av begrepp)

### State
Data som kan ändras över tid. När state ändras, re-renderas komponenten.

### Props
Data som skickas från förälder-komponent till barn-komponent. Är **read-only**.

### Hook
En funktion som "hookar in" i React-funktionalitet (useState, useEffect, etc.). Måste börja med "use".

### Re-render
När React uppdaterar UI efter att state eller props ändrats.

### Side Effect
Något som påverkar världen utanför komponenten (API-anrop, DOM-manipulation, timers).

### Dependency Array
Array i useEffect som bestämmer när effekten ska köras om. `[]` = bara en gång, `[count]` = när count ändras.

### Prop Drilling
Skicka props genom många komponenter som inte använder dem. Lösning: Context API.

### CRUD
Create, Read, Update, Delete - de fyra grundläggande dataoperationerna.

### Reducer
En funktion som tar (currentState, action) och returnerar ny state.

### Action
Ett objekt som beskriver VAD som hände (vanligtvis `{ type: 'ACTION_NAME', payload: data }`).

### Dispatch
Funktion för att skicka en action till en reducer.

### Context
En "tunnel" genom komponent-trädet som låter barn-komponenter komma åt data utan props.

### Provider
Komponent som tillhandahåller Context-värde till sina barn.

### Consumer
Komponent som använder data från Context (via useContext).

### Protected Route
En route som kräver autentisering/behörighet för att nås.

### Dynamic Route
Route med parametrar, t.ex. `/users/:id` där `:id` är dynamiskt.

### SPA (Single Page Application)
App som laddar en enda HTML-sida och uppdaterar innehållet dynamiskt utan att ladda om sidan.

---

## Frågor att ställa dig själv

### Grundläggande förståelse:
- [ ] Kan jag skapa komponenter och använda props?
- [ ] Kan jag använda useState för att hantera state?
- [ ] Kan jag använda useEffect för att hämta data?
- [ ] Kan jag rendera listor med .map() och keys?
- [ ] Kan jag hantera formulär med kontrollerade inputs?
- [ ] Kan jag navigera mellan sidor med React Router?
- [ ] Kan jag hämta data från ett API?

### Djupare förståelse:
- [ ] Kan jag förklara VARFÖR jag använder useReducer istället för useState?
- [ ] Kan jag implementera Context API för global state?
- [ ] Kan jag skapa egna custom hooks för återanvändbar logik?
- [ ] Kan jag implementera protected routes?
- [ ] Kan jag förklara hela projektets arkitektur och design decisions?
- [ ] Kan jag förklara andras kod i projektet, inte bara min egen?

---

## Sammanfattning

**React är ett bibliotek för att bygga UI med komponenter.**

- **Grundläggande:** Komponenter, Props, useState, useEffect, Lists, Routing, Fetch
- **Mer avancerat:** useReducer, Context, Custom Hooks, useRef, Protected Routes
