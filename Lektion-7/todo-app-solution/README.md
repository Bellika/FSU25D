# Todo App - Lösning

Detta är den kompletta lösningen för Lektion 6 - Todo App.

## Kom igång

```bash
npm install
npm run dev
```

## Funktionalitet

Denna Todo-app innehåller alla funktioner från övningarna:

### ✅ CRUD Operations
- **Create** - Lägg till nya todos via formulär
- **Read** - Visa todos i listor
- **Update** - Ändra befintliga todos
- **Delete** - Ta bort todos med delete-knapp

### ✅ Complete/Incomplete
- Markera todos som färdiga med "Klar"-knapp
- Ångra färdiga todos med "Ångra"-knapp
- Två separata listor: "Att göra" och "Färdiga"

### ✅ Component Structure
- `TodoApp.jsx` - Root component med state
- `Form.jsx` - Formulär för att lägga till todos
- `TodoList.jsx` - Lista-komponent (återanvändbar)
- `Todo.jsx` - Enskild todo-komponent
- `Header.jsx` - Header med titel och tagline
- `Footer.jsx` - Footer med copyright

### ✅ CSS Modules
Alla komponenter har sina egna CSS Module-filer:
- `TodoApp.module.css`
- `Form.module.css`
- `TodoList.module.css`
- `Todo.module.css`
- `Header.module.css`
- `Footer.module.css`

## React-koncept som demonstreras

- **Component Composition** - Uppdelning i små, återanvändbara komponenter
- **Lifting State Up** - State i gemensam förälder (TodoApp)
- **Props Drilling** - Props genom flera nivåer
- **One-Way Data Flow** - Data nedåt, events uppåt
- **Callback Functions** - Kommunikation från child till parent
- **Immutable Updates** - Spread operator för state updates
- **Conditional Rendering** - Filtrering och villkorlig visning
- **CSS Modules** - Lokal styling per komponent
