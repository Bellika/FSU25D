import React from 'react';

// function Todo(props) {
//     return (
//         <li onClick={props.handleClick} className={props.className}>
//             {props.task}
//         </li>
//     )
// }

// Refactor above with destructuring props object
function Todo({ item, handleClick, deleteTodo, className }) {
    return (
        <li className={className}>
            {item.task}
            <button onClick={handleClick}>Done</button>
            <button onClick={() => { deleteTodo(item.id) }}>Delete</button>
        </li>
    )
}

export default Todo
