import { useState } from 'react'

/**
 * ============================================
 * ÖVNINGAR - TODO APP
 * ============================================
 *
 * Del 1: Delete Button (15 min)
 * ------------------------------
 * 1. Skapa en deleteTodo-funktion i TodoApp
 * 2. Skicka funktionen som prop till TodoList och Todo
 * 3. Lägg till en delete-knapp i Todo-komponenten
 * 4. Implementera click-handler som tar bort todo från listan
 *
 * Tips:
 * const deleteTodo = (todoId) => {
 *   const filteredTodos = todos.filter(todo => todo.id !== todoId);
 *   setTodos(filteredTodos);
 * };
 *
 *
 * Del 2: Complete Button (15 min)
 * --------------------------------
 * 1. Lägg till 'completed' property (true/false) i todos
 * 2. Skapa toggleComplete-funktion i TodoApp
 * 3. Skicka funktionen som prop till Todo
 * 4. Lägg till "Klar"-knapp i Todo-komponenten
 * 5. Implementera click-handler som togglear completed-status
 * 6. Visa olika button text: "Klar" eller "Ångra"
 *
 * Tips:
 * completed: false  // Lägg till i todo-objektet
 * {todo.completed ? 'Ångra' : 'Klar'}
 *
 *
 * Del 3: Complete List (20 min)
 * ------------------------------
 * 1. Filtrera todos i två listor: incomplete och completed
 * 2. Rendera två TodoList-komponenter med olika props
 * 3. Första listan: title="Att göra", visa incomplete todos
 * 4. Andra listan: title="Färdiga", visa completed todos
 * 5. Återanvänd samma TodoList-komponent för båda!
 *
 * Tips:
 * const incompleteTodos = todos.filter(todo => !todo.completed);
 * const completedTodos = todos.filter(todo => todo.completed);
 *
 *
 * Del 4: Layout (10 min)
 * ----------------------
 * 1. Skapa Header-komponent med rubrik och tagline
 * 2. Skapa Footer-komponent med copyright text
 * 3. Lägg till Header och Footer i TodoApp
 * 4. Använd semantic HTML: <header>, <main>, <footer>
 *
 *
 * Del 5: Styling (20 min)
 * -----------------------
 * 1. Skapa CSS Module-filer för varje komponent
 * 2. Style TodoApp: centrerad layout, max-width
 * 3. Style Form: flexbox layout, styled input och button
 * 4. Style Todo: flexbox layout, olika färger för olika buttons
 * 5. Style TodoList: styled headers, tom lista meddelande
 *
 * ============================================
 */

function TodoApp() {
    // Börja här! Skapa state för todos
    // const [todos, setTodos] = useState([...]);

    return (
        <div>
            <h1>Min Todo App</h1>

            {/* Lägg till dina komponenter här */}
        </div>
    )
}

export default TodoApp
