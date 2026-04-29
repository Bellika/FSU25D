import Todo from './Todo'
import styles from './TodoList.module.css'

function TodoList(props) {
    const { title, listId, todos, updateTodo, deleteTodo, toggleComplete } = props;

    return (
        <div className={styles.section}>
            <h2 className={styles.title}>{title}</h2>

            {todos.length === 0 ? (
                <p className={styles.empty}>Inga sysslor här!</p>
            ) : (
                <ul id={listId} className={styles.list}>
                    {todos.map(todo => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            updateTodo={updateTodo}
                            deleteTodo={deleteTodo}
                            toggleComplete={toggleComplete}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TodoList
