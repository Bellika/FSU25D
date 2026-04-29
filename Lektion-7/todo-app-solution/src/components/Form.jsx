import { useState } from 'react'
import styles from './Form.module.css'

function Form(props) {
    const [task, setTask] = useState('');

    const handleChange = (e) => {
        setTask(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task.trim() === '') {
            return; // Förhindra tomma todos
        }

        const newTodo = {
            id: Math.random() * 1000,
            task: task,
            disabled: true,
            changeBtnLabel: 'Ändra',
            completed: false
        }

        props.addTodo(newTodo);
        setTask('');
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type="text"
                value={task}
                onChange={handleChange}
                placeholder="Ny syssla"
            />
            <button className={styles.button}>Lägg till</button>
        </form>
    )
}

export default Form
