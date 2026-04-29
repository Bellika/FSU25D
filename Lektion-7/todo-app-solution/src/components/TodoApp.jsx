import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Form from './Form'
import TodoList from './TodoList'
import styles from './TodoApp.module.css'

function TodoApp() {
    const defaultTodos = [
        {
            id: 1,
            task: 'Syssla 1',
            disabled: true,
            changeBtnLabel: 'Ändra',
            completed: false
        },
        {
            id: 2,
            task: 'Syssla 2',
            disabled: true,
            changeBtnLabel: 'Ändra',
            completed: false
        }
    ]
    const [todos, setTodos] = useState(defaultTodos);

    // CREATE - Lägg till ny todo
    const addTodo = (newTodo) => {
        console.log('TodoApp->addTodo()');
        console.log(newTodo);

        setTodos([
            ...todos,
            newTodo
        ])
    }

    // UPDATE - Uppdatera befintlig todo
    const updateTodo = (updatedTodo) => {
        console.log('TodoApp->updateTodo()');
        console.log(updatedTodo);

        const updatedTodos = todos.map((todo) => {
            if (todo.id === updatedTodo.id) {
                return updatedTodo;
            }
            return todo;
        })

        setTodos(updatedTodos)
    }

    // DELETE - Ta bort en todo
    const deleteTodo = (todoId) => {
        console.log('TodoApp->deleteTodo()');
        console.log(todoId);

        const filteredTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(filteredTodos);
    }

    // Toggle complete/incomplete status
    const toggleComplete = (todoId) => {
        console.log('TodoApp->toggleComplete()');
        console.log(todoId);

        const updatedTodos = todos.map(todo => {
            if (todo.id === todoId) {
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }
            return todo;
        })

        setTodos(updatedTodos);
    }

    // Filtrera todos baserat på completed status
    const incompleteTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    console.log('TodoApp->render()');
    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                <Form addTodo={addTodo} />

                {/* Incomplete todos lista */}
                <TodoList
                    title="Att göra"
                    listId="uncompleted-list"
                    todos={incompleteTodos}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                />

                {/* Completed todos lista */}
                <TodoList
                    title="Färdiga"
                    listId="completed-list"
                    todos={completedTodos}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                />
            </main>

            <Footer />
        </div>
    )
}

export default TodoApp
