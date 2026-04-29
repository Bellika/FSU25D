import styles from './Todo.module.css'

function Todo(props) {
    const { todo } = props;

    const handleUpdateTask = (e) => {
        const updatedTodo = {
            ...todo,
            task: e.target.value
        }
        props.updateTodo(updatedTodo);
    }

    const toggleInputEnabler = () => {
        const updatedTodo = {
            ...todo,
            disabled: !todo.disabled,
            changeBtnLabel: todo.disabled ? 'Spara' : 'Ändra'
        }
        props.updateTodo(updatedTodo);
    }

    const handleComplete = () => {
        props.toggleComplete(todo.id);
    }

    const handleDelete = () => {
        props.deleteTodo(todo.id);
    }

    return (
        <li className={styles.todoItem}>
            <input
                className={styles.todoInput}
                type="text"
                value={todo.task}
                disabled={todo.disabled}
                onChange={handleUpdateTask}
            />
            <button
                className={styles.editButton}
                onClick={toggleInputEnabler}
            >
                {todo.changeBtnLabel}
            </button>
            <button
                className={styles.completeButton}
                onClick={handleComplete}
            >
                {todo.completed ? 'Ångra' : 'Klar'}
            </button>
            <button
                className={styles.deleteButton}
                onClick={handleDelete}
            >
                Ta bort
            </button>
        </li>
    )
}

export default Todo
