import React from 'react'
/**
 * Part 1: Generate list (See generate-todo-list-solution-1 )
 * - generats a list from todos array below, with the array-method .map() 
 * - Refactor the code for listItems, into a new child component, may call it 'Todo'
 * - Add a key to every listItem
 *
 * Part 2: Form for adding new todo-items 
 * - Add a form with input field and a button
 * - Create a new state 'task' with default value '', that will be used for the controlled input field
 * - Create a new function handleChange(), that will be used for the controlled input field
 * - Add an onChange event on the controlled input field, that calls the function handleChange()
 * - Add an onSubmit event on the form, that calls the already defined function handleSubmit()
 * - Further develop the function handleSubmit(), so that a newly created task is added to the list 
 * 
 * Part 3: Styling
 * - Style the app, using CSS modules
 * 
 * Part 4 (hard): Refactor form
 * - Refactor the code for the form, into a new child component
 * 
 * Part 5 (extra hard): Delete button
 * - Add a delete button for every task, that removes the task from the list
 * 
 * 
 * NOTE! Dont forget to add 'TodoApp' to App.js
 */

const TodoApp = () => {
    const defaultTodos = [
        {id: 1, task: 'Syssla 1'},
        {id: 2, task: 'Syssla 2'},
        {id: 3, task: 'Syssla 3'},
        {id: 4, task: 'Syssla 4'},
        {id: 5, task: 'Syssla 5'}
    ]

    const handleSubmit = (e) => {
        e.preventDefault();

        // NOTE! Not the best way to generate a unique ID. 
        // There are libraries that are more suitable for this job
        const randomId = Math.random() * 1000;  
    }

    return (
      <div>TodoApp</div>
    )
}
  
export default TodoApp
